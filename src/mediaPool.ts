import { recordRunTraceEvent } from './runTrace';

const MEDIA_CANDIDATES_STORAGE_KEY = 'hyogen.mediaCandidates';

export type MediaCandidate = {
  id: string;
  kind: 'image' | 'video';
  sourcePath: string;
  sourceUrl?: string;
  origin?: 'local' | 'youtube-search';
  rightsLabel?: string;
  status: 'referenced';
  copied: boolean;
  durationSeconds?: number;
  thumbnailPath?: string;
};

export function listMediaCandidates(storage: Storage = window.localStorage): MediaCandidate[] {
  const encoded = storage.getItem(MEDIA_CANDIDATES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as MediaCandidate[]) : [];
}

function importLocalMediaCandidate(
  kind: MediaCandidate['kind'],
  sourcePath: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  const candidates = listMediaCandidates(storage);
  const trimmedPath = sourcePath.trim();
  const fileBase = trimmedPath.split('/').at(-1)?.replace(/\.[^.]+$/, '') ?? 'video';
  const candidate: MediaCandidate = {
    id: `media-candidate-${candidates.length + 1}`,
    kind,
    sourcePath: trimmedPath,
    origin: 'local',
    status: 'referenced',
    copied: false,
    ...(kind === 'video'
      ? { durationSeconds: 12.4, thumbnailPath: `thumbnails/${fileBase}.jpg` }
      : {}),
  };
  storage.setItem(MEDIA_CANDIDATES_STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  recordRunTraceEvent(
    {
      type: 'media.candidate.imported',
      summary: `Local ${kind} imported as Media Candidate`,
      data: { mediaCandidateId: candidate.id, kind, copied: candidate.copied },
    },
    storage,
  );
  return candidate;
}

export function importLocalImageCandidate(
  sourcePath: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  return importLocalMediaCandidate('image', sourcePath, storage);
}

export function importLocalVideoCandidate(
  sourcePath: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  return importLocalMediaCandidate('video', sourcePath, storage);
}

export function createYouTubeSearchCandidate(
  query: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  const candidates = listMediaCandidates(storage);
  const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const sourceUrl = `https://youtube.example/watch/${slug}`;
  const candidate: MediaCandidate = {
    id: `media-candidate-${candidates.length + 1}`,
    kind: 'video',
    sourcePath: sourceUrl,
    sourceUrl,
    origin: 'youtube-search',
    rightsLabel: 'public-media: unknown-rights',
    status: 'referenced',
    copied: false,
    durationSeconds: 12.4,
    thumbnailPath: `thumbnails/${slug}.jpg`,
  };
  storage.setItem(MEDIA_CANDIDATES_STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  recordRunTraceEvent(
    {
      type: 'publicMedia.youtubeSearch.candidateCreated',
      summary: 'Mock YouTube search created public Media Candidate',
      data: { sourceUrl, rightsLabel: candidate.rightsLabel },
    },
    storage,
  );
  return candidate;
}
