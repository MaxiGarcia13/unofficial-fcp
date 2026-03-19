import type { DependencyList } from 'react';
import { useEffect, useState } from 'react';

export interface UseResultsReturn<T> {
  data: T;
  error: Error | null;
  loading: boolean;
  fetchResult: () => void;
}

export interface UseResultsOptions {
  callOnMount?: boolean;
}

export function useResults<T>(
  fn: (params?: URLSearchParams) => Promise<T>,
  dependencies: DependencyList,
  options?: UseResultsOptions,
): UseResultsReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchResult = () => {
    setLoading(true);
    setError(null);

    fn()
      .then((data) => {
        setData(data);
      })
      .catch((error: Error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (options?.callOnMount === false) {
      setLoading(false);
      return;
    }

    fetchResult();
  }, dependencies);

  return {
    data,
    error,
    loading,
    fetchResult,
  };
}
