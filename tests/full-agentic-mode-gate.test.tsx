import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { createProviderConnection } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('Full Agentic Mode gate', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
    createProviderConnection({ name: 'OpenAI', secret: 'sk-secret-value' });
  });

  it('disables Full Agentic Mode when search/discovery capability is missing', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Create Project' }));

    expect(screen.getByLabelText('Full Agentic Mode')).toBeDisabled();
    expect(
      screen.getByText('Full Agentic Mode requires search/discovery capability.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Source-Only Mode')).toBeChecked();
  });
});
