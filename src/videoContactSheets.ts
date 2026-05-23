import type { MediaCandidate } from './mediaPool';
import { recordRunTraceEvent } from './runTrace';

const VIDEO_CONTACT_SHEETS_STORAGE_KEY = 'hyogen.videoContactSheets';

export type VideoContactSheet = {
  id: string;
  mediaCandidateId: string;
  contactSheetPath: string;
  keyframes: string[];
};

function baseName(path: string): string {
  return path.split('/').at(-1)?.replace(/\.[^.]+$/, '') ?? 'video';
}

export function listVideoContactSheets(storage: Storage = window.localStorage): VideoContactSheet[] {
  const encoded = storage.getItem(VIDEO_CONTACT_SHEETS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as VideoContactSheet[]) : [];
}

export function generateVideoContactSheet(
  candidate: MediaCandidate,
  storage: Storage = window.localStorage,
): VideoContactSheet {
  const sheets = listVideoContactSheets(storage);
  const sheet: VideoContactSheet = {
    id: `video-contact-sheet-${sheets.length + 1}`,
    mediaCandidateId: candidate.id,
    contactSheetPath: `contact-sheets/${baseName(candidate.sourcePath)}.jpg`,
    keyframes: ['00:00', '00:04', '00:08'],
  };
  storage.setItem(VIDEO_CONTACT_SHEETS_STORAGE_KEY, JSON.stringify([...sheets, sheet]));
  recordRunTraceEvent(
    {
      type: 'video.contactSheet.generated',
      summary: 'Video contact sheet and keyframes generated',
      data: { mediaCandidateId: candidate.id, contactSheetPath: sheet.contactSheetPath },
    },
    storage,
  );
  return sheet;
}
