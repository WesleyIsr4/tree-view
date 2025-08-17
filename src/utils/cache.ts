interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class Cache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000;

  set<T>(key: string, data: T, ttl?: number): void {
    const timestamp = Date.now();
    const itemTTL = ttl || this.defaultTTL;

    this.cache.set(key, {
      data,
      timestamp,
      ttl: itemTTL,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new Cache();

setInterval(
  () => {
    cache.cleanup();
  },
  5 * 60 * 1000
);
