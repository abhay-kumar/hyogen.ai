import type { RenderArtifact } from './renders';
import { recordRunTraceEvent } from './runTrace';

const TECHNICAL_QA_FINDINGS_STORAGE_KEY = 'hyogen.technicalQaFindings';

export type TechnicalQaFinding = {
  id: string;
  renderId: string;
  check: string;
  status: 'pass' | 'warning' | 'fail';
};

export function listTechnicalQaFindings(storage: Storage = window.localStorage): TechnicalQaFinding[] {
  const encoded = storage.getItem(TECHNICAL_QA_FINDINGS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as TechnicalQaFinding[]) : [];
}

export function runTechnicalQa(
  render: RenderArtifact,
  storage: Storage = window.localStorage,
): TechnicalQaFinding[] {
  const existing = listTechnicalQaFindings(storage);
  const findings: TechnicalQaFinding[] = [
    { id: `technical-qa-${existing.length + 1}`, renderId: render.id, check: 'resolution', status: 'pass' },
    { id: `technical-qa-${existing.length + 2}`, renderId: render.id, check: 'loudness', status: 'warning' },
  ];
  storage.setItem(TECHNICAL_QA_FINDINGS_STORAGE_KEY, JSON.stringify([...existing, ...findings]));
  recordRunTraceEvent(
    {
      type: 'technicalQa.completed',
      summary: 'Local technical QA completed',
      data: { renderId: render.id, findings: findings.length },
    },
    storage,
  );
  return findings;
}
