import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { exportSafeDebugBundle, listDebugBundles } from '../src/debugBundle';
import { saveWorkspace } from '../src/workspace';

describe('safe debug bundle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'OpenAI', secret: 'sk-live-secret' });
  });

  it('exports a safe debug bundle with redacted secrets', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Export Safe Debug Bundle' }));

    expect(screen.getByText('Safe Debug Bundle: debug/safe-debug-bundle.json')).toBeInTheDocument();
    expect(JSON.stringify(listDebugBundles()[0])).not.toContain('sk-live-secret');
    expect(exportSafeDebugBundle().redactedSecrets).toBe(true);
  });
});
