import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { createSourceOnlyProject } from '../src/projects';
import { listRunTraceEvents } from '../src/runTrace';
import { saveWorkspace } from '../src/workspace';

describe('Source Material materialization', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
    createSourceOnlyProject({
      prompt: 'Explain local-first AI',
      brandProfileName: 'Explainer Lab',
      sourceUrl: 'https://example.com/source',
    });
  });

  it('fetches a direct URL as Source Material with status and trace output', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Materialize Source URLs' }));

    expect(screen.getByText('Source Material')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/source — materialized')).toBeInTheDocument();
    expect(listRunTraceEvents()).toContainEqual(
      expect.objectContaining({
        type: 'source.materialized',
        summary: 'Source Material materialized',
        data: { url: 'https://example.com/source', status: 'materialized' },
      }),
    );
  });
});
