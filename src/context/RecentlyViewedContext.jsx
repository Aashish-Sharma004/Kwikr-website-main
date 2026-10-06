'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RecentlyViewedContext = createContext(undefined);
const STORAGE_KEY = 'kwikr_recently_viewed';
const MAX_ITEMS = 12;

export function RecentlyViewedProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(stored)) setIds(stored);
    } catch {}
    setHydrated(true);
  }, []);

  const trackView = useCallback((id) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ ids, trackView, hydrated }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}
