import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { isPublicMediaAcknowledged } from '../src/publicMediaRights';
import { saveWorkspace } from '../src/workspace';

describe('public media rights acknowledgement gate', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('requires one-time acknowledgement before public media workflows', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('Public media rights acknowledgement required')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Acknowledge Public Media Warnings' }));

    expect(isPublicMediaAcknowledged()).toBe(true);
    expect(screen.getByText('Public media warnings acknowledged')).toBeInTheDocument();
  });
});
