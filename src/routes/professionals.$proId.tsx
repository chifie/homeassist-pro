import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  MapPin,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { StarRating } from "@/components/star-rating";
import {
  getProfessional,
  professionals,
  reviewsFor,
} from "@/data/professionals";
import { useRevealOnScroll } from "@/lib/gsap";

export const Route = createFileRoute("/professionals/$proId")({
  loader: ({ params }) => {
    const pro = getProfessional(params.proId);
    if (!pro) throw notFound();
    return { pro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Professional not found — FundiLink" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { pro } = loaderData;
    const title = `${pro.name} — ${pro.profession} | FundiLink`;
    const description = `${pro.profession} in ${pro.city}. ${pro.years} years experience, rated ${pro.rating}/5 from ${pro.reviews} reviews.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProfilePage,
});

const portfolio = [
  "photo-1581092160562-40aa08e78837",
  "photo-1504148455328-c376907d081c",
  "photo-1600585154340-be6161a56a0c",
  "photo-1556909212-d5b604d0c90d",
  "photo-1584622650111-993a426fbf0a",
  "photo-1521791136064-7986c2920216",
];

function ProfilePage() {
  const { pro } = Route.useLoaderData();
  const reviews = reviewsFor(pro.id);
  const similar = professionals
    .filter((p) => p.category === pro.category && p.id !== pro.id)
    .slice(0, 3);

  useRevealOnScroll("[data-reveal]", [pro.id]);

  return (
    <PageShell>
      <section className="gradient-hero border-b">
        <div className="container-page py-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} aria-hidden /> Back to search
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={pro.image}
                alt={pro.name}
                className="h-28 w-28 shrink-0 rounded-2xl object-cover shadow-lift"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">{pro.name}</h1>
                  {pro.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                      <BadgeCheck size={14} aria-hidden /> Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-lg text-muted-foreground">{pro.profession}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <StarRating value={pro.rating} reviews={pro.reviews} />
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={14} aria-hidden /> {pro.city}
                  </span>
                  <Badge variant="secondary">{pro.years}+ years experience</Badge>
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border bg-card p-6 shadow-card">
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="font-display text-3xl font-bold">{pro.rate}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {pro.available
                  ? "Available this week"
                  : "Next opening in 6 days"}
              </p>
              <Button className="mt-5 w-full rounded-xl" size="lg">
                <CalendarCheck size={18} aria-hidden /> Request this service
              </Button>
              <Button variant="outline" className="mt-2 w-full rounded-xl">
                <MessageSquare size={18} aria-hidden /> Message{" "}
                {pro.name.split(" ")[0]}
              </Button>
              <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <Shield
                  size={14}
                  className="mt-0.5 shrink-0"
                  aria-hidden
                />
                Covered by the FundiLink 30-day workmanship guarantee.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section data-reveal>
            <h2 className="text-xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {pro.bio}
            </p>
          </section>

          <section data-reveal>
            <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {pro.skills.map((s: string) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="px-3 py-1.5 text-sm"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <section data-reveal>
            <h2 className="text-xl font-semibold tracking-tight">Portfolio</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {portfolio.map((id, i) => (
                <img
                  key={id}
                  loading="lazy"
                  src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=70`}
                  alt={`Completed ${pro.category.toLowerCase()} job ${i + 1}`}
                  className="aspect-4/3 w-full rounded-xl object-cover shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                />
              ))}
            </div>
          </section>

          <section data-reveal>
            <h2 className="text-xl font-semibold tracking-tight">
              Reviews ({pro.reviews.toLocaleString()})
            </h2>
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="rounded-2xl border bg-card p-5 shadow-card"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{r.name}</p>
                    <span className="text-sm text-muted-foreground">
                      {r.date}
                    </span>
                  </div>
                  <StarRating
                    value={r.rating}
                    showValue={false}
                    className="mt-2"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {r.text}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Similar professionals
          </h2>
          {similar.map((p) => (
            <Link
              key={p.id}
              to="/professionals/$proId"
              params={{ proId: p.id }}
              className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-12 w-12 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {p.profession}
                </p>
                <StarRating value={p.rating} size={12} className="mt-1" />
              </div>
            </Link>
          ))}
          {similar.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No similar pros in this category yet.
            </p>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
