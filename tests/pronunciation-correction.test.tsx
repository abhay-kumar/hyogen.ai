import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listPronunciationCorrections } from '../src/pronunciationDictionary';
import { saveWorkspace } from '../src/workspace';

describe('pronunciation correction dictionary', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('updates project dictionary after approval', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Pronunciation correction'), 'Hyogen = high-oh-gen');
    await user.click(screen.getByRole('button', { name: 'Approve Pronunciation Correction' }));

    expect(screen.getByText('Pronunciation Dictionary: Hyogen = high-oh-gen')).toBeInTheDocument();
    expect(listPronunciationCorrections()).toContainEqual(
      expect.objectContaining({ entry: 'Hyogen = high-oh-gen', approved: true }),
    );
  });
});
