import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { createProviderConnection } from '../src/providerConnections';
import { createSourceOnlyProject } from '../src/projects';
import { materializeSourceUrls } from '../src/sourceMaterial';
import { saveWorkspace } from '../src/workspace';

describe('script change request', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
    createProviderConnection({ name: 'OpenAI', secret: 'sk-secret-value' });
    const project = createSourceOnlyProject({
      prompt: 'Explain local-first AI',
      brandProfileName: 'Explainer Lab',
      sourceUrl: 'https://example.com/source',
    });
    materializeSourceUrls(project.id, project.sourceUrls);
  });

  it('creates a new Script Version and marks the previous one stale', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Script Draft' }));
    await user.click(screen.getByRole('button', { name: 'Approve Script' }));
    await user.click(screen.getByRole('button', { name: 'Request Script Changes' }));
    await user.type(screen.getByLabelText('Script change instruction'), 'Make the hook punchier');
    await user.click(screen.getByRole('button', { name: 'Submit Script Changes' }));

    expect(screen.getByText('Script Version 1 — stale')).toBeInTheDocument();
    expect(screen.getByText('Script Version 2')).toBeInTheDocument();
    expect(screen.getByText(/Make the hook punchier/)).toBeInTheDocument();
  });
});
