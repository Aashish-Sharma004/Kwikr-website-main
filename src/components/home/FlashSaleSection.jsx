'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

function msUntilMidnight() {
  const target = new Date();
  target.setHours(24, 0, 0, 0);
  return target.getTime() - Date.now();
}

export default function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const tick = () => setTimeLeft(Math.max(0, msUntilMidnight()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / 60000) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  const flashItems = [...products].filter(p => p.discount >= 20).sort((a, b) => b.discount - a.discount).slice(0, 10);

  return (
    <section className="py-8 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Zap className="text-orange-500 fill-orange-500" size={22} />
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Flash Sale</h2>
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">Up to 30% OFF</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium hidden sm:inline">Ends in</span>
            {[hours, minutes, seconds].map((t, i) => (
              <span key={i} className="bg-gray-900 text-white font-black text-sm rounded-md px-2 py-1 min-w-[34px] text-center">
                {t}
              </span>
            ))}
          </div>
          <Link href="/products" className="flex items-center gap-1 text-green-600 font-semibold text-sm hover:text-green-700">
            See All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="scroll-container">
          <div className="flex gap-4 pb-3" style={{ width: 'max-content' }}>
            {flashItems.map(product => (
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
