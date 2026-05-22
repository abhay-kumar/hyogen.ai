import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { listRunTraceEvents } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('mock Provider Connection health check', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'OpenAI', secret: 'sk-secret-value' });
  });

  it('reports mock provider health and records a Run Trace event', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Run Provider Health Check' }));

    expect(screen.getByText('OpenAI health: healthy')).toBeInTheDocument();
    expect(listRunTraceEvents()).toContainEqual(
      expect.objectContaining({
        type: 'provider.health.checked',
        summary: 'Provider health checked',
        data: { providerName: 'OpenAI', status: 'healthy' },
      }),
    );
  });
});
