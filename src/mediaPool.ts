import { recordRunTraceEvent } from './runTrace';

const MEDIA_CANDIDATES_STORAGE_KEY = 'hyogen.mediaCandidates';

export type MediaCandidate = {
  id: string;
  kind: 'image' | 'video';
  sourcePath: string;
  status: 'referenced';
  copied: boolean;
};

export function listMediaCandidates(storage: Storage = window.localStorage): MediaCandidate[] {
  const encoded = storage.getItem(MEDIA_CANDIDATES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as MediaCandidate[]) : [];
}

export function importLocalImageCandidate(
  sourcePath: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  const candidates = listMediaCandidates(storage);
  const candidate: MediaCandidate = {
    id: `media-candidate-${candidates.length + 1}`,
    kind: 'image',
    sourcePath: sourcePath.trim(),
    status: 'referenced',
    copied: false,
  };
  storage.setItem(MEDIA_CANDIDATES_STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  recordRunTraceEvent(
    {
      type: 'media.candidate.imported',
      summary: 'Local image imported as Media Candidate',
      data: { mediaCandidateId: candidate.id, copied: candidate.copied },
    },
    storage,
  );
  return candidate;
}
