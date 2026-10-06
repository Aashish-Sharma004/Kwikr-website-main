import Link from 'next/link';
import { brands } from '@/data/products';

const palette = [
  'bg-green-100 text-green-700', 'bg-orange-100 text-orange-700', 'bg-blue-100 text-blue-700',
  'bg-pink-100 text-pink-700', 'bg-purple-100 text-purple-700', 'bg-yellow-100 text-yellow-800',
  'bg-teal-100 text-teal-700', 'bg-rose-100 text-rose-700',
];

export default function BrandsSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Shop By Brands</h2>
            <p className="text-gray-400 text-sm mt-0.5">Trusted brands you already love</p>
          </div>
          <Link href="/products" className="text-green-600 font-semibold text-sm hover:text-green-700">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {brands.slice(0, 16).map((brand, i) => (
            <Link
              key={brand}
              href={`/products?brand=${encodeURIComponent(brand)}`}
              className={`flex items-center justify-center text-center rounded-xl py-5 px-2 font-bold text-sm leading-tight hover:scale-105 transition-transform duration-200 ${palette[i % palette.length]}`}
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
