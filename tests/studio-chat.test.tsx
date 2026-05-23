import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listRunTraceEvents } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('Studio chat with mock harness', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('sends a Creator message and shows a mock harness response', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Message hyogen'), 'Draft a short about AI agents');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByText('Creator: Draft a short about AI agents')).toBeInTheDocument();
    expect(
      screen.getByText('DeepAgents Stage Harness: I captured your intent for the Guided Workflow.'),
    ).toBeInTheDocument();
    expect(listRunTraceEvents()).toContainEqual(
      expect.objectContaining({
        type: 'studio.chat.responded',
        summary: 'Mock harness responded to Studio chat',
      }),
    );
  });
});
