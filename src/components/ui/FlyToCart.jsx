'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Global overlay that listens for `kwikr:fly-to-cart` events and animates
 * a cloned product thumbnail flying from wherever "Add to Cart" was clicked
 * to the header cart icon (#header-cart-icon), which gets a small bump on
 * arrival. Mounted once in the root layout.
 */
export default function FlyToCart() {
  const layerRef = useRef(null);

  useEffect(() => {
    function handleFly(e) {
      const { image, rect } = e.detail || {};
      const cartEl = document.getElementById('header-cart-icon');
      if (!image || !rect || !layerRef.current || !cartEl) return;

      const cartRect = cartEl.getBoundingClientRect();

      const clone = document.createElement('img');
      clone.src = image;
      Object.assign(clone.style, {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: '12px',
        objectFit: 'cover',
        zIndex: 200,
        pointerEvents: 'none',
        boxShadow: '0 12px 28px rgba(0,0,0,0.28)',
      });
      layerRef.current.appendChild(clone);

      const tl = gsap.timeline({
        onComplete: () => {
          clone.remove();
          gsap.fromTo(
            cartEl,
            { scale: 1 },
            { scale: 1.22, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.inOut' }
          );
        },
      });

      tl.to(clone, { scale: 0.92, duration: 0.12, ease: 'power1.out' }).to(
        clone,
        {
          left: cartRect.left + cartRect.width / 2 - 10,
          top: cartRect.top + cartRect.height / 2 - 10,
          width: 20,
          height: 20,
          opacity: 0.5,
          duration: 0.6,
          ease: 'power2.in',
        },
        '-=0.02'
      ).to(clone, { scale: 0.3, opacity: 0, duration: 0.15 }, '-=0.08');
    }

    window.addEventListener('kwikr:fly-to-cart', handleFly);
    return () => window.removeEventListener('kwikr:fly-to-cart', handleFly);
  }, []);

  return <div ref={layerRef} className="fixed inset-0 pointer-events-none z-[90]" aria-hidden="true" />;
}
