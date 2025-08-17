import type { Company, Location, Asset } from '../types';
import { cache } from '../utils/cache';

const API_BASE_URL = 'https://fake-api.tractian.com';

const generateCacheKey = (endpoint: string, params?: string) => {
  return `api:${endpoint}${params ? `:${params}` : ''}`;
};

export const api = {
  async getCompanies(): Promise<Company[]> {
    const cacheKey = generateCacheKey('companies');
    const cached = cache.get<Company[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/companies`);
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }

    const data = await response.json();
    cache.set(cacheKey, data, 10 * 60 * 1000);

    return data;
  },

  async getLocations(companyId: string): Promise<Location[]> {
    const cacheKey = generateCacheKey('locations', companyId);
    const cached = cache.get<Location[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${API_BASE_URL}/companies/${companyId}/locations`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    const data = await response.json();
    cache.set(cacheKey, data, 5 * 60 * 1000);

    return data;
  },

  async getAssets(companyId: string): Promise<Asset[]> {
    const cacheKey = generateCacheKey('assets', companyId);
    const cached = cache.get<Asset[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${API_BASE_URL}/companies/${companyId}/assets`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch assets');
    }

    const data = await response.json();
    cache.set(cacheKey, data, 5 * 60 * 1000);

    return data;
  },

  clearCache(): void {
    cache.clear();
  },

  clearCompanyCache(companyId: string): void {
    cache.delete(generateCacheKey('locations', companyId));
    cache.delete(generateCacheKey('assets', companyId));
  },
};
