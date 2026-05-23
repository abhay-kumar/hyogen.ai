import type { SelectedMedia } from './selectedMedia';
import { recordRunTraceEvent } from './runTrace';

const SELECTED_MEDIA_VALIDATIONS_STORAGE_KEY = 'hyogen.selectedMediaValidations';

export type SelectedMediaValidation = {
  id: string;
  selectedMediaId: string;
  shotIntent: string;
  status: 'compatible' | 'needs-review';
};

export function listSelectedMediaValidations(
  storage: Storage = window.localStorage,
): SelectedMediaValidation[] {
  const encoded = storage.getItem(SELECTED_MEDIA_VALIDATIONS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as SelectedMediaValidation[]) : [];
}

export function validateSelectedMediaWithMockVision(
  selection: SelectedMedia,
  storage: Storage = window.localStorage,
): SelectedMediaValidation {
  const validations = listSelectedMediaValidations(storage);
  const validation: SelectedMediaValidation = {
    id: `selected-media-validation-${validations.length + 1}`,
    selectedMediaId: selection.id,
    shotIntent: 'fallback kinetic text',
    status: 'compatible',
  };
  storage.setItem(SELECTED_MEDIA_VALIDATIONS_STORAGE_KEY, JSON.stringify([...validations, validation]));
  recordRunTraceEvent(
    {
      type: 'selectedMedia.visionValidated',
      summary: 'Selected Media validated by mock vision provider',
      data: { selectedMediaId: selection.id, status: validation.status },
    },
    storage,
  );
  return validation;
}
