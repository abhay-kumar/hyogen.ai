import { recordRunTraceEvent } from './runTrace';

const FINAL_PACKAGES_STORAGE_KEY = 'hyogen.finalPackages';

export type FinalPackage = {
  id: string;
  manifestPath: string;
  includes: string[];
};

export function listFinalPackages(storage: Storage = window.localStorage): FinalPackage[] {
  const encoded = storage.getItem(FINAL_PACKAGES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as FinalPackage[]) : [];
}

export function exportFinalPackages(storage: Storage = window.localStorage): FinalPackage {
  const packages = listFinalPackages(storage);
  const finalPackage: FinalPackage = {
    id: `final-package-${packages.length + 1}`,
    manifestPath: 'final-package/manifest.json',
    includes: ['MP4', 'SRT', 'metadata', 'manifest', 'citations', 'attribution', 'QA'],
  };
  storage.setItem(FINAL_PACKAGES_STORAGE_KEY, JSON.stringify([...packages, finalPackage]));
  recordRunTraceEvent(
    {
      type: 'finalPackage.exported',
      summary: 'Final Package exported',
      data: { finalPackageId: finalPackage.id, manifestPath: finalPackage.manifestPath },
    },
    storage,
  );
  return finalPackage;
}
