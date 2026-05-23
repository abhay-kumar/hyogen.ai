import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalImageCandidate } from '../src/mediaPool';
import { listRenderInputs } from '../src/renderInputs';
import { saveWorkspace } from '../src/workspace';

describe('image Render Input normalization', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    importLocalImageCandidate('/Users/creator/Pictures/photo.png');
  });

  it('copies a selected image into a normalized Render Input with a hash', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Select photo.png as Render Input' }));

    expect(screen.getByRole('heading', { name: 'Render Inputs' })).toBeInTheDocument();
    expect(screen.getByText('render-inputs/photo.png — hash: hash-photo-png')).toBeInTheDocument();
    expect(listRenderInputs()).toContainEqual(
      expect.objectContaining({
        normalizedPath: 'render-inputs/photo.png',
        hash: 'hash-photo-png',
      }),
    );
  });
});
