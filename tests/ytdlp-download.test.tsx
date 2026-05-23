import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createYouTubeSearchCandidate } from '../src/mediaPool';
import { acknowledgePublicMediaWarnings } from '../src/publicMediaRights';
import { listRunTraceEvents } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('yt-dlp child-process download stub', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    acknowledgePublicMediaWarnings();
    createYouTubeSearchCandidate('local-first AI video');
  });

  it('records traced logs for a mock yt-dlp download', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Download via yt-dlp for local-first-ai-video' }));

    expect(screen.getByText('yt-dlp: completed for https://youtube.example/watch/local-first-ai-video')).toBeInTheDocument();
    expect(listRunTraceEvents()).toContainEqual(
      expect.objectContaining({
        type: 'childProcess.ytdlp.completed',
        summary: 'yt-dlp mock download completed',
      }),
    );
  });
});
