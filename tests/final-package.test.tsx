import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { generateEstimatedCaptionSet } from '../src/captions';
import { exportFinalPackages } from '../src/finalPackage';
import { generateMetadataPackage } from '../src/metadataPackage';
import { markRenderFinal, runFfmpegSmokeRender } from '../src/renders';
import { generateMockTtsAudio, listAudioArtifacts } from '../src/ttsAudio';
import { generateVoicePerformance } from '../src/voicePerformance';
import { saveWorkspace } from '../src/workspace';

describe('Final Package export', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const render = runFfmpegSmokeRender();
    markRenderFinal(render.id);
    generateMockTtsAudio(generateVoicePerformance('Script Version 1'));
    generateEstimatedCaptionSet(listAudioArtifacts());
    generateMetadataPackage();
  });

  it('exports MP4, SRT, metadata, manifest, citations, attribution, and QA', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Export Final Package' }));

    expect(screen.getByText('Final Package: final-package/manifest.json')).toBeInTheDocument();
    expect(screen.getByText('Includes: MP4, SRT, metadata, manifest, citations, attribution, QA')).toBeInTheDocument();
  });
});
