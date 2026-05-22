import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';

describe('dashboard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows empty Brand Profile and Project sections after Workspace setup', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Workspace folder'), '/Users/creator/Hyogen');
    await user.click(screen.getByRole('button', { name: 'Use Workspace' }));

    expect(screen.getByRole('heading', { name: 'Brand Profiles' })).toBeInTheDocument();
    expect(screen.getByText('No Brand Profiles yet.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByText('No Projects yet.')).toBeInTheDocument();
  });
});
