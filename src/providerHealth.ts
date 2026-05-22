import { ProviderConnection } from './providerConnections';
import { recordRunTraceEvent } from './runTrace';

export type ProviderHealthResult = {
  providerName: string;
  status: 'healthy';
};

export function checkMockProviderHealth(
  connections: ProviderConnection[],
  storage: Storage = window.localStorage,
): ProviderHealthResult[] {
  return connections.map((connection) => {
    const result: ProviderHealthResult = { providerName: connection.name, status: 'healthy' };
    recordRunTraceEvent(
      {
        type: 'provider.health.checked',
        summary: 'Provider health checked',
        data: result,
      },
      storage,
    );
    return result;
  });
}
