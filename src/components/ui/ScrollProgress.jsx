'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Slim gradient bar fixed to the very top of the viewport, above the
 * header, reflecting how far the visitor has scrolled through the page.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.to(barRef.current, {
          scaleX: self.progress,
          duration: 0.15,
          ease: 'none',
          overwrite: 'auto',
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #1a9e3f 0%, #f5a623 100%)',
        }}
      />
    </div>
  );
}
