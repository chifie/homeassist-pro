import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  CalendarClock,
  Check,
  Plus,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageShell } from "@/components/page-shell";
import { StarRating } from "@/components/star-rating";
import { useRevealOnScroll } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pro-dashboard")({
  head: () => ({
    meta: [
      { title: "Professional dashboard — FundiLink" },
      {
        name: "description",
        content:
          "Manage your listings, customer requests, reviews and availability as a FundiLink professional.",
      },
      { property: "og:title", content: "Professional dashboard — FundiLink" },
      {
        property: "og:description",
        content:
          "Manage listings, requests, reviews and availability on FundiLink.",
      },
    ],
  }),
  component: ProDashboard,
});

const kpis = [
  {
    icon: BriefcaseBusiness,
    label: "Jobs this month",
    value: "18",
    hint: "+4 vs last month",
    trend: "+28.6%",
  },
  {
    icon: TrendingUp,
    label: "Earnings",
    value: "$6,420",
    hint: "Paid out weekly",
    trend: "+15.2%",
  },
  {
    icon: Star,
    label: "Rating",
    value: "4.9",
    hint: "214 reviews",
    trend: "Top 10%",
  },
  {
    icon: CalendarClock,
    label: "Response time",
    value: "38 min",
    hint: "Top 10% of pros",
    trend: "-12 min",
  },
];

const listings = [
  { name: "Emergency fault finding", price: "$120 callout", active: true },
  { name: "EV charger installation", price: "From $650", active: true },
  { name: "Full house rewiring", price: "Quote on site", active: false },
];

const incoming = [
  {
    customer: "Dana Alves",
    job: "Consumer unit upgrade",
    when: "Today, 16:00",
    value: "$480",
  },
  {
    customer: "Ben Carter",
    job: "Outdoor lighting circuit",
    when: "Thu, 10:00",
    value: "$310",
  },
  {
    customer: "Maya Roth",
    job: "Socket not working",
    when: "Fri, 08:30",
    value: "$120",
  },
];

const reviews = [
  {
    name: "Hannah W.",
    rating: 5,
    text: "Clear pricing, tidy work, explained everything. Booking again.",
  },
  {
    name: "Ben Carter",
    rating: 5,
    text: "Second job with Marcus — reliable and genuinely knowledgeable.",
  },
];

function ProDashboard() {
  const [available, setAvailable] = useState(true);
  const [handled, setHandled] = useState<string[]>([]);
  useRevealOnScroll();

  return (
    <PageShell>
      <div className="container-page py-10">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Marcus Hale"
              className="h-12 w-12 shrink-0 rounded-2xl object-cover"
            />
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold sm:text-3xl">Marcus Hale</h1>
              <p className="truncate text-sm text-muted-foreground">
                Master Electrician · Austin, TX
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-full border bg-card px-4 py-2 shadow-soft">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                available ? "bg-success" : "bg-muted-foreground"
              )}
              aria-hidden
            />
            <Label htmlFor="availability" className="text-sm">
              {available ? "Available" : "Away"}
            </Label>
            <Switch id="availability" checked={available} onCheckedChange={setAvailable} />
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              data-reveal
              className="group rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                  <k.icon size={18} aria-hidden />
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-success">
                  <TrendingUp size={12} aria-hidden />
                  {k.trend}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">{k.value}</p>
              <p className="text-sm font-medium">{k.label}</p>
              <p className="text-xs text-muted-foreground">{k.hint}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section data-reveal className="rounded-2xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-lg font-semibold">Customer requests</h2>
              <Badge variant="secondary">{incoming.length - handled.length} new</Badge>
            </div>
            <ul className="divide-y">
              {incoming.map((r) => {
                const done = handled.includes(r.customer);
                return (
                  <li
                    key={r.customer}
                    className="flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:bg-secondary/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{r.job}</p>
                      <p className="text-sm text-muted-foreground">
                        {r.customer} · {r.when} · {r.value}
                      </p>
                    </div>
                    {done ? (
                      <Badge className="bg-success/15 text-success-foreground dark:text-success">
                        Accepted
                      </Badge>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="rounded-xl"
                          onClick={() => setHandled((h) => [...h, r.customer])}
                        >
                          <Check size={15} aria-hidden /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                          aria-label={`Decline ${r.job}`}
                        >
                          <X size={15} aria-hidden />
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section data-reveal className="rounded-2xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-lg font-semibold">Service listings</h2>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Plus size={15} aria-hidden /> Add
              </Button>
            </div>
            <ul className="divide-y">
              {listings.map((l) => (
                <li
                  key={l.name}
                  className="flex items-center justify-between gap-3 p-5 transition-colors hover:bg-secondary/50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{l.price}</p>
                  </div>
                  <Badge variant={l.active ? "secondary" : "outline"}>
                    {l.active ? "Live" : "Draft"}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section data-reveal className="rounded-2xl border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold">Profile management</h2>
            <form
              className="mt-5 grid gap-5 sm:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-2">
                <Label htmlFor="pro-name">Display name</Label>
                <Input id="pro-name" defaultValue="Marcus Hale" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pro-trade">Profession</Label>
                <Input id="pro-trade" defaultValue="Master Electrician" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pro-rate">Hourly rate</Label>
                <Input id="pro-rate" defaultValue="$85" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pro-area">Service area</Label>
                <Input
                  id="pro-area"
                  defaultValue="Austin, TX · 25 mi"
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="rounded-xl sm:col-span-2 sm:w-fit">
                Update profile
              </Button>
            </form>
          </section>

          <section data-reveal className="rounded-2xl border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold">Latest reviews</h2>
            <div className="mt-5 space-y-4">
              {reviews.map((r) => (
                <article
                  key={r.name}
                  className="rounded-xl bg-secondary/60 p-4 transition-all duration-300 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{r.name}</p>
                    <StarRating value={r.rating} size={13} showValue={false} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
