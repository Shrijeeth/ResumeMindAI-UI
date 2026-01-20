"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch, ApiError } from "./api";

interface UseApiOptions {
  /** Revalidate when window regains focus (default: true) */
  revalidateOnFocus?: boolean;
  /** Revalidate when network reconnects (default: true) */
  revalidateOnReconnect?: boolean;
  /** Minimum time between requests in ms (default: 2000) */
  dedupingInterval?: number;
  /** Auto-refresh interval in ms (default: 0 = disabled) */
  refreshInterval?: number;
}

interface UseApiReturn<T> {
  /** The fetched data */
  data: T | undefined;
  /** Error object if request failed */
  error: ApiError | undefined;
  /** True during initial load (no cached data) */
  isLoading: boolean;
  /** True during any fetch (including background revalidation) */
  isValidating: boolean;
  /** Manually update data or trigger revalidation */
  mutate: (data?: T | Promise<T> | ((current?: T) => T)) => Promise<void>;
}

// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds default TTL

/**
 * Lightweight SWR-like hook for data fetching with caching.
 * No external dependencies - uses the existing apiFetch function.
 *
 * @param path - API endpoint path (e.g., '/settings/llm-providers/')
 * @param options - Configuration options
 * @returns Object with data, error, loading states, and mutate function
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, mutate } = useApi<Provider[]>('/settings/llm-providers/');
 *
 * // After mutation, trigger revalidation
 * await saveProvider(newData);
 * mutate(); // refetch from server
 *
 * // Or optimistically update
 * mutate([...data, newProvider]);
 * ```
 */
export function useApi<T>(
  path: string | null,
  options: UseApiOptions = {},
): UseApiReturn<T> {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    dedupingInterval = 2000,
    refreshInterval = 0,
  } = options;

  // Initialize data from cache if available
  const [data, setData] = useState<T | undefined>(() => {
    if (!path) return undefined;
    const cached = cache.get(path);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T;
    }
    return undefined;
  });
  const [error, setError] = useState<ApiError | undefined>();
  const [isLoading, setIsLoading] = useState(!data);
  const [isValidating, setIsValidating] = useState(false);

  const lastFetchRef = useRef<number>(0);
  const mountedRef = useRef(true);

  const fetchData = useCallback(
    async (showLoading = true) => {
      if (!path) return;

      // Deduping: skip if fetched recently
      const now = Date.now();
      if (now - lastFetchRef.current < dedupingInterval) {
        return;
      }
      lastFetchRef.current = now;

      if (showLoading && !data) {
        setIsLoading(true);
      }
      setIsValidating(true);
      setError(undefined);

      try {
        const result = await apiFetch<T>(path);
        if (mountedRef.current) {
          setData(result);
          cache.set(path, { data: result, timestamp: Date.now() });
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err as ApiError);
        }
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
          setIsValidating(false);
        }
      }
    },
    [path, dedupingInterval, data],
  );

  const mutate = useCallback(
    async (newData?: T | Promise<T> | ((current?: T) => T)) => {
      if (typeof newData === "function") {
        const fn = newData as (current?: T) => T;
        const updated = fn(data);
        setData(updated);
        if (path) cache.set(path, { data: updated, timestamp: Date.now() });
      } else if (newData instanceof Promise) {
        const resolved = await newData;
        setData(resolved);
        if (path) cache.set(path, { data: resolved, timestamp: Date.now() });
      } else if (newData !== undefined) {
        setData(newData);
        if (path) cache.set(path, { data: newData, timestamp: Date.now() });
      } else {
        // No argument = revalidate from server
        await fetchData(false);
      }
    },
    [data, path, fetchData],
  );

  // Initial fetch
  useEffect(() => {
    mountedRef.current = true;
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus || typeof window === "undefined") return;

    const onFocus = () => fetchData(false);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [revalidateOnFocus, fetchData]);

  // Revalidate on reconnect
  useEffect(() => {
    if (!revalidateOnReconnect || typeof window === "undefined") return;

    const onOnline = () => fetchData(false);
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [revalidateOnReconnect, fetchData]);

  // Refresh interval
  useEffect(() => {
    if (!refreshInterval || refreshInterval <= 0) return;

    const interval = setInterval(() => fetchData(false), refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, fetchData]);

  return { data, error, isLoading, isValidating, mutate };
}

/**
 * Clears the API cache. Useful for logout or when data needs to be refreshed.
 */
export function clearApiCache(): void {
  cache.clear();
}

/**
 * Clears a specific path from the cache.
 */
export function invalidateCache(path: string): void {
  cache.delete(path);
}
