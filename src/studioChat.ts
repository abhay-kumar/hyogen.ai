import { recordRunTraceEvent } from './runTrace';

export type StudioMessage = {
  speaker: 'Creator' | 'DeepAgents Stage Harness';
  text: string;
};

export function respondWithMockHarness(
  creatorMessage: string,
  storage: Storage = window.localStorage,
): StudioMessage[] {
  const response: StudioMessage = {
    speaker: 'DeepAgents Stage Harness',
    text: 'I captured your intent for the Guided Workflow.',
  };
  recordRunTraceEvent(
    {
      type: 'studio.chat.responded',
      summary: 'Mock harness responded to Studio chat',
      data: { creatorMessage, response: response.text },
    },
    storage,
  );
  return [{ speaker: 'Creator', text: creatorMessage }, response];
}
