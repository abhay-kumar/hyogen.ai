import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { createProviderConnection } from '../src/providerConnections';
import { createSourceOnlyProject } from '../src/projects';
import { materializeSourceUrls } from '../src/sourceMaterial';
import { saveWorkspace } from '../src/workspace';

describe('script approval', () => {
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

  it('approves a Script Draft and shows the latest approved Artifact Version', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Script Draft' }));
    await user.click(screen.getByRole('button', { name: 'Approve Script' }));

    expect(screen.getByText('Latest approved Script: Script Version 1')).toBeInTheDocument();
    expect(screen.getByText('Script Version 1: approved')).toBeInTheDocument();
  });
});
