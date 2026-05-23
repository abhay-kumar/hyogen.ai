import { recordRunTraceEvent } from './runTrace';

const USED_STORIES_STORAGE_KEY = 'hyogen.usedStories';

export type UsedStory = {
  id: string;
  storyKey: string;
  sourceName: string;
};

export function storyKeyFromPrompt(prompt: string): string {
  return prompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function listUsedStories(storage: Storage = window.localStorage): UsedStory[] {
  const encoded = storage.getItem(USED_STORIES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as UsedStory[]) : [];
}

export function hasUsedStory(prompt: string, storage: Storage = window.localStorage): boolean {
  const storyKey = storyKeyFromPrompt(prompt);
  return listUsedStories(storage).some((story) => story.storyKey === storyKey);
}

export function rememberUsedStory(
  input: { prompt: string; sourceName: string },
  storage: Storage = window.localStorage,
): UsedStory {
  const usedStories = listUsedStories(storage);
  const storyKey = storyKeyFromPrompt(input.prompt);
  const existing = usedStories.find((story) => story.storyKey === storyKey);
  if (existing) return existing;
  const usedStory: UsedStory = {
    id: `used-story-${usedStories.length + 1}`,
    storyKey,
    sourceName: input.sourceName,
  };
  storage.setItem(USED_STORIES_STORAGE_KEY, JSON.stringify([...usedStories, usedStory]));
  recordRunTraceEvent(
    {
      type: 'usedStory.remembered',
      summary: 'Used-story memory recorded recipe story',
      data: { storyKey, sourceName: input.sourceName },
    },
    storage,
  );
  return usedStory;
}
