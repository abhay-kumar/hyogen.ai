import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { runFfmpegSmokeRender } from '../src/renders';
import { listTechnicalQaFindings } from '../src/technicalQa';
import { saveWorkspace } from '../src/workspace';

describe('local technical QA', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    runFfmpegSmokeRender();
  });

  it('runs technical QA and shows Quality Findings', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Run Technical QA' }));

    expect(screen.getByText('Technical QA: resolution pass')).toBeInTheDocument();
    expect(screen.getByText('Technical QA: loudness warning')).toBeInTheDocument();
    expect(listTechnicalQaFindings()).toHaveLength(2);
  });
});
