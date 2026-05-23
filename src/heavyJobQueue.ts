import { recordRunTraceEvent } from './runTrace';

const HEAVY_JOBS_STORAGE_KEY = 'hyogen.heavyJobs';

export type HeavyJobKind = 'tts' | 'render' | 'download';
export type HeavyJobStatus = 'queued' | 'running' | 'completed' | 'cancelled';

export type HeavyJob = {
  id: string;
  kind: HeavyJobKind;
  label: string;
  status: HeavyJobStatus;
};

export function listHeavyJobs(storage: Storage = window.localStorage): HeavyJob[] {
  const encoded = storage.getItem(HEAVY_JOBS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as HeavyJob[]) : [];
}

function saveHeavyJobs(jobs: HeavyJob[], storage: Storage): void {
  storage.setItem(HEAVY_JOBS_STORAGE_KEY, JSON.stringify(jobs));
}

export function nextRunningHeavyJob(storage: Storage = window.localStorage): HeavyJob | null {
  return listHeavyJobs(storage).find((job) => job.status === 'running') ?? null;
}

export function enqueueHeavyJob(
  input: { kind: HeavyJobKind; label: string },
  storage: Storage = window.localStorage,
): HeavyJob {
  const jobs = listHeavyJobs(storage);
  const hasRunningJob = jobs.some((job) => job.status === 'running');
  const job: HeavyJob = {
    id: `heavy-job-${jobs.length + 1}`,
    kind: input.kind,
    label: input.label,
    status: hasRunningJob ? 'queued' : 'running',
  };
  saveHeavyJobs([...jobs, job], storage);
  recordRunTraceEvent(
    {
      type: 'heavyJob.queued',
      summary: `Heavy job ${job.status === 'running' ? 'started' : 'queued'}: ${input.kind}`,
      data: { heavyJobId: job.id, kind: job.kind, status: job.status },
    },
    storage,
  );
  return job;
}

export function completeHeavyJob(
  heavyJobId: string,
  storage: Storage = window.localStorage,
): HeavyJob | null {
  let completedJob: HeavyJob | null = null;
  let promotedQueuedJob = false;
  const jobs: HeavyJob[] = listHeavyJobs(storage).map((job): HeavyJob => {
    if (job.id === heavyJobId) {
      completedJob = { ...job, status: 'completed' };
      return completedJob;
    }
    if (!promotedQueuedJob && job.status === 'queued') {
      promotedQueuedJob = true;
      return { ...job, status: 'running' };
    }
    return job;
  });
  saveHeavyJobs(jobs, storage);
  recordRunTraceEvent(
    {
      type: 'heavyJob.completed',
      summary: 'Heavy job completed and next queued job promoted',
      data: { heavyJobId },
    },
    storage,
  );
  return completedJob;
}
