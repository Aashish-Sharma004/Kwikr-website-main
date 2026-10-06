'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Central GSAP registration — imported by any client component that needs
// scroll-driven or timeline animation. Registering plugins more than once
// is a no-op in GSAP, so every importer can safely call this module.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger };
