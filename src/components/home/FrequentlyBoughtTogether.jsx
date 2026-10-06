'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Check, ShoppingCart } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { products as allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

/**
 * PDP-only bundle strip. Picks two products that pair naturally with the
 * current one (same category, different subcategory where possible so it
 * doesn't just repeat near-duplicates) and lets the shopper add the whole
 * set — or deselect items — in one tap.
 */
export default function FrequentlyBoughtTogether({ product }) {
  const { addItem, getItemQuantity } = useCart();
  const rowRef = useRef(null);

  const partners = useMemo(() => {
    const pool = allProducts.filter((p) => p.category === product.category && p.id !== product.id);
    const differentSub = pool.filter((p) => p.subcategory !== product.subcategory);
    const picks = [];
    for (const p of [...differentSub, ...pool]) {
      if (picks.length >= 2) break;
      if (!picks.find((x) => x.id === p.id)) picks.push(p);
    }
    return picks;
  }, [product]);

  const bundle = [product, ...partners];
  const [selected, setSelected] = useState(() => new Set(bundle.map((p) => p.id)));

  useEffect(() => {
    setSelected(new Set(bundle.map((p) => p.id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  useEffect(() => {
    if (!rowRef.current) return;
    gsap.fromTo(
      rowRef.current.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );
  }, [product.id]);

  if (partners.length === 0) return null;

  const toggle = (id) => {
    if (id === product.id) return; // anchor item always included
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedItems = bundle.filter((p) => selected.has(p.id));
  const total = selectedItems.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    selectedItems.forEach((p) => {
      if (getItemQuantity(p.id) === 0) addItem(p);
    });
    toast.success(`${selectedItems.length} items added to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Frequently Bought Together</h2>
      <p className="text-sm text-gray-400 mb-5">Pairs well with what you&apos;re already buying</p>

      <div ref={rowRef} className="flex flex-wrap items-center gap-3 mb-5">
        {bundle.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3">
            <button
              onClick={() => toggle(p.id)}
              disabled={p.id === product.id}
              className={`relative flex flex-col items-center gap-1.5 w-24 group ${p.id === product.id ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selected.has(p.id) ? 'border-green-500' : 'border-gray-200 opacity-50'
                }`}
              >
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                <div
                  className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white transition-colors ${
                    selected.has(p.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <Check size={11} />
                </div>
              </div>
              <p className="text-[11px] text-gray-600 text-center line-clamp-2 leading-tight">{p.name}</p>
              <p className="text-xs font-bold text-gray-900">₹{p.price}</p>
            </button>
            {i < bundle.length - 1 && <Plus size={16} className="text-gray-300 flex-shrink-0" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
        <p className="text-sm text-gray-700">
          Total for <span className="font-bold">{selectedItems.length} items</span>:{' '}
          <span className="font-black text-gray-900 text-base">₹{total}</span>
        </p>
        <button
          onClick={handleAddAll}
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <ShoppingCart size={15} /> Add All to Cart
        </button>
      </div>
    </div>
  );
}
