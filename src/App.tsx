import { FormEvent, useState } from 'react';
import { createBrandProfile, listBrandProfiles } from './brandProfiles';
import { getHealthSnapshot } from './health';
import { redactedRunTraceJson } from './runTrace';
import { loadWorkspace, saveWorkspace } from './workspace';

export function App() {
  const health = getHealthSnapshot();
  const [workspace, setWorkspace] = useState(() => loadWorkspace());
  const [workspacePath, setWorkspacePath] = useState('');
  const [showRunTrace, setShowRunTrace] = useState(false);
  const [brandProfiles, setBrandProfiles] = useState(() => listBrandProfiles());
  const [isCreatingBrandProfile, setIsCreatingBrandProfile] = useState(false);
  const [brandProfileName, setBrandProfileName] = useState('');

  function chooseWorkspace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorkspace(saveWorkspace(workspacePath));
  }

  function saveBrandProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createBrandProfile({ name: brandProfileName });
    setBrandProfiles(listBrandProfiles());
    setBrandProfileName('');
    setIsCreatingBrandProfile(false);
  }

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
        <section aria-label="Dashboard">
          <h2>Brand Profiles</h2>
          {brandProfiles.length === 0 ? <p>No Brand Profiles yet.</p> : null}
          {brandProfiles.length > 0 ? (
            <ul>
              {brandProfiles.map((profile) => (
                <li key={profile.id}>{profile.name}</li>
              ))}
            </ul>
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
