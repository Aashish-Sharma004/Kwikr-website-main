'use client';

import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const WishlistContext = createContext(undefined);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'TOGGLE_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kwikr_wishlist');
      if (stored) dispatch({ type: 'SET_ITEMS', payload: JSON.parse(stored) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('kwikr_wishlist', JSON.stringify(state.items));
  }, [state.items, hydrated]);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        toggleWishlist: (product) => dispatch({ type: 'TOGGLE_ITEM', payload: product }),
        removeFromWishlist: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        clearWishlist: () => dispatch({ type: 'CLEAR_WISHLIST' }),
        isWishlisted: (id) => state.items.some(i => i.id === id),
        totalWishlist: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
