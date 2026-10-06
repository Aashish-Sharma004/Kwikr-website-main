'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Premium first-load screen. Shows once per browser session (sessionStorage
 * flag), animates the Kwikr mark in, counts a progress percentage up to
 * 100, then scales/fades away to reveal the site underneath.
 */
export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    let show = true;
    try {
      show = !sessionStorage.getItem('kwikr_loaded_v2');
    } catch {}
    setMounted(true);
    setShouldRender(show);
    if (!show) return;

    try {
      sessionStorage.setItem('kwikr_loaded_v2', '1');
    } catch {}

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        if (rootRef.current) rootRef.current.style.display = 'none';
      },
    });

    tl.fromTo(
      logoRef.current,
      { scale: 0.4, opacity: 0, rotate: -8 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.9)' }
    )
      .fromTo(
        taglineRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.25'
      )
      .to(
        counter,
        {
          val: 100,
          duration: 1.15,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (pctRef.current) pctRef.current.textContent = Math.round(counter.val) + '%';
            if (barRef.current) barRef.current.style.width = counter.val + '%';
          },
        },
        '-=0.1'
      )
      .to(logoRef.current, { scale: 1.06, duration: 0.18, ease: 'power1.out' }, '-=0.15')
      .to(logoRef.current, { scale: 1, duration: 0.18, ease: 'power1.inOut' })
      .to(
        rootRef.current,
        { opacity: 0, scale: 1.04, duration: 0.55, ease: 'power2.inOut' },
        '+=0.2'
      );

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted || !shouldRender) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5"
      style={{ background: 'linear-gradient(135deg, #15803d 0%, #1a9e3f 55%, #22c55e 100%)' }}
      aria-hidden="true"
    >
      <div ref={logoRef} className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
        <span className="text-green-600 font-black text-4xl leading-none">K</span>
      </div>
      <div ref={taglineRef} className="text-center">
        <p className="text-2xl font-black tracking-tight text-white">Kwikr</p>
        <p className="text-xs text-white/75 font-medium mt-1">Groceries delivered in 10 minutes</p>
      </div>
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mt-1">
        <div ref={barRef} className="h-full bg-white rounded-full" style={{ width: '0%' }} />
      </div>
      <p ref={pctRef} className="text-xs font-bold text-white/85 tabular-nums">0%</p>
    </div>
  );
}
