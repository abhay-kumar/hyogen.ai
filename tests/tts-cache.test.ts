import { beforeEach, describe, expect, it } from 'vitest';
import { generateMockTtsAudio, listAudioArtifacts } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';

describe('TTS cache', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('reuses unchanged segment audio by text hash', () => {
    const performance = generateVoicePerformance('Script Version 1');

    const first = generateMockTtsAudio(performance);
    const second = generateMockTtsAudio(performance);

    expect(second).toEqual(first);
    expect(listAudioArtifacts()).toHaveLength(2);
  });
});
