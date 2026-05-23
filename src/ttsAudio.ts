import { recordRunTraceEvent } from './runTrace';
import type { VoicePerformance } from './voicePerformance';

const AUDIO_ARTIFACTS_STORAGE_KEY = 'hyogen.audioArtifacts';

export type AudioArtifact = {
  id: string;
  voicePerformanceId: string;
  segmentIndex: number;
  path: string;
  textHash: string;
};

export function listAudioArtifacts(storage: Storage = window.localStorage): AudioArtifact[] {
  const encoded = storage.getItem(AUDIO_ARTIFACTS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as AudioArtifact[]) : [];
}

export function generateMockTtsAudio(
  performance: VoicePerformance,
  storage: Storage = window.localStorage,
): AudioArtifact[] {
  const existing = listAudioArtifacts(storage);
  const artifacts = [1, 2].map((segmentIndex) => {
    const textHash = `segment-${segmentIndex}-hash`;
    const cached = existing.find(
      (artifact) => artifact.voicePerformanceId === performance.id && artifact.textHash === textHash,
    );
    return (
      cached ?? {
        id: `audio-artifact-${existing.length + segmentIndex}`,
        voicePerformanceId: performance.id,
        segmentIndex,
        path: `audio/segment-${segmentIndex}.wav`,
        textHash,
      }
    );
  });
  const newArtifacts = artifacts.filter(
    (artifact) => !existing.some((candidate) => candidate.id === artifact.id),
  );
  storage.setItem(AUDIO_ARTIFACTS_STORAGE_KEY, JSON.stringify([...existing, ...newArtifacts]));
  recordRunTraceEvent(
    {
      type: 'tts.audio.generated',
      summary: 'Segmented mock TTS audio artifacts generated',
      data: { voicePerformanceId: performance.id, segments: artifacts.length },
    },
    storage,
  );
  return artifacts;
}
