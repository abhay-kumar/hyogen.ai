import { CredentialRef, deleteCredential, storeCredential } from './credentialManager';
import { recordRunTraceEvent } from './runTrace';

const PROVIDER_CONNECTIONS_STORAGE_KEY = 'hyogen.providerConnections';

export type ProviderConnection = {
  id: string;
  name: string;
  credentialRef: CredentialRef;
};

export function listProviderConnections(
  storage: Storage = window.localStorage,
): ProviderConnection[] {
  const encoded = storage.getItem(PROVIDER_CONNECTIONS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as ProviderConnection[]) : [];
}

export function createProviderConnection(
  input: { name: string; secret: string },
  storage: Storage = window.localStorage,
): ProviderConnection {
  const connections = listProviderConnections(storage);
  const id = `provider-connection-${connections.length + 1}`;
  const connection: ProviderConnection = {
    id,
    name: input.name.trim(),
    credentialRef: storeCredential(id, input.secret, storage),
  };
  storage.setItem(PROVIDER_CONNECTIONS_STORAGE_KEY, JSON.stringify([...connections, connection]));
  recordRunTraceEvent(
    {
      type: 'provider.connection.created',
      summary: 'Provider Connection created',
      data: { providerName: connection.name, credentialRef: connection.credentialRef },
    },
    storage,
  );
  return connection;
}

export function deleteProviderConnection(id: string, storage: Storage = window.localStorage): void {
  const connections = listProviderConnections(storage);
  const connection = connections.find((candidate) => candidate.id === id);
  if (!connection) return;
  deleteCredential(connection.credentialRef, storage);
  storage.setItem(
    PROVIDER_CONNECTIONS_STORAGE_KEY,
    JSON.stringify(connections.filter((candidate) => candidate.id !== id)),
  );
  recordRunTraceEvent(
    {
      type: 'provider.connection.deleted',
      summary: 'Provider Connection deleted',
      data: { providerName: connection.name, credentialRef: connection.credentialRef },
    },
    storage,
  );
}
