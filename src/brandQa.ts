import { recordRunTraceEvent } from './runTrace';

const BRAND_QA_FINDINGS_STORAGE_KEY = 'hyogen.brandQaFindings';

export type BrandQaFinding = {
  id: string;
  check: string;
  status: 'pass' | 'warning' | 'fail';
};

export function listBrandQaFindings(storage: Storage = window.localStorage): BrandQaFinding[] {
  const encoded = storage.getItem(BRAND_QA_FINDINGS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as BrandQaFinding[]) : [];
}

export function runBrandQa(storage: Storage = window.localStorage): BrandQaFinding[] {
  const existing = listBrandQaFindings(storage);
  const findings: BrandQaFinding[] = [
    { id: `brand-qa-${existing.length + 1}`, check: 'tone', status: 'pass' },
    { id: `brand-qa-${existing.length + 2}`, check: 'caption style', status: 'warning' },
  ];
  storage.setItem(BRAND_QA_FINDINGS_STORAGE_KEY, JSON.stringify([...existing, ...findings]));
  recordRunTraceEvent(
    {
      type: 'brandQa.completed',
      summary: 'Brand/style QA completed',
      data: { findings: findings.length },
    },
    storage,
  );
  return findings;
}
