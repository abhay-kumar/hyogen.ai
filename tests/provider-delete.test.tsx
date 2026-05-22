import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { credentialExists } from '../src/credentialManager';
import { createProviderConnection, listProviderConnections } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('Provider Connection deletion', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'OpenAI', secret: 'sk-secret-value' });
  });

  it('deletes the Provider Connection and removes its credential reference', async () => {
    const [{ credentialRef }] = listProviderConnections();
    expect(credentialExists(credentialRef)).toBe(true);

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Delete OpenAI' }));

    expect(screen.queryByText('OpenAI')).not.toBeInTheDocument();
    expect(listProviderConnections()).toEqual([]);
    expect(credentialExists(credentialRef)).toBe(false);
  });
});
