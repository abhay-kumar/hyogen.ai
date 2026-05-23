import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listMetadataPackages } from '../src/metadataPackage';
import { runFfmpegSmokeRender } from '../src/renders';
import { saveWorkspace } from '../src/workspace';

describe('metadata package revision loop', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    runFfmpegSmokeRender();
  });

  it('generates metadata package and revises it through chat-style instruction', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Generate Metadata Package' }));
    expect(screen.getByText('Metadata Title: Why local-first AI video matters')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Metadata revision'), 'make title punchier');
    await user.click(screen.getByRole('button', { name: 'Submit Metadata Revision' }));

    expect(screen.getByText('Metadata Title: Local-first AI video changes everything')).toBeInTheDocument();
    expect(listMetadataPackages()[0]).toMatchObject({ revisionCount: 1 });
  });
});
