import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listRunTraceEvents } from '../src/runTrace';

describe('DeepAgents Stage Harness health', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('checks Stage Harness health through the Rust Boundary and traces the result', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Check DeepAgents Health' }));

    expect(screen.getByRole('heading', { name: 'DeepAgents Stage Harness' })).toBeInTheDocument();
    expect(screen.getByText('Rust Boundary: supervised')).toBeInTheDocument();
    expect(screen.getByText('DeepAgents Stage Harness health: healthy')).toBeInTheDocument();
    expect(listRunTraceEvents()).toContainEqual(
      expect.objectContaining({
        type: 'deepagents.health.checked',
        summary: 'DeepAgents Stage Harness health checked',
        data: { boundary: 'Rust Boundary', status: 'healthy' },
      }),
    );
  });
});
