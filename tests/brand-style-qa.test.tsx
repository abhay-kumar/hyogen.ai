import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { listBrandQaFindings } from '../src/brandQa';
import { runFfmpegSmokeRender } from '../src/renders';
import { saveWorkspace } from '../src/workspace';

describe('Brand/style QA', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
    runFfmpegSmokeRender();
  });

  it('adds Brand/style QA Findings', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Run Brand QA' }));

    expect(screen.getByText('Brand QA: tone pass')).toBeInTheDocument();
    expect(screen.getByText('Brand QA: caption style warning')).toBeInTheDocument();
    expect(listBrandQaFindings()).toHaveLength(2);
  });
});
