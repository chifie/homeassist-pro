import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Hammer,
  Plug,
  ShieldCheck,
  Sparkles,
  Timer,
  UserCheck,
  Wrench,
  Droplets,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, SectionHeading } from "@/components/page-shell";
import { StarRating } from "@/components/star-rating";
import { Skeleton, SkeletonHero, SkeletonGrid } from "@/components/ui/skeleton";
import { useGsap, useRevealOnScroll } from "@/lib/gsap";
import heroPro from "@/assets/hero-pro.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FundiLink — Trusted professionals for your home" },
      {
        name: "description",
        content:
          "Find vetted electricians, plumbers, cleaners and technicians near you. Transparent pricing, verified reviews and a workmanship guarantee.",
      },
      { property: "og:title", content: "FundiLink — Trusted professionals for your home" },
      {
        property: "og:description",
        content:
          "Book background-checked home service pros in minutes with FundiLink.",
      },
    ],
  }),
  component: Landing,
});

const services = [
  {
    name: "Electrical",
    icon: Plug,
    desc: "Rewiring, EV chargers, lighting and fault finding.",
    pros: 412,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    name: "Plumbing",
    icon: Droplets,
    desc: "Leaks, boilers, bathrooms and emergency callouts.",
    pros: 386,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    name: "Cleaning",
    icon: Sparkles,
    desc: "Deep cleans, move-outs and recurring home care.",
    pros: 528,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    name: "Repairs",
    icon: Hammer,
    desc: "Appliances, carpentry and everything in between.",
    pros: 297,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    name: "Maintenance",
    icon: Wrench,
    desc: "Seasonal checks, HVAC and preventive plans.",
    pros: 233,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us the job",
    text: "Describe what you need in a few taps — photos optional, quotes free.",
  },
  {
    icon: UserCheck,
    title: "Match with pros",
    text: "We surface verified professionals nearby, ranked by real reviews.",
  },
  {
    icon: CalendarCheck,
    title: "Book a time",
    text: "Pick a slot that works, confirm the price and track arrival live.",
  },
  {
    icon: ShieldCheck,
    title: "Relax, it's covered",
    text: "Every job is backed by our workmanship guarantee and support team.",
  },
];

const reasons = [
  {
    icon: BadgeCheck,
    title: "Vetted & background-checked",
    text: "Licences, insurance and ID verified before anyone joins the platform.",
  },
  {
    icon: Timer,
    title: "Same-day availability",
    text: "Over 1,800 pros with open slots today across five metro areas.",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed workmanship",
    text: "If something isn't right within 30 days, we make it right at no cost.",
  },
];

const testimonials = [
  {
    name: "Hannah Wells",
    role: "Homeowner, Austin",
    rating: 5,
    text: "Booked an electrician at 8am and had the panel fixed by lunch. The price I saw was the price I paid.",
    avatar: "H",
  },
  {
    name: "Ben Carter",
    role: "Landlord, Denver",
    rating: 5,
    text: "I manage six units. FundiLink replaced three separate contractor relationships and half my admin.",
    avatar: "B",
  },
  {
    name: "Dana Alves",
    role: "Homeowner, Seattle",
    rating: 5,
    text: "The reviews are clearly real. Every pro I've hired has shown up on time and left the place tidy.",
    avatar: "D",
  },
];

const stats = [
  { value: "1,800+", label: "Verified professionals" },
  { value: "62k", label: "Jobs completed" },
  { value: "4.9/5", label: "Average rating" },
  { value: "< 2 hrs", label: "Median response" },
];

function LandingSkeleton() {
  return (
    <PageShell>
      <section className="relative overflow-hidden gradient-hero">
        <div className="container-page">
          <SkeletonHero />
        </div>
      </section>

      <section className="container-page pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <Skeleton className="mx-auto h-6 w-32 rounded-full" />
          <Skeleton className="mx-auto mt-4 h-10 w-96 rounded-xl" />
          <Skeleton className="mx-auto mt-3 h-5 w-80 rounded-lg" />
        </div>
        <SkeletonGrid count={5} />
      </section>
    </PageShell>
  );
}

function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useGsap(({ gsap }) => {
    if (loading) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-hero-line]", {
      yPercent: 110,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
    })
      .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(
        "[data-hero-cta]",
        { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      )
      .from("[data-hero-media]", { scale: 0.95, opacity: 0, duration: 1 }, "-=0.8")
      .from(
        "[data-hero-stat]",
        { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 },
        "-=0.6"
      );
  }, [loading]);

  useGsap(({ gsap }) => {
    if (loading) return;
    gsap.utils
      .toArray<HTMLElement>("[data-service-card]")
      .forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-service-grid]",
              start: "top 85%",
              once: true,
            },
          }
        );
      });
  }, [loading]);

  useRevealOnScroll();

  if (loading) return <LandingSkeleton />;

  return (
    <PageShell>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden gradient-hero">
        <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-1.5 text-xs font-semibold shadow-soft">
              <BadgeCheck size={14} className="text-primary" aria-hidden /> Background-checked in 5
              cities
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  Trusted professionals
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  for your home,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block text-gradient">
                  whenever you need them.
                </span>
              </span>
            </h1>
            <p data-hero-sub className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Electricians, plumbers, cleaners, mechanics and technicians — vetted, insured and
              bookable in under two minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" data-hero-cta className="rounded-xl px-7">
                <Link to="/services">
                  Find a service <ArrowRight size={18} aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-hero-cta
                className="rounded-xl px-7"
              >
                <Link to="/register">Join as a professional</Link>
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} data-hero-stat>
                  <dt className="font-display text-2xl font-bold">{s.value}</dt>
                  <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-hero-media className="relative">
            <img
              src={heroPro}
              width={1008}
              height={1200}
              alt="FundiLink electrician with a tablet in a bright living room"
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl glass p-4 shadow-lift sm:left-8 sm:right-auto sm:w-72">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/20 text-success">
                  <ShieldCheck size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Job confirmed in 4 min</p>
                  <StarRating value={4.9} reviews={214} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="container-page pt-28">
        <SectionHeading
          eyebrow="Popular services"
          title="Whatever your home needs, there's a pro for it"
          description="Browse the categories our members book most — every listing is licence-checked and insured."
          center
        />
        <div data-service-grid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.name}
              to="/services"
              search={{ category: s.name }}
              data-service-card
              className="group rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${s.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <s.icon size={22} className={s.color} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {s.pros} pros available <ChevronRight size={15} aria-hidden />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container-page pt-28">
        <SectionHeading
          eyebrow="How it works"
          title="From problem to fixed in four steps"
          description="No call centres, no waiting on quotes, no surprise invoices."
          center
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="relative rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-display text-5xl font-bold text-primary/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <step.icon size={22} className="mt-4 text-primary" aria-hidden />
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why choose */}
      <section className="container-page pt-28">
        <div className="overflow-hidden rounded-3xl border bg-surface shadow-soft">
          <div className="grid gap-10 p-8 lg:grid-cols-[1fr_1.2fr] lg:p-12">
            <SectionHeading
              eyebrow="Why FundiLink"
              title="Built around trust, not luck"
              description="We hold professionals to a standard you'd expect from your own family's tradesperson."
            />
            <div className="grid gap-4">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  data-reveal
                  className="flex gap-4 rounded-2xl bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <r.icon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page pt-28">
        <SectionHeading
          eyebrow="Reviews"
          title="62,000 jobs. Verified feedback on every one."
          center
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-reveal
              className="group rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <StarRating value={t.rating} showValue={false} className="mt-3" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85">
                <Quote size={14} className="mb-1 text-primary/30" aria-hidden /> "{t.text}"
              </blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pt-28">
        <div
          data-reveal
          className="overflow-hidden rounded-3xl gradient-brand px-8 py-16 text-center text-primary-foreground shadow-lift sm:px-12"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
            Your to-do list called. It wants a professional.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Post a job for free and get matched with vetted pros near you today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-xl px-7">
              <Link to="/services">Find a service</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-primary-foreground/40 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/register">Join as a professional</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
