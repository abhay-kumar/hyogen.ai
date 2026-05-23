import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createGoogleImagesFallbackCandidate, listMediaCandidates } from '../src/mediaPool';
import { assignMediaCandidateToShot, listSelectedMedia } from '../src/selectedMedia';
import { saveWorkspace } from '../src/workspace';

describe('Selected Media rights approval', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const candidate = createGoogleImagesFallbackCandidate('robot kitchen');
    assignMediaCandidateToShot(candidate);
  });

  it('persists rights warning when approving Selected Media', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Approve Selected Media' }));

    expect(screen.getByText('Selected Media approval: approved')).toBeInTheDocument();
    expect(screen.getByText('Rights warning persisted: public-media: unknown-rights')).toBeInTheDocument();
    expect(listSelectedMedia()[0]).toMatchObject({ approved: true, rightsWarningPersisted: true });
    expect(listMediaCandidates()[0]).toMatchObject({ rightsLabel: 'public-media: unknown-rights' });
  });
});
