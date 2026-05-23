import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { createProviderConnection } from '../src/providerConnections';
import { createSourceOnlyProject } from '../src/projects';
import { materializeSourceUrls } from '../src/sourceMaterial';
import { saveWorkspace } from '../src/workspace';

describe('script Quality Findings', () => {
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

  it('shows hook, intro, and citation Quality Findings for a Script Draft', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Script Draft' }));
    await user.click(screen.getByRole('button', { name: 'Evaluate Script Quality' }));

    expect(screen.getByRole('heading', { name: 'Quality Findings' })).toBeInTheDocument();
    expect(screen.getByText('Hook strength: pass')).toBeInTheDocument();
    expect(screen.getByText('Generic intro: pass')).toBeInTheDocument();
    expect(screen.getByText('Citation coverage: pass')).toBeInTheDocument();
  });
});
