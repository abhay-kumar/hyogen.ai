import { FormEvent, useState } from 'react';
import { listApprovalDecisions, recordApprovalDecision } from './approvalGates';
import { createBrandProfile, listBrandProfiles, updateBrandProfile } from './brandProfiles';
import {
  checkDeepAgentsHealth,
  DeepAgentsHealth,
  DeepAgentsHelloResult,
  runDeepAgentsHello,
} from './deepAgentsHealth';
import { getMockGuidedWorkflowTimeline } from './guidedWorkflow';
import { getHealthSnapshot } from './health';
import { fullAgenticModeWarning, resolveProviderCapabilities } from './providerCapabilities';
import {
  createProviderConnection,
  deleteProviderConnection,
  listProviderConnections,
} from './providerConnections';
import { checkMockProviderHealth, ProviderHealthResult } from './providerHealth';
import { redactedRunTraceJson } from './runTrace';
import { respondWithMockHarness, StudioMessage } from './studioChat';
import { loadWorkspace, saveWorkspace } from './workspace';

export function App() {
  const health = getHealthSnapshot();
  const [workspace, setWorkspace] = useState(() => loadWorkspace());
  const [workspacePath, setWorkspacePath] = useState('');
  const [showRunTrace, setShowRunTrace] = useState(false);
  const [deepAgentsHealth, setDeepAgentsHealth] = useState<DeepAgentsHealth | null>(null);
  const [deepAgentsHello, setDeepAgentsHello] = useState<DeepAgentsHelloResult | null>(null);
  const [brandProfiles, setBrandProfiles] = useState(() => listBrandProfiles());
  const [isCreatingBrandProfile, setIsCreatingBrandProfile] = useState(false);
  const [brandProfileName, setBrandProfileName] = useState('');
  const [editingBrandProfileId, setEditingBrandProfileId] = useState<string | null>(null);
  const [providerConnections, setProviderConnections] = useState(() => listProviderConnections());
  const [isCreatingProviderConnection, setIsCreatingProviderConnection] = useState(false);
  const [providerName, setProviderName] = useState('');
  const [providerSecret, setProviderSecret] = useState('');
  const [providerHealthResults, setProviderHealthResults] = useState<ProviderHealthResult[]>([]);
  const [approvalDecisions, setApprovalDecisions] = useState(() => listApprovalDecisions());
  const [studioInput, setStudioInput] = useState('');
  const [studioMessages, setStudioMessages] = useState<StudioMessage[]>([]);
  const [brandProfileSettings, setBrandProfileSettings] = useState({
    audience: '',
    tone: '',
    ctaDefault: '',
    captionDefault: '',
    sourceDefault: '',
  });

  function chooseWorkspace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorkspace(saveWorkspace(workspacePath));
  }

  function runDeepAgentsHealthCheck() {
    setDeepAgentsHealth(checkDeepAgentsHealth());
  }

  function runDeepAgentsHelloCheck() {
    setDeepAgentsHello(runDeepAgentsHello());
  }

  function saveBrandProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createBrandProfile({ name: brandProfileName });
    setBrandProfiles(listBrandProfiles());
    setBrandProfileName('');
    setIsCreatingBrandProfile(false);
  }

  function sendStudioMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStudioMessages((messages) => [...messages, ...respondWithMockHarness(studioInput)]);
    setStudioInput('');
  }

  function approveMockDecision() {
    recordApprovalDecision({ target: 'Mock Decision', decision: 'approved' });
    setApprovalDecisions(listApprovalDecisions());
  }

  function editBrandProfile(id: string) {
    const profile = brandProfiles.find((candidate) => candidate.id === id);
    if (!profile) return;
    setEditingBrandProfileId(id);
    setBrandProfileSettings({
      audience: profile.audience,
      tone: profile.tone,
      ctaDefault: profile.ctaDefault,
      captionDefault: profile.captionDefault,
      sourceDefault: profile.sourceDefault,
    });
  }

  function saveBrandProfileSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingBrandProfileId) return;
    updateBrandProfile(editingBrandProfileId, brandProfileSettings);
    setBrandProfiles(listBrandProfiles());
    setEditingBrandProfileId(null);
  }

  function archiveBrandProfile(id: string) {
    updateBrandProfile(id, { archived: true });
    setBrandProfiles(listBrandProfiles());
  }

  function restoreBrandProfile(id: string) {
    updateBrandProfile(id, { archived: false });
    setBrandProfiles(listBrandProfiles());
  }

  function saveProviderConnection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createProviderConnection({ name: providerName, secret: providerSecret });
    setProviderConnections(listProviderConnections());
    setProviderName('');
    setProviderSecret('');
    setIsCreatingProviderConnection(false);
  }

  function removeProviderConnection(id: string) {
    deleteProviderConnection(id);
    setProviderConnections(listProviderConnections());
  }

  function runProviderHealthCheck() {
    setProviderHealthResults(checkMockProviderHealth(providerConnections));
  }

  const activeBrandProfiles = brandProfiles.filter((profile) => !profile.archived);
  const archivedBrandProfiles = brandProfiles.filter((profile) => profile.archived);
  const providerCapabilities = resolveProviderCapabilities(providerConnections);
  const degradedModeWarning = fullAgenticModeWarning(providerCapabilities);
  const guidedWorkflowTimeline = getMockGuidedWorkflowTimeline();

  return (
    <main aria-label="hyogen.ai local shell">
      <section aria-label="Local health">
        <h1>{health.appName}</h1>
        <dl>
          <div>
            <dt>Mode</dt>
            <dd>{health.mode}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{health.status}</dd>
          </div>
        </dl>
        <h2>Local commands</h2>
        <ul>
          {health.commands.map((command) => (
            <li key={command.name}>
              <strong>{command.name}</strong>: <code>{command.command}</code> — {command.status}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="DeepAgents Stage Harness">
        <h2>DeepAgents Stage Harness</h2>
        <button type="button" onClick={runDeepAgentsHealthCheck}>
          Check DeepAgents Health
        </button>
        {deepAgentsHealth ? (
          <>
            <p>{deepAgentsHealth.boundary}: {deepAgentsHealth.supervision}</p>
            <p>DeepAgents Stage Harness health: {deepAgentsHealth.status}</p>
          </>
        ) : null}
        <button type="button" onClick={runDeepAgentsHelloCheck}>
          Run DeepAgents Hello
        </button>
        {deepAgentsHello ? <p>DeepAgents hello: {deepAgentsHello.message}</p> : null}
      </section>

      <section aria-label="Workspace setup">
        <h2>Workspace</h2>
        {workspace ? (
          <p>{workspace.path}</p>
        ) : (
          <form onSubmit={chooseWorkspace}>
            <label htmlFor="workspace-folder">Workspace folder</label>
            <input
              id="workspace-folder"
              value={workspacePath}
              onChange={(event) => setWorkspacePath(event.currentTarget.value)}
              placeholder="~/Hyogen"
            />
            <button type="submit">Use Workspace</button>
          </form>
        )}
      </section>

      {workspace ? (
        <section aria-label="Studio">
          <h2>Studio</h2>
          <form onSubmit={sendStudioMessage}>
            <label htmlFor="studio-message">Message hyogen</label>
            <input
              id="studio-message"
              value={studioInput}
              onChange={(event) => setStudioInput(event.currentTarget.value)}
            />
            <button type="submit">Send Message</button>
          </form>
          <h2>Guided Workflow</h2>
          <ol>
            {guidedWorkflowTimeline.map((stage) => (
              <li key={stage.name}>
                {stage.name} — {stage.status}
              </li>
            ))}
          </ol>
          {studioMessages.length > 0 ? (
            <ul>
              {studioMessages.map((message, index) => (
                <li key={`${message.speaker}-${index}`}>
                  {message.speaker}: {message.text}
                </li>
              ))}
            </ul>
          ) : null}
          <h2>Approval Gate</h2>
          <button type="button" onClick={approveMockDecision}>
            Approve Mock Decision
          </button>
          {approvalDecisions.map((approval) => (
            <p key={approval.id}>
              {approval.target}: {approval.decision}
            </p>
          ))}
        </section>
      ) : null}

      {workspace ? (
        <section aria-label="Provider Connections">
          <h2>Provider Connections</h2>
          {providerConnections.length === 0 ? <p>No Provider Connections yet.</p> : null}
          {providerConnections.length > 0 ? (
            <ul>
              {providerConnections.map((connection) => (
                <li key={connection.id}>
                  <strong>{connection.name}</strong>
                  <p>{connection.credentialRef}</p>
                  <button type="button" onClick={() => removeProviderConnection(connection.id)}>
                    Delete {connection.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {isCreatingProviderConnection ? (
            <form onSubmit={saveProviderConnection}>
              <label htmlFor="provider-name">Provider name</label>
              <input
                id="provider-name"
                value={providerName}
                onChange={(event) => setProviderName(event.currentTarget.value)}
              />
              <label htmlFor="provider-secret">API key</label>
              <input
                id="provider-secret"
                type="password"
                value={providerSecret}
                onChange={(event) => setProviderSecret(event.currentTarget.value)}
              />
              <button type="submit">Save Provider Connection</button>
            </form>
          ) : (
            <button type="button" onClick={() => setIsCreatingProviderConnection(true)}>
              Add Provider Connection
            </button>
          )}

          <button type="button" onClick={runProviderHealthCheck}>
            Run Provider Health Check
          </button>
          {providerHealthResults.map((result) => (
            <p key={result.providerName}>
              {result.providerName} health: {result.status}
            </p>
          ))}

          <h2>Provider Capability checklist</h2>
          <ul>
            {providerCapabilities.map((capability) => (
              <li key={capability.name}>
                {capability.name}: {capability.status}
              </li>
            ))}
          </ul>
          {degradedModeWarning ? <p>{degradedModeWarning}</p> : null}
        </section>
      ) : null}

      {workspace ? (
        <section aria-label="Dashboard">
          <h2>Brand Profiles</h2>
          {activeBrandProfiles.length === 0 ? <p>No Brand Profiles yet.</p> : null}
          {activeBrandProfiles.length > 0 ? (
            <ul>
              {activeBrandProfiles.map((profile) => (
                <li key={profile.id}>
                  <strong>{profile.name}</strong>
                  {profile.audience ? <p>Audience: {profile.audience}</p> : null}
                  {profile.tone ? <p>Tone: {profile.tone}</p> : null}
                  {profile.ctaDefault ? <p>CTA default: {profile.ctaDefault}</p> : null}
                  {profile.captionDefault ? <p>Caption default: {profile.captionDefault}</p> : null}
                  {profile.sourceDefault ? <p>Source default: {profile.sourceDefault}</p> : null}
                  <button type="button" onClick={() => editBrandProfile(profile.id)}>
                    Edit {profile.name}
                  </button>
                  <button type="button" onClick={() => archiveBrandProfile(profile.id)}>
                    Archive {profile.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {editingBrandProfileId ? (
            <form onSubmit={saveBrandProfileSettings}>
              <label htmlFor="brand-profile-audience">Audience</label>
              <input
                id="brand-profile-audience"
                value={brandProfileSettings.audience}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setBrandProfileSettings((settings) => ({
                    ...settings,
                    audience: value,
                  }));
                }}
              />
              <label htmlFor="brand-profile-tone">Tone</label>
              <input
                id="brand-profile-tone"
                value={brandProfileSettings.tone}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setBrandProfileSettings((settings) => ({
                    ...settings,
                    tone: value,
                  }));
                }}
              />
              <label htmlFor="brand-profile-cta-default">CTA default</label>
              <input
                id="brand-profile-cta-default"
                value={brandProfileSettings.ctaDefault}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setBrandProfileSettings((settings) => ({
                    ...settings,
                    ctaDefault: value,
                  }));
                }}
              />
              <label htmlFor="brand-profile-caption-default">Caption default</label>
              <input
                id="brand-profile-caption-default"
                value={brandProfileSettings.captionDefault}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setBrandProfileSettings((settings) => ({
                    ...settings,
                    captionDefault: value,
                  }));
                }}
              />
              <label htmlFor="brand-profile-source-default">Source default</label>
              <input
                id="brand-profile-source-default"
                value={brandProfileSettings.sourceDefault}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setBrandProfileSettings((settings) => ({
                    ...settings,
                    sourceDefault: value,
                  }));
                }}
              />
              <button type="submit">Save Brand Profile Settings</button>
            </form>
          ) : null}
          {isCreatingBrandProfile ? (
            <form onSubmit={saveBrandProfile}>
              <label htmlFor="brand-profile-name">Brand Profile name</label>
              <input
                id="brand-profile-name"
                value={brandProfileName}
                onChange={(event) => setBrandProfileName(event.currentTarget.value)}
              />
              <button type="submit">Save Brand Profile</button>
            </form>
          ) : (
            <button type="button" onClick={() => setIsCreatingBrandProfile(true)}>
              Create Brand Profile
            </button>
          )}

          {archivedBrandProfiles.length > 0 ? (
            <>
              <h2>Archived Brand Profiles</h2>
              <ul>
                {archivedBrandProfiles.map((profile) => (
                  <li key={profile.id}>
                    {profile.name}
                    <button type="button" onClick={() => restoreBrandProfile(profile.id)}>
                      Restore {profile.name}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h2>Projects</h2>
          <p>No Projects yet.</p>
        </section>
      ) : null}

      <section aria-label="Run Trace">
        <h2>Run Trace</h2>
        <button type="button" onClick={() => setShowRunTrace((visible) => !visible)}>
          {showRunTrace ? 'Hide Run Trace' : 'Show Run Trace'}
        </button>
        {showRunTrace ? <pre>{redactedRunTraceJson()}</pre> : null}
      </section>
    </main>
  );
}
