import { ProviderConnection } from './providerConnections';

export type ProviderCapabilityStatus = {
  name: 'Text LLM' | 'TTS plain' | 'Search/discovery';
  status: 'ready' | 'missing';
};

export function resolveProviderCapabilities(
  connections: ProviderConnection[],
): ProviderCapabilityStatus[] {
  const hasOpenAICompatible = connections.some((connection) =>
    /openai|openrouter|anthropic|gemini|ollama/i.test(connection.name),
  );
  const hasSearchDiscovery = connections.some((connection) => /search/i.test(connection.name));

  return [
    { name: 'Text LLM', status: hasOpenAICompatible ? 'ready' : 'missing' },
    { name: 'TTS plain', status: 'missing' },
    { name: 'Search/discovery', status: hasSearchDiscovery ? 'ready' : 'missing' },
  ];
}

export function fullAgenticModeWarning(capabilities: ProviderCapabilityStatus[]): string | null {
  const search = capabilities.find((capability) => capability.name === 'Search/discovery');
  return search?.status === 'ready'
    ? null
    : 'Full Agentic Mode degraded until search/discovery is configured.';
}
