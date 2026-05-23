import { listProviderConnections } from './providerConnections';
import { recordRunTraceEvent, redactedRunTraceJson } from './runTrace';

const DEBUG_BUNDLES_STORAGE_KEY = 'hyogen.debugBundles';

export type DebugBundle = {
  id: string;
  path: string;
  kind: 'safe' | 'full';
  redactedSecrets: boolean;
  warningAcknowledged?: boolean;
  payload: {
    providerConnections?: ReturnType<typeof listProviderConnections>;
    runTrace?: unknown;
    localStorageSnapshot?: Record<string, string>;
  };
};

export function listDebugBundles(storage: Storage = window.localStorage): DebugBundle[] {
  const encoded = storage.getItem(DEBUG_BUNDLES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as DebugBundle[]) : [];
}

function snapshotLocalStorage(storage: Storage): Record<string, string> {
  return Array.from({ length: storage.length }).reduce<Record<string, string>>((snapshot, _value, index) => {
    const key = storage.key(index);
    if (!key) return snapshot;
    snapshot[key] = storage.getItem(key) ?? '';
    return snapshot;
  }, {});
}

export function exportFullDebugBundle(storage: Storage = window.localStorage): DebugBundle {
  const bundles = listDebugBundles(storage);
  const bundle: DebugBundle = {
    id: `debug-bundle-${bundles.length + 1}`,
    path: 'debug/full-debug-bundle.json',
    kind: 'full',
    redactedSecrets: false,
    warningAcknowledged: true,
    payload: {
      localStorageSnapshot: snapshotLocalStorage(storage),
    },
  };
  storage.setItem(DEBUG_BUNDLES_STORAGE_KEY, JSON.stringify([...bundles, bundle]));
  recordRunTraceEvent(
    {
      type: 'debugBundle.full.exported',
      summary: 'Full debug bundle exported behind warning',
      data: { path: bundle.path, warningAcknowledged: true },
    },
    storage,
  );
  return bundle;
}

export function exportSafeDebugBundle(storage: Storage = window.localStorage): DebugBundle {
  const bundles = listDebugBundles(storage);
  const bundle: DebugBundle = {
    id: `debug-bundle-${bundles.length + 1}`,
    path: 'debug/safe-debug-bundle.json',
    kind: 'safe',
    redactedSecrets: true,
    payload: {
      providerConnections: listProviderConnections(storage),
      runTrace: JSON.parse(redactedRunTraceJson(storage)) as unknown,
    },
  };
  storage.setItem(DEBUG_BUNDLES_STORAGE_KEY, JSON.stringify([...bundles, bundle]));
  recordRunTraceEvent(
    {
      type: 'debugBundle.safe.exported',
      summary: 'Safe debug bundle exported with redacted secrets',
      data: { path: bundle.path, redactedSecrets: true },
    },
    storage,
  );
  return bundle;
}
