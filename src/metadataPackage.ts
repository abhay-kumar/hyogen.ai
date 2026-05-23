import { recordRunTraceEvent } from './runTrace';

const METADATA_PACKAGES_STORAGE_KEY = 'hyogen.metadataPackages';

export type MetadataPackage = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  revisionCount: number;
};

export function listMetadataPackages(storage: Storage = window.localStorage): MetadataPackage[] {
  const encoded = storage.getItem(METADATA_PACKAGES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as MetadataPackage[]) : [];
}

export function generateMetadataPackage(storage: Storage = window.localStorage): MetadataPackage {
  const packages = listMetadataPackages(storage);
  const metadata: MetadataPackage = {
    id: `metadata-package-${packages.length + 1}`,
    title: 'Why local-first AI video matters',
    description: 'A concise factual short about creator control and trustworthy AI workflows.',
    tags: ['local-first', 'ai-video', 'creator-tools'],
    revisionCount: 0,
  };
  storage.setItem(METADATA_PACKAGES_STORAGE_KEY, JSON.stringify([...packages, metadata]));
  recordRunTraceEvent(
    {
      type: 'metadataPackage.generated',
      summary: 'Metadata package generated',
      data: { metadataPackageId: metadata.id },
    },
    storage,
  );
  return metadata;
}

export function reviseMetadataPackage(
  metadataPackageId: string,
  instruction: string,
  storage: Storage = window.localStorage,
): MetadataPackage | null {
  let revised: MetadataPackage | null = null;
  const packages = listMetadataPackages(storage).map((metadata) => {
    if (metadata.id !== metadataPackageId) return metadata;
    revised = {
      ...metadata,
      title: instruction.includes('punch')
        ? 'Local-first AI video changes everything'
        : metadata.title,
      revisionCount: metadata.revisionCount + 1,
    };
    return revised;
  });
  storage.setItem(METADATA_PACKAGES_STORAGE_KEY, JSON.stringify(packages));
  recordRunTraceEvent(
    {
      type: 'metadataPackage.revised',
      summary: 'Metadata package revised from chat instruction',
      data: { metadataPackageId, instruction },
    },
    storage,
  );
  return revised;
}
