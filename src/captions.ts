import type { AudioArtifact } from './ttsAudio';
import { recordRunTraceEvent } from './runTrace';

const CAPTION_SETS_STORAGE_KEY = 'hyogen.captionSets';

export type CaptionSet = {
  id: string;
  path: string;
  srt: string;
  safeZoneStatus?: 'pass' | 'warning';
  alignmentSource?: string;
  safeZoneIssue?: string;
};

export function listCaptionSets(storage: Storage = window.localStorage): CaptionSet[] {
  const encoded = storage.getItem(CAPTION_SETS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as CaptionSet[]) : [];
}

export function generateEstimatedCaptionSet(
  audioArtifacts: AudioArtifact[],
  storage: Storage = window.localStorage,
): CaptionSet {
  const captionSets = listCaptionSets(storage);
  const srt = audioArtifacts
    .map(
      (artifact, index) =>
        `${index + 1}\n00:00:0${index * 2},000 --> 00:00:0${index * 2 + 2},000\nSegment ${artifact.segmentIndex}\n`,
    )
    .join('\n');
  const captionSet: CaptionSet = {
    id: `caption-set-${captionSets.length + 1}`,
    path: 'captions/estimated.srt',
    srt,
  };
  storage.setItem(CAPTION_SETS_STORAGE_KEY, JSON.stringify([...captionSets, captionSet]));
  recordRunTraceEvent(
    {
      type: 'captions.estimated.generated',
      summary: 'Estimated Caption Set and SRT generated from TTS audio',
      data: { captionSetId: captionSet.id, path: captionSet.path },
    },
    storage,
  );
  return captionSet;
}

export function alignCaptionsFromWordTimestampFixture(
  captionSetId: string,
  storage: Storage = window.localStorage,
): CaptionSet | null {
  let aligned: CaptionSet | null = null;
  const captionSets = listCaptionSets(storage).map((captionSet) => {
    if (captionSet.id !== captionSetId) return captionSet;
    aligned = {
      ...captionSet,
      alignmentSource: 'word timestamps fixture',
      safeZoneStatus: 'warning' as const,
      safeZoneIssue: 'lower-third overlap warning',
    };
    return aligned;
  });
  storage.setItem(CAPTION_SETS_STORAGE_KEY, JSON.stringify(captionSets));
  recordRunTraceEvent(
    {
      type: 'captions.aligned',
      summary: 'Captions aligned from word-timestamp fixture with safe-zone warning',
      data: { captionSetId },
    },
    storage,
  );
  return aligned;
}
