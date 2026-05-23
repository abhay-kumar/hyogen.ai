import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { generateEstimatedCaptionSet, listCaptionSets } from '../src/captions';
import { generateMockTtsAudio, listAudioArtifacts } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('caption alignment', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateMockTtsAudio(generateVoicePerformance('Script Version 1'));
    generateEstimatedCaptionSet(listAudioArtifacts());
  });

  it('aligns captions from word timestamps and flags safe-zone issues', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Align Captions from Fixture' }));

    expect(screen.getByText('Caption alignment: word timestamps fixture')).toBeInTheDocument();
    expect(screen.getByText('Safe-zone issue: lower-third overlap warning')).toBeInTheDocument();
    expect(listCaptionSets()[0]).toMatchObject({ safeZoneStatus: 'warning' });
  });
});
