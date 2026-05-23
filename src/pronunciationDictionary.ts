import { recordApprovalDecision } from './approvalGates';
import { recordRunTraceEvent } from './runTrace';

const PRONUNCIATION_CORRECTIONS_STORAGE_KEY = 'hyogen.pronunciationCorrections';

export type PronunciationCorrection = {
  id: string;
  entry: string;
  approved: boolean;
};

export function listPronunciationCorrections(
  storage: Storage = window.localStorage,
): PronunciationCorrection[] {
  const encoded = storage.getItem(PRONUNCIATION_CORRECTIONS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as PronunciationCorrection[]) : [];
}

export function approvePronunciationCorrection(
  entry: string,
  storage: Storage = window.localStorage,
): PronunciationCorrection {
  const corrections = listPronunciationCorrections(storage);
  const correction: PronunciationCorrection = {
    id: `pronunciation-correction-${corrections.length + 1}`,
    entry: entry.trim(),
    approved: true,
  };
  storage.setItem(PRONUNCIATION_CORRECTIONS_STORAGE_KEY, JSON.stringify([...corrections, correction]));
  recordApprovalDecision({ target: 'Pronunciation Correction', decision: 'approved' }, storage);
  recordRunTraceEvent(
    {
      type: 'pronunciationCorrection.approved',
      summary: 'Pronunciation correction approved and added to project dictionary',
      data: { entry: correction.entry },
    },
    storage,
  );
  return correction;
}
