import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { saveWorkspace } from '../src/workspace';

describe('Brand Profile archive', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
  });

  it('archives and restores a Brand Profile from the dashboard', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Archive Explainer Lab' }));

    expect(screen.getByText('No Brand Profiles yet.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Archived Brand Profiles' })).toBeInTheDocument();
    expect(screen.getByText('Explainer Lab')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Restore Explainer Lab' }));

    expect(screen.queryByRole('heading', { name: 'Archived Brand Profiles' })).not.toBeInTheDocument();
    expect(screen.getByText('Explainer Lab')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Archive Explainer Lab' })).toBeInTheDocument();
  });
});
