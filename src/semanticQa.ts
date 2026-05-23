import { recordRunTraceEvent } from './runTrace';

const SEMANTIC_QA_FINDINGS_STORAGE_KEY = 'hyogen.semanticQaFindings';

export type SemanticQaFinding = {
  id: string;
  check: string;
  status: 'pass' | 'warning' | 'fail';
};

export function listSemanticQaFindings(storage: Storage = window.localStorage): SemanticQaFinding[] {
  const encoded = storage.getItem(SEMANTIC_QA_FINDINGS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as SemanticQaFinding[]) : [];
}

export function runSemanticQa(storage: Storage = window.localStorage): SemanticQaFinding[] {
  const existing = listSemanticQaFindings(storage);
  const finding: SemanticQaFinding = {
    id: `semantic-qa-${existing.length + 1}`,
    check: 'script-visual-caption consistency',
    status: 'pass',
  };
  storage.setItem(SEMANTIC_QA_FINDINGS_STORAGE_KEY, JSON.stringify([...existing, finding]));
  recordRunTraceEvent(
    {
      type: 'semanticQa.completed',
      summary: 'Semantic QA mock check completed',
      data: { check: finding.check, status: finding.status },
    },
    storage,
  );
  return [finding];
}
