import { recordRunTraceEvent } from './runTrace';

const SOURCE_MATERIAL_STORAGE_KEY = 'hyogen.sourceMaterial';

export type SourceMaterial = {
  id: string;
  projectId: string;
  url: string;
  status: 'materialized' | 'unverified' | 'error';
};

export function listSourceMaterial(storage: Storage = window.localStorage): SourceMaterial[] {
  const encoded = storage.getItem(SOURCE_MATERIAL_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as SourceMaterial[]) : [];
}

export function materializeSourceUrls(
  projectId: string,
  urls: string[],
  storage: Storage = window.localStorage,
): SourceMaterial[] {
  const existing = listSourceMaterial(storage);
  const materialized = urls.map((url, index) => ({
    id: `source-material-${existing.length + index + 1}`,
    projectId,
    url,
    status: url.includes('unavailable') ? ('error' as const) : ('materialized' as const),
  }));
  storage.setItem(SOURCE_MATERIAL_STORAGE_KEY, JSON.stringify([...existing, ...materialized]));
  materialized.forEach((source) => {
    recordRunTraceEvent(
      {
        type: 'source.materialized',
        summary: 'Source Material materialized',
        data: { url: source.url, status: source.status },
      },
      storage,
    );
  });
  return materialized;
}

export function materializeDiscoveryLeadUrls(
  urls: string[],
  storage: Storage = window.localStorage,
): SourceMaterial[] {
  const existing = listSourceMaterial(storage);
  const materialized = urls.map((url, index) => ({
    id: `source-material-${existing.length + index + 1}`,
    projectId: 'provider-native-search',
    url,
    status: url.includes('unavailable') ? ('unverified' as const) : ('materialized' as const),
  }));
  storage.setItem(SOURCE_MATERIAL_STORAGE_KEY, JSON.stringify([...existing, ...materialized]));
  materialized.forEach((source) => {
    recordRunTraceEvent(
      {
        type: 'discovery.lead.materialized',
        summary: 'Discovery Lead materialized',
        data: { url: source.url, status: source.status },
      },
      storage,
    );
  });
  return materialized;
}
