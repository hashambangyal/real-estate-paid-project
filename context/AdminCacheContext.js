'use client';

import React, { createContext, useContext, useRef, useCallback } from 'react';

const AdminCacheContext = createContext(null);

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function AdminCacheProvider({ children }) {
  // Global in-memory cache: url -> { data, timestamp }
  const cacheRef = useRef(new Map());

  // Set data in cache
  const setCached = useCallback((url, data) => {
    cacheRef.current.set(url, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  // Synchronous read from cache
  const getCached = useCallback((url) => {
    const entry = cacheRef.current.get(url);
    if (!entry) return null;
    // Check if expired
    if (Date.now() - entry.timestamp > DEFAULT_TTL) {
      cacheRef.current.delete(url);
      return null;
    }
    return entry.data;
  }, []);

  // Fetch with cache (Stale-While-Revalidate)
  const fetchWithCache = useCallback(
    async (url, { onRevalidate, forceRefresh = false } = {}) => {
      const cached = cacheRef.current.get(url);
      const isFresh = cached && Date.now() - cached.timestamp < DEFAULT_TTL;

      // If we have cached data and not forcing refresh, return cached immediately
      if (cached && !forceRefresh) {
        // Revalidate in background if stale or if revalidate callback is provided
        if (onRevalidate) {
          fetch(url)
            .then((res) => {
              if (res.ok) return res.json();
              throw new Error('Background fetch failed');
            })
            .then((freshData) => {
              cacheRef.current.set(url, {
                data: freshData,
                timestamp: Date.now(),
              });
              onRevalidate(freshData);
            })
            .catch((err) => {
              console.debug('Background revalidate error for', url, err);
            });
        }
        return cached.data;
      }

      // No cache or forcing refresh -> fetch now
      const res = await fetch(url);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch from ${url}`);
      }
      const data = await res.json();
      cacheRef.current.set(url, {
        data,
        timestamp: Date.now(),
      });
      return data;
    },
    []
  );

  // Background Prefetch
  const prefetch = useCallback((url) => {
    const cached = cacheRef.current.get(url);
    if (cached && Date.now() - cached.timestamp < DEFAULT_TTL) {
      return; // Already cached and fresh
    }

    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Prefetch failed');
      })
      .then((data) => {
        cacheRef.current.set(url, {
          data,
          timestamp: Date.now(),
        });
      })
      .catch((err) => {
        console.debug('Prefetch error for', url, err);
      });
  }, []);

  // Prefetch all key admin routes in background
  const prefetchAllAdminRoutes = useCallback(() => {
    const routes = [
      '/api/dashboard/stats',
      '/api/cities',
      '/api/agent',
      '/api/amenities',
      '/api/properties/stats?timeframe=7d',
      '/api/properties?page=1&limit=12&sortBy=createdAt&sortOrder=desc',
      '/api/inquiry/stats',
      '/api/inquiry?page=1&limit=15&sortBy=createdAt&sortOrder=desc',
    ];

    // Stagger requests slightly so we don't overwhelm network/database
    routes.forEach((route, index) => {
      setTimeout(() => {
        prefetch(route);
      }, index * 200);
    });
  }, [prefetch]);

  // Invalidate matching cache entries (e.g. after add, update, delete)
  const invalidate = useCallback((urlPrefix) => {
    for (const key of cacheRef.current.keys()) {
      if (key.startsWith(urlPrefix)) {
        cacheRef.current.delete(key);
      }
    }
  }, []);

  // Clear entire cache
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return (
    <AdminCacheContext.Provider
      value={{
        getCached,
        setCached,
        fetchWithCache,
        prefetch,
        prefetchAllAdminRoutes,
        invalidate,
        clearCache,
      }}
    >
      {children}
    </AdminCacheContext.Provider>
  );
}

export function useAdminCache() {
  const context = useContext(AdminCacheContext);
  if (!context) {
    // Fallback if accessed outside provider so components don't crash
    return {
      getCached: () => null,
      setCached: () => {},
      fetchWithCache: async (url) => {
        const res = await fetch(url);
        return res.json();
      },
      prefetch: () => {},
      prefetchAllAdminRoutes: () => {},
      invalidate: () => {},
      clearCache: () => {},
    };
  }
  return context;
}
