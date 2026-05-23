import { recordRunTraceEvent } from './runTrace';

const IMAGE_GENERATION_REQUESTS_STORAGE_KEY = 'hyogen.imageGenerationRequests';

export type ImageGenerationRequest = {
  id: string;
  prompt: string;
  status: 'approval-required' | 'approved' | 'generated';
};

export function listImageGenerationRequests(
  storage: Storage = window.localStorage,
): ImageGenerationRequest[] {
  const encoded = storage.getItem(IMAGE_GENERATION_REQUESTS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as ImageGenerationRequest[]) : [];
}

export function requestImageGenerationApproval(
  prompt = 'Generate fallback explainer image',
  storage: Storage = window.localStorage,
): ImageGenerationRequest {
  const requests = listImageGenerationRequests(storage);
  const request: ImageGenerationRequest = {
    id: `image-generation-${requests.length + 1}`,
    prompt,
    status: 'approval-required',
  };
  storage.setItem(IMAGE_GENERATION_REQUESTS_STORAGE_KEY, JSON.stringify([...requests, request]));
  recordRunTraceEvent(
    {
      type: 'imageGeneration.approvalRequested',
      summary: 'Image generation provider spend approval requested',
      data: { imageGenerationRequestId: request.id, prompt },
    },
    storage,
  );
  return request;
}
