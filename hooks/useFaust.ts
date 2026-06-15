/**
 * Hooks for Faust.js integration
 * Provides utilities for working with Faust in Next.js
 */

import { useCallback } from "react";
import { logger } from "@/lib/logger";

/**
 * Hook for handling async data fetching with loading/error states
 */
export function useFetchData<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          setData(null);
          logger.error("useFetchData error", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
}

/**
 * Hook for managing cache with ISR considerations
 */
export function useCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600
) {
  const cacheKey = `faust_cache_${key}`;

  const getFromCache = useCallback(() => {
    if (typeof window === "undefined") return null;

    const cached = sessionStorage.getItem(cacheKey);
    if (!cached) return null;

    try {
      const { data, timestamp } = JSON.parse(cached);
      const age = (Date.now() - timestamp) / 1000;

      if (age > ttl) {
        sessionStorage.removeItem(cacheKey);
        return null;
      }

      return data as T;
    } catch {
      sessionStorage.removeItem(cacheKey);
      return null;
    }
  }, [cacheKey, ttl]);

  const setInCache = useCallback(
    (data: T) => {
      if (typeof window === "undefined") return;

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    },
    [cacheKey]
  );

  const { data, loading, error } = useFetchData(fetchFn);

  React.useEffect(() => {
    if (data && !error) {
      setInCache(data);
    }
  }, [data, error, setInCache]);

  const cachedData = getFromCache() || data;

  return { data: cachedData, loading, error };
}

/**
 * Hook for handling preview mode
 */
export function usePreviewMode() {
  const isPreviewMode = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("preview");
  }, []);

  return { isPreviewMode };
}

import * as React from "react";
