import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TransitionType = "fade" | "slide-up" | "slide-right" | "scale";

interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
  className?: string;
  delay?: number;
}

export function PageTransition({
  children,
  type = "fade",
  className,
  delay = 0,
}: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(({ gsap }) => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(ref.current, { autoAlpha: 1 });
      return;
    }

    const from = {
      fade: { autoAlpha: 0 },
      "slide-up": { autoAlpha: 0, y: 30 },
      "slide-right": { autoAlpha: 0, x: -30 },
      scale: { autoAlpha: 0, scale: 0.95 },
    }[type];

    const to = {
      fade: { autoAlpha: 1, duration: 0.5 },
      "slide-up": { autoAlpha: 1, y: 0, duration: 0.6 },
      "slide-right": { autoAlpha: 1, x: 0, duration: 0.6 },
      scale: { autoAlpha: 1, scale: 1, duration: 0.5 },
    }[type];

    gsap.fromTo(ref.current, from, {
      ...to,
      delay,
      ease: "power3.out",
    });
  }, []);

  return (
    <div ref={ref} className={cn("auto-alpha-0", className)}>
      {children}
    </div>
  );
}

export function StaggerChildren({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(({ gsap }) => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = ref.current.children;

    if (prefersReducedMotion || items.length === 0) {
      Array.from(items).forEach((item) => {
        gsap.set(item, { autoAlpha: 1 });
      });
      return;
    }

    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}
