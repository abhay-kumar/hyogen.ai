import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createYouTubeSearchCandidate, listMediaCandidates } from '../src/mediaPool';
import { acknowledgePublicMediaWarnings } from '../src/publicMediaRights';
import { saveWorkspace } from '../src/workspace';

describe('downloaded video indexing', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    acknowledgePublicMediaWarnings();
    createYouTubeSearchCandidate('local-first AI video');
  });

  it('indexes a completed yt-dlp download as a new Media Candidate', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Download via yt-dlp for local-first-ai-video' }));

    expect(screen.getByText('downloads/local-first-ai-video.mp4 — indexed')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(
      expect.objectContaining({
        kind: 'video',
        sourcePath: 'downloads/local-first-ai-video.mp4',
        origin: 'downloaded',
        status: 'indexed',
      }),
    );
  });
});
