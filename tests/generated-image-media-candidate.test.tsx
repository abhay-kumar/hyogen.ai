import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { listRenderInputs } from '../src/renderInputs';
import { saveWorkspace } from '../src/workspace';

describe('generated image candidate', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('creates a Media Candidate and Render Input after approval', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Request Image Generation Approval' }));
    await user.click(screen.getByRole('button', { name: 'Approve and Generate Image' }));

    expect(screen.getByText('generated/generated-fallback.png — generated')).toBeInTheDocument();
    expect(screen.getByText('render-inputs/generated-fallback.png — hash: hash-generated-fallback-png')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(expect.objectContaining({ origin: 'generated-image' }));
    expect(listRenderInputs()).toContainEqual(expect.objectContaining({ normalizedPath: 'render-inputs/generated-fallback.png' }));
  });
});
