import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listArtifactVersions } from '../src/artifactVersions';
import { createBrandProfile } from '../src/brandProfiles';
import { createProviderConnection } from '../src/providerConnections';
import { createSourceOnlyProject } from '../src/projects';
import { materializeSourceUrls } from '../src/sourceMaterial';
import { saveWorkspace } from '../src/workspace';

describe('cited Script Draft generation', () => {
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

  it('generates a cited Script Draft Artifact Version from Source Material', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Script Draft' }));

    expect(screen.getByText('Script Draft')).toBeInTheDocument();
    expect(screen.getByText(/Hook: Local-first AI video matters/)).toBeInTheDocument();
    expect(screen.getByText('Citation: https://example.com/source')).toBeInTheDocument();
    expect(listArtifactVersions()).toContainEqual(
      expect.objectContaining({
        kind: 'script',
        label: 'Script Version 1',
      }),
    );
  });
});
