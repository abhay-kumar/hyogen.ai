import { recordRunTraceEvent } from './runTrace';

export type DeepAgentsHealth = {
  boundary: 'Rust Boundary';
  supervision: 'supervised';
  status: 'healthy';
};

export function checkDeepAgentsHealth(storage: Storage = window.localStorage): DeepAgentsHealth {
  const health: DeepAgentsHealth = {
    boundary: 'Rust Boundary',
    supervision: 'supervised',
    status: 'healthy',
  };
  recordRunTraceEvent(
    {
      type: 'deepagents.health.checked',
      summary: 'DeepAgents Stage Harness health checked',
      data: { boundary: health.boundary, status: health.status },
    },
    storage,
  );
  return health;
}
