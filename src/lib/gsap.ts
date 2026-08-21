import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useGsap(
  setup: (ctx: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    const ctx = gsap.context(() => setup({ gsap, ScrollTrigger }));
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Fade + rise reveal for every element matching `selector`, on scroll. */
export function useRevealOnScroll(
  selector = "[data-reveal]",
  deps: unknown[] = []
) {
  useGsap(({ gsap: g }) => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = gsap.utils.toArray<HTMLElement>(selector);
    items.forEach((el, i) => {
      if (prefersReducedMotion) {
        // Just make visible without animation
        g.set(el, { autoAlpha: 1 });
        return;
      }

      g.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });
  }, deps);
}

export { gsap, ScrollTrigger };
