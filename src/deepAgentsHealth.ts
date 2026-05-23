import { recordRunTraceEvent } from './runTrace';

export type DeepAgentsHealth = {
  boundary: 'Rust Boundary';
  supervision: 'supervised';
  status: 'healthy';
};

export type DeepAgentsHelloResult = {
  message: 'ready for Guided Workflow';
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

export function runDeepAgentsHello(storage: Storage = window.localStorage): DeepAgentsHelloResult {
  const result: DeepAgentsHelloResult = { message: 'ready for Guided Workflow' };
  recordRunTraceEvent(
    {
      type: 'deepagents.hello',
      summary: 'DeepAgents hello run completed',
      data: result,
    },
    storage,
  );
  return result;
}
