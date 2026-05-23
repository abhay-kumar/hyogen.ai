import { recordRunTraceEvent } from './runTrace';

const VOICE_PERFORMANCES_STORAGE_KEY = 'hyogen.voicePerformances';

export type VoicePerformance = {
  id: string;
  scriptLabel: string;
  tone: string;
  pace: string;
  emphasis: string;
};

export function listVoicePerformances(storage: Storage = window.localStorage): VoicePerformance[] {
  const encoded = storage.getItem(VOICE_PERFORMANCES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as VoicePerformance[]) : [];
}

export function generateVoicePerformance(
  scriptLabel: string,
  storage: Storage = window.localStorage,
): VoicePerformance {
  const performances = listVoicePerformances(storage);
  const performance: VoicePerformance = {
    id: `voice-performance-${performances.length + 1}`,
    scriptLabel,
    tone: 'energetic explainer',
    pace: 'fast',
    emphasis: 'hook',
  };
  storage.setItem(VOICE_PERFORMANCES_STORAGE_KEY, JSON.stringify([...performances, performance]));
  recordRunTraceEvent(
    {
      type: 'voicePerformance.generated',
      summary: 'Voice Performance generated from approved script',
      data: { scriptLabel, voicePerformanceId: performance.id },
    },
    storage,
  );
  return performance;
}
