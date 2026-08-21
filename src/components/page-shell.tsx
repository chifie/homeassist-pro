import { useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Shared page shell: nav, GSAP page-transition, footer. */
export function PageShell({
  children,
  className,
  hideFooter,
}: {
  children: ReactNode;
  className?: string;
  hideFooter?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ref = useRef<HTMLDivElement>(null);

  useGsap(({ gsap }) => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main ref={ref} className={cn("flex-1", className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      <BackToTop />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")} data-reveal>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
