import { listProviderConnections } from './providerConnections';
import { recordRunTraceEvent, redactedRunTraceJson } from './runTrace';

const DEBUG_BUNDLES_STORAGE_KEY = 'hyogen.debugBundles';

export type DebugBundle = {
  id: string;
  path: string;
  kind: 'safe';
  redactedSecrets: boolean;
  payload: {
    providerConnections: ReturnType<typeof listProviderConnections>;
    runTrace: unknown;
  };
};

export function listDebugBundles(storage: Storage = window.localStorage): DebugBundle[] {
  const encoded = storage.getItem(DEBUG_BUNDLES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as DebugBundle[]) : [];
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
