import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { generateEstimatedCaptionSet } from '../src/captions';
import { listRenders } from '../src/renders';
import { generateMockTtsAudio, listAudioArtifacts } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('FFmpeg smoke render', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateMockTtsAudio(generateVoicePerformance('Script Version 1'));
    generateEstimatedCaptionSet(listAudioArtifacts());
  });

  it('renders fallback visual, TTS, captions, and SRT', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Run FFmpeg Smoke Render' }));

    expect(screen.getByText('Render: renders/smoke.mp4 — fallback visual + TTS + captions + SRT')).toBeInTheDocument();
    expect(listRenders()).toContainEqual(expect.objectContaining({ path: 'renders/smoke.mp4', status: 'rendered' }));
  });
});
