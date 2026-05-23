import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { exportFinalPackages } from '../src/finalPackage';
import { importLocalImageCandidate } from '../src/mediaPool';
import { createRenderInputFromMediaCandidate } from '../src/renderInputs';
import { listCleanupPlans } from '../src/cleanup';
import { saveWorkspace } from '../src/workspace';

describe('cleanup plan', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createRenderInputFromMediaCandidate(importLocalImageCandidate('/Users/creator/Pictures/photo.png'));
    exportFinalPackages();
  });

  it('retains Render Inputs and proposes raw/temp deletions', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Cleanup Plan' }));

    expect(screen.getByText('Cleanup Plan: retain Render Inputs')).toBeInTheDocument();
    expect(screen.getByText('Proposed deletions: raw-downloads, temp-renders')).toBeInTheDocument();
    expect(listCleanupPlans()[0]).toMatchObject({ retainRenderInputs: true });
  });
});
