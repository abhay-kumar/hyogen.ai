import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { recordRunTraceEvent } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('Run Trace detail view', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows redacted event JSON for local diagnostics', async () => {
    saveWorkspace('/Users/creator/Hyogen');
    recordRunTraceEvent({
      type: 'provider.probed',
      summary: 'Provider probe failed',
      data: { apiKey: 'sk-secret-value', provider: 'OpenAI' },
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Show Run Trace' }));

    expect(screen.getByText(/provider\.probed/)).toBeInTheDocument();
    expect(screen.getByText(/\[redacted\]/)).toBeInTheDocument();
    expect(screen.queryByText(/sk-secret-value/)).not.toBeInTheDocument();
  });
});
