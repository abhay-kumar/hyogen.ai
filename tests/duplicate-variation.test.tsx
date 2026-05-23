import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalImageCandidate, listMediaCandidates } from '../src/mediaPool';
import { createSourceOnlyProject, listProjects } from '../src/projects';
import { saveWorkspace } from '../src/workspace';

describe('duplicate Variation', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createSourceOnlyProject({ prompt: 'Explain local-first AI', brandProfileName: 'Explainer Lab' });
    importLocalImageCandidate('/Users/creator/Pictures/photo.png');
  });

  it('duplicates a Variation while sharing media pool', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Duplicate Variation for Explain local-first AI' }));

    expect(screen.getByText('Variation: Explain local-first AI (Copy)')).toBeInTheDocument();
    expect(listProjects()).toContainEqual(expect.objectContaining({ variationOfProjectId: 'project-1' }));
    expect(listMediaCandidates()).toHaveLength(1);
  });
});
