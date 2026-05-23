import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { acknowledgePublicMediaWarnings } from '../src/publicMediaRights';
import { saveWorkspace } from '../src/workspace';

describe('mock public/free image search', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    acknowledgePublicMediaWarnings();
  });

  it('creates rights-labeled public/free image Media Candidates', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Public media query'), 'local-first AI diagram');
    await user.click(screen.getByRole('button', { name: 'Run Mock Public-Free Image Search' }));

    expect(screen.getByText('https://images.example/free/local-first-ai-diagram.jpg — public-free: attribution-required')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(
      expect.objectContaining({
        kind: 'image',
        sourceUrl: 'https://images.example/free/local-first-ai-diagram.jpg',
        origin: 'public-free-image-search',
        rightsLabel: 'public-free: attribution-required',
      }),
    );
  });
});
