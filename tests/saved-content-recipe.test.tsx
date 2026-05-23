import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listSavedContentRecipes } from '../src/savedContentRecipes';
import { saveWorkspace } from '../src/workspace';

describe('Saved Content Recipe', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('creates and edits a Saved Content Recipe', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Recipe name'), 'AI explainer');
    await user.type(screen.getByLabelText('Recipe prompt'), 'Explain one AI idea with citations');
    await user.click(screen.getByRole('button', { name: 'Save Content Recipe' }));
    await user.click(screen.getByRole('button', { name: 'Edit AI explainer' }));
    await user.clear(screen.getByLabelText('Recipe prompt'));
    await user.type(screen.getByLabelText('Recipe prompt'), 'Explain one local-first AI idea with citations');
    await user.click(screen.getByRole('button', { name: 'Save Content Recipe' }));

    expect(screen.getByText('Saved Content Recipe: AI explainer')).toBeInTheDocument();
    expect(listSavedContentRecipes()[0]).toMatchObject({ prompt: 'Explain one local-first AI idea with citations' });
  });
});
