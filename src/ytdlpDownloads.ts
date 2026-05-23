import type { MediaCandidate } from './mediaPool';
import { recordRunTraceEvent } from './runTrace';

const YTDLP_DOWNLOADS_STORAGE_KEY = 'hyogen.ytdlpDownloads';

export type YtdlpDownload = {
  id: string;
  mediaCandidateId: string;
  sourceUrl: string;
  status: 'completed' | 'error';
  log: string[];
};

export function listYtdlpDownloads(storage: Storage = window.localStorage): YtdlpDownload[] {
  const encoded = storage.getItem(YTDLP_DOWNLOADS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as YtdlpDownload[]) : [];
}

export function runYtdlpDownloadStub(
  candidate: MediaCandidate,
  storage: Storage = window.localStorage,
): YtdlpDownload {
  const downloads = listYtdlpDownloads(storage);
  const sourceUrl = candidate.sourceUrl ?? candidate.sourcePath;
  const failed = sourceUrl.includes('fail-ytdlp');
  const download: YtdlpDownload = {
    id: `ytdlp-download-${downloads.length + 1}`,
    mediaCandidateId: candidate.id,
    sourceUrl,
    status: failed ? 'error' : 'completed',
    log: failed ? ['yt-dlp started', 'network error'] : ['yt-dlp started', 'download complete'],
  };
  storage.setItem(YTDLP_DOWNLOADS_STORAGE_KEY, JSON.stringify([...downloads, download]));
  recordRunTraceEvent(
    {
      type: failed ? 'childProcess.ytdlp.error' : 'childProcess.ytdlp.completed',
      summary: failed ? 'yt-dlp mock download failed' : 'yt-dlp mock download completed',
      data: { sourceUrl, log: download.log },
    },
    storage,
  );
  return download;
}
