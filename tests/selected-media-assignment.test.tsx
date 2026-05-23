import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalImageCandidate } from '../src/mediaPool';
import { listSelectedMedia } from '../src/selectedMedia';
import { approveVisualPlan, generateMockVisualPlan } from '../src/visualPlans';
import { saveWorkspace } from '../src/workspace';

describe('Selected Media assignment', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const plan = generateMockVisualPlan('Hook: Local-first AI video matters.');
    approveVisualPlan(plan.id);
    importLocalImageCandidate('/Users/creator/Pictures/photo.png');
  });

  it('assigns a local Media Candidate to a Shot as Selected Media', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Assign photo.png to Shot 1' }));

    expect(screen.getByText('Selected Media: Shot 1 -> photo.png')).toBeInTheDocument();
    expect(listSelectedMedia()).toContainEqual(
      expect.objectContaining({ shotId: 'shot-1', mediaCandidateId: 'media-candidate-1' }),
    );
  });
});
