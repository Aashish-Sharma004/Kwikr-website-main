'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { History } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { getProductById } from '@/data/products';

/**
 * Slim, personal strip — deliberately lighter-weight than ProductSlider
 * (no arrow nav, smaller square tiles, native scroll-snap) so it reads as
 * "your history" rather than another merchandising rail. Renders nothing
 * until the visitor has actually viewed a product.
 */
export default function RecentlyViewedSection() {
  const { ids, hydrated } = useRecentlyViewed();
  const trackRef = useRef(null);

  const items = ids.map((id) => getProductById(id)).filter(Boolean).slice(0, 10);

  useEffect(() => {
    if (!items.length || !trackRef.current) return;
    gsap.fromTo(
      trackRef.current.children,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (!hydrated || items.length === 0) return null;

  return (
    <section className="py-6 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <History size={13} />
          </span>
          <h2 className="text-sm font-bold text-gray-700">Recently Viewed</h2>
        </div>

        <div ref={trackRef} className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              data-cursor-hover
              className="snap-start flex-shrink-0 w-28 group"
            >
              <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-green-200 transition-colors">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="112px" />
              </div>
              <p className="text-xs font-semibold text-gray-700 mt-1.5 line-clamp-1">{p.name}</p>
              <p className="text-xs font-bold text-gray-900">₹{p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
