// src/lib/useLenis.js
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * @param {object} opts
 * @param {boolean} opts.anchor - enable smooth anchor link scrolling
 * @param {number} opts.headerOffset - pixels to offset for sticky header height
 */
export default function useLenis({ anchor = true, headerOffset = 64 } = {}) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.13, // easing
      wheelMultiplier: 0.9,
    });

    // RAF loop
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth anchor links
    let links = [];
    let handler = null;

    if (anchor) {
      links = Array.from(document.querySelectorAll('a[href^="#"]'));
      handler = (e) => {
        const a = e.currentTarget;
        const hash = a.getAttribute("href");
        if (!hash) return;
        const isTop = hash === "#" || hash === "#top";

        const target = isTop
          ? document.documentElement
          : document.querySelector(hash);
        if (!target) return;

        e.preventDefault();
        lenis.scrollTo(target, {
          offset: isTop ? 0 : -headerOffset, // keep section below sticky navbar
          duration: 1.1, // seconds
          lock: true,
          force: true,
        });
        // reflect hash in URL (optional)
        if (!isTop) history.pushState(null, "", hash);
      };

      links.forEach((a) => a.addEventListener("click", handler));
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (anchor && handler)
        links.forEach((a) => a.removeEventListener("click", handler));
    };
  }, [anchor, headerOffset]);
}
