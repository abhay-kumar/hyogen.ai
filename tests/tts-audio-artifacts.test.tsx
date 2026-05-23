import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listAudioArtifacts } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('segmented mock TTS', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateVoicePerformance('Script Version 1');
  });

  it('creates audio artifacts for TTS segments', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Mock TTS Audio' }));

    expect(screen.getByText('Audio Artifact: audio/segment-1.wav — segment 1')).toBeInTheDocument();
    expect(screen.getByText('Audio Artifact: audio/segment-2.wav — segment 2')).toBeInTheDocument();
    expect(listAudioArtifacts()).toHaveLength(2);
  });
});
