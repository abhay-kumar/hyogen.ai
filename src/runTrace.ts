const RUN_TRACE_STORAGE_KEY = 'hyogen.runTrace.events';

export type RunTraceEvent = {
  id: string;
  type: string;
  summary: string;
  data: Record<string, unknown>;
  recordedAt: string;
};

export function listRunTraceEvents(storage: Storage = window.localStorage): RunTraceEvent[] {
  const encoded = storage.getItem(RUN_TRACE_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as RunTraceEvent[]) : [];
}

export function recordRunTraceEvent(
  event: Omit<RunTraceEvent, 'id' | 'recordedAt'>,
  storage: Storage = window.localStorage,
): RunTraceEvent {
  const events = listRunTraceEvents(storage);
  const recorded: RunTraceEvent = {
    ...event,
    id: `trace-event-${events.length + 1}`,
    recordedAt: new Date().toISOString(),
  };
  storage.setItem(RUN_TRACE_STORAGE_KEY, JSON.stringify([...events, recorded]));
  return recorded;
}

export function redactedRunTraceJson(storage: Storage = window.localStorage): string {
  return JSON.stringify(redactSecrets(listRunTraceEvents(storage)), null, 2);
}

function redactSecrets(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redactSecrets);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [
        key,
        isSecretKey(key) ? '[redacted]' : redactSecrets(nested),
      ]),
    );
  }

  return value;
}

function isSecretKey(key: string): boolean {
  return /api[-_]?key|token|secret|password/i.test(key);
}
