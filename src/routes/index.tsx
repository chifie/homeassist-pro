import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  Hammer,
  Plug,
  ShieldCheck,
  Sparkles,
  Timer,
  UserCheck,
  Wrench,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, SectionHeading } from "@/components/page-shell";
import { StarRating } from "@/components/star-rating";
import { useGsap, useRevealOnScroll } from "@/lib/gsap";
import heroPro from "@/assets/hero-pro.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HomeAssist — Trusted professionals for your home" },
      {
        name: "description",
        content:
          "Find vetted electricians, plumbers, cleaners and technicians near you. Transparent pricing, verified reviews and a workmanship guarantee.",
      },
      { property: "og:title", content: "HomeAssist — Trusted professionals for your home" },
      {
        property: "og:description",
        content: "Book background-checked home service pros in minutes with HomeAssist.",
      },
    ],
  }),
  component: Landing,
});

const services = [
  { name: "Electrical", icon: Plug, desc: "Rewiring, EV chargers, lighting and fault finding.", pros: 412 },
  { name: "Plumbing", icon: Droplets, desc: "Leaks, boilers, bathrooms and emergency callouts.", pros: 386 },
  { name: "Cleaning", icon: Sparkles, desc: "Deep cleans, move-outs and recurring home care.", pros: 528 },
  { name: "Repairs", icon: Hammer, desc: "Appliances, carpentry and everything in between.", pros: 297 },
  { name: "Maintenance", icon: Wrench, desc: "Seasonal checks, HVAC and preventive plans.", pros: 233 },
];

const steps = [
  { icon: ClipboardList, title: "Tell us the job", text: "Describe what you need in a few taps — photos optional, quotes free." },
  { icon: UserCheck, title: "Match with pros", text: "We surface verified professionals nearby, ranked by real reviews." },
  { icon: CalendarCheck, title: "Book a time", text: "Pick a slot that works, confirm the price and track arrival live." },
  { icon: ShieldCheck, title: "Relax, it's covered", text: "Every job is backed by our workmanship guarantee and support team." },
];

const reasons = [
  { icon: BadgeCheck, title: "Vetted & background-checked", text: "Licences, insurance and ID verified before anyone joins the platform." },
  { icon: Timer, title: "Same-day availability", text: "Over 1,800 pros with open slots today across five metro areas." },
  { icon: ShieldCheck, title: "Guaranteed workmanship", text: "If something isn't right within 30 days, we make it right at no cost." },
];

const testimonials = [
  { name: "Hannah Wells", role: "Homeowner, Austin", rating: 5, text: "Booked an electrician at 8am and had the panel fixed by lunch. The price I saw was the price I paid." },
  { name: "Ben Carter", role: "Landlord, Denver", rating: 5, text: "I manage six units. HomeAssist replaced three separate contractor relationships and half my admin." },
  { name: "Dana Alves", role: "Homeowner, Seattle", rating: 5, text: "The reviews are clearly real. Every pro I've hired has shown up on time and left the place tidy." },
];

const stats = [
  { value: "1,800+", label: "Verified professionals" },
  { value: "62k", label: "Jobs completed" },
  { value: "4.9/5", label: "Average rating" },
  { value: "< 2 hrs", label: "Median response" },
];

function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGsap(({ gsap }) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 })
      .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
      .from("[data-hero-cta]", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
      .from("[data-hero-media]", { scale: 0.95, opacity: 0, duration: 1 }, "-=0.8")
      .from("[data-hero-stat]", { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.6");
  }, []);

  useGsap(({ gsap }) => {
    gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((el, i) => {
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
          scrollTrigger: { trigger: "[data-service-grid]", start: "top 85%", once: true },
        },
      );
    });
  }, []);

  useRevealOnScroll();

  return (
    <PageShell>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden gradient-hero">
        <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs font-semibold shadow-soft">
              <BadgeCheck size={14} className="text-primary" aria-hidden /> Background-checked in 5 cities
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">Trusted professionals</span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block">for your home,</span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block text-gradient">whenever you need them.</span>
              </span>
            </h1>
            <p data-hero-sub className="mt-6 max-w-lg text-lg text-muted-foreground">
              Electricians, plumbers, cleaners, mechanics and technicians — vetted, insured and
              bookable in under two minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" data-hero-cta>
                <Link to="/services">
                  Find a service <ArrowRight size={18} aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" data-hero-cta>
                <Link to="/register">Join as a professional</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} data-hero-stat>
                  <dt className="font-display text-2xl font-bold">{s.value}</dt>
                  <dd className="text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-hero-media className="relative">
            <img
              src={heroPro}
              width={1008}
              height={1200}
              alt="HomeAssist electrician with a tablet in a bright living room"
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
              className="lift group rounded-2xl border bg-card p-6 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                <s.icon size={22} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {s.pros} pros available <ArrowRight size={15} aria-hidden />
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
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal className="relative rounded-2xl border bg-card p-6 shadow-soft">
              <span className="font-display text-5xl font-bold text-primary-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <step.icon size={22} className="mt-4 text-primary" aria-hidden />
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why choose */}
      <section className="container-page pt-28">
        <div className="overflow-hidden rounded-3xl border bg-surface shadow-soft">
          <div className="grid gap-10 p-8 lg:grid-cols-[1fr_1.2fr] lg:p-12">
            <SectionHeading
              eyebrow="Why HomeAssist"
              title="Built around trust, not luck"
              description="We hold professionals to a standard you'd expect from your own family's tradesperson."
            />
            <div className="grid gap-5 sm:grid-cols-1">
              {reasons.map((r) => (
                <div key={r.title} data-reveal className="flex gap-4 rounded-2xl bg-card p-5 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <r.icon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
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
            <figure key={t.name} data-reveal className="lift rounded-2xl border bg-card p-6 shadow-soft">
              <StarRating value={t.rating} showValue={false} />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 border-t pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pt-28">
        <div
          data-reveal
          className="overflow-hidden rounded-3xl gradient-brand px-8 py-14 text-center text-primary-foreground shadow-lift sm:px-12"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
            Your to-do list called. It wants a professional.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Post a job for free and get matched with vetted pros near you today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/services">Find a service</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/register">Join as a professional</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
