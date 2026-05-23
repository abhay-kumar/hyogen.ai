import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { listSourceMaterial } from '../src/sourceMaterial';
import { saveWorkspace } from '../src/workspace';

describe('provider-native search Discovery Leads', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'SearchMock', secret: 'search-secret' });
  });

  it('returns Discovery Leads without treating them as Source Material', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Research query'), 'local-first AI video');
    await user.click(screen.getByRole('button', { name: 'Run Provider-Native Search' }));

    expect(screen.getByRole('heading', { name: 'Discovery Leads' })).toBeInTheDocument();
    expect(screen.getByText('https://search.example/local-first-ai-video')).toBeInTheDocument();
    expect(listSourceMaterial()).toEqual([]);
  });
});
