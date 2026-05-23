import { recordRunTraceEvent } from './runTrace';

const PROJECTS_STORAGE_KEY = 'hyogen.projects';

export type Project = {
  id: string;
  prompt: string;
  mode: 'Source-Only Mode';
  brandProfileName: string;
};

export function listProjects(storage: Storage = window.localStorage): Project[] {
  const encoded = storage.getItem(PROJECTS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as Project[]) : [];
}

export function createSourceOnlyProject(
  input: { prompt: string; brandProfileName: string },
  storage: Storage = window.localStorage,
): Project {
  const projects = listProjects(storage);
  const project: Project = {
    id: `project-${projects.length + 1}`,
    prompt: input.prompt.trim(),
    mode: 'Source-Only Mode',
    brandProfileName: input.brandProfileName,
  };
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([...projects, project]));
  recordRunTraceEvent(
    {
      type: 'project.created',
      summary: 'Project created in Source-Only Mode',
      data: { projectId: project.id, mode: project.mode },
    },
    storage,
  );
  return project;
}
