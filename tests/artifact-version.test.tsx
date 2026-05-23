import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { saveWorkspace } from '../src/workspace';

describe('Artifact Version list and detail', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('creates and reloads a mock script Artifact Version detail', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Create Mock Script Version' }));
    await user.click(screen.getByRole('button', { name: 'View Script Version 1' }));

    expect(screen.getByRole('heading', { name: 'Artifact Versions' })).toBeInTheDocument();
    expect(screen.getByText('Script Version 1')).toBeInTheDocument();
    expect(screen.getByText('Mock script for the Reference Workflow.')).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText('Script Version 1')).toBeInTheDocument();
  });
});
