'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronRight, Zap, Search } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import useMagnetic from '@/hooks/useMagnetic';

/* Scattered background decoration items — same style as reference */
const bgDecorations = [
  { emoji: '🥩', top: '6%',   left: '1%',   size: 52, rotate: -15 },
  { emoji: '🥗', top: '4%',   left: '24%',  size: 44, rotate: 10  },
  { emoji: '🍍', top: '5%',   right: '24%', size: 48, rotate: -8  },
  { emoji: '🛒', top: '6%',   right: '3%',  size: 44, rotate: 6   },
  { emoji: '🥬', bottom: '14%', left: '0.5%', size: 44, rotate: 18 },
  { emoji: '🥛', bottom: '8%',  left: '22%',  size: 40, rotate: -10 },
  { emoji: '🍅', bottom: '10%', right: '5%',  size: 38, rotate: 5  },
  { emoji: '🫙', top: '42%',   right: '1%',  size: 38, rotate: -8  },
  { emoji: '🥕', top: '32%',   left: '0%',   size: 34, rotate: 20  },
  { emoji: '🧃', bottom: '30%', right: '18%', size: 34, rotate: -12 },
  { emoji: '🍞', top: '18%',   left: '16%',  size: 32, rotate: 8   },
  { emoji: '🧅', bottom: '22%', left: '10%',  size: 30, rotate: -5  },
];

export default function HeroSection() {
  const router = useRouter();
  const [pin, setPin]             = useState('');
  const [pinChecked, setPinChecked] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroSearch, setHeroSearch] = useState('');
  const sectionRef = useRef(null);
  const decoRefs = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const shopNowRef = useMagnetic(0.3);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/products?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  // Split-line heading reveal on mount + gentle mouse parallax on the
  // scattered grocery icons in the background.
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      [line1Ref.current, line2Ref.current],
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
    );

    const quickSetters = decoRefs.current.map((el, i) =>
      el ? { x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }), depth: ((i % 4) + 1) * 4 } : null
    );

    const handleMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      quickSetters.forEach((qs) => {
        if (!qs) return;
        qs.x(relX * qs.depth);
        qs.y(relY * qs.depth);
      });
    };

    const el = sectionRef.current;
    el?.addEventListener('mousemove', handleMove);
    return () => el?.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/premium_banner.jpg')", minHeight: '400px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 items-center gap-4 md:gap-8">

            {/* Left — text */}
            <div className="order-2 md:order-1">
              <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                <Zap size={12} className="fill-white" /> Delivery in 10 Minutes
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-[1.18] mb-3 overflow-hidden">
                <span ref={line1Ref} className="block">Premium Quality,</span>
                <span ref={line2Ref} className="block">Delivered Instantly.</span>
              </h1>
              <p className="text-gray-200 text-sm sm:text-base mb-5">
                Experience the finest selection of groceries, delivered in less than 10 minutes.
              </p>

              <form onSubmit={handleHeroSearch} className="relative max-w-md mb-5">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  placeholder="Search for atta, milk, chips..."
                  className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 bg-white/90 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm shadow-sm transition-all placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>

              <Link
                ref={shopNowRef}
                href="/products"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Shop Now <ChevronRight size={15} />
              </Link>

              {/* Carousel indicator dots */}
              <div className="flex items-center gap-2 mt-8">
                {[0, 1, 2].map(i => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeSlide
                        ? 'w-7 h-2.5 bg-green-600'
                        : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
                <button
                  onClick={() => setActiveSlide((activeSlide + 1) % 3)}
                  className="ml-1 text-gray-400 hover:text-gray-600 text-lg leading-none px-1"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </div>

            {/* Right — delivery person / grocery image */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm h-60 sm:h-72 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85"
                  alt="Fresh groceries delivered to your door"
                  fill
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                  sizes="(max-width: 768px) 280px, 400px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Delivery Strip ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

          {/* Truck + text */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-14 h-10 flex-shrink-0 flex items-center justify-center">
              <span className="text-4xl leading-none">🚚</span>
            </div>
            <div>
              <p className="text-sm font-black text-orange-500 uppercase tracking-tight leading-tight">
                FREE DELIVERY ON NEXT ORDER
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Spend only ₹199 on your purchases
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gray-200 flex-shrink-0" />

          {/* Center label */}
          <p className="text-sm text-gray-500 hidden md:block flex-shrink-0">
            Check if we can deliver to you
          </p>

          {/* PIN input + button */}
          <div className="flex items-center gap-2 sm:ml-auto flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your postcode"
                value={pin}
                onChange={e => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setPinChecked(false);
                }}
                className="border border-gray-300 hover:border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-4 pr-9 py-2.5 text-sm outline-none transition-all w-44 placeholder-gray-400"
              />
              <MapPin
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <button
              onClick={() => pin.length >= 4 && setPinChecked(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap shadow-sm"
            >
              {pinChecked ? '✓ Available!' : 'Check Postcode'}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
