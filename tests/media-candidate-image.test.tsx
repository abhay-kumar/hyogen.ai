import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { saveWorkspace } from '../src/workspace';

describe('local image Media Candidate import', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('imports a local image as a referenced Media Candidate without copying it', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Local image path'), '/Users/creator/Pictures/photo.png');
    await user.click(screen.getByRole('button', { name: 'Import Local Image' }));

    expect(screen.getByRole('heading', { name: 'Media Candidates' })).toBeInTheDocument();
    expect(screen.getByText('/Users/creator/Pictures/photo.png — referenced')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(
      expect.objectContaining({
        sourcePath: '/Users/creator/Pictures/photo.png',
        status: 'referenced',
        copied: false,
      }),
    );
  });
});
