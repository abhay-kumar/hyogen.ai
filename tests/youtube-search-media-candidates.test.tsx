import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { acknowledgePublicMediaWarnings } from '../src/publicMediaRights';
import { saveWorkspace } from '../src/workspace';

describe('mock YouTube search media candidates', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    acknowledgePublicMediaWarnings();
  });

  it('creates public Media Candidates with rights labels', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Public media query'), 'local-first AI video');
    await user.click(screen.getByRole('button', { name: 'Run Mock YouTube Search' }));

    expect(screen.getByText('https://youtube.example/watch/local-first-ai-video — public-media: unknown-rights')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(
      expect.objectContaining({
        kind: 'video',
        sourceUrl: 'https://youtube.example/watch/local-first-ai-video',
        origin: 'youtube-search',
        rightsLabel: 'public-media: unknown-rights',
      }),
    );
  });
});
