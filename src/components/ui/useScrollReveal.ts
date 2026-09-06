import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useScrollReveal
 * Tiny reusable helper so every section doesn't hand-roll its own
 * ScrollTrigger boilerplate. Purely additive — sections can ignore
 * this and write their own GSAP timelines if they need something
 * more custom (see HeroSection, which animates on load, not on scroll).
 */
export function useScrollReveal<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-reveal]");
      if (targets.length === 0) return;

      gsap.set(targets, { opacity: 0, y: 40 });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
