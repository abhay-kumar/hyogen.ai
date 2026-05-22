const BRAND_PROFILES_STORAGE_KEY = 'hyogen.brandProfiles';

export type BrandProfile = {
  id: string;
  name: string;
  audience: string;
  tone: string;
  ctaDefault: string;
  captionDefault: string;
  sourceDefault: string;
  archived: boolean;
};

export function listBrandProfiles(storage: Storage = window.localStorage): BrandProfile[] {
  const encoded = storage.getItem(BRAND_PROFILES_STORAGE_KEY);
  const profiles = encoded ? (JSON.parse(encoded) as BrandProfile[]) : [];
  return profiles.map((profile) => ({
    ...profile,
    audience: profile.audience ?? '',
    tone: profile.tone ?? '',
    ctaDefault: profile.ctaDefault ?? '',
    captionDefault: profile.captionDefault ?? '',
    sourceDefault: profile.sourceDefault ?? '',
    archived: Boolean(profile.archived),
  }));
}

export function createBrandProfile(
  input: { name: string },
  storage: Storage = window.localStorage,
): BrandProfile {
  const profiles = listBrandProfiles(storage);
  const profile: BrandProfile = {
    id: `brand-profile-${profiles.length + 1}`,
    name: input.name.trim(),
    audience: '',
    tone: '',
    ctaDefault: '',
    captionDefault: '',
    sourceDefault: '',
    archived: false,
  };
  storage.setItem(BRAND_PROFILES_STORAGE_KEY, JSON.stringify([...profiles, profile]));
  return profile;
}

export function updateBrandProfile(
  id: string,
  updates: Partial<Omit<BrandProfile, 'id'>>,
  storage: Storage = window.localStorage,
): BrandProfile {
  const profiles = listBrandProfiles(storage);
  const updatedProfiles = profiles.map((profile) =>
    profile.id === id ? { ...profile, ...updates } : profile,
  );
  storage.setItem(BRAND_PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
  const updated = updatedProfiles.find((profile) => profile.id === id);
  if (!updated) {
    throw new Error(`Brand Profile not found: ${id}`);
  }
  return updated;
}
