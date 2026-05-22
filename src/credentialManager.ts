const DEV_KEYCHAIN_STORAGE_KEY = 'hyogen.devKeychain';

export type CredentialRef = `keychain:${string}`;

export function storeCredential(
  id: string,
  secret: string,
  storage: Storage = window.localStorage,
): CredentialRef {
  const keychain = readDevKeychain(storage);
  const ref: CredentialRef = `keychain:${id}`;
  storage.setItem(DEV_KEYCHAIN_STORAGE_KEY, JSON.stringify({ ...keychain, [ref]: secret }));
  return ref;
}

export function deleteCredential(ref: CredentialRef, storage: Storage = window.localStorage): void {
  const keychain = readDevKeychain(storage);
  delete keychain[ref];
  storage.setItem(DEV_KEYCHAIN_STORAGE_KEY, JSON.stringify(keychain));
}

export function credentialExists(ref: CredentialRef, storage: Storage = window.localStorage): boolean {
  return Object.prototype.hasOwnProperty.call(readDevKeychain(storage), ref);
}

function readDevKeychain(storage: Storage): Record<string, string> {
  const encoded = storage.getItem(DEV_KEYCHAIN_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as Record<string, string>) : {};
}
