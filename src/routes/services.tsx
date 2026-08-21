import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/page-shell";
import { ProfessionalCard } from "@/components/professional-card";
import { Skeleton, SkeletonGrid } from "@/components/ui/skeleton";
import { categories, cities, professionals } from "@/data/professionals";
import { useRevealOnScroll } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  validateSearch: (
    search: Record<string, unknown>
  ): { category?: string } =>
    typeof search["category"] === "string"
      ? { category: search["category"] as string }
      : {},
  head: () => ({
    meta: [
      { title: "Find a service — FundiLink" },
      {
        name: "description",
        content:
          "Search verified electricians, plumbers, cleaners and technicians by category, location and rating.",
      },
      { property: "og:title", content: "Find a service — FundiLink" },
      {
        property: "og:description",
        content:
          "Search verified home service professionals by category, location and rating.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesSkeleton() {
  return (
    <PageShell>
      <section className="gradient-hero border-b">
        <div className="container-page py-12">
          <Skeleton className="h-9 w-72 rounded-xl" />
          <Skeleton className="mt-2 h-5 w-96 rounded-lg" />

          <div className="mt-8 rounded-2xl border bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-3">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="mt-2 h-12 w-56 rounded-xl sm:mt-0" />
            <Skeleton className="mt-2 h-12 w-24 rounded-xl sm:mt-0" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <Skeleton className="h-4 w-48 rounded-lg" />
        <SkeletonGrid count={6} />
      </section>
    </PageShell>
  );
}

function ServicesPage() {
  const { category } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(category ?? "All");
  const [city, setCity] = useState(cities[0]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return professionals.filter((p) => {
      const matchQuery =
        !q ||
        [p.name, p.profession, p.category, ...p.skills]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchCity = city === cities[0] || p.city === city;
      const matchAvailable = !availableOnly || p.available;
      return matchQuery && matchCategory && matchCity && matchAvailable;
    });
  }, [query, activeCategory, city, availableOnly]);

  useRevealOnScroll("[data-reveal]", [results.length]);

  const hasFilters =
    query ||
    activeCategory !== "All" ||
    city !== cities[0] ||
    availableOnly;

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setCity(cities[0]);
    setAvailableOnly(false);
  };

  if (loading) return <ServicesSkeleton />;

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
                className="h-12 rounded-xl border-0 pl-10 shadow-none focus-visible:ring-0"
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
                className="h-12 w-full appearance-none rounded-xl bg-transparent pl-10 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Button size="lg" className="mt-2 w-full rounded-xl sm:mt-0 sm:w-auto">
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
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === c
                    ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
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
                "ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                availableOnly
                  ? "border-transparent bg-success/20 text-success-foreground dark:text-success"
                  : "bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              <SlidersHorizontal size={15} aria-hidden /> Available now
            </button>
          </div>

          {hasFilters && (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X size={12} aria-hidden />
                Clear all filters
              </button>
            </div>
          )}
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
            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
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
