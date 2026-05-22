const BRAND_PROFILES_STORAGE_KEY = 'hyogen.brandProfiles';

export type BrandProfile = {
  id: string;
  name: string;
};

export function listBrandProfiles(storage: Storage = window.localStorage): BrandProfile[] {
  const encoded = storage.getItem(BRAND_PROFILES_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as BrandProfile[]) : [];
}

export function createBrandProfile(
  input: { name: string },
  storage: Storage = window.localStorage,
): BrandProfile {
  const profiles = listBrandProfiles(storage);
  const profile: BrandProfile = {
    id: `brand-profile-${profiles.length + 1}`,
    name: input.name.trim(),
  };
  storage.setItem(BRAND_PROFILES_STORAGE_KEY, JSON.stringify([...profiles, profile]));
  return profile;
}
