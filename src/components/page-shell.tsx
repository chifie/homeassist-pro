import { useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main ref={ref} className={cn("flex-1", className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
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
        <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-muted-foreground">{description}</p>}
    </div>
  );
}
