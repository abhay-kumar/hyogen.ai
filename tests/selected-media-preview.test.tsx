import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { importLocalVideoCandidate, listMediaCandidates } from '../src/mediaPool';
import { assignMediaCandidateToShot } from '../src/selectedMedia';
import { generateVideoContactSheet } from '../src/videoContactSheets';
import { saveWorkspace } from '../src/workspace';

describe('Selected Media preview', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const candidate = importLocalVideoCandidate('/Users/creator/Movies/clip.mp4');
    generateVideoContactSheet(candidate);
    assignMediaCandidateToShot(listMediaCandidates()[0]);
  });

  it('shows a contact sheet preview for Selected Media approval', () => {
    render(<App />);

    expect(screen.getByText('Selected Media: Shot 1 -> clip.mp4')).toBeInTheDocument();
    expect(screen.getByText('Preview: contact-sheets/clip.jpg')).toBeInTheDocument();
  });
});
