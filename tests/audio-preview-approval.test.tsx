import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listApprovalDecisions } from '../src/approvalGates';
import { generateMockTtsAudio } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('Audio preview Approval Gate', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateMockTtsAudio(generateVoicePerformance('Script Version 1'));
  });

  it('approves the audio preview', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Approve Audio Preview' }));

    expect(screen.getByText('Audio Preview: approved')).toBeInTheDocument();
    expect(listApprovalDecisions()).toContainEqual(
      expect.objectContaining({ target: 'Audio Preview', decision: 'approved' }),
    );
  });
});
