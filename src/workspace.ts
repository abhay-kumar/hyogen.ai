import { recordRunTraceEvent } from './runTrace';

const WORKSPACE_STORAGE_KEY = 'hyogen.workspace.path';

export type Workspace = {
  path: string;
};

export function loadWorkspace(storage: Storage = window.localStorage): Workspace | null {
  const path = storage.getItem(WORKSPACE_STORAGE_KEY);
  return path ? { path } : null;
}

export function saveWorkspace(path: string, storage: Storage = window.localStorage): Workspace {
  const workspace = { path: path.trim() };
  storage.setItem(WORKSPACE_STORAGE_KEY, workspace.path);
  recordRunTraceEvent(
    {
      type: 'workspace.selected',
      summary: 'Workspace selected',
      data: { workspacePath: workspace.path },
    },
    storage,
  );
  return workspace;
}
