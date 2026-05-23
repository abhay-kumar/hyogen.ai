import { recordRunTraceEvent } from './runTrace';

const FAILED_STAGES_STORAGE_KEY = 'hyogen.failedStages';
const STAGE_RETRIES_STORAGE_KEY = 'hyogen.stageRetries';

export type FailedStage = {
  id: string;
  stage: string;
  persistedArtifactState: string;
};

export type StageRetry = FailedStage & {
  retried: true;
};

export function listFailedStages(storage: Storage = window.localStorage): FailedStage[] {
  const encoded = storage.getItem(FAILED_STAGES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as FailedStage[]) : [];
}

export function listStageRetries(storage: Storage = window.localStorage): StageRetry[] {
  const encoded = storage.getItem(STAGE_RETRIES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as StageRetry[]) : [];
}

export function recordFailedStage(
  input: { stage: string; persistedArtifactState: string },
  storage: Storage = window.localStorage,
): FailedStage {
  const failedStages = listFailedStages(storage);
  const failedStage: FailedStage = {
    id: `failed-stage-${failedStages.length + 1}`,
    stage: input.stage,
    persistedArtifactState: input.persistedArtifactState,
  };
  storage.setItem(FAILED_STAGES_STORAGE_KEY, JSON.stringify([...failedStages, failedStage]));
  recordRunTraceEvent(
    {
      type: 'stage.failed',
      summary: 'Stage failed with persisted artifact state',
      data: failedStage,
    },
    storage,
  );
  return failedStage;
}

export function retryFailedStage(
  failedStageId: string,
  storage: Storage = window.localStorage,
): StageRetry | null {
  const failedStage = listFailedStages(storage).find((stage) => stage.id === failedStageId);
  if (!failedStage) return null;
  const retries = listStageRetries(storage);
  const retry: StageRetry = { ...failedStage, id: `stage-retry-${retries.length + 1}`, retried: true };
  storage.setItem(STAGE_RETRIES_STORAGE_KEY, JSON.stringify([...retries, retry]));
  recordRunTraceEvent(
    {
      type: 'stage.retry.started',
      summary: 'Failed stage retried from persisted artifact state',
      data: retry,
    },
    storage,
  );
  return retry;
}
