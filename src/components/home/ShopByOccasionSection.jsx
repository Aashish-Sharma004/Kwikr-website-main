'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { getProductsByCategory } from '@/data/products';

/* Lifestyle moments mapped to real, non-empty categories so every card
   always lands on a populated results page — never a dead end. */
const occasions = [
  {
    title: 'Movie Night In',
    subtitle: 'Chips, popcorn & cola on standby',
    href: '/products?category=snacks',
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=700&q=80',
    span: 'sm:col-span-2 sm:row-span-2',
    tint: 'from-orange-900/80 via-orange-900/20',
  },
  {
    title: 'Sunday Brunch',
    subtitle: 'Fresh bakes for a slow morning',
    href: '/products?category=bakery',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    span: '',
    tint: 'from-amber-900/80 via-amber-900/15',
  },
  {
    title: 'Chai & Coffee Break',
    subtitle: 'Brew something warm',
    href: '/products?category=beverages',
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
    span: '',
    tint: 'from-emerald-900/80 via-emerald-900/15',
  },
  {
    title: '5-Minute Fixes',
    subtitle: 'Frozen meals when time is short',
    href: '/products?category=frozen',
    category: 'frozen',
    image: 'https://images.unsplash.com/photo-1600788907416-456578634209?w=600&q=80',
    span: '',
    tint: 'from-sky-900/80 via-sky-900/15',
  },
  {
    title: 'Fresh Start Mornings',
    subtitle: 'Milk, curd & breakfast dairy',
    href: '/products?category=dairy-milk',
    category: 'dairy-milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    span: '',
    tint: 'from-blue-900/80 via-blue-900/15',
  },
  {
    title: 'Home Reset Day',
    subtitle: 'Everything for a spotless house',
    href: '/products?category=cleaning',
    category: 'cleaning',
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=600&q=80',
    span: '',
    tint: 'from-teal-900/80 via-teal-900/15',
  },
];

export default function ShopByOccasionSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.occasion-card');
    if (!cards?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-10 bg-[#fbfaf6]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner-style header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="inline-block bg-orange-100 text-orange-700 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-2.5">
              Curated for the moment
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Shop by Occasion</h2>
            <p className="text-gray-400 text-sm mt-1">Grab exactly what the moment calls for — we&apos;ve grouped it for you</p>
          </div>
        </div>

        {/* Asymmetric bento grid — each tile its own size/weight */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[140px] gap-3">
          {occasions.map((o) => {
            const count = getProductsByCategory(o.category).length;
            return (
              <Link
                key={o.title}
                href={o.href}
                data-cursor-hover
                className={`occasion-card group relative rounded-2xl overflow-hidden ${o.span}`}
              >
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${o.tint} to-transparent`} />
                <div className="relative h-full flex flex-col justify-end p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-black text-sm sm:text-base leading-tight drop-shadow-sm">{o.title}</p>
                      <p className="text-white/75 text-[11px] sm:text-xs mt-0.5">{o.subtitle}</p>
                    </div>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                  <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wide mt-1.5">{count}+ items</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
