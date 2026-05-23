import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMediaCandidates } from '../src/mediaPool';
import { scanWatchFolder } from '../src/watchFolders';
import { saveWorkspace } from '../src/workspace';

describe('watch folder ingest', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('detects new files as Media Candidates', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Watch folder path'), '/Users/creator/Downloads');
    await user.click(screen.getByRole('button', { name: 'Scan Watch Folder' }));

    expect(screen.getByText('Watch Folder imported: watched-image.png')).toBeInTheDocument();
    expect(listMediaCandidates()).toContainEqual(expect.objectContaining({ title: 'watched-image.png' }));
    expect(scanWatchFolder('/Users/creator/Downloads')).toHaveLength(0);
  });
});
