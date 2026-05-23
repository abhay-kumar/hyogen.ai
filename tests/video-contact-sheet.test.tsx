import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalVideoCandidate } from '../src/mediaPool';
import { listVideoContactSheets } from '../src/videoContactSheets';
import { saveWorkspace } from '../src/workspace';

describe('video contact sheet generation', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    importLocalVideoCandidate('/Users/creator/Movies/clip.mp4');
  });

  it('generates contact sheet and keyframes for a local video Media Candidate', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Contact Sheet for clip.mp4' }));

    expect(screen.getByRole('heading', { name: 'Video Contact Sheets' })).toBeInTheDocument();
    expect(screen.getByText('contact-sheets/clip.jpg — keyframes: 00:00, 00:04, 00:08')).toBeInTheDocument();
    expect(listVideoContactSheets()).toContainEqual(
      expect.objectContaining({
        contactSheetPath: 'contact-sheets/clip.jpg',
        keyframes: ['00:00', '00:04', '00:08'],
      }),
    );
  });
});
