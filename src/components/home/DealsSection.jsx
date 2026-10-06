'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* Real, previously-vetted product photography reused from the catalog so
   every image matches Kwikr's existing visual language. */
const deals = {
  saver: {
    title: 'Up to 50% Off',
    subtitle: 'On fresh fruits & vegetables, picked daily',
    badge: 'Super Saver',
    href: '/products?category=fruits-vegetables',
    cta: 'Shop Produce',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
  },
  delivery: {
    title: 'Free Delivery, Always',
    subtitle: 'On every order above ₹199 — no fine print',
    badge: 'Free Delivery',
    href: '/products',
    cta: 'Start an order',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
  },
  bulk: {
    title: 'Buy More, Save More',
    subtitle: 'Min. 20% off on pantry staples in bulk',
    badge: 'Bulk Deals',
    href: '/products?category=atta-rice',
    cta: 'Stock up',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
  },
  dairy: {
    title: 'Daily Dairy Deals',
    subtitle: 'Fresh milk, curd & paneer every morning',
    badge: 'Daily Fresh',
    href: '/products?category=dairy-milk',
    cta: 'Shop dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
  },
};

export default function DealsSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.deal-card');
    if (!cards?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Grocery Deals & Offers</h2>
          <p className="text-gray-400 text-sm mt-1">Best prices on your daily essentials</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[168px] gap-4">

          {/* Card 1 — Super Saver: full-bleed photo hero, sticker badge, largest card */}
          <Link
            href={deals.saver.href}
            data-cursor-hover
            className="deal-card group relative overflow-hidden rounded-3xl h-64 sm:h-72 lg:h-auto lg:col-span-6 lg:row-span-2 shadow-md hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src={deals.saver.image}
              alt={deals.saver.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/25 to-transparent" />

            {/* Sticker-style discount badge */}
            <div className="absolute top-5 right-5 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg flex flex-col items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-300">
              <span className="text-emerald-700 font-black text-lg sm:text-xl leading-none">50%</span>
              <span className="text-emerald-600 font-bold text-[9px] uppercase tracking-wide">off</span>
            </div>

            <div className="relative h-full flex flex-col justify-end p-6">
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 w-fit border border-white/20">
                {deals.saver.badge}
              </span>
              <h3 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-1.5">{deals.saver.title}</h3>
              <p className="text-white/75 text-sm mb-5 max-w-xs">{deals.saver.subtitle}</p>
              <span className="inline-flex items-center gap-1.5 bg-white text-emerald-800 text-sm font-bold px-4 py-2 rounded-full w-fit group-hover:gap-2.5 transition-all">
                {deals.saver.cta} <ArrowRight size={15} />
              </span>
            </div>
          </Link>

          {/* Card 2 — Free Delivery: light card, circular photo bleeding off the edge */}
          <Link
            href={deals.delivery.href}
            data-cursor-hover
            className="deal-card group relative overflow-hidden rounded-3xl h-40 sm:h-44 lg:h-auto lg:col-span-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center"
          >
            <div className="flex-1 pl-6 pr-2 py-5 min-w-0">
              <span className="inline-block bg-orange-100 text-orange-700 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-2.5">
                {deals.delivery.badge}
              </span>
              <h3 className="font-black text-gray-900 text-lg sm:text-xl leading-snug mb-1">{deals.delivery.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-3">{deals.delivery.subtitle}</p>
              <span className="inline-flex items-center gap-1 text-orange-600 group-hover:text-orange-700 font-bold text-sm">
                {deals.delivery.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 -mr-4 sm:-mr-6">
              <div className="relative w-full h-full rounded-full overflow-hidden ring-[6px] ring-white shadow-xl">
                <Image src={deals.delivery.image} alt={deals.delivery.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="144px" />
              </div>
            </div>
          </Link>

          {/* Card 3 — Bulk Deals: photo strip on top, ribbon badge, content below */}
          <Link
            href={deals.bulk.href}
            data-cursor-hover
            className="deal-card group relative overflow-hidden rounded-3xl h-56 lg:h-auto lg:col-span-3 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-24 sm:h-28 lg:h-1/2 flex-shrink-0 overflow-hidden">
              <Image src={deals.bulk.image} alt={deals.bulk.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="280px" />
              <span className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wide px-3 py-1 rounded-br-xl">
                {deals.bulk.badge}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <h3 className="font-black text-gray-900 text-base leading-snug mb-1">{deals.bulk.title}</h3>
              <p className="text-gray-400 text-xs mb-2.5">{deals.bulk.subtitle}</p>
              <span className="inline-flex items-center gap-1 text-blue-600 group-hover:text-blue-700 font-bold text-xs">
                {deals.bulk.cta} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Card 4 — Daily Dairy: soft-tint card, small avatar-style product photo */}
          <Link
            href={deals.dairy.href}
            data-cursor-hover
            className="deal-card group relative overflow-hidden rounded-3xl h-56 lg:h-auto lg:col-span-3 bg-sky-50 border border-sky-100 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
          >
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-white shadow-md mb-3">
              <Image src={deals.dairy.image} alt={deals.dairy.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="56px" />
            </div>
            <span className="inline-block bg-sky-100 text-sky-700 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 w-fit">
              {deals.dairy.badge}
            </span>
            <h3 className="font-black text-gray-900 text-base leading-snug mb-1">{deals.dairy.title}</h3>
            <p className="text-gray-400 text-xs mb-2.5 flex-1">{deals.dairy.subtitle}</p>
            <span className="inline-flex items-center gap-1 text-sky-600 group-hover:text-sky-700 font-bold text-xs">
              {deals.dairy.cta} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}
