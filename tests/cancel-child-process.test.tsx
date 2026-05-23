import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { cancelHeavyJob, enqueueHeavyJob, listHeavyJobs } from '../src/heavyJobQueue';
import { listRunTraceEvents } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('cancel long-running child process', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    enqueueHeavyJob({ kind: 'render', label: 'FFmpeg final assembly' });
  });

  it('cancels the running child process and retains partial traces', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Cancel FFmpeg final assembly' }));

    expect(screen.getByText('Heavy Job: render cancelled')).toBeInTheDocument();
    expect(screen.getByText('Partial trace retained for FFmpeg final assembly')).toBeInTheDocument();
    expect(listHeavyJobs()[0]).toMatchObject({ status: 'cancelled', partialTraceRetained: true });
    expect(listRunTraceEvents()).toContainEqual(expect.objectContaining({ type: 'heavyJob.cancelled' }));
    expect(cancelHeavyJob('missing-job')).toBeNull();
  });
});
