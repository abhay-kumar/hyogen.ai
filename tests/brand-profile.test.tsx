import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { saveWorkspace } from '../src/workspace';

describe('Brand Profile dashboard', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('creates a minimal Brand Profile and reloads it', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Create Brand Profile' }));
    await user.type(screen.getByLabelText('Brand Profile name'), 'Explainer Lab');
    await user.click(screen.getByRole('button', { name: 'Save Brand Profile' }));

    expect(screen.getByText('Explainer Lab')).toBeInTheDocument();
    expect(screen.queryByText('No Brand Profiles yet.')).not.toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText('Explainer Lab')).toBeInTheDocument();
  });
});
