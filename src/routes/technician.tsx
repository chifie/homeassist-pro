import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Wallet,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageShell, SectionHeading } from "@/components/page-shell";
import { useRevealOnScroll } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/technician")({
  head: () => ({
    meta: [
      { title: "Technician app — FundiLink" },
      {
        name: "description",
        content:
          "Preview the FundiLink technician mobile app: job cards, one-tap status updates, schedule and earnings.",
      },
      { property: "og:title", content: "Technician app — FundiLink" },
      {
        property: "og:description",
        content: "Job cards, one-tap status updates, schedule and earnings for FundiLink technicians.",
      },
    ],
  }),
  component: TechnicianApp,
});

type Status = "new" | "on the way" | "in progress" | "done";

const initialJobs: { id: string; title: string; customer: string; time: string; address: string; pay: string; status: Status }[] = [
  {
    id: "j1",
    title: "Consumer unit upgrade",
    customer: "Dana Alves",
    time: "Today · 16:00",
    address: "18 Msasani Rd, Dar es Salaam",
    pay: "TSh 240,000",
    status: "new",
  },
  {
    id: "j2",
    title: "Kitchen sink leak",
    customer: "Ben Carter",
    time: "Today · 18:30",
    address: "7 Kinondoni Cross, Dar es Salaam",
    pay: "TSh 95,000",
    status: "on the way",
  },
  {
    id: "j3",
    title: "Outdoor lighting circuit",
    customer: "Maya Roth",
    time: "Tomorrow · 09:00",
    address: "220 Mikocheni B, Dar es Salaam",
    pay: "TSh 310,000",
    status: "new",
  },
];

const flow: Status[] = ["new", "on the way", "in progress", "done"];

const nextLabel: Record<Status, string> = {
  new: "Accept job",
  "on the way": "I've arrived",
  "in progress": "Mark complete",
  done: "Completed",
};

const statusTone: Record<Status, string> = {
  new: "bg-primary-soft text-primary",
  "on the way": "bg-accent/25 text-accent-foreground",
  "in progress": "bg-accent/25 text-accent-foreground",
  done: "bg-success/15 text-success-foreground dark:text-success",
};

function TechnicianApp() {
  const [jobs, setJobs] = useState(initialJobs);
  const [online, setOnline] = useState(true);
  useRevealOnScroll();

  const advance = (id: string) =>
    setJobs((js) =>
      js.map((j) =>
        j.id === id ? { ...j, status: flow[Math.min(flow.indexOf(j.status) + 1, 3)] } : j,
      ),
    );

  return (
    <PageShell>
      <section className="gradient-hero">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Technician app"
            title="Built for people on the move"
            description="Large touch targets, calm colours and one-tap status updates. Everything a fundi needs at a glance."
            center
          />
        </div>
      </section>

      <div className="container-page pb-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          {/* Phone frame */}
          <div
            data-reveal
            className="mx-auto w-full max-w-[380px] rounded-[2.5rem] border-8 border-foreground/85 bg-background shadow-lift"
          >
            <div className="rounded-[1.9rem] bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-primary-foreground">
                    <Wrench size={17} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-tight">Marcus Hale</p>
                    <p className="text-xs text-muted-foreground">Electrician · Level 3</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell size={18} />
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border bg-card px-4 py-3 shadow-soft">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      online ? "bg-success" : "bg-muted-foreground",
                    )}
                    aria-hidden
                  />
                  <Label htmlFor="online" className="text-sm">
                    {online ? "Online — taking jobs" : "Offline"}
                  </Label>
                </div>
                <Switch id="online" checked={online} onCheckedChange={setOnline} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border bg-card p-3 shadow-soft">
                  <Wallet size={16} className="text-primary" aria-hidden />
                  <p className="mt-2 font-display text-xl font-bold">TSh 1.2M</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="rounded-2xl border bg-card p-3 shadow-soft">
                  <CalendarDays size={16} className="text-primary" aria-hidden />
                  <p className="mt-2 font-display text-xl font-bold">{jobs.length}</p>
                  <p className="text-xs text-muted-foreground">Jobs scheduled</p>
                </div>
              </div>

              <h2 className="mt-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Today&apos;s jobs
              </h2>
              <ul className="mt-3 space-y-3">
                {jobs.map((j) => (
                  <li key={j.id} className="rounded-2xl border bg-card p-4 shadow-soft">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-tight">{j.title}</p>
                      <Badge className={cn("shrink-0 capitalize", statusTone[j.status])}>
                        {j.status}
                      </Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={13} aria-hidden /> {j.time}
                    </p>
                    <p className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden /> {j.address}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{j.pay}</p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        className="h-11 flex-1"
                        disabled={j.status === "done"}
                        onClick={() => advance(j.id)}
                      >
                        {j.status === "done" ? (
                          <CheckCircle2 size={16} aria-hidden />
                        ) : (
                          <ChevronRight size={16} aria-hidden />
                        )}
                        {nextLabel[j.status]}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11"
                        aria-label={`Call ${j.customer}`}
                      >
                        <Phone size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11"
                        aria-label={`Navigate to ${j.address}`}
                      >
                        <Navigation size={16} />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "One-tap status updates",
                text: "Accept, mark on the way, arrived and complete — every state change notifies the customer instantly.",
              },
              {
                title: "Gentle nudges",
                text: "Reminders before each appointment, plus a heads-up when a nearby job matches your skills.",
              },
              {
                title: "Paid on time",
                text: "Weekly payouts with a clear breakdown of every job, tip and platform fee.",
              },
              {
                title: "Skills and verification",
                text: "Upload certifications once; the verified badge follows you across every listing.",
              },
            ].map((f) => (
              <article key={f.title} data-reveal className="rounded-2xl border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
