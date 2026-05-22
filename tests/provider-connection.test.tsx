import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listProviderConnections } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('Provider Connection setup', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('stores a Provider Connection with a credential reference instead of exposing the raw secret', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Add Provider Connection' }));
    await user.type(screen.getByLabelText('Provider name'), 'OpenAI');
    await user.type(screen.getByLabelText('API key'), 'sk-secret-value');
    await user.click(screen.getByRole('button', { name: 'Save Provider Connection' }));

    expect(screen.getByText('OpenAI')).toBeInTheDocument();
    expect(screen.getByText('keychain:provider-connection-1')).toBeInTheDocument();
    expect(screen.queryByText('sk-secret-value')).not.toBeInTheDocument();
    expect(listProviderConnections()).toEqual([
      expect.objectContaining({
        name: 'OpenAI',
        credentialRef: 'keychain:provider-connection-1',
      }),
    ]);

    unmount();
    render(<App />);

    expect(screen.getByText('OpenAI')).toBeInTheDocument();
    expect(screen.queryByText('sk-secret-value')).not.toBeInTheDocument();
  });
});
