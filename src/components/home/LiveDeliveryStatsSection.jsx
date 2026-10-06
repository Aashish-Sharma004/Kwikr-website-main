'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import useCountUp from '@/hooks/useCountUp';

const stats = [
  { value: 2.4, decimals: 1, suffix: 'M+', label: 'Orders Delivered', icon: '📦' },
  { value: 180, decimals: 0, suffix: '+', label: 'Neighborhoods Covered', icon: '📍' },
  { value: 8, decimals: 0, suffix: ' min', label: 'Average Delivery Time', icon: '⚡' },
  { value: 15000, decimals: 0, suffix: '+', label: 'Partner Farmers', icon: '🌾' },
];

const floaters = [
  { emoji: '🥦', top: '10%', left: '6%', size: 30, depth: 18 },
  { emoji: '🍋', top: '68%', left: '3%', size: 26, depth: 12 },
  { emoji: '🥛', top: '18%', right: '8%', size: 28, depth: 14 },
  { emoji: '🧺', top: '65%', right: '5%', size: 32, depth: 20 },
  { emoji: '🥕', top: '40%', left: '1%', size: 22, depth: 10 },
  { emoji: '🍇', top: '38%', right: '1%', size: 24, depth: 16 },
];

function Stat({ s }) {
  const ref = useCountUp(s.value, { decimals: s.decimals, suffix: s.suffix, duration: 1.8 });
  return (
    <div className="text-center px-4">
      <div className="text-3xl mb-2 opacity-90">{s.icon}</div>
      <p ref={ref} className="text-3xl sm:text-4xl font-black text-white tabular-nums">0{s.suffix}</p>
      <p className="text-white/60 text-xs sm:text-sm font-medium mt-1.5">{s.label}</p>
    </div>
  );
}

export default function LiveDeliveryStatsSection() {
  const sectionRef = useRef(null);
  const floatRefs = useRef([]);

  useEffect(() => {
    const setters = floatRefs.current.map((el, i) =>
      el
        ? {
            x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
            depth: floaters[i].depth,
          }
        : null
    );

    const handleMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setters.forEach((s) => {
        if (!s) return;
        s.x(relX * s.depth);
        s.y(relY * s.depth);
      });
    };

    const el = sectionRef.current;
    el?.addEventListener('mousemove', handleMove);
    return () => el?.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14"
      style={{ background: 'linear-gradient(120deg, #0f2418 0%, #14361f 45%, #16401f 100%)' }}
    >
      {/* Floating grocery icons — mouse parallax */}
      {floaters.map((f, i) => (
        <span
          key={i}
          ref={(el) => (floatRefs.current[i] = el)}
          aria-hidden="true"
          className="float-slow absolute pointer-events-none select-none opacity-25"
          style={{ top: f.top, left: f.left, right: f.right, fontSize: f.size, animationDelay: `${i * 0.4}s` }}
        >
          {f.emoji}
        </span>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-green-300 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow" /> Live Network Stats
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white">Numbers That Keep Growing</h2>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">Real infrastructure behind every 10-minute promise</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 divide-x divide-white/10">
          {stats.map((s) => (
            <Stat key={s.label} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
