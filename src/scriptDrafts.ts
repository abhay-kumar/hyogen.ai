import { createScriptVersion } from './artifactVersions';
import { recordRunTraceEvent } from './runTrace';
import { SourceMaterial } from './sourceMaterial';

export type ScriptDraft = {
  content: string;
  citationUrl: string;
};

export function generateMockCitedScriptDraft(
  sources: SourceMaterial[],
  storage: Storage = window.localStorage,
): ScriptDraft {
  const citation = sources.find((source) => source.status === 'materialized')?.url ?? 'unverified';
  const draft: ScriptDraft = {
    content: 'Hook: Local-first AI video matters because creators need trust, speed, and control.',
    citationUrl: citation,
  };
  createScriptVersion(`${draft.content}\nCitation: ${draft.citationUrl}`, storage);
  recordRunTraceEvent(
    {
      type: 'script.draft.generated',
      summary: 'Script Draft generated from Source Material',
      data: { citationUrl: draft.citationUrl },
    },
    storage,
  );
  return draft;
}
