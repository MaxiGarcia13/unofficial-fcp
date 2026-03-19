const PREFIX = 'fcp:cache:';

interface CacheEntry<T> {
  value: T;
  expiresAt?: number;
}

function storage(): Storage | null {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
    return null;
  }
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

export function cacheKey(key: string): string {
  return `${PREFIX}${key}`;
}

export function getCached<T>(key: string): T | null {
  const ls = storage();
  if (!ls)
    return null;
  try {
    const raw = ls.getItem(cacheKey(key));
    if (raw == null)
      return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (entry.expiresAt != null && Date.now() > entry.expiresAt) {
      ls.removeItem(cacheKey(key));
      return null;
    }
    return entry.value as T;
  } catch {
    return null;
  }
}

export function setCached(key: string, value: unknown, ttlMs?: number): void {
  const ls = storage();
  if (!ls)
    return;
  try {
    const entry: CacheEntry<unknown> = {
      value,
      ...(ttlMs != null && ttlMs > 0
        ? { expiresAt: Date.now() + ttlMs }
        : {}),
    };
    ls.setItem(cacheKey(key), JSON.stringify(entry));
  } catch {
    // quota or private mode
  }
}

export function removeCached(key: string): void {
  storage()?.removeItem(cacheKey(key));
}

export function clearCacheByPrefix(keyPrefix: string): void {
  const ls = storage();
  if (!ls)
    return;
  const fullPrefix = cacheKey(keyPrefix);
  const toRemove: string[] = [];
  for (let i = 0; i < ls.length; i++) {
    const k = ls.key(i);
    if (k != null && k.startsWith(fullPrefix))
      toRemove.push(k);
  }
  for (const k of toRemove) ls.removeItem(k);
}
