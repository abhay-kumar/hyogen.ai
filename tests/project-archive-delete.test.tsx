import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { archiveProject, createSourceOnlyProject, listProjects } from '../src/projects';
import { saveWorkspace } from '../src/workspace';

describe('project archive/delete', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createSourceOnlyProject({ prompt: 'Explain local-first AI', brandProfileName: 'Explainer Lab' });
  });

  it('archives and deletes a Project with confirmation', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Archive Explain local-first AI' }));
    expect(screen.getByText('Archived Project: Explain local-first AI')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete Explain local-first AI' }));
    expect(screen.getByText('Deleted Project: Explain local-first AI')).toBeInTheDocument();
    expect(listProjects()).toHaveLength(0);
  });
});
