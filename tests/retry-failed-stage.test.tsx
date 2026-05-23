import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listStageRetries, recordFailedStage } from '../src/stageRetries';
import { saveWorkspace } from '../src/workspace';

describe('retry failed stage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    recordFailedStage({ stage: 'render', persistedArtifactState: 'renderInputs=1,audioArtifacts=1' });
  });

  it('retries from persisted artifact state', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Retry render from persisted artifact state' }));

    expect(screen.getByText('Stage retry: render using persisted artifact state')).toBeInTheDocument();
    expect(listStageRetries()).toContainEqual(
      expect.objectContaining({ stage: 'render', persistedArtifactState: 'renderInputs=1,audioArtifacts=1' }),
    );
  });
});
