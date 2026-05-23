import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { acknowledgePublicMediaWarnings } from '../src/publicMediaRights';
import { saveWorkspace } from '../src/workspace';

describe('mock Google Images fallback', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    acknowledgePublicMediaWarnings();
  });

  it('creates unknown-rights image candidates', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Public media query'), 'robot kitchen');
    await user.click(screen.getByRole('button', { name: 'Run Mock Google Images Fallback' }));

    expect(screen.getByText('https://images.example/google/robot-kitchen.jpg — public-media: unknown-rights')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(
      expect.objectContaining({
        kind: 'image',
        sourceUrl: 'https://images.example/google/robot-kitchen.jpg',
        origin: 'google-images-fallback',
        rightsLabel: 'public-media: unknown-rights',
      }),
    );
  });
});
