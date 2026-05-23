import { recordRunTraceEvent } from './runTrace';

const ARTIFACT_VERSIONS_STORAGE_KEY = 'hyogen.artifactVersions';

export type ArtifactVersion = {
  id: string;
  label: string;
  kind: 'script';
  content: string;
  stale: boolean;
};

export function listArtifactVersions(storage: Storage = window.localStorage): ArtifactVersion[] {
  const encoded = storage.getItem(ARTIFACT_VERSIONS_STORAGE_KEY);
  const versions = encoded ? (JSON.parse(encoded) as ArtifactVersion[]) : [];
  return versions.map((version) => ({ ...version, stale: Boolean(version.stale) }));
}

export function createMockScriptVersion(storage: Storage = window.localStorage): ArtifactVersion {
  return createScriptVersion('Mock script for the Reference Workflow.', storage);
}

export function createScriptVersion(
  content: string,
  storage: Storage = window.localStorage,
): ArtifactVersion {
  const versions = listArtifactVersions(storage);
  const version: ArtifactVersion = {
    id: `artifact-version-${versions.length + 1}`,
    label: `Script Version ${versions.length + 1}`,
    kind: 'script',
    content,
    stale: false,
  };
  storage.setItem(ARTIFACT_VERSIONS_STORAGE_KEY, JSON.stringify([...versions, version]));
  recordRunTraceEvent(
    {
      type: 'artifact.version.created',
      summary: 'Artifact Version created',
      data: { artifactId: version.id, label: version.label, kind: version.kind },
    },
    storage,
  );
  return version;
}

export function markScriptVersionsStale(storage: Storage = window.localStorage): void {
  const versions = listArtifactVersions(storage).map((version) =>
    version.kind === 'script' ? { ...version, stale: true } : version,
  );
  storage.setItem(ARTIFACT_VERSIONS_STORAGE_KEY, JSON.stringify(versions));
  recordRunTraceEvent(
    {
      type: 'artifact.versions.marked_stale',
      summary: 'Script Artifact Versions marked stale',
      data: { kind: 'script' },
    },
    storage,
  );
}
