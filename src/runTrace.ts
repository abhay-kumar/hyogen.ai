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
