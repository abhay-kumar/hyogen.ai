import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalImageCandidate } from '../src/mediaPool';
import { assignMediaCandidateToShot } from '../src/selectedMedia';
import { listSelectedMediaValidations } from '../src/selectedMediaValidation';
import { saveWorkspace } from '../src/workspace';

describe('Selected Media validation', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const candidate = importLocalImageCandidate('/Users/creator/Pictures/photo.png');
    assignMediaCandidateToShot(candidate);
  });

  it('validates Selected Media against Shot intent with a mock vision provider', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Validate Selected Media' }));

    expect(screen.getByText('Vision validation: compatible with fallback kinetic text')).toBeInTheDocument();
    expect(listSelectedMediaValidations()).toContainEqual(
      expect.objectContaining({ status: 'compatible', shotIntent: 'fallback kinetic text' }),
    );
  });
});
