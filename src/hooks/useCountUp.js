'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Animates the number inside the returned ref from 0 up to `value` once the
 * element scrolls into view, formatting with the given number of decimals
 * and an optional suffix (e.g. "min", "+"). Runs once per mount.
 */
export default function useCountUp(value, { decimals = 0, suffix = '', duration = 1.6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = counter.val.toFixed(decimals) + suffix;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals, suffix, duration]);

  return ref;
}
