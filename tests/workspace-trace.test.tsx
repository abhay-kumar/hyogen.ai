import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listRunTraceEvents } from '../src/runTrace';

describe('Workspace Run Trace', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('records a local Run Trace event when a Workspace is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Workspace folder'), '/Users/creator/Hyogen');
    await user.click(screen.getByRole('button', { name: 'Use Workspace' }));

    expect(listRunTraceEvents()).toEqual([
      expect.objectContaining({
        type: 'workspace.selected',
        summary: 'Workspace selected',
        data: { workspacePath: '/Users/creator/Hyogen' },
      }),
    ]);
  });
});
