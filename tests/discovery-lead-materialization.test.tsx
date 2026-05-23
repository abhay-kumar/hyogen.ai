import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('Discovery Lead materialization', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'SearchMock', secret: 'search-secret' });
  });

  it('materializes Discovery Leads and labels failed leads unverified', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Research query'), 'unavailable story');
    await user.click(screen.getByRole('button', { name: 'Run Provider-Native Search' }));
    await user.click(screen.getByRole('button', { name: 'Materialize Discovery Leads' }));

    expect(screen.getByText('Source Material')).toBeInTheDocument();
    expect(screen.getByText('https://search.example/unavailable-story — unverified')).toBeInTheDocument();
  });
});
