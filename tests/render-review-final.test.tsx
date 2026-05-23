import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listRenders, runFfmpegSmokeRender } from '../src/renders';
import { saveWorkspace } from '../src/workspace';

describe('render review card', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    runFfmpegSmokeRender();
  });

  it('marks a render final from review card', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Mark Render Final' }));

    expect(screen.getByText('Render review: final')).toBeInTheDocument();
    expect(listRenders()[0]).toMatchObject({ status: 'final' });
  });
});
