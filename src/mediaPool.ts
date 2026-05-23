import { recordRunTraceEvent } from './runTrace';

const MEDIA_CANDIDATES_STORAGE_KEY = 'hyogen.mediaCandidates';

export type MediaCandidate = {
  id: string;
  kind: 'image' | 'video';
  sourcePath: string;
  sourceUrl?: string;
  origin?: 'local' | 'youtube-search' | 'downloaded' | 'public-free-image-search' | 'google-images-fallback';
  rightsLabel?: string;
  status: 'referenced' | 'indexed';
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

function slugFromSourceUrl(sourceUrl: string): string {
  return sourceUrl.split('/').at(-1) ?? 'download';
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

export function createPublicFreeImageSearchCandidate(
  query: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  const candidates = listMediaCandidates(storage);
  const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const sourceUrl = `https://images.example/free/${slug}.jpg`;
  const candidate: MediaCandidate = {
    id: `media-candidate-${candidates.length + 1}`,
    kind: 'image',
    sourcePath: sourceUrl,
    sourceUrl,
    origin: 'public-free-image-search',
    rightsLabel: 'public-free: attribution-required',
    status: 'referenced',
    copied: false,
  };
  storage.setItem(MEDIA_CANDIDATES_STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  recordRunTraceEvent(
    {
      type: 'publicMedia.freeImageSearch.candidateCreated',
      summary: 'Mock public/free image search created Media Candidate',
      data: { sourceUrl, rightsLabel: candidate.rightsLabel },
    },
    storage,
  );
  return candidate;
}

export function createGoogleImagesFallbackCandidate(
  query: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  const candidates = listMediaCandidates(storage);
  const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const sourceUrl = `https://images.example/google/${slug}.jpg`;
  const candidate: MediaCandidate = {
    id: `media-candidate-${candidates.length + 1}`,
    kind: 'image',
    sourcePath: sourceUrl,
    sourceUrl,
    origin: 'google-images-fallback',
    rightsLabel: 'public-media: unknown-rights',
    status: 'referenced',
    copied: false,
  };
  storage.setItem(MEDIA_CANDIDATES_STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  recordRunTraceEvent(
    {
      type: 'publicMedia.googleImagesFallback.candidateCreated',
      summary: 'Mock Google Images fallback created unknown-rights Media Candidate',
      data: { sourceUrl, rightsLabel: candidate.rightsLabel },
    },
    storage,
  );
  return candidate;
}

export function indexDownloadedVideoCandidate(
  sourceUrl: string,
  storage: Storage = window.localStorage,
): MediaCandidate {
  const candidates = listMediaCandidates(storage);
  const slug = slugFromSourceUrl(sourceUrl);
  const sourcePath = `downloads/${slug}.mp4`;
  const candidate: MediaCandidate = {
    id: `media-candidate-${candidates.length + 1}`,
    kind: 'video',
    sourcePath,
    sourceUrl,
    origin: 'downloaded',
    status: 'indexed',
    copied: true,
    durationSeconds: 12.4,
    thumbnailPath: `thumbnails/${slug}.jpg`,
  };
  storage.setItem(MEDIA_CANDIDATES_STORAGE_KEY, JSON.stringify([...candidates, candidate]));
  recordRunTraceEvent(
    {
      type: 'media.candidate.indexed',
      summary: 'Downloaded video indexed as Media Candidate',
      data: { sourceUrl, sourcePath },
    },
    storage,
  );
  return candidate;
}
