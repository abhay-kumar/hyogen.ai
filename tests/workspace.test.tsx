import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';

describe('Workspace first-run setup', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('persists the selected Workspace and reloads it', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.type(screen.getByLabelText('Workspace folder'), '/Users/creator/Hyogen');
    await user.click(screen.getByRole('button', { name: 'Use Workspace' }));

    expect(screen.getByText('/Users/creator/Hyogen')).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText('/Users/creator/Hyogen')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use Workspace' })).not.toBeInTheDocument();
  });
});
