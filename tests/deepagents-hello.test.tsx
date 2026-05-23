import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';

describe('DeepAgents hello run', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('records a DeepAgents hello run into the trace viewer', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Run DeepAgents Hello' }));
    await user.click(screen.getByRole('button', { name: 'Show Run Trace' }));

    expect(screen.getByText('DeepAgents hello: ready for Guided Workflow')).toBeInTheDocument();
    expect(screen.getByText(/deepagents\.hello/)).toBeInTheDocument();
    expect(screen.getAllByText(/ready for Guided Workflow/).length).toBeGreaterThanOrEqual(2);
  });
});
