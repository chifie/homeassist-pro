import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useGsap(
  setup: (ctx: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void,
  deps: unknown[] = [],
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
export function useRevealOnScroll(selector = "[data-reveal]", deps: unknown[] = []) {
  useGsap(({ gsap: g }) => {
    const items = gsap.utils.toArray<HTMLElement>(selector);
    items.forEach((el) => {
      g.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });
  }, deps);
}

export { gsap, ScrollTrigger };
