import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalVideoCandidate } from '../src/mediaPool';
import { createRenderInputFromMediaCandidate } from '../src/renderInputs';
import { listRenders } from '../src/renders';
import { assignMediaCandidateToShot } from '../src/selectedMedia';
import { saveWorkspace } from '../src/workspace';

describe('video clip rendering', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const clip = importLocalVideoCandidate('/Users/creator/Movies/clip.mp4');
    createRenderInputFromMediaCandidate(clip);
    assignMediaCandidateToShot(clip, 'shot-1');
  });

  it('renders selected video with blur-pad/crop and muted source audio', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Render Selected Video Clip' }));

    expect(screen.getByText('Render: renders/video-shot-1.mp4 — blur-pad/crop + muted source audio')).toBeInTheDocument();
    expect(listRenders()).toContainEqual(expect.objectContaining({ path: 'renders/video-shot-1.mp4' }));
  });
});
