import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listCaptionSets } from '../src/captions';
import { generateMockTtsAudio } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('estimated captions', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateMockTtsAudio(generateVoicePerformance('Script Version 1'));
  });

  it('generates an estimated Caption Set and SRT from TTS audio', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Estimated Captions' }));

    expect(screen.getByText('Caption Set: captions/estimated.srt')).toBeInTheDocument();
    expect(screen.getByText(/00:00:00,000 --> 00:00:02,000/)).toBeInTheDocument();
    expect(listCaptionSets()).toContainEqual(expect.objectContaining({ path: 'captions/estimated.srt' }));
  });
});
