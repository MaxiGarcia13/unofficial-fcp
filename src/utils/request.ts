import { getCached, setCached } from './cache';

const REQUEST_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | undefined | null>;
  body?: unknown;
  skipCache?: boolean;
}

function requestCacheKey(fullUrl: string): string {
  return `req:${fullUrl}`;
}

function shouldUseRequestCache(config: RequestConfig): boolean {
  if (config.skipCache)
    return false;
  if (config.body !== undefined)
    return false;
  const method = (config.method ?? 'GET').toUpperCase();
  return method === 'GET';
}

export async function request<T>(
  url: string,
  config: RequestConfig = {},
): Promise<T> {
  const { params, body, headers = {}, skipCache: _skip, ...rest } = config;
  const fullUrl = params ? buildUrlWithParams(url, params) : url;
  const useCache = shouldUseRequestCache(config);

  if (useCache) {
    const cached = getCached<T>(requestCacheKey(fullUrl));
    if (cached !== null)
      return cached;
  }

  const init: RequestInit = {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...rest,
  };
  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const response = await fetch(fullUrl, init);
  const data = (await response.json()) as T;

  if (!response.ok) {
    const error = new Error(
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: unknown }).message)
        : response.statusText || `Request failed with status ${response.status}`,
    ) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  if (useCache) {
    setCached(requestCacheKey(fullUrl), data, REQUEST_CACHE_TTL_MS);
  }

  return data;
}

export function isApiError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function buildUrlWithParams(
  basePath: string,
  params: Record<string, string | number | undefined | null>,
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
