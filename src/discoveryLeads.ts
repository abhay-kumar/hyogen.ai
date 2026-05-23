import { recordRunTraceEvent } from './runTrace';

const DISCOVERY_LEADS_STORAGE_KEY = 'hyogen.discoveryLeads';

export type DiscoveryLead = {
  id: string;
  query: string;
  url: string;
};

export function listDiscoveryLeads(storage: Storage = window.localStorage): DiscoveryLead[] {
  const encoded = storage.getItem(DISCOVERY_LEADS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as DiscoveryLead[]) : [];
}

export function runProviderNativeSearch(
  query: string,
  storage: Storage = window.localStorage,
): DiscoveryLead[] {
  const existing = listDiscoveryLeads(storage);
  const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const lead: DiscoveryLead = {
    id: `discovery-lead-${existing.length + 1}`,
    query: query.trim(),
    url: `https://search.example/${slug}`,
  };
  storage.setItem(DISCOVERY_LEADS_STORAGE_KEY, JSON.stringify([...existing, lead]));
  recordRunTraceEvent(
    {
      type: 'discovery.leads.created',
      summary: 'Provider-native search returned Discovery Leads',
      data: { query: lead.query, url: lead.url },
    },
    storage,
  );
  return [lead];
}
