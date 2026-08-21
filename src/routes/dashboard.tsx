import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Clock,
  CreditCard,
  Heart,
  Home,
  Receipt,
  Settings,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell } from "@/components/page-shell";
import { StarRating } from "@/components/star-rating";
import { Skeleton, SkeletonCard, SkeletonRow } from "@/components/ui/skeleton";
import { professionals } from "@/data/professionals";
import { useRevealOnScroll } from "@/lib/gsap";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — FundiLink" },
      {
        name: "description",
        content:
          "Track service requests, saved professionals and account settings in one place.",
      },
      { property: "og:title", content: "Your dashboard — FundiLink" },
      {
        property: "og:description",
        content:
          "Track service requests, saved professionals and account settings.",
      },
    ],
  }),
  component: Dashboard,
});

const overview = [
  {
    icon: Wrench,
    label: "Active requests",
    value: "3",
    hint: "1 scheduled today",
    trend: "+1 this week",
  },
  {
    icon: Clock,
    label: "Hours saved",
    value: "27",
    hint: "This quarter",
    trend: "+5 vs last quarter",
  },
  {
    icon: Heart,
    label: "Saved pros",
    value: "6",
    hint: "Across 4 categories",
    trend: "+2 new saves",
  },
  {
    icon: Receipt,
    label: "Spent this year",
    value: "$1,840",
    hint: "12 completed jobs",
    trend: "-8% vs last year",
  },
];

const requests = [
  {
    id: "HA-4821",
    service: "Kitchen socket replacement",
    pro: "Marcus Hale",
    date: "Today, 14:00",
    status: "Scheduled",
  },
  {
    id: "HA-4790",
    service: "Bathroom leak inspection",
    pro: "Elena Ruiz",
    date: "Tomorrow, 09:30",
    status: "Confirmed",
  },
  {
    id: "HA-4762",
    service: "Quarterly deep clean",
    pro: "Priya Nair",
    date: "12 Aug",
    status: "Awaiting pro",
  },
  {
    id: "HA-4711",
    service: "Dishwasher repair",
    pro: "David Okoye",
    date: "28 Jul",
    status: "Completed",
  },
];

const statusTone: Record<string, string> = {
  Scheduled: "bg-primary-soft text-primary",
  Confirmed: "bg-success/15 text-success-foreground dark:text-success",
  "Awaiting pro": "bg-accent/20 text-accent-foreground dark:text-accent",
  Completed: "bg-secondary text-secondary-foreground",
};

function DashboardSkeleton() {
  return (
    <PageShell>
      <div className="container-page py-10">
        <header className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-4 w-36 rounded-lg" />
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-5">
              <Skeleton className="h-5 w-40 rounded-lg" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-5">
              <Skeleton className="h-5 w-36 rounded-lg" />
              <Skeleton className="h-5 w-5 rounded-lg" />
            </div>
            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border bg-card p-6 shadow-card">
          <Skeleton className="h-5 w-36 rounded-lg" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Dashboard() {
  const [loading, setLoading] = useState(true);
  useRevealOnScroll();
  const saved = professionals.slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <PageShell>
      <div className="container-page py-10">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-brand text-primary-foreground">
              <Home size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold sm:text-3xl">Welcome back, Hannah</h1>
              <p className="truncate text-sm text-muted-foreground">Austin, TX · Member since 2023</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Notifications" className="rounded-xl">
              <Bell size={18} />
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/services">Book a service</Link>
            </Button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overview.map((c) => (
            <div
              key={c.label}
              data-reveal
              className="group rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                  <c.icon size={18} aria-hidden />
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-success">
                  <TrendingUp size={12} aria-hidden />
                  {c.trend}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">{c.value}</p>
              <p className="text-sm font-medium">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.hint}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section data-reveal className="rounded-2xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-lg font-semibold">Recent service requests</h2>
              <Button variant="ghost" size="sm" className="rounded-xl">
                View all
              </Button>
            </div>
            <ul className="divide-y">
              {requests.map((r) => (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:bg-secondary/50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.id} · {r.pro} · {r.date}
                    </p>
                  </div>
                  <Badge className={statusTone[r.status]}>{r.status}</Badge>
                </li>
              ))}
            </ul>
          </section>

          <section data-reveal className="rounded-2xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-lg font-semibold">Saved professionals</h2>
              <Heart size={18} className="text-accent" aria-hidden />
            </div>
            <ul className="divide-y">
              {saved.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 p-4 transition-colors hover:bg-secondary/50"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.profession}</p>
                    <StarRating value={p.rating} size={12} className="mt-0.5" />
                  </div>
                  <Button asChild variant="ghost" size="sm" className="rounded-xl">
                    <Link to="/professionals/$proId" params={{ proId: p.id }}>
                      Book
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section data-reveal className="mt-10 rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-primary" aria-hidden />
            <h2 className="text-lg font-semibold">Profile settings</h2>
          </div>
          <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Hannah Wells" className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="hannah@example.com" className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (512) 555-0142" className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Service address</Label>
              <Input id="address" defaultValue="1204 Cedar St, Austin, TX" className="rounded-xl" />
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <Button type="submit" className="rounded-xl">
                Save changes
              </Button>
              <Button type="button" variant="outline" className="rounded-xl">
                <CreditCard size={16} aria-hidden /> Manage payment methods
              </Button>
            </div>
          </form>
        </section>
      </div>
    </PageShell>
  );
}
