import { beforeEach, describe, expect, it } from 'vitest';
import {
  completeHeavyJob,
  enqueueHeavyJob,
  listHeavyJobs,
  nextRunningHeavyJob,
} from '../src/heavyJobQueue';

describe('one-heavy-job queue', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('allows one running TTS/render/download job and queues the rest', () => {
    const ttsJob = enqueueHeavyJob({ kind: 'tts', label: 'Generate narration' });
    const renderJob = enqueueHeavyJob({ kind: 'render', label: 'FFmpeg final assembly' });
    const downloadJob = enqueueHeavyJob({ kind: 'download', label: 'yt-dlp source clip' });

    expect(ttsJob.status).toBe('running');
    expect(renderJob.status).toBe('queued');
    expect(downloadJob.status).toBe('queued');
    expect(nextRunningHeavyJob()).toMatchObject({ kind: 'tts' });

    completeHeavyJob(ttsJob.id);
    expect(listHeavyJobs()).toContainEqual(expect.objectContaining({ id: renderJob.id, status: 'running' }));
    expect(listHeavyJobs()).toContainEqual(expect.objectContaining({ id: downloadJob.id, status: 'queued' }));
  });
});
