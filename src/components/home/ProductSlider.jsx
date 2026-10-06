'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductSlider({ title, subtitle, products, viewAllHref, badge }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              {badge && (
                <span className="bg-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {badge}
                </span>
              )}
              <h2 className="text-xl md:text-2xl font-black text-gray-900">{title}</h2>
            </div>
            {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {viewAllHref && (
              <Link href={viewAllHref} className="flex items-center gap-1 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors">
                See All <ChevronRight size={14} />
              </Link>
            )}
            <div className="hidden sm:flex items-center gap-1.5 ml-1">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="scroll-container">
          <div className="flex gap-4 pb-3" style={{ width: 'max-content' }}>
            {products.map(product => (
              <div key={product.id} className="w-44 sm:w-48 flex-shrink-0">
                <ProductCard product={product} size="md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
