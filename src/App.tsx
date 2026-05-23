import { FormEvent, useState } from 'react';
import { listApprovalDecisions, recordApprovalDecision } from './approvalGates';
import {
  ArtifactVersion,
  createMockScriptVersion,
  createScriptVersion,
  listArtifactVersions,
  markScriptVersionsStale,
} from './artifactVersions';
import { listBrandQaFindings, runBrandQa } from './brandQa';
import { createBrandProfile, listBrandProfiles, updateBrandProfile } from './brandProfiles';
import {
  alignCaptionsFromWordTimestampFixture,
  generateEstimatedCaptionSet,
  listCaptionSets,
} from './captions';
import {
  checkDeepAgentsHealth,
  DeepAgentsHealth,
  DeepAgentsHelloResult,
  runDeepAgentsHello,
} from './deepAgentsHealth';
import { exportFullDebugBundle, exportSafeDebugBundle, listDebugBundles } from './debugBundle';
import { listDiscoveryLeads, runProviderNativeSearch } from './discoveryLeads';
import { getMockGuidedWorkflowTimeline } from './guidedWorkflow';
import { executeCleanupPlan, generateCleanupPlan, listCleanupPlans } from './cleanup';
import { listFinalPackages, exportFinalPackages } from './finalPackage';
import { cancelHeavyJob, enqueueHeavyJob, listHeavyJobs } from './heavyJobQueue';
import { getHealthSnapshot } from './health';
import { listImageGenerationRequests, requestImageGenerationApproval } from './imageGeneration';
import {
  createGeneratedImageCandidate,
  createGoogleImagesFallbackCandidate,
  createPublicFreeImageSearchCandidate,
  createYouTubeSearchCandidate,
  indexDownloadedVideoCandidate,
  importLocalImageCandidate,
  importLocalVideoCandidate,
  listMediaCandidates,
  type MediaCandidate,
} from './mediaPool';
import {
  generateMetadataPackage,
  listMetadataPackages,
  reviseMetadataPackage,
} from './metadataPackage';
import { createRenderInputFromMediaCandidate, listRenderInputs } from './renderInputs';
import {
  listRenders,
  markRenderFinal,
  renderImageShots,
  renderSelectedVideoClip,
  runFfmpegSmokeRender,
} from './renders';
import { generateVideoContactSheet, listVideoContactSheets } from './videoContactSheets';
import { approveVisualPlan, generateMockVisualPlan, listVisualPlans } from './visualPlans';
import { generateVoicePerformance, listVoicePerformances } from './voicePerformance';
import { acknowledgePublicMediaWarnings, isPublicMediaAcknowledged } from './publicMediaRights';
import { fullAgenticModeWarning, resolveProviderCapabilities } from './providerCapabilities';
import { exportPlatformPreset, listPlatformPresetExports } from './platformPresets';
import {
  approvePronunciationCorrection,
  listPronunciationCorrections,
} from './pronunciationDictionary';
import {
  archiveProject,
  createSourceOnlyProject,
  deleteProject,
  duplicateProjectVariation,
  importProjectFromManifest,
  listProjects,
} from './projects';
import { evaluateScriptQuality, QualityFinding } from './qualityFindings';
import {
  createProviderConnection,
  deleteProviderConnection,
  listProviderConnections,
} from './providerConnections';
import { checkMockProviderHealth, ProviderHealthResult } from './providerHealth';
import { redactedRunTraceJson } from './runTrace';
import { listSavedContentRecipes, saveContentRecipe } from './savedContentRecipes';
import { listSemanticQaFindings, runSemanticQa } from './semanticQa';
import {
  approveSelectedMedia,
  assignMediaCandidateToShot,
  listSelectedMedia,
  type SelectedMedia,
} from './selectedMedia';
import {
  listSelectedMediaValidations,
  validateSelectedMediaWithMockVision,
} from './selectedMediaValidation';
import { generateMockCitedScriptDraft, ScriptDraft } from './scriptDrafts';
import {
  listSourceMaterial,
  materializeDiscoveryLeadUrls,
  materializeSourceUrls,
} from './sourceMaterial';
import { listFailedStages, listStageRetries, retryFailedStage } from './stageRetries';
import { respondWithMockHarness, StudioMessage } from './studioChat';
import { listTechnicalQaFindings, runTechnicalQa } from './technicalQa';
import { filterRunTraceEvents, type TraceFilters } from './traceFilters';
import { generateMockTtsAudio, listAudioArtifacts } from './ttsAudio';
import { scanWatchFolder } from './watchFolders';
import { loadWorkspace, saveWorkspace } from './workspace';
import { listYtdlpDownloads, runYtdlpDownloadStub } from './ytdlpDownloads';

export function App() {
  const health = getHealthSnapshot();
  const [workspace, setWorkspace] = useState(() => loadWorkspace());
  const [workspacePath, setWorkspacePath] = useState('');
  const [showRunTrace, setShowRunTrace] = useState(false);
  const [traceFilters, setTraceFilters] = useState<TraceFilters>({});
  const [filteredTraceEvents, setFilteredTraceEvents] = useState(() => filterRunTraceEvents({}));
  const [deepAgentsHealth, setDeepAgentsHealth] = useState<DeepAgentsHealth | null>(null);
  const [deepAgentsHello, setDeepAgentsHello] = useState<DeepAgentsHelloResult | null>(null);
  const [debugBundles, setDebugBundles] = useState(() => listDebugBundles());
  const [fullDebugWarningAcknowledged, setFullDebugWarningAcknowledged] = useState(false);
  const [brandProfiles, setBrandProfiles] = useState(() => listBrandProfiles());
  const [isCreatingBrandProfile, setIsCreatingBrandProfile] = useState(false);
  const [brandProfileName, setBrandProfileName] = useState('');
  const [editingBrandProfileId, setEditingBrandProfileId] = useState<string | null>(null);
  const [providerConnections, setProviderConnections] = useState(() => listProviderConnections());
  const [isCreatingProviderConnection, setIsCreatingProviderConnection] = useState(false);
  const [providerName, setProviderName] = useState('');
  const [providerSecret, setProviderSecret] = useState('');
  const [providerHealthResults, setProviderHealthResults] = useState<ProviderHealthResult[]>([]);
  const [publicMediaAcknowledged, setPublicMediaAcknowledged] = useState(() =>
    isPublicMediaAcknowledged(),
  );
  const [researchQuery, setResearchQuery] = useState('');
  const [discoveryLeads, setDiscoveryLeads] = useState(() => listDiscoveryLeads());
  const [approvalDecisions, setApprovalDecisions] = useState(() => listApprovalDecisions());
  const [artifactVersions, setArtifactVersions] = useState(() => listArtifactVersions());
  const [selectedArtifactVersion, setSelectedArtifactVersion] = useState<ArtifactVersion | null>(null);
  const [visualPlans, setVisualPlans] = useState(() => listVisualPlans());
  const [voicePerformances, setVoicePerformances] = useState(() => listVoicePerformances());
  const [audioArtifacts, setAudioArtifacts] = useState(() => listAudioArtifacts());
  const [captionSets, setCaptionSets] = useState(() => listCaptionSets());
  const [renders, setRenders] = useState(() => listRenders());
  const [metadataPackages, setMetadataPackages] = useState(() => listMetadataPackages());
  const [finalPackages, setFinalPackages] = useState(() => listFinalPackages());
  const [cleanupPlans, setCleanupPlans] = useState(() => listCleanupPlans());
  const [heavyJobs, setHeavyJobs] = useState(() => listHeavyJobs());
  const [failedStages, setFailedStages] = useState(() => listFailedStages());
  const [stageRetries, setStageRetries] = useState(() => listStageRetries());
  const [metadataRevision, setMetadataRevision] = useState('');
  const [technicalQaFindings, setTechnicalQaFindings] = useState(() => listTechnicalQaFindings());
  const [semanticQaFindings, setSemanticQaFindings] = useState(() => listSemanticQaFindings());
  const [brandQaFindings, setBrandQaFindings] = useState(() => listBrandQaFindings());
  const [selectedMedia, setSelectedMedia] = useState(() => listSelectedMedia());
  const [selectedMediaValidations, setSelectedMediaValidations] = useState(() =>
    listSelectedMediaValidations(),
  );
  const [projects, setProjects] = useState(() => listProjects());
  const [platformPresetExports, setPlatformPresetExports] = useState(() => listPlatformPresetExports());
  const [mediaCandidates, setMediaCandidates] = useState(() => listMediaCandidates());
  const [renderInputs, setRenderInputs] = useState(() => listRenderInputs());
  const [videoContactSheets, setVideoContactSheets] = useState(() => listVideoContactSheets());
  const [ytdlpDownloads, setYtdlpDownloads] = useState(() => listYtdlpDownloads());
  const [localImagePath, setLocalImagePath] = useState('');
  const [localVideoPath, setLocalVideoPath] = useState('');
  const [watchFolderPath, setWatchFolderPath] = useState('');
  const [watchFolderImports, setWatchFolderImports] = useState<string[]>([]);
  const [publicMediaQuery, setPublicMediaQuery] = useState('');
  const [imageGenerationRequests, setImageGenerationRequests] = useState(() =>
    listImageGenerationRequests(),
  );
  const [sourceMaterial, setSourceMaterial] = useState(() => listSourceMaterial());
  const [scriptDraft, setScriptDraft] = useState<ScriptDraft | null>(null);
  const [savedContentRecipes, setSavedContentRecipes] = useState(() => listSavedContentRecipes());
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipePrompt, setRecipePrompt] = useState('');
  const [qualityFindings, setQualityFindings] = useState<QualityFinding[]>([]);
  const [pronunciationCorrection, setPronunciationCorrection] = useState('');
  const [pronunciationCorrections, setPronunciationCorrections] = useState(() =>
    listPronunciationCorrections(),
  );
  const [isRequestingScriptChange, setIsRequestingScriptChange] = useState(false);
  const [scriptChangeInstruction, setScriptChangeInstruction] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [deletedProjectPrompt, setDeletedProjectPrompt] = useState<string | null>(null);
  const [projectManifestPath, setProjectManifestPath] = useState('');
  const [projectPrompt, setProjectPrompt] = useState('');
  const [projectSourceUrl, setProjectSourceUrl] = useState('');
  const [selectedProjectBrandProfile, setSelectedProjectBrandProfile] = useState('');
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

  function applyTraceFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFilteredTraceEvents(filterRunTraceEvents(traceFilters));
  }

  function exportSafeDebug() {
    exportSafeDebugBundle();
    setDebugBundles(listDebugBundles());
  }

  function exportFullDebug() {
    exportFullDebugBundle();
    setDebugBundles(listDebugBundles());
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

  function addMockScriptVersion() {
    createMockScriptVersion();
    setArtifactVersions(listArtifactVersions());
  }

  function requestGeneratedImageApproval() {
    requestImageGenerationApproval();
    setImageGenerationRequests(listImageGenerationRequests());
  }

  function approveAndGenerateImage() {
    const candidate = createGeneratedImageCandidate();
    createRenderInputFromMediaCandidate(candidate);
    setMediaCandidates(listMediaCandidates());
    setRenderInputs(listRenderInputs());
  }

  function scanMediaWatchFolder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const imported = scanWatchFolder(watchFolderPath);
    setWatchFolderImports(imported.map((candidate) => candidate.title ?? candidate.sourcePath));
    setMediaCandidates(listMediaCandidates());
  }

  function importLocalImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    importLocalImageCandidate(localImagePath);
    setMediaCandidates(listMediaCandidates());
    setLocalImagePath('');
  }

  function importLocalVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    importLocalVideoCandidate(localVideoPath);
    setMediaCandidates(listMediaCandidates());
    setLocalVideoPath('');
  }

  function runMockYouTubeSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createYouTubeSearchCandidate(publicMediaQuery);
    setMediaCandidates(listMediaCandidates());
    setPublicMediaQuery('');
  }

  function runMockPublicFreeImageSearch() {
    createPublicFreeImageSearchCandidate(publicMediaQuery);
    setMediaCandidates(listMediaCandidates());
    setPublicMediaQuery('');
  }

  function runMockGoogleImagesFallback() {
    createGoogleImagesFallbackCandidate(publicMediaQuery);
    setMediaCandidates(listMediaCandidates());
    setPublicMediaQuery('');
  }

  function selectRenderInput(candidate: MediaCandidate) {
    createRenderInputFromMediaCandidate(candidate);
    setRenderInputs(listRenderInputs());
  }

  function assignCandidateToShot(candidate: MediaCandidate) {
    assignMediaCandidateToShot(candidate);
    setSelectedMedia(listSelectedMedia());
  }

  function generateContactSheet(candidate: MediaCandidate) {
    generateVideoContactSheet(candidate);
    setVideoContactSheets(listVideoContactSheets());
  }

  function runYtdlpDownload(candidate: MediaCandidate) {
    const job = enqueueHeavyJob({ kind: 'download', label: `yt-dlp ${candidate.sourcePath}` });
    setHeavyJobs(listHeavyJobs());
    if (job.status === 'queued') return;
    const download = runYtdlpDownloadStub(candidate);
    if (download.status === 'completed') {
      indexDownloadedVideoCandidate(download.sourceUrl);
      setMediaCandidates(listMediaCandidates());
    }
    setYtdlpDownloads(listYtdlpDownloads());
  }

  function validateSelection(selection: SelectedMedia) {
    validateSelectedMediaWithMockVision(selection);
    setSelectedMediaValidations(listSelectedMediaValidations());
  }

  function approveSelection(selection: SelectedMedia) {
    const candidate = mediaCandidates.find((media) => media.id === selection.mediaCandidateId);
    approveSelectedMedia(selection.id, candidate?.rightsLabel);
    setSelectedMedia(listSelectedMedia());
    setApprovalDecisions(listApprovalDecisions());
  }

  function previewForSelectedMedia(selection: SelectedMedia): string {
    const candidate = mediaCandidates.find((media) => media.id === selection.mediaCandidateId);
    if (!candidate) return selection.label;
    if (candidate.kind === 'video') {
      return (
        videoContactSheets.find((sheet) => sheet.mediaCandidateId === candidate.id)?.contactSheetPath ??
        candidate.thumbnailPath ??
        selection.label
      );
    }
    return candidate.sourcePath.split('/').at(-1) ?? selection.label;
  }

  function duplicateVariation(projectId: string) {
    duplicateProjectVariation(projectId);
    setProjects(listProjects());
  }

  function exportTikTokPreset(projectId: string) {
    exportPlatformPreset(projectId, 'TikTok');
    setPlatformPresetExports(listPlatformPresetExports());
  }

  function importProjectManifest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    importProjectFromManifest(projectManifestPath);
    setProjects(listProjects());
    setProjectManifestPath('');
  }

  function archiveExistingProject(projectId: string) {
    archiveProject(projectId);
    setProjects(listProjects());
  }

  function deleteExistingProject(projectId: string, prompt: string) {
    deleteProject(projectId);
    setProjects(listProjects());
    setDeletedProjectPrompt(prompt);
  }

  function startSourceOnlyProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createSourceOnlyProject({
      prompt: projectPrompt,
      sourceUrl: projectSourceUrl,
      brandProfileName: selectedProjectBrandProfile || activeBrandProfiles[0]?.name || '',
    });
    setProjects(listProjects());
    setProjectPrompt('');
    setProjectSourceUrl('');
    setSelectedProjectBrandProfile('');
    setIsCreatingProject(false);
  }

  function materializeProjectSources() {
    projects.forEach((project) => materializeSourceUrls(project.id, project.sourceUrls));
    setSourceMaterial(listSourceMaterial());
  }

  function generateScriptDraft() {
    setScriptDraft(generateMockCitedScriptDraft(sourceMaterial));
    setArtifactVersions(listArtifactVersions());
  }

  function approveLatestScript() {
    const latestScript = listArtifactVersions()
      .filter((version) => version.kind === 'script')
      .at(-1);
    if (!latestScript) return;
    recordApprovalDecision({ target: latestScript.label, decision: 'approved' });
    setApprovalDecisions(listApprovalDecisions());
  }

  function submitSavedContentRecipe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveContentRecipe({ id: editingRecipeId, name: recipeName, prompt: recipePrompt });
    setSavedContentRecipes(listSavedContentRecipes());
    setEditingRecipeId(null);
    setRecipeName('');
    setRecipePrompt('');
  }

  function editSavedContentRecipe(recipeId: string) {
    const recipe = savedContentRecipes.find((candidate) => candidate.id === recipeId);
    if (!recipe) return;
    setEditingRecipeId(recipe.id);
    setRecipeName(recipe.name);
    setRecipePrompt(recipe.prompt);
  }

  function submitScriptChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markScriptVersionsStale();
    createScriptVersion(`Revision instruction: ${scriptChangeInstruction}`);
    setArtifactVersions(listArtifactVersions());
    setScriptChangeInstruction('');
    setIsRequestingScriptChange(false);
  }

  function evaluateCurrentScriptQuality() {
    if (!scriptDraft) return;
    setQualityFindings(evaluateScriptQuality(scriptDraft));
  }

  function generateVisualPlan() {
    const content = selectedArtifactVersion?.content ?? artifactVersions.at(-1)?.content ?? '';
    generateMockVisualPlan(content);
    setVisualPlans(listVisualPlans());
  }

  function generateApprovedVoicePerformance() {
    generateVoicePerformance(latestApprovedScript?.target ?? 'Script Version 1');
    setVoicePerformances(listVoicePerformances());
  }

  function generateTtsAudio() {
    const performance = voicePerformances.at(-1);
    if (!performance) return;
    const job = enqueueHeavyJob({ kind: 'tts', label: 'Generate Mock TTS Audio' });
    setHeavyJobs(listHeavyJobs());
    if (job.status === 'queued') return;
    generateMockTtsAudio(performance);
    setAudioArtifacts(listAudioArtifacts());
  }

  function approveAudioPreview() {
    recordApprovalDecision({ target: 'Audio Preview', decision: 'approved' });
    setApprovalDecisions(listApprovalDecisions());
  }

  function generateCaptions() {
    generateEstimatedCaptionSet(audioArtifacts);
    setCaptionSets(listCaptionSets());
  }

  function alignCaptionsFromFixture(captionSetId: string) {
    alignCaptionsFromWordTimestampFixture(captionSetId);
    setCaptionSets(listCaptionSets());
  }

  function runSmokeRender() {
    const job = enqueueHeavyJob({ kind: 'render', label: 'FFmpeg smoke render' });
    setHeavyJobs(listHeavyJobs());
    if (job.status === 'queued') return;
    runFfmpegSmokeRender();
    setRenders(listRenders());
  }

  function renderSelectedImageShots() {
    const job = enqueueHeavyJob({ kind: 'render', label: 'Render image shots' });
    setHeavyJobs(listHeavyJobs());
    if (job.status === 'queued') return;
    renderImageShots(selectedMedia.length);
    setRenders(listRenders());
  }

  function renderVideoClip() {
    const job = enqueueHeavyJob({ kind: 'render', label: 'Render selected video clip' });
    setHeavyJobs(listHeavyJobs());
    if (job.status === 'queued') return;
    renderSelectedVideoClip();
    setRenders(listRenders());
  }

  function markFinal(renderId: string) {
    markRenderFinal(renderId);
    setRenders(listRenders());
  }

  function cancelQueuedHeavyJob(heavyJobId: string) {
    cancelHeavyJob(heavyJobId);
    setHeavyJobs(listHeavyJobs());
  }

  function retryStageFromArtifactState(failedStageId: string) {
    retryFailedStage(failedStageId);
    setFailedStages(listFailedStages());
    setStageRetries(listStageRetries());
  }

  function createMetadataPackage() {
    generateMetadataPackage();
    setMetadataPackages(listMetadataPackages());
  }

  function exportFinalPackage() {
    exportFinalPackages();
    setFinalPackages(listFinalPackages());
  }

  function createCleanupPlan() {
    generateCleanupPlan();
    setCleanupPlans(listCleanupPlans());
  }

  function approveAndExecuteCleanup(cleanupPlanId: string) {
    executeCleanupPlan(cleanupPlanId);
    setCleanupPlans(listCleanupPlans());
  }

  function submitMetadataRevision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const latest = metadataPackages.at(-1);
    if (!latest) return;
    reviseMetadataPackage(latest.id, metadataRevision);
    setMetadataPackages(listMetadataPackages());
    setMetadataRevision('');
  }

  function runRenderTechnicalQa(renderId: string) {
    const render = renders.find((candidate) => candidate.id === renderId);
    if (!render) return;
    runTechnicalQa(render);
    setTechnicalQaFindings(listTechnicalQaFindings());
  }

  function runSemanticQualityCheck() {
    runSemanticQa();
    setSemanticQaFindings(listSemanticQaFindings());
  }

  function runBrandQualityCheck() {
    runBrandQa();
    setBrandQaFindings(listBrandQaFindings());
  }

  function approveDictionaryCorrection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    approvePronunciationCorrection(pronunciationCorrection);
    setPronunciationCorrections(listPronunciationCorrections());
    setPronunciationCorrection('');
    setApprovalDecisions(listApprovalDecisions());
  }

  function approveCurrentVisualPlan(visualPlanId: string) {
    approveVisualPlan(visualPlanId);
    setVisualPlans(listVisualPlans());
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

  function acknowledgeRightsWarnings() {
    acknowledgePublicMediaWarnings();
    setPublicMediaAcknowledged(isPublicMediaAcknowledged());
  }

  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runProviderNativeSearch(researchQuery);
    setDiscoveryLeads(listDiscoveryLeads());
    setResearchQuery('');
  }

  function materializeDiscoveryLeads() {
    materializeDiscoveryLeadUrls(discoveryLeads.map((lead) => lead.url));
    setSourceMaterial(listSourceMaterial());
  }

  const activeBrandProfiles = brandProfiles.filter((profile) => !profile.archived);
  const archivedBrandProfiles = brandProfiles.filter((profile) => profile.archived);
  const providerCapabilities = resolveProviderCapabilities(providerConnections);
  const degradedModeWarning = fullAgenticModeWarning(providerCapabilities);
  const searchDiscoveryReady = providerCapabilities.some(
    (capability) => capability.name === 'Search/discovery' && capability.status === 'ready',
  );
  const guidedWorkflowTimeline = getMockGuidedWorkflowTimeline();
  const latestApprovedScript = approvalDecisions
    .filter((approval) => approval.target.startsWith('Script Version') && approval.decision === 'approved')
    .at(-1);
  const audioPreviewApproved = approvalDecisions.some(
    (approval) => approval.target === 'Audio Preview' && approval.decision === 'approved',
  );
  const selectedMediaHasVideo = selectedMedia.some((selection) =>
    mediaCandidates.some(
      (candidate) => candidate.id === selection.mediaCandidateId && candidate.kind === 'video',
    ),
  );
  const providerSearchSourceMaterial = sourceMaterial.filter(
    (source) => source.projectId === 'provider-native-search',
  );
  const projectSourceMaterial = sourceMaterial.filter(
    (source) => source.projectId !== 'provider-native-search',
  );

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
          {approvalDecisions
            .filter((approval) => approval.target === 'Mock Decision')
            .map((approval) => (
              <p key={approval.id}>
                {approval.target}: {approval.decision}
              </p>
            ))}
          <h2>Artifact Versions</h2>
          <button type="button" onClick={addMockScriptVersion}>
            Create Mock Script Version
          </button>
          {artifactVersions.length > 0 ? (
            <ul>
              {artifactVersions.map((version) => (
                <li key={version.id}>
                  {version.label}{version.stale ? ' — stale' : ''}
                  {version.content.startsWith('Revision instruction:') ? <p>{version.content}</p> : null}
                  <button type="button" onClick={() => setSelectedArtifactVersion(version)}>
                    View {version.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {selectedArtifactVersion ? <p>{selectedArtifactVersion.content}</p> : null}
        </section>
      ) : null}

      {workspace ? (
        <section aria-label="Pronunciation Dictionary">
          <h2>Pronunciation Dictionary</h2>
          <form onSubmit={approveDictionaryCorrection}>
            <label htmlFor="pronunciation-correction">Pronunciation correction</label>
            <input
              id="pronunciation-correction"
              value={pronunciationCorrection}
              onChange={(event) => setPronunciationCorrection(event.currentTarget.value)}
            />
            <button type="submit">Approve Pronunciation Correction</button>
          </form>
          {pronunciationCorrections.map((correction) => (
            <p key={correction.id}>Pronunciation Dictionary: {correction.entry}</p>
          ))}
        </section>
      ) : null}

      {workspace ? (
        <section aria-label="Public Media Rights">
          <h2>Public Media Rights</h2>
          {publicMediaAcknowledged ? (
            <p>Public media warnings acknowledged</p>
          ) : (
            <>
              <p>Public media rights acknowledgement required</p>
              <button type="button" onClick={acknowledgeRightsWarnings}>
                Acknowledge Public Media Warnings
              </button>
            </>
          )}
        </section>
      ) : null}

      {workspace ? (
        <section aria-label="Media Pool">
          <h2>Media Pool</h2>
          <form onSubmit={importLocalImage}>
            <label htmlFor="local-image-path">Local image path</label>
            <input
              id="local-image-path"
              value={localImagePath}
              onChange={(event) => setLocalImagePath(event.currentTarget.value)}
            />
            <button type="submit">Import Local Image</button>
          </form>
          <form onSubmit={importLocalVideo}>
            <label htmlFor="local-video-path">Local video path</label>
            <input
              id="local-video-path"
              value={localVideoPath}
              onChange={(event) => setLocalVideoPath(event.currentTarget.value)}
            />
            <button type="submit">Import Local Video</button>
          </form>
          <button type="button" onClick={requestGeneratedImageApproval}>
            Request Image Generation Approval
          </button>
          <form onSubmit={scanMediaWatchFolder}>
            <label htmlFor="watch-folder-path">Watch folder path</label>
            <input
              id="watch-folder-path"
              value={watchFolderPath}
              onChange={(event) => setWatchFolderPath(event.currentTarget.value)}
            />
            <button type="submit">Scan Watch Folder</button>
          </form>
          {watchFolderImports.map((title) => (
            <p key={title}>Watch Folder imported: {title}</p>
          ))}
          {imageGenerationRequests.length > 0 ? (
            <ul>
              {imageGenerationRequests.map((request) => (
                <li key={request.id}>
                  Image generation spend approval required
                  <button type="button" onClick={approveAndGenerateImage}>
                    Approve and Generate Image
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {publicMediaAcknowledged ? (
            <form onSubmit={runMockYouTubeSearch}>
              <label htmlFor="public-media-query">Public media query</label>
              <input
                id="public-media-query"
                value={publicMediaQuery}
                onChange={(event) => setPublicMediaQuery(event.currentTarget.value)}
              />
              <button type="submit">Run Mock YouTube Search</button>
              <button type="button" onClick={runMockPublicFreeImageSearch}>
                Run Mock Public-Free Image Search
              </button>
              <button type="button" onClick={runMockGoogleImagesFallback}>
                Run Mock Google Images Fallback
              </button>
            </form>
          ) : null}
          {mediaCandidates.length > 0 ? (
            <>
              <h2>Media Candidates</h2>
              <ul>
                {mediaCandidates.map((candidate) => (
                  <li key={candidate.id}>
                    {candidate.rightsLabel ? candidate.sourceUrl : candidate.sourcePath} —{' '}
                    {candidate.rightsLabel ?? candidate.status}
                    {candidate.kind === 'video' ? (
                      <>
                        <p>
                          FFprobe: {candidate.durationSeconds}s, thumbnail: {candidate.thumbnailPath}
                        </p>
                        <button type="button" onClick={() => generateContactSheet(candidate)}>
                          Generate Contact Sheet for {candidate.sourcePath.split('/').at(-1)}
                        </button>
                        {candidate.origin === 'youtube-search' ? (
                          <button type="button" onClick={() => runYtdlpDownload(candidate)}>
                            Download via yt-dlp for {candidate.sourcePath.split('/').at(-1)}
                          </button>
                        ) : null}
                      </>
                    ) : null}
                    {visualPlans.some((plan) => plan.approved) ? (
                      <button type="button" onClick={() => assignCandidateToShot(candidate)}>
                        Assign {candidate.sourcePath.split('/').at(-1)} to Shot 1
                      </button>
                    ) : null}
                    <button type="button" onClick={() => selectRenderInput(candidate)}>
                      Select {candidate.sourcePath.split('/').at(-1)} as Render Input
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {ytdlpDownloads.length > 0 ? (
            <>
              <h2>yt-dlp Downloads</h2>
              <ul>
                {ytdlpDownloads.map((download) => (
                  <li key={download.id}>
                    yt-dlp: {download.status} for {download.sourceUrl}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {videoContactSheets.length > 0 ? (
            <>
              <h2>Video Contact Sheets</h2>
              <ul>
                {videoContactSheets.map((sheet) => (
                  <li key={sheet.id}>
                    {sheet.contactSheetPath} — keyframes: {sheet.keyframes.join(', ')}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {selectedMedia.length > 0 ? (
            <>
              <h2>Selected Media</h2>
              <ul>
                {selectedMedia.map((selection) => (
                  <li key={selection.id}>
                    Selected Media: Shot 1 -&gt; {selection.label}
                    <p>Preview: {previewForSelectedMedia(selection)}</p>
                    <p>Selected Media approval: {selection.approved ? 'approved' : 'pending'}</p>
                    {selection.rightsWarning ? (
                      <p>Rights warning persisted: {selection.rightsWarning}</p>
                    ) : null}
                    <button type="button" onClick={() => validateSelection(selection)}>
                      Validate Selected Media
                    </button>
                    {selectedMediaValidations
                      .filter((validation) => validation.selectedMediaId === selection.id)
                      .map((validation) => (
                        <p key={validation.id}>
                          Vision validation: {validation.status} with {validation.shotIntent}
                        </p>
                      ))}
                    {!selection.approved ? (
                      <button type="button" onClick={() => approveSelection(selection)}>
                        Approve Selected Media
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {selectedMedia.length > 0 && renderInputs.length > 0 ? (
            <button type="button" onClick={renderSelectedImageShots}>
              Render Image Shots
            </button>
          ) : null}
          {selectedMediaHasVideo ? (
            <button type="button" onClick={renderVideoClip}>
              Render Selected Video Clip
            </button>
          ) : null}
          {renderInputs.length > 0 ? (
            <>
              <h2>Render Inputs</h2>
              <ul>
                {renderInputs.map((input) => (
                  <li key={input.id}>
                    {input.normalizedPath} — hash: {input.hash}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
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

          <h2>Research</h2>
          <form onSubmit={runSearch}>
            <label htmlFor="research-query">Research query</label>
            <input
              id="research-query"
              value={researchQuery}
              onChange={(event) => setResearchQuery(event.currentTarget.value)}
            />
            <button type="submit">Run Provider-Native Search</button>
          </form>
          <p>
            Research progress: {discoveryLeads.length} Discovery Lead{discoveryLeads.length === 1 ? '' : 's'},{' '}
            {providerSearchSourceMaterial.length} Source Material
          </p>
          {discoveryLeads.length > 0 ? (
            <>
              <h2>Discovery Leads</h2>
              <ul>
                {discoveryLeads.map((lead) => (
                  <li key={lead.id}>{lead.url}</li>
                ))}
              </ul>
              <button type="button" onClick={materializeDiscoveryLeads}>
                Materialize Discovery Leads
              </button>
            </>
          ) : null}
          {providerSearchSourceMaterial.length > 0 ? (
            <>
              <h2>Source Material</h2>
              <ul>
                {providerSearchSourceMaterial.map((source) => (
                  <li key={source.id}>
                    {source.url} — {source.status}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

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

          <h2>Saved Content Recipes</h2>
          <form onSubmit={submitSavedContentRecipe}>
            <label htmlFor="recipe-name">Recipe name</label>
            <input
              id="recipe-name"
              value={recipeName}
              onChange={(event) => setRecipeName(event.currentTarget.value)}
            />
            <label htmlFor="recipe-prompt">Recipe prompt</label>
            <input
              id="recipe-prompt"
              value={recipePrompt}
              onChange={(event) => setRecipePrompt(event.currentTarget.value)}
            />
            <button type="submit">Save Content Recipe</button>
          </form>
          {savedContentRecipes.map((recipe) => (
            <article key={recipe.id}>
              <p>Saved Content Recipe: {recipe.name}</p>
              <p>{recipe.prompt}</p>
              <button type="button" onClick={() => editSavedContentRecipe(recipe.id)}>
                Edit {recipe.name}
              </button>
            </article>
          ))}

          <h2>Projects</h2>
          {projects.length === 0 ? <p>No Projects yet.</p> : null}
          <form onSubmit={importProjectManifest}>
            <label htmlFor="project-manifest-path">Project manifest path</label>
            <input
              id="project-manifest-path"
              value={projectManifestPath}
              onChange={(event) => setProjectManifestPath(event.currentTarget.value)}
            />
            <button type="submit">Import Project Manifest</button>
          </form>
          {deletedProjectPrompt ? <p>Deleted Project: {deletedProjectPrompt}</p> : null}
          {platformPresetExports.map((presetExport) => (
            <p key={presetExport.id}>
              Platform preset exported: {presetExport.platform} / {presetExport.aspectRatio} /{' '}
              {presetExport.projectPrompt}
            </p>
          ))}
          {projects.length > 0 ? (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <strong>{project.prompt}</strong>
                  <p>Mode: {project.mode}</p>
                  <p>Brand Profile: {project.brandProfileName}</p>
                  {project.relinkedFromManifest ? (
                    <p>Imported Project from {project.manifestPath}</p>
                  ) : null}
                  {project.variationOfProjectId ? <p>Variation: {project.prompt}</p> : null}
                  {project.archived ? <p>Archived Project: {project.prompt}</p> : null}
                  {project.variationOfProjectId ? (
                    <button type="button" onClick={() => exportTikTokPreset(project.id)}>
                      Export TikTok preset for {project.prompt}
                    </button>
                  ) : null}
                  {!project.archived ? (
                    <button type="button" onClick={() => duplicateVariation(project.id)}>
                      Duplicate Variation for {project.prompt}
                    </button>
                  ) : null}
                  {!project.archived ? (
                    <button type="button" onClick={() => archiveExistingProject(project.id)}>
                      Archive {project.prompt}
                    </button>
                  ) : null}
                  {project.archived ? (
                    <button type="button" onClick={() => deleteExistingProject(project.id, project.prompt)}>
                      Delete {project.prompt}
                    </button>
                  ) : null}
                  {project.sourceUrls.length > 0 ? (
                    <>
                      <h3>Source URLs</h3>
                      <ul>
                        {project.sourceUrls.map((sourceUrl) => (
                          <li key={sourceUrl}>{sourceUrl}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          {projectSourceMaterial.length > 0 ? (
            <>
              <h3>Source Material</h3>
              <ul>
                {projectSourceMaterial.map((source) => (
                  <li key={source.id}>
                    {source.url} — {source.status}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {projects.some((project) => project.sourceUrls.length > 0) ? (
            <button type="button" onClick={materializeProjectSources}>
              Materialize Source URLs
            </button>
          ) : null}
          {sourceMaterial.some((source) => source.status === 'materialized') ? (
            <button type="button" onClick={generateScriptDraft}>
              Generate Script Draft
            </button>
          ) : null}
          {scriptDraft ? (
            <>
              <h3>Script Draft</h3>
              <p>{scriptDraft.content}</p>
              <p>Citation: {scriptDraft.citationUrl}</p>
              <button type="button" onClick={approveLatestScript}>
                Approve Script
              </button>
              <button type="button" onClick={() => setIsRequestingScriptChange(true)}>
                Request Script Changes
              </button>
              <button type="button" onClick={evaluateCurrentScriptQuality}>
                Evaluate Script Quality
              </button>
              {isRequestingScriptChange ? (
                <form onSubmit={submitScriptChange}>
                  <label htmlFor="script-change-instruction">Script change instruction</label>
                  <input
                    id="script-change-instruction"
                    value={scriptChangeInstruction}
                    onChange={(event) => setScriptChangeInstruction(event.currentTarget.value)}
                  />
                  <button type="submit">Submit Script Changes</button>
                </form>
              ) : null}
            </>
          ) : null}
          {qualityFindings.length > 0 ? (
            <>
              <h3>Quality Findings</h3>
              <ul>
                {qualityFindings.map((finding) => (
                  <li key={finding.check}>
                    {finding.check}: {finding.status}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {latestApprovedScript ? (
            <>
              <p>Latest approved Script: {latestApprovedScript.target}</p>
              <p>
                {latestApprovedScript.target}: {latestApprovedScript.decision}
              </p>
              <button type="button" onClick={generateVisualPlan}>
                Generate Visual Plan
              </button>
              <button type="button" onClick={generateApprovedVoicePerformance}>
                Generate Voice Performance
              </button>
            </>
          ) : null}
          {voicePerformances.length > 0 ? (
            <>
              <h3>Voice Performances</h3>
              {voicePerformances.map((performance) => (
                <p key={performance.id}>
                  Voice Performance: {performance.tone}, pace {performance.pace}, emphasis{' '}
                  {performance.emphasis}
                </p>
              ))}
              <button type="button" onClick={generateTtsAudio}>
                Generate Mock TTS Audio
              </button>
            </>
          ) : null}
          {audioArtifacts.length > 0 ? (
            <>
              <h3>Audio Artifacts</h3>
              {audioArtifacts.map((artifact) => (
                <p key={artifact.id}>
                  Audio Artifact: {artifact.path} — segment {artifact.segmentIndex}
                </p>
              ))}
              <p>Audio Preview: {audioPreviewApproved ? 'approved' : 'pending'}</p>
              {!audioPreviewApproved ? (
                <button type="button" onClick={approveAudioPreview}>
                  Approve Audio Preview
                </button>
              ) : null}
              <button type="button" onClick={generateCaptions}>
                Generate Estimated Captions
              </button>
            </>
          ) : null}
          {captionSets.length > 0 ? (
            <>
              <h3>Caption Sets</h3>
              {captionSets.map((captionSet) => (
                <article key={captionSet.id}>
                  <p>Caption Set: {captionSet.path}</p>
                  {captionSet.alignmentSource ? (
                    <>
                      <p>Caption alignment: {captionSet.alignmentSource}</p>
                      <p>Safe-zone issue: {captionSet.safeZoneIssue}</p>
                    </>
                  ) : null}
                  <pre>{captionSet.srt}</pre>
                  <button type="button" onClick={() => alignCaptionsFromFixture(captionSet.id)}>
                    Align Captions from Fixture
                  </button>
                </article>
              ))}
            </>
          ) : null}
          {failedStages.length > 0 || stageRetries.length > 0 ? (
            <>
              <h3>Stage Retries</h3>
              {failedStages.map((stage) => (
                <article key={stage.id}>
                  <p>Failed stage: {stage.stage}</p>
                  <button type="button" onClick={() => retryStageFromArtifactState(stage.id)}>
                    Retry {stage.stage} from persisted artifact state
                  </button>
                </article>
              ))}
              {stageRetries.map((retry) => (
                <p key={retry.id}>Stage retry: {retry.stage} using persisted artifact state</p>
              ))}
            </>
          ) : null}
          {heavyJobs.length > 0 ? (
            <>
              <h3>Heavy Job Queue</h3>
              {heavyJobs.map((job) => (
                <article key={job.id}>
                  <p>Heavy Job: {job.kind} {job.status}</p>
                  {job.partialTraceRetained ? <p>Partial trace retained for {job.label}</p> : null}
                  {job.status === 'running' || job.status === 'queued' ? (
                    <button type="button" onClick={() => cancelQueuedHeavyJob(job.id)}>
                      Cancel {job.label}
                    </button>
                  ) : null}
                </article>
              ))}
            </>
          ) : null}
          {captionSets.length > 0 && audioArtifacts.length > 0 ? (
            <button type="button" onClick={runSmokeRender}>
              Run FFmpeg Smoke Render
            </button>
          ) : null}
          {renders.length > 0 ? (
            <button type="button" onClick={createMetadataPackage}>
              Generate Metadata Package
            </button>
          ) : null}
          {renders.some((render) => render.status === 'final') && metadataPackages.length > 0 ? (
            <button type="button" onClick={exportFinalPackage}>
              Export Final Package
            </button>
          ) : null}
          {finalPackages.length > 0 ? (
            <button type="button" onClick={createCleanupPlan}>
              Generate Cleanup Plan
            </button>
          ) : null}
          {cleanupPlans.length > 0 ? (
            <>
              <h3>Cleanup Plans</h3>
              {cleanupPlans.map((plan) => (
                <article key={plan.id}>
                  <p>Cleanup Plan: retain Render Inputs</p>
                  <p>Proposed deletions: {plan.proposedDeletions.join(', ')}</p>
                  {plan.executed ? (
                    <p>Cleanup executed: {plan.proposedDeletions.join(', ')}</p>
                  ) : (
                    <button type="button" onClick={() => approveAndExecuteCleanup(plan.id)}>
                      Approve and Execute Cleanup
                    </button>
                  )}
                </article>
              ))}
            </>
          ) : null}
          {finalPackages.length > 0 ? (
            <>
              <h3>Final Packages</h3>
              {finalPackages.map((finalPackage) => (
                <article key={finalPackage.id}>
                  <p>Final Package: {finalPackage.manifestPath}</p>
                  <p>Includes: {finalPackage.includes.join(', ')}</p>
                </article>
              ))}
            </>
          ) : null}
          {metadataPackages.length > 0 ? (
            <>
              <h3>Metadata Packages</h3>
              {metadataPackages.map((metadata) => (
                <article key={metadata.id}>
                  <p>Metadata Title: {metadata.title}</p>
                  <p>Metadata Description: {metadata.description}</p>
                  <p>Metadata Tags: {metadata.tags.join(', ')}</p>
                </article>
              ))}
              <form onSubmit={submitMetadataRevision}>
                <label htmlFor="metadata-revision">Metadata revision</label>
                <input
                  id="metadata-revision"
                  value={metadataRevision}
                  onChange={(event) => setMetadataRevision(event.currentTarget.value)}
                />
                <button type="submit">Submit Metadata Revision</button>
              </form>
            </>
          ) : null}
          {renders.length > 0 ? (
            <>
              <h3>Renders</h3>
              {renders.map((render) => (
                <article key={render.id}>
                  <p>
                    Render: {render.path} — {render.summary}
                  </p>
                  <p>Render review: {render.status === 'final' ? 'final' : 'pending'}</p>
                  {render.status !== 'final' ? (
                    <button type="button" onClick={() => markFinal(render.id)}>
                      Mark Render Final
                    </button>
                  ) : null}
                  <button type="button" onClick={() => runRenderTechnicalQa(render.id)}>
                    Run Technical QA
                  </button>
                </article>
              ))}
            </>
          ) : null}
          {renders.length > 0 && activeBrandProfiles.length > 0 ? (
            <button type="button" onClick={runBrandQualityCheck}>
              Run Brand QA
            </button>
          ) : null}
          {brandQaFindings.length > 0 ? (
            <>
              <h3>Brand QA Findings</h3>
              {brandQaFindings.map((finding) => (
                <p key={finding.id}>
                  Brand QA: {finding.check} {finding.status}
                </p>
              ))}
            </>
          ) : null}
          {captionSets.length > 0 && visualPlans.length > 0 ? (
            <button type="button" onClick={runSemanticQualityCheck}>
              Run Semantic QA
            </button>
          ) : null}
          {semanticQaFindings.length > 0 ? (
            <>
              <h3>Semantic QA Findings</h3>
              {semanticQaFindings.map((finding) => (
                <p key={finding.id}>
                  Semantic QA: {finding.check} {finding.status}
                </p>
              ))}
            </>
          ) : null}
          {technicalQaFindings.length > 0 ? (
            <>
              <h3>Technical QA Findings</h3>
              {technicalQaFindings.map((finding) => (
                <p key={finding.id}>
                  Technical QA: {finding.check} {finding.status}
                </p>
              ))}
            </>
          ) : null}
          {visualPlans.length > 0 ? (
            <>
              <h3>Visual Plan</h3>
              {visualPlans.map((plan) => (
                <article key={plan.id}>
                  <p>Script Segments: {plan.scriptSegments.join(', ')}</p>
                  <p>Visual Scene 1: {plan.visualScenes[0]}</p>
                  <p>Shot 1: {plan.shots[0]}</p>
                  <p>Fallback Visual: {plan.fallbackVisual}</p>
                  <p>Visual Plan: {plan.approved ? 'approved' : 'pending review'}</p>
                  {!plan.approved ? (
                    <button type="button" onClick={() => approveCurrentVisualPlan(plan.id)}>
                      Approve Visual Plan
                    </button>
                  ) : null}
                </article>
              ))}
            </>
          ) : null}
          {isCreatingProject ? (
            <form onSubmit={startSourceOnlyProject}>
              <fieldset>
                <legend>Project mode</legend>
                <label htmlFor="source-only-mode">Source-Only Mode</label>
                <input id="source-only-mode" type="radio" name="project-mode" checked readOnly />
                <label htmlFor="full-agentic-mode">Full Agentic Mode</label>
                <input
                  id="full-agentic-mode"
                  type="radio"
                  name="project-mode"
                  disabled={!searchDiscoveryReady}
                  readOnly
                />
                {!searchDiscoveryReady ? (
                  <p>Full Agentic Mode requires search/discovery capability.</p>
                ) : null}
              </fieldset>
              <label htmlFor="project-prompt">Project prompt</label>
              <input
                id="project-prompt"
                value={projectPrompt}
                onChange={(event) => setProjectPrompt(event.currentTarget.value)}
              />
              <label htmlFor="project-source-url">Source URL</label>
              <input
                id="project-source-url"
                value={projectSourceUrl}
                onChange={(event) => setProjectSourceUrl(event.currentTarget.value)}
              />
              <label htmlFor="project-brand-profile">Brand Profile</label>
              <select
                id="project-brand-profile"
                value={selectedProjectBrandProfile}
                onChange={(event) => setSelectedProjectBrandProfile(event.currentTarget.value)}
              >
                {activeBrandProfiles.map((profile) => (
                  <option key={profile.id} value={profile.name}>
                    {profile.name}
                  </option>
                ))}
              </select>
              <button type="submit">Start Source-Only Project</button>
            </form>
          ) : (
            <button type="button" onClick={() => setIsCreatingProject(true)}>
              Create Project
            </button>
          )}
        </section>
      ) : null}

      <section aria-label="Run Trace">
        <h2>Run Trace</h2>
        <button type="button" onClick={() => setShowRunTrace((visible) => !visible)}>
          {showRunTrace ? 'Hide Run Trace' : 'Show Run Trace'}
        </button>
        <form onSubmit={applyTraceFilters}>
          <label htmlFor="trace-stage-filter">Trace stage filter</label>
          <input
            id="trace-stage-filter"
            value={traceFilters.stage ?? ''}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setTraceFilters((filters) => ({ ...filters, stage: value }));
            }}
          />
          <label htmlFor="trace-provider-filter">Trace provider filter</label>
          <input
            id="trace-provider-filter"
            value={traceFilters.provider ?? ''}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setTraceFilters((filters) => ({ ...filters, provider: value }));
            }}
          />
          <label htmlFor="trace-tool-filter">Trace tool filter</label>
          <input
            id="trace-tool-filter"
            value={traceFilters.tool ?? ''}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setTraceFilters((filters) => ({ ...filters, tool: value }));
            }}
          />
          <label htmlFor="trace-child-process-filter">Trace child process filter</label>
          <input
            id="trace-child-process-filter"
            value={traceFilters.childProcess ?? ''}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setTraceFilters((filters) => ({ ...filters, childProcess: value }));
            }}
          />
          <button type="submit">Apply Trace Filters</button>
        </form>
        {filteredTraceEvents.map((event) => (
          <p key={event.id}>Filtered trace: {event.summary}</p>
        ))}
        <button type="button" onClick={exportSafeDebug}>
          Export Safe Debug Bundle
        </button>
        <button type="button" onClick={() => setFullDebugWarningAcknowledged(true)}>
          Acknowledge Full Debug Bundle Warning
        </button>
        {fullDebugWarningAcknowledged ? (
          <button type="button" onClick={exportFullDebug}>
            Export Full Debug Bundle
          </button>
        ) : null}
        {debugBundles.map((bundle) => (
          <p key={bundle.id}>
            {bundle.kind === 'full' ? 'Full Debug Bundle' : 'Safe Debug Bundle'}: {bundle.path}
          </p>
        ))}
        {showRunTrace ? <pre>{redactedRunTraceJson()}</pre> : null}
      </section>
    </main>
  );
}
