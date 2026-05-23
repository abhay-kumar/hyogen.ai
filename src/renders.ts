import { recordRunTraceEvent } from './runTrace';

const RENDERS_STORAGE_KEY = 'hyogen.renders';

export type RenderArtifact = {
  id: string;
  path: string;
  status: 'rendered' | 'final';
  summary: string;
};

export function listRenders(storage: Storage = window.localStorage): RenderArtifact[] {
  const encoded = storage.getItem(RENDERS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as RenderArtifact[]) : [];
}

export function runFfmpegSmokeRender(storage: Storage = window.localStorage): RenderArtifact {
  const renders = listRenders(storage);
  const render: RenderArtifact = {
    id: `render-${renders.length + 1}`,
    path: 'renders/smoke.mp4',
    status: 'rendered',
    summary: 'fallback visual + TTS + captions + SRT',
  };
  storage.setItem(RENDERS_STORAGE_KEY, JSON.stringify([...renders, render]));
  recordRunTraceEvent(
    {
      type: 'render.ffmpeg.smoke.completed',
      summary: 'FFmpeg smoke render completed',
      data: { renderId: render.id, path: render.path },
    },
    storage,
  );
  return render;
}
