import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { recordApprovalDecision } from '../src/approvalGates';
import { createScriptVersion } from '../src/artifactVersions';
import { App } from '../src/App';
import { listVoicePerformances } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('Voice Performance generation', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createScriptVersion('Hook: Local-first AI video matters.');
    recordApprovalDecision({ target: 'Script Version 1', decision: 'approved' });
  });

  it('generates Voice Performance artifact from an approved script', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Voice Performance' }));

    expect(screen.getByText('Voice Performance: energetic explainer, pace fast, emphasis hook')).toBeInTheDocument();
    expect(listVoicePerformances()).toContainEqual(
      expect.objectContaining({ tone: 'energetic explainer', pace: 'fast' }),
    );
  });
});
