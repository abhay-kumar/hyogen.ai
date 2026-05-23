import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listApprovalDecisions } from '../src/approvalGates';
import { saveWorkspace } from '../src/workspace';

describe('Approval Gate', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('persists an Approval Gate decision and reloads it', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Approve Mock Decision' }));

    expect(screen.getByText('Mock Decision: approved')).toBeInTheDocument();
    expect(listApprovalDecisions()).toContainEqual(
      expect.objectContaining({ target: 'Mock Decision', decision: 'approved' }),
    );

    unmount();
    render(<App />);

    expect(screen.getByText('Mock Decision: approved')).toBeInTheDocument();
  });
});
