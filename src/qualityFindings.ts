import { recordRunTraceEvent } from './runTrace';
import { ScriptDraft } from './scriptDrafts';

export type QualityFinding = {
  check: 'Hook strength' | 'Generic intro' | 'Citation coverage';
  status: 'pass' | 'warning';
};

export function evaluateScriptQuality(
  draft: ScriptDraft,
  storage: Storage = window.localStorage,
): QualityFinding[] {
  const findings: QualityFinding[] = [
    { check: 'Hook strength', status: draft.content.startsWith('Hook:') ? 'pass' : 'warning' },
    { check: 'Generic intro', status: /welcome to|in this video/i.test(draft.content) ? 'warning' : 'pass' },
    { check: 'Citation coverage', status: draft.citationUrl === 'unverified' ? 'warning' : 'pass' },
  ];
  recordRunTraceEvent(
    {
      type: 'quality.script.evaluated',
      summary: 'Script Quality Findings generated',
      data: { findings },
    },
    storage,
  );
  return findings;
}
