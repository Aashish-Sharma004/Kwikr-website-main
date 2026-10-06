import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function SeasonalOffersBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 min-h-[220px] flex items-center">
          <div className="absolute -right-10 -top-10 w-56 h-56 bg-white/10 rounded-full" />
          <div className="absolute -right-4 bottom-0 w-40 h-40 bg-white/10 rounded-full" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 p-6 sm:p-10 w-full">
            <div className="flex-1 text-white text-center lg:text-left">
              <span className="inline-block bg-white/20 border border-white/30 text-xs font-bold px-3 py-1 rounded-full mb-3">
                🌦️ Monsoon Special
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
                Seasonal Freshness, Delivered to Your Door
              </h2>
              <p className="text-green-100 text-sm sm:text-base mb-5 max-w-lg">
                Handpicked seasonal fruits, immunity-boosting essentials, and monsoon must-haves at unbeatable prices.
              </p>
              <Link
                href="/products?category=fruits-vegetables"
                className="inline-flex items-center gap-2 bg-white text-green-700 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Seasonal Picks <ChevronRight size={15} />
              </Link>
            </div>
            <div className="relative w-48 h-40 sm:w-64 sm:h-52 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500&q=80"
                alt="Seasonal fresh produce"
                fill
                className="object-cover rounded-xl shadow-xl"
                sizes="256px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
