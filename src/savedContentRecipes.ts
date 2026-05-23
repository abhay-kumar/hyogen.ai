import { recordRunTraceEvent } from './runTrace';

const SAVED_CONTENT_RECIPES_STORAGE_KEY = 'hyogen.savedContentRecipes';

export type SavedContentRecipe = {
  id: string;
  name: string;
  prompt: string;
};

export function listSavedContentRecipes(
  storage: Storage = window.localStorage,
): SavedContentRecipe[] {
  const encoded = storage.getItem(SAVED_CONTENT_RECIPES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as SavedContentRecipe[]) : [];
}

export function saveContentRecipe(
  input: { id?: string | null; name: string; prompt: string },
  storage: Storage = window.localStorage,
): SavedContentRecipe {
  const recipes = listSavedContentRecipes(storage);
  const existing = recipes.find((recipe) => recipe.id === input.id);
  const recipe: SavedContentRecipe = {
    id: existing?.id ?? `saved-content-recipe-${recipes.length + 1}`,
    name: input.name.trim(),
    prompt: input.prompt.trim(),
  };
  const nextRecipes = existing
    ? recipes.map((candidate) => (candidate.id === recipe.id ? recipe : candidate))
    : [...recipes, recipe];
  storage.setItem(SAVED_CONTENT_RECIPES_STORAGE_KEY, JSON.stringify(nextRecipes));
  recordRunTraceEvent(
    {
      type: existing ? 'contentRecipe.updated' : 'contentRecipe.created',
      summary: existing ? 'Saved Content Recipe updated' : 'Saved Content Recipe created',
      data: { recipeId: recipe.id, name: recipe.name },
    },
    storage,
  );
  return recipe;
}
