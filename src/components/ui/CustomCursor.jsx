'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Desktop-only dot + ring cursor. The ring trails the dot with a soft ease
 * and grows/tints on interactive elements (links, buttons, product cards)
 * so hover targets read clearly without any layout shift. Automatically
 * disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Pass 1: detect a fine-pointer (desktop mouse) device and flip `enabled`.
  // This only decides whether the dot/ring elements render at all.
  useEffect(() => {
    const supportsFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (supportsFine) setEnabled(true);
  }, []);

  // Pass 2: runs AFTER `enabled` flips true and the dot/ring have actually
  // mounted, so the refs below are guaranteed non-null. Wiring this into the
  // same effect as pass 1 was the bug — quickTo(null, ...) threw before the
  // listeners were ever attached, leaving the native cursor hidden with
  // nothing drawn in its place.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('kwikr-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const grow = () => gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.25, ease: 'power2.out' });
    const shrink = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
    const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const reveal = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover], input, select, textarea')) grow();
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover], input, select, textarea')) shrink();
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', reveal);

    return () => {
      document.documentElement.classList.remove('kwikr-cursor-active');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', reveal);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-green-600 rounded-full pointer-events-none z-[95] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[95] -translate-x-1/2 -translate-y-1/2 border-2 border-green-600/60"
      />
    </>
  );
}
