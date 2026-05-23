import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { generateCleanupPlan, listCleanupPlans } from '../src/cleanup';
import { listRunTraceEvents } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('cleanup execution', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    generateCleanupPlan();
  });

  it('executes cleanup after approval and traces deletion', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Approve and Execute Cleanup' }));

    expect(screen.getByText('Cleanup executed: raw-downloads, temp-renders')).toBeInTheDocument();
    expect(listCleanupPlans()[0]).toMatchObject({ executed: true });
    expect(listRunTraceEvents()).toContainEqual(expect.objectContaining({ type: 'cleanup.executed' }));
  });
});
