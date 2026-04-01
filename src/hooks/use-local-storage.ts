import { useCallback } from 'react';

interface PersistedStorageValue<T> {
  value: T;
  persistedAt: string;
}

interface UseLocalStorageReturn<T> {
  set: (value: T) => void;
  get: () => T | null;
  remove: () => void;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function isPersistedValueExpired(persistedAt: Date): boolean {
  const now = new Date();
  const diffInMs = now.getTime() - persistedAt.getTime();
  const isOlderThanSevenDays = diffInMs > 7 * DAY_IN_MS;

  // Weekly reset rule: on Monday, anything persisted before today is invalid.
  const isMonday = now.getDay() === 1;
  const mondayStart = new Date(now);
  mondayStart.setHours(0, 0, 0, 0);
  const isPersistedBeforeMonday = persistedAt.getTime() < mondayStart.getTime();

  return isOlderThanSevenDays || (isMonday && isPersistedBeforeMonday);
}

export function useLocalStorage<T>(key: string): UseLocalStorageReturn<T> {
  const set = useCallback(
    (value: T) => {
      if (typeof window === 'undefined') {
        return;
      }

      const payload: PersistedStorageValue<T> = {
        value,
        persistedAt: new Date().toISOString(),
      };

      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    [key],
  );

  const get = useCallback((): T | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return null;
    }

    try {
      const parsedValue = JSON.parse(storedValue) as PersistedStorageValue<T>;

      if (!parsedValue?.persistedAt) {
        window.localStorage.removeItem(key);
        return null;
      }

      const persistedAt = new Date(parsedValue.persistedAt);

      if (Number.isNaN(persistedAt.getTime()) || isPersistedValueExpired(persistedAt)) {
        window.localStorage.removeItem(key);
        return null;
      }

      return parsedValue.value;
    } catch {
      window.localStorage.removeItem(key);
      return null;
    }
  }, [key]);

  const remove = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem(key);
  }, [key]);

  return {
    set,
    get,
    remove,
  };
}
