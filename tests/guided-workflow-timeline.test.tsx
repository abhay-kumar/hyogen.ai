import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { saveWorkspace } from '../src/workspace';

describe('mock Guided Workflow timeline', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('shows a read-only stage timeline in the Studio', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Guided Workflow' })).toBeInTheDocument();
    expect(screen.getByText('ProjectBrief — current')).toBeInTheDocument();
    expect(screen.getByText('ScriptDraft — pending')).toBeInTheDocument();
    expect(screen.getByText('ScriptReview — pending')).toBeInTheDocument();
  });
});
