import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/page-shell";
import { ProfessionalCard } from "@/components/professional-card";
import { categories, cities, professionals } from "@/data/professionals";
import { useRevealOnScroll } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Find a service — HomeAssist" },
      {
        name: "description",
        content:
          "Search verified electricians, plumbers, cleaners and technicians by category, location and rating.",
      },
      { property: "og:title", content: "Find a service — HomeAssist" },
      {
        property: "og:description",
        content: "Search verified home service professionals by category, location and rating.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { category } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(category ?? "All");
  const [city, setCity] = useState(cities[0]);
  const [availableOnly, setAvailableOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return professionals.filter((p) => {
      const matchQuery =
        !q ||
        [p.name, p.profession, p.category, ...p.skills].join(" ").toLowerCase().includes(q);
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchCity = city === cities[0] || p.city === city;
      const matchAvailable = !availableOnly || p.available;
      return matchQuery && matchCategory && matchCity && matchAvailable;
    });
  }, [query, activeCategory, city, availableOnly]);

  useRevealOnScroll("[data-reveal]", [results.length]);

  return (
    <PageShell>
      <section className="gradient-hero border-b">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a trusted professional</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {professionals.length} vetted pros across 5 categories. Filter by what you need and
            where you are.
          </p>

          <div className="mt-8 rounded-2xl border bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. leak, EV charger, deep clean"
                aria-label="Search services"
                className="h-12 border-0 pl-10 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="relative mt-2 sm:mt-0 sm:w-56">
              <MapPin
                size={18}
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Filter by location"
                className="h-12 w-full appearance-none rounded-md bg-transparent pl-10 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Button size="lg" className="mt-2 w-full sm:mt-0 sm:w-auto">
              Search
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                aria-pressed={activeCategory === c}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === c
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAvailableOnly((v) => !v)}
              aria-pressed={availableOnly}
              className={cn(
                "ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                availableOnly
                  ? "border-transparent bg-success/20 text-success-foreground dark:text-success"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <SlidersHorizontal size={15} aria-hidden /> Available now
            </button>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{results.length}</span>{" "}
          professionals
        </p>
        {results.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed p-12 text-center">
            <h2 className="text-lg font-semibold">No professionals match those filters</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try widening your location or clearing the category filter.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((pro) => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
