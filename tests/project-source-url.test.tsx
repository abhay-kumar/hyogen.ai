import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { saveWorkspace } from '../src/workspace';

describe('Project source URL brief', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
  });

  it('stores a source URL with the Project brief', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Create Project' }));
    await user.type(screen.getByLabelText('Project prompt'), 'Explain local-first AI');
    await user.type(screen.getByLabelText('Source URL'), 'https://example.com/source');
    await user.selectOptions(screen.getByLabelText('Brand Profile'), 'Explainer Lab');
    await user.click(screen.getByRole('button', { name: 'Start Source-Only Project' }));

    expect(screen.getByText('Source URLs')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/source')).toBeInTheDocument();
  });
});
