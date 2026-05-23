import type { MediaCandidate } from './mediaPool';
import { recordRunTraceEvent } from './runTrace';

const RENDER_INPUTS_STORAGE_KEY = 'hyogen.renderInputs';

export type RenderInput = {
  id: string;
  mediaCandidateId: string;
  sourcePath: string;
  normalizedPath: string;
  hash: string;
};

function fileNameFor(path: string): string {
  return path.split('/').at(-1) ?? path;
}

function hashFor(fileName: string): string {
  return `hash-${fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

export function listRenderInputs(storage: Storage = window.localStorage): RenderInput[] {
  const encoded = storage.getItem(RENDER_INPUTS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as RenderInput[]) : [];
}

export function createRenderInputFromMediaCandidate(
  candidate: MediaCandidate,
  storage: Storage = window.localStorage,
): RenderInput {
  const inputs = listRenderInputs(storage);
  const fileName = fileNameFor(candidate.sourcePath);
  const input: RenderInput = {
    id: `render-input-${inputs.length + 1}`,
    mediaCandidateId: candidate.id,
    sourcePath: candidate.sourcePath,
    normalizedPath: `render-inputs/${fileName}`,
    hash: hashFor(fileName),
  };
  storage.setItem(RENDER_INPUTS_STORAGE_KEY, JSON.stringify([...inputs, input]));
  recordRunTraceEvent(
    {
      type: 'render.input.normalized',
      summary: 'Media Candidate normalized as Render Input',
      data: { mediaCandidateId: candidate.id, normalizedPath: input.normalizedPath, hash: input.hash },
    },
    storage,
  );
  return input;
}
