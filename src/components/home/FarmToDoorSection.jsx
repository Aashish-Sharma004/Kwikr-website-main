'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Users, Recycle, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const commitments = [
  { icon: Users, label: 'Direct Farmer Partnerships', desc: '1,200+ growers paid fair-trade rates, no middlemen' },
  { icon: Recycle, label: 'Lighter Packaging', desc: 'Compostable bags across fruits, veggies & dairy' },
  { icon: Leaf, label: 'Cold-Chain Freshness', desc: 'Farm to dark-store in under 6 hours, every day' },
];

export default function FarmToDoorSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const insetRef = useRef(null);
  const textRef = useRef(null);
  const chipsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      tl.fromTo(imgRef.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.inOut' })
        .fromTo(insetRef.current, { opacity: 0, scale: 0.85, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
        .fromTo(textRef.current.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.5')
        .fromTo(chipsRef.current.children, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '-=0.25');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">

          {/* Image side */}
          <div className="relative">
            <div ref={imgRef} className="relative rounded-[28px] overflow-hidden h-72 sm:h-96">
              <Image
                src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=900&q=80"
                alt="Organic produce sourced directly from partner farms"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            {/* Inset card — grounds the story in a real supplier already in the catalog */}
            <div
              ref={insetRef}
              className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl shadow-xl p-4 w-48 flex items-center gap-3 border border-gray-100"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80" alt="Local Farm produce" fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-900 leading-tight">Local Farm Co-op</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Partner since 2021</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div ref={textRef}>
              <span className="inline-block bg-lime-100 text-lime-700 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                From Farm to Door
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-snug mb-3">
                Behind every crate is a farmer we know by name
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Kwikr sources fruits, vegetables and dairy directly from growers like <span className="font-semibold text-gray-700">Local Farm Co-op</span> and{' '}
                <span className="font-semibold text-gray-700">Organic Valley</span> — no distributors, no markups stacked in between. It means fresher produce
                on your shelf, and a fairer price paid at the farm gate.
              </p>
            </div>

            <div ref={chipsRef} className="space-y-3 mb-7">
              {commitments.map((c) => (
                <div key={c.label} className="flex items-start gap-3 bg-gray-50 hover:bg-green-50/60 rounded-xl p-3 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-green-600">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{c.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products?category=fruits-vegetables"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-bold text-sm"
            >
              Shop Farm-Fresh Produce <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
