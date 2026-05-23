import { beforeEach, describe, expect, it } from 'vitest';
import { repairScriptProviderOutput } from '../src/scriptDrafts';
import { listRunTraceEvents } from '../src/runTrace';

describe('script provider output repair', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('repairs malformed script output into a usable Script Draft shape', () => {
    const repaired = repairScriptProviderOutput({ citationUrl: 42 });

    expect(repaired).toEqual({
      content: 'Hook: This repaired draft needs creator review before approval.',
      citationUrl: 'unverified',
    });
    expect(listRunTraceEvents()).toContainEqual(
      expect.objectContaining({
        type: 'script.output.repaired',
        summary: 'Malformed script provider output repaired',
      }),
    );
  });
});
