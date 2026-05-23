import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('research progress summary', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'SearchMock', secret: 'search-secret' });
  });

  it('summarizes search progress and lets the user expand trace detail', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Research query'), 'local-first AI video');
    await user.click(screen.getByRole('button', { name: 'Run Provider-Native Search' }));

    expect(screen.getByText('Research progress: 1 Discovery Lead, 0 Source Material')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show Run Trace' }));

    expect(screen.getByText(/discovery\.leads\.created/)).toBeInTheDocument();
  });
});
