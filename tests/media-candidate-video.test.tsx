import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { saveWorkspace } from '../src/workspace';

describe('local video Media Candidate import', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('imports a local video as a referenced Media Candidate without copying it', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Local video path'), '/Users/creator/Movies/clip.mp4');
    await user.click(screen.getByRole('button', { name: 'Import Local Video' }));

    expect(screen.getByText('/Users/creator/Movies/clip.mp4 — referenced')).toBeInTheDocument();
    expect(screen.getByText('FFprobe: 12.4s, thumbnail: thumbnails/clip.jpg')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(
      expect.objectContaining({
        kind: 'video',
        sourcePath: '/Users/creator/Movies/clip.mp4',
        status: 'referenced',
        copied: false,
        durationSeconds: 12.4,
        thumbnailPath: 'thumbnails/clip.jpg',
      }),
    );
  });
});
