import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listProjects } from '../src/projects';
import { saveContentRecipe } from '../src/savedContentRecipes';
import { listUsedStories } from '../src/usedStoryMemory';
import { saveWorkspace } from '../src/workspace';

describe('used-story memory', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    saveContentRecipe({ name: 'AI explainer', prompt: 'Explain one local-first AI idea with citations' });
  });

  it('blocks duplicate recipe story', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start Project from AI explainer' }));
    await user.click(screen.getByRole('button', { name: 'Start Project from AI explainer' }));

    expect(screen.getByText('Duplicate story blocked: AI explainer')).toBeInTheDocument();
    expect(listProjects()).toHaveLength(1);
    expect(listUsedStories()).toContainEqual(expect.objectContaining({ storyKey: 'explain-one-local-first-ai-idea-with-citations' }));
  });
});
