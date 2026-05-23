import { importLocalImageCandidate, type MediaCandidate } from './mediaPool';
import { recordRunTraceEvent } from './runTrace';

const WATCH_FOLDER_SCANS_STORAGE_KEY = 'hyogen.watchFolderScans';

function listScannedFolders(storage: Storage = window.localStorage): string[] {
  const encoded = storage.getItem(WATCH_FOLDER_SCANS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as string[]) : [];
}

export function scanWatchFolder(
  folderPath: string,
  storage: Storage = window.localStorage,
): MediaCandidate[] {
  const normalizedFolder = folderPath.trim();
  const scannedFolders = listScannedFolders(storage);
  if (scannedFolders.includes(normalizedFolder)) return [];

  const candidate = importLocalImageCandidate(`${normalizedFolder}/watched-image.png`, storage);
  storage.setItem(WATCH_FOLDER_SCANS_STORAGE_KEY, JSON.stringify([...scannedFolders, normalizedFolder]));
  recordRunTraceEvent(
    {
      type: 'watchFolder.ingested',
      summary: 'Watch folder detected new files as Media Candidates',
      data: { folderPath: normalizedFolder, mediaCandidateId: candidate.id },
    },
    storage,
  );
  return [candidate];
}
