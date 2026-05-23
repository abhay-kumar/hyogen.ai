import { recordRunTraceEvent } from './runTrace';

const PUBLIC_MEDIA_RIGHTS_STORAGE_KEY = 'hyogen.publicMediaRightsAcknowledged';

export function isPublicMediaAcknowledged(storage: Storage = window.localStorage): boolean {
  return storage.getItem(PUBLIC_MEDIA_RIGHTS_STORAGE_KEY) === 'true';
}

export function acknowledgePublicMediaWarnings(storage: Storage = window.localStorage): void {
  storage.setItem(PUBLIC_MEDIA_RIGHTS_STORAGE_KEY, 'true');
  recordRunTraceEvent(
    {
      type: 'publicMedia.rightsAcknowledged',
      summary: 'Creator acknowledged public media warnings',
      data: { acknowledged: true },
    },
    storage,
  );
}
