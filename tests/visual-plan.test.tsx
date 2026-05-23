import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { recordApprovalDecision } from '../src/approvalGates';
import { createScriptVersion } from '../src/artifactVersions';
import { App } from '../src/App';
import { listVisualPlans } from '../src/visualPlans';
import { saveWorkspace } from '../src/workspace';

describe('Visual Plan generation', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createScriptVersion('Hook: Local-first AI video matters.\nBody: Creators need control.');
    recordApprovalDecision({ target: 'Script Version 1', decision: 'approved' });
  });

  it('generates Script Segments, Visual Scenes, Shots, and Fallback Visuals', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Visual Plan' }));

    expect(screen.getByRole('heading', { name: 'Visual Plan' })).toBeInTheDocument();
    expect(screen.getByText('Script Segments: hook, body')).toBeInTheDocument();
    expect(screen.getByText('Visual Scene 1: faceless explainer')).toBeInTheDocument();
    expect(screen.getByText('Shot 1: fallback kinetic text')).toBeInTheDocument();
    expect(screen.getByText('Fallback Visual: branded gradient')).toBeInTheDocument();
    expect(listVisualPlans()).toContainEqual(
      expect.objectContaining({ fallbackVisual: 'branded gradient' }),
    );
  });
});
