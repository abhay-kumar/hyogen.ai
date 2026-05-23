import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listProjects } from '../src/projects';
import { saveContentRecipe } from '../src/savedContentRecipes';
import { saveWorkspace } from '../src/workspace';

describe('Project from Saved Content Recipe', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    saveContentRecipe({ name: 'AI explainer', prompt: 'Explain one local-first AI idea with citations' });
  });

  it('starts a Project from a Saved Content Recipe', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start Project from AI explainer' }));

    expect(screen.getByText('Project from Recipe: AI explainer')).toBeInTheDocument();
    expect(listProjects()).toContainEqual(
      expect.objectContaining({ prompt: 'Explain one local-first AI idea with citations', recipeId: 'saved-content-recipe-1' }),
    );
  });
});
