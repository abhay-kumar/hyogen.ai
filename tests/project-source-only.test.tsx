import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { createProviderConnection } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('Project brief in Source-Only Mode', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
    createProviderConnection({ name: 'OpenAI', secret: 'sk-secret-value' });
  });

  it('creates and reloads a Project from a prompt in Source-Only Mode', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Create Project' }));
    await user.type(screen.getByLabelText('Project prompt'), 'Explain why local-first AI video matters');
    await user.selectOptions(screen.getByLabelText('Brand Profile'), 'Explainer Lab');
    await user.click(screen.getByRole('button', { name: 'Start Source-Only Project' }));

    expect(screen.getByText('Explain why local-first AI video matters')).toBeInTheDocument();
    expect(screen.getByText('Mode: Source-Only Mode')).toBeInTheDocument();
    expect(screen.getByText('Brand Profile: Explainer Lab')).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText('Explain why local-first AI video matters')).toBeInTheDocument();
  });
});
