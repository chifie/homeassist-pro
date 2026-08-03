import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, Home, ShieldCheck, Star } from "lucide-react";
import { useGsap } from "@/lib/gsap";

const highlights = [
  { icon: BadgeCheck, text: "Every professional is licence and ID verified" },
  { icon: ShieldCheck, text: "30-day workmanship guarantee on all jobs" },
  { icon: Star, text: "4.9 average rating across 62,000 completed jobs" },
];

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  useGsap(({ gsap }) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-auth-card]", { y: 26, opacity: 0, duration: 0.7 })
      .from("[data-auth-field]", { y: 14, opacity: 0, duration: 0.45, stagger: 0.07 }, "-=0.35")
      .from("[data-auth-aside]", { x: 24, opacity: 0, duration: 0.7 }, "-=0.7");
  }, [title]);

  return (
    <main className="grid min-h-screen gradient-hero lg:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-12 sm:px-10">
        <div data-auth-card className="mx-auto w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-primary-foreground">
              <Home size={18} aria-hidden />
            </span>
            <span className="font-display text-lg font-bold">HomeAssist</span>
          </Link>

          <h1 className="mt-8 text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>

          <div className="mt-8 rounded-2xl border bg-card p-6 shadow-lift">{children}</div>

          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </div>

      <aside
        data-auth-aside
        className="relative hidden flex-col justify-between overflow-hidden gradient-brand p-12 text-primary-foreground lg:flex"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
          HomeAssist
        </p>
        <div>
          <h2 className="max-w-md text-4xl font-bold leading-tight">
            Trusted professionals for your home, whenever you need them.
          </h2>
          <ul className="mt-10 space-y-4">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-foreground/15">
                  <h.icon size={16} aria-hidden />
                </span>
                <span className="text-primary-foreground/90">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-primary-foreground/70">
          1,800+ vetted pros · 5 metro areas · Same-day availability
        </p>
      </aside>
    </main>
  );
}
