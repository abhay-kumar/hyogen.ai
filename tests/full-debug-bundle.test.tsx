import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createProviderConnection } from '../src/providerConnections';
import { exportFullDebugBundle, listDebugBundles } from '../src/debugBundle';
import { saveWorkspace } from '../src/workspace';

describe('full debug bundle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createProviderConnection({ name: 'OpenAI', secret: 'sk-live-secret' });
  });

  it('exports a full debug bundle only after warning acknowledgement', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByRole('button', { name: 'Export Full Debug Bundle' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Acknowledge Full Debug Bundle Warning' }));
    await user.click(screen.getByRole('button', { name: 'Export Full Debug Bundle' }));

    expect(screen.getByText('Full Debug Bundle: debug/full-debug-bundle.json')).toBeInTheDocument();
    expect(JSON.stringify(listDebugBundles()[0])).toContain('sk-live-secret');
    expect(exportFullDebugBundle().warningAcknowledged).toBe(true);
  });
});
