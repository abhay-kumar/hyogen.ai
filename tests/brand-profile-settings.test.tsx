import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createBrandProfile } from '../src/brandProfiles';
import { saveWorkspace } from '../src/workspace';

describe('Brand Profile settings', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    createBrandProfile({ name: 'Explainer Lab' });
  });

  it('edits creator defaults and reloads them', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Edit Explainer Lab' }));
    await user.type(screen.getByLabelText('Audience'), 'curious founders');
    await user.type(screen.getByLabelText('Tone'), 'sharp but warm');
    await user.type(screen.getByLabelText('CTA default'), 'Follow for one useful idea daily');
    await user.type(screen.getByLabelText('Caption default'), 'bold social');
    await user.type(screen.getByLabelText('Source default'), 'primary sources first');
    await user.click(screen.getByRole('button', { name: 'Save Brand Profile Settings' }));

    expect(screen.getByText('Audience: curious founders')).toBeInTheDocument();
    expect(screen.getByText('Tone: sharp but warm')).toBeInTheDocument();
    expect(screen.getByText('CTA default: Follow for one useful idea daily')).toBeInTheDocument();
    expect(screen.getByText('Caption default: bold social')).toBeInTheDocument();
    expect(screen.getByText('Source default: primary sources first')).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText('Audience: curious founders')).toBeInTheDocument();
    expect(screen.getByText('Tone: sharp but warm')).toBeInTheDocument();
  });
});
