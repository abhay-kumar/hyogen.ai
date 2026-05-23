import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { createScriptVersion } from '../src/artifactVersions';
import { App } from '../src/App';
import { generateEstimatedCaptionSet } from '../src/captions';
import { listSemanticQaFindings } from '../src/semanticQa';
import { generateMockTtsAudio, listAudioArtifacts } from '../src/ttsAudio';
import { generateMockVisualPlan } from '../src/visualPlans';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('semantic QA', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createScriptVersion('Hook: Local-first AI video matters.');
    generateMockVisualPlan('Hook: Local-first AI video matters.');
    generateMockTtsAudio(generateVoicePerformance('Script Version 1'));
    generateEstimatedCaptionSet(listAudioArtifacts());
  });

  it('checks script, visuals, and captions semantically', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Run Semantic QA' }));

    expect(screen.getByText('Semantic QA: script-visual-caption consistency pass')).toBeInTheDocument();
    expect(listSemanticQaFindings()).toContainEqual(expect.objectContaining({ status: 'pass' }));
  });
});
