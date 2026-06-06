"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    // Modern seamless page-wide smooth scrolling for anchors
    const handleAnchorClick = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        if (anchor.pathname === window.location.pathname) {
          const targetElement = document.querySelector(anchor.hash);
          if (targetElement && targetElement instanceof HTMLElement) {
            e.preventDefault();
            // Extremely smooth cinematic scroll with offset to clear the sticky header
            lenis.scrollTo(targetElement, {
              offset: -90,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Sleek easeOutExpo curve
            });
          }
        }
      }
    };

    // Scroll smoothly to initial URL hash on mount or dynamic page transition
    const checkAndScrollToHash = () => {
      if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement && targetElement instanceof HTMLElement) {
          setTimeout(() => {
            lenis.scrollTo(targetElement, {
              offset: -90,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Sleek easeOutExpo curve
            });
          }, 300); // 300ms delay ensures Next.js page mount is stable
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", checkAndScrollToHash);

    // Run on initial mount (in case loaded with a hash in URL)
    checkAndScrollToHash();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", checkAndScrollToHash);
      lenis.destroy();
    };
  }, []);

  return children;
}
