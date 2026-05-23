import { recordApprovalDecision } from './approvalGates';
import type { MediaCandidate } from './mediaPool';
import { recordRunTraceEvent } from './runTrace';

const SELECTED_MEDIA_STORAGE_KEY = 'hyogen.selectedMedia';

export type SelectedMedia = {
  id: string;
  shotId: string;
  mediaCandidateId: string;
  label: string;
  approved: boolean;
  rightsWarningPersisted: boolean;
  rightsWarning?: string;
};

function fileName(path: string): string {
  return path.split('/').at(-1) ?? path;
}

export function listSelectedMedia(storage: Storage = window.localStorage): SelectedMedia[] {
  const encoded = storage.getItem(SELECTED_MEDIA_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as SelectedMedia[]) : [];
}

export function assignMediaCandidateToShot(
  candidate: MediaCandidate,
  shotId = 'shot-1',
  storage: Storage = window.localStorage,
): SelectedMedia {
  const selected = listSelectedMedia(storage);
  const assignment: SelectedMedia = {
    id: `selected-media-${selected.length + 1}`,
    shotId,
    mediaCandidateId: candidate.id,
    label: fileName(candidate.sourcePath),
    approved: false,
    rightsWarningPersisted: false,
  };
  storage.setItem(SELECTED_MEDIA_STORAGE_KEY, JSON.stringify([...selected, assignment]));
  recordRunTraceEvent(
    {
      type: 'selectedMedia.assigned',
      summary: 'Media Candidate assigned to Shot',
      data: { shotId, mediaCandidateId: candidate.id },
    },
    storage,
  );
  return assignment;
}

export function approveSelectedMedia(
  selectedMediaId: string,
  rightsWarning: string | undefined,
  storage: Storage = window.localStorage,
): SelectedMedia | null {
  let approvedSelection: SelectedMedia | null = null;
  const selections = listSelectedMedia(storage).map((selection) => {
    if (selection.id !== selectedMediaId) return selection;
    approvedSelection = {
      ...selection,
      approved: true,
      rightsWarningPersisted: Boolean(rightsWarning),
      rightsWarning,
    };
    return approvedSelection;
  });
  storage.setItem(SELECTED_MEDIA_STORAGE_KEY, JSON.stringify(selections));
  recordApprovalDecision({ target: 'Selected Media', decision: 'approved' }, storage);
  recordRunTraceEvent(
    {
      type: 'selectedMedia.approved',
      summary: 'Selected Media approved with persisted rights warning',
      data: { selectedMediaId, rightsWarning },
    },
    storage,
  );
  return approvedSelection;
}
