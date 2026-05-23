import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listApprovalDecisions } from '../src/approvalGates';
import { generateMockVisualPlan, listVisualPlans } from '../src/visualPlans';
import { saveWorkspace } from '../src/workspace';

describe('Visual Plan approval', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateMockVisualPlan('Hook: Local-first AI video matters.\nBody: Creators need control.');
  });

  it('approves a Visual Plan through an Approval Gate', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Approve Visual Plan' }));

    expect(screen.getByText('Visual Plan: approved')).toBeInTheDocument();
    expect(listVisualPlans()[0]).toMatchObject({ approved: true });
    expect(listApprovalDecisions()).toContainEqual(
      expect.objectContaining({ target: 'Visual Plan 1', decision: 'approved' }),
    );
  });
});
