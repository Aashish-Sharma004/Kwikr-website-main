'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const QuickViewContext = createContext(undefined);

export function QuickViewProvider({ children }) {
  const [product, setProduct] = useState(null);

  const openQuickView = useCallback((p) => setProduct(p), []);
  const closeQuickView = useCallback(() => setProduct(null), []);

  return (
    <QuickViewContext.Provider value={{ product, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error('useQuickView must be used within QuickViewProvider');
  return ctx;
}
