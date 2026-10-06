'use client';

import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategorySection() {
  return (
    <section className="bg-white border-b border-gray-100 py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-gray-900">Shop By Categories</h2>
          <Link
            href="/products"
            className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
          >
            View All Categories →
          </Link>
        </div>

        {/* Scrollable category row */}
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 group"
            >
              <div
                className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full ${cat.color} flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-200 group-hover:scale-110 group-hover:shadow-md`}
              >
                {cat.icon}
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold text-center leading-tight ${cat.textColor} group-hover:text-green-600 transition-colors max-w-[72px]`}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
