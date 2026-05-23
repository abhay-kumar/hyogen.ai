import { recordRunTraceEvent } from './runTrace';

const PROJECTS_STORAGE_KEY = 'hyogen.projects';

export type Project = {
  id: string;
  prompt: string;
  mode: 'Source-Only Mode';
  brandProfileName: string;
  sourceUrls: string[];
  archived?: boolean;
  relinkedFromManifest?: boolean;
  manifestPath?: string;
  variationOfProjectId?: string;
  recipeId?: string;
  recipeName?: string;
};

export function listProjects(storage: Storage = window.localStorage): Project[] {
  const encoded = storage.getItem(PROJECTS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as Project[]) : [];
}

export function createSourceOnlyProject(
  input: { prompt: string; brandProfileName: string; sourceUrl?: string },
  storage: Storage = window.localStorage,
): Project {
  const projects = listProjects(storage);
  const project: Project = {
    id: `project-${projects.length + 1}`,
    prompt: input.prompt.trim(),
    mode: 'Source-Only Mode',
    brandProfileName: input.brandProfileName,
    sourceUrls: input.sourceUrl?.trim() ? [input.sourceUrl.trim()] : [],
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

export function archiveProject(projectId: string, storage: Storage = window.localStorage): void {
  const projects = listProjects(storage).map((project) =>
    project.id === projectId ? { ...project, archived: true } : project,
  );
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  recordRunTraceEvent(
    {
      type: 'project.archived',
      summary: 'Project archived after confirmation',
      data: { projectId },
    },
    storage,
  );
}

export function createProjectFromRecipe(
  recipe: { id: string; name: string; prompt: string },
  storage: Storage = window.localStorage,
): Project {
  const projects = listProjects(storage);
  const project: Project = {
    id: `project-${projects.length + 1}`,
    prompt: recipe.prompt,
    mode: 'Source-Only Mode',
    brandProfileName: 'Recipe Default',
    sourceUrls: [],
    recipeId: recipe.id,
    recipeName: recipe.name,
  };
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([...projects, project]));
  recordRunTraceEvent(
    {
      type: 'project.createdFromRecipe',
      summary: 'Project started from Saved Content Recipe',
      data: { projectId: project.id, recipeId: recipe.id },
    },
    storage,
  );
  return project;
}

export function duplicateProjectVariation(
  projectId: string,
  storage: Storage = window.localStorage,
): Project | null {
  const projects = listProjects(storage);
  const sourceProject = projects.find((project) => project.id === projectId);
  if (!sourceProject) return null;
  const variation: Project = {
    ...sourceProject,
    id: `project-${projects.length + 1}`,
    prompt: `${sourceProject.prompt} (Copy)`,
    variationOfProjectId: sourceProject.id,
    archived: false,
  };
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([...projects, variation]));
  recordRunTraceEvent(
    {
      type: 'project.variation.duplicated',
      summary: 'Variation duplicated while sharing media pool',
      data: { projectId: variation.id, variationOfProjectId: sourceProject.id },
    },
    storage,
  );
  return variation;
}

export function importProjectFromManifest(
  manifestPath: string,
  storage: Storage = window.localStorage,
): Project {
  const projects = listProjects(storage);
  const project: Project = {
    id: `project-${projects.length + 1}`,
    prompt: 'Imported Project',
    mode: 'Source-Only Mode',
    brandProfileName: 'Imported Brand',
    sourceUrls: [],
    relinkedFromManifest: true,
    manifestPath: manifestPath.trim(),
  };
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([...projects, project]));
  recordRunTraceEvent(
    {
      type: 'project.imported',
      summary: 'Project imported and relinked from manifest',
      data: { projectId: project.id, manifestPath: project.manifestPath },
    },
    storage,
  );
  return project;
}

export function deleteProject(projectId: string, storage: Storage = window.localStorage): void {
  const projects = listProjects(storage).filter((project) => project.id !== projectId);
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  recordRunTraceEvent(
    {
      type: 'project.deleted',
      summary: 'Project deleted after confirmation',
      data: { projectId },
    },
    storage,
  );
}
