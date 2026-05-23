import { listRunTraceEvents, type RunTraceEvent } from './runTrace';

export type TraceFilters = {
  stage?: string;
  provider?: string;
  tool?: string;
  childProcess?: string;
};

export function filterRunTraceEvents(
  filters: TraceFilters,
  storage: Storage = window.localStorage,
): RunTraceEvent[] {
  return listRunTraceEvents(storage).filter((event) =>
    (Object.entries(filters) as [keyof TraceFilters, string | undefined][]).every(([key, value]) => {
      if (!value) return true;
      return event.data[key] === value;
    }),
  );
}
