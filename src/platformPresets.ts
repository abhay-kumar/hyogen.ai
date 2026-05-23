import { listProjects } from './projects';
import { recordRunTraceEvent } from './runTrace';

const PLATFORM_PRESET_EXPORTS_STORAGE_KEY = 'hyogen.platformPresetExports';

export type PlatformPresetExport = {
  id: string;
  projectId: string;
  projectPrompt: string;
  variationOfProjectId?: string;
  platform: 'TikTok' | 'YouTube Shorts';
  aspectRatio: '9:16';
  outputPath: string;
};

export function listPlatformPresetExports(
  storage: Storage = window.localStorage,
): PlatformPresetExport[] {
  const encoded = storage.getItem(PLATFORM_PRESET_EXPORTS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as PlatformPresetExport[]) : [];
}

export function exportPlatformPreset(
  projectId: string,
  platform: PlatformPresetExport['platform'] = 'TikTok',
  storage: Storage = window.localStorage,
): PlatformPresetExport | null {
  const project = listProjects(storage).find((candidate) => candidate.id === projectId);
  if (!project) return null;

  const exports = listPlatformPresetExports(storage);
  const platformSlug = platform.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const presetExport: PlatformPresetExport = {
    id: `platform-preset-export-${exports.length + 1}`,
    projectId: project.id,
    projectPrompt: project.prompt,
    variationOfProjectId: project.variationOfProjectId,
    platform,
    aspectRatio: '9:16',
    outputPath: `exports/${project.id}/${platformSlug}-9x16.mp4`,
  };
  storage.setItem(PLATFORM_PRESET_EXPORTS_STORAGE_KEY, JSON.stringify([...exports, presetExport]));
  recordRunTraceEvent(
    {
      type: 'platformPreset.exported',
      summary: 'Platform preset exported from Variation',
      data: {
        projectId: project.id,
        variationOfProjectId: project.variationOfProjectId,
        platform,
        outputPath: presetExport.outputPath,
      },
    },
    storage,
  );
  return presetExport;
}
