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

export function repairScriptProviderOutput(
  output: unknown,
  storage: Storage = window.localStorage,
): ScriptDraft {
  const candidate = output && typeof output === 'object' ? (output as Partial<ScriptDraft>) : {};
  const draft: ScriptDraft = {
    content:
      typeof candidate.content === 'string' && candidate.content.trim()
        ? candidate.content
        : 'Hook: This repaired draft needs creator review before approval.',
    citationUrl:
      typeof candidate.citationUrl === 'string' && candidate.citationUrl.trim()
        ? candidate.citationUrl
        : 'unverified',
  };
  recordRunTraceEvent(
    {
      type: 'script.output.repaired',
      summary: 'Malformed script provider output repaired',
      data: { citationUrl: draft.citationUrl },
    },
    storage,
  );
  return draft;
}
