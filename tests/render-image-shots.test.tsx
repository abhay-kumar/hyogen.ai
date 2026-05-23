import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalImageCandidate } from '../src/mediaPool';
import { createRenderInputFromMediaCandidate } from '../src/renderInputs';
import { listRenders } from '../src/renders';
import { assignMediaCandidateToShot } from '../src/selectedMedia';
import { saveWorkspace } from '../src/workspace';

describe('image Shot rendering', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const first = importLocalImageCandidate('/Users/creator/Pictures/photo.png');
    const second = importLocalImageCandidate('/Users/creator/Pictures/chart.png');
    createRenderInputFromMediaCandidate(first);
    createRenderInputFromMediaCandidate(second);
    assignMediaCandidateToShot(first, 'shot-1');
    assignMediaCandidateToShot(second, 'shot-2');
  });

  it('renders multiple image Shots from selected Render Inputs', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Render Image Shots' }));

    expect(screen.getByText('Render: renders/shot-1.png — image shot')).toBeInTheDocument();
    expect(screen.getByText('Render: renders/shot-2.png — image shot')).toBeInTheDocument();
    expect(listRenders()).toContainEqual(expect.objectContaining({ path: 'renders/shot-1.png' }));
  });
});
