import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listProjects } from '../src/projects';
import { saveWorkspace } from '../src/workspace';

describe('Project import/relink', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('imports and relinks a Project from manifest', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Project manifest path'), '/Users/creator/Hyogen/old/manifest.json');
    await user.click(screen.getByRole('button', { name: 'Import Project Manifest' }));

    expect(screen.getByText('Imported Project from /Users/creator/Hyogen/old/manifest.json')).toBeInTheDocument();
    expect(listProjects()).toContainEqual(expect.objectContaining({ prompt: 'Imported Project', relinkedFromManifest: true }));
  });
});
