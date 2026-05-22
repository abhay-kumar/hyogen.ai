import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { saveWorkspace } from '../src/workspace';

describe('Provider Capability checklist', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'OpenAI', secret: 'sk-secret-value' });
  });

  it('shows ready capabilities and degraded-mode warnings', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Provider Capability checklist' })).toBeInTheDocument();
    expect(screen.getByText('Text LLM: ready')).toBeInTheDocument();
    expect(screen.getByText('TTS plain: missing')).toBeInTheDocument();
    expect(screen.getByText('Search/discovery: missing')).toBeInTheDocument();
    expect(
      screen.getByText('Full Agentic Mode degraded until search/discovery is configured.'),
    ).toBeInTheDocument();
  });
});
