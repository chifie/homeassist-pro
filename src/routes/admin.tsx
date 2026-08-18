import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  CircleDollarSign,
  Search,
  ShieldCheck,
  Star,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/page-shell";
import { StarRating } from "@/components/star-rating";
import { useRevealOnScroll } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — FundiLink" },
      {
        name: "description",
        content:
          "Verify technicians, monitor service requests and keep an eye on platform health from the FundiLink admin workspace.",
      },
      { property: "og:title", content: "Admin dashboard — FundiLink" },
      {
        property: "og:description",
        content: "Verify technicians, monitor requests and platform health on FundiLink.",
      },
    ],
  }),
  component: AdminDashboard,
});

const stats = [
  { icon: Users, label: "Active customers", value: "4,182", hint: "+312 this month" },
  { icon: Wrench, label: "Technicians", value: "648", hint: "27 awaiting review" },
  { icon: CircleDollarSign, label: "Payments processed", value: "TSh 84.6M", hint: "Last 30 days" },
  { icon: Star, label: "Average rating", value: "4.8", hint: "Across 12,904 reviews" },
];

const pending = [
  { name: "Joseph Mwakalinga", trade: "Plumber", licence: "PLM-20831", city: "Dar es Salaam" },
  { name: "Rehema Kimaro", trade: "Electrician", licence: "ELC-44210", city: "Arusha" },
  { name: "Salim Juma", trade: "Carpenter", licence: "CRP-10877", city: "Mwanza" },
];

const requests = [
  { id: "REQ-2841", customer: "Dana Alves", service: "Electrical", tech: "Marcus Hale", status: "In progress", amount: "TSh 240,000" },
  { id: "REQ-2840", customer: "Ben Carter", service: "Plumbing", tech: "Elena Ruiz", status: "Scheduled", amount: "TSh 95,000" },
  { id: "REQ-2838", customer: "Maya Roth", service: "Cleaning", tech: "Priya Nair", status: "Completed", amount: "TSh 130,000" },
  { id: "REQ-2835", customer: "Ali Hassan", service: "Repairs", tech: "David Okoye", status: "Disputed", amount: "TSh 210,000" },
];

const statusTone: Record<string, string> = {
  "In progress": "bg-accent/25 text-accent-foreground",
  Scheduled: "bg-primary-soft text-primary",
  Completed: "bg-success/15 text-success-foreground dark:text-success",
  Disputed: "bg-destructive/15 text-destructive",
};

const flagged = [
  { author: "Anonymous", target: "Jonah Brecht", rating: 1, text: "Reported as spam by three users — needs a look." },
  { author: "Grace M.", target: "Tom Reilly", rating: 2, text: "Customer says the job was rescheduled twice without notice." },
];

function AdminDashboard() {
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  useRevealOnScroll();

  const visible = requests.filter((r) =>
    `${r.id} ${r.customer} ${r.service} ${r.tech}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PageShell>
      <div className="container-page py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck size={13} aria-hidden /> Admin
            </span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Platform overview</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A calm workspace for keeping FundiLink verified, fair and running smoothly.
            </p>
          </div>
          <Button variant="outline">Export report</Button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-reveal className="lift rounded-2xl border bg-card p-5 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <s.icon size={18} aria-hidden />
              </span>
              <p className="mt-4 font-display text-3xl font-bold">{s.value}</p>
              <p className="text-sm font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section data-reveal className="rounded-2xl border bg-card shadow-soft">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-lg font-semibold">Technician verification</h2>
              <Badge variant="secondary">{pending.length - reviewed.length} pending</Badge>
            </div>
            <ul className="divide-y">
              {pending.map((p) => {
                const done = reviewed.includes(p.name);
                return (
                  <li key={p.name} className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.trade} · {p.city} · Licence {p.licence}
                      </p>
                    </div>
                    {done ? (
                      <Badge className="bg-success/15 text-success-foreground dark:text-success">
                        <BadgeCheck size={13} aria-hidden /> Verified
                      </Badge>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setReviewed((r) => [...r, p.name])}>
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" aria-label={`Reject ${p.name}`}>
                          <X size={15} aria-hidden />
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section data-reveal className="rounded-2xl border bg-card shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
              <h2 className="text-lg font-semibold">Service requests</h2>
              <div className="relative w-full sm:w-64">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search requests"
                  aria-label="Search service requests"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b">
                    <th scope="col" className="px-5 py-3 font-medium">Request</th>
                    <th scope="col" className="px-5 py-3 font-medium">Customer</th>
                    <th scope="col" className="px-5 py-3 font-medium">Technician</th>
                    <th scope="col" className="px-5 py-3 font-medium">Status</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visible.map((r) => (
                    <tr key={r.id}>
                      <td className="whitespace-nowrap px-5 py-4 font-medium">{r.id}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{r.customer}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{r.tech}</td>
                      <td className="px-5 py-4">
                        <Badge className={cn("whitespace-nowrap", statusTone[r.status])}>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-medium">{r.amount}</td>
                    </tr>
                  ))}
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                        No requests match “{query}”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section data-reveal className="mt-10 rounded-2xl border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Flagged reviews</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {flagged.map((f) => (
              <article key={f.text} className="rounded-xl bg-secondary/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {f.author} <span className="font-normal text-muted-foreground">on {f.target}</span>
                  </p>
                  <StarRating value={f.rating} size={13} showValue={false} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">Keep</Button>
                  <Button size="sm" variant="ghost">Remove</Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
