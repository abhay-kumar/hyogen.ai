import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { filterRunTraceEvents } from '../src/traceFilters';
import { recordRunTraceEvent } from '../src/runTrace';

describe('trace viewer filters', () => {
  beforeEach(() => {
    window.localStorage.clear();
    recordRunTraceEvent({
      type: 'stage.render',
      summary: 'FFmpeg render',
      data: { stage: 'render', provider: 'local', tool: 'ffmpeg', childProcess: 'ffmpeg-1' },
    });
    recordRunTraceEvent({
      type: 'stage.tts',
      summary: 'TTS generation',
      data: { stage: 'tts', provider: 'openai', tool: 'tts', childProcess: 'tts-1' },
    });
  });

  it('filters by stage, provider, tool, and child process', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Trace stage filter'), 'render');
    await user.type(screen.getByLabelText('Trace provider filter'), 'local');
    await user.type(screen.getByLabelText('Trace tool filter'), 'ffmpeg');
    await user.type(screen.getByLabelText('Trace child process filter'), 'ffmpeg-1');
    await user.click(screen.getByRole('button', { name: 'Apply Trace Filters' }));

    expect(screen.getByText('Filtered trace: FFmpeg render')).toBeInTheDocument();
    expect(screen.queryByText('Filtered trace: TTS generation')).not.toBeInTheDocument();
    expect(filterRunTraceEvents({ stage: 'tts' })).toHaveLength(1);
  });
});
