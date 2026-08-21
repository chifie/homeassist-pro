import { Link } from "@tanstack/react-router";
import { Home, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Services",
    items: [
      { label: "Electrical", to: "/services" },
      { label: "Plumbing", to: "/services" },
      { label: "Cleaning", to: "/services" },
      { label: "Repairs", to: "/services" },
      { label: "Maintenance", to: "/services" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Press", to: "/" },
      { label: "Trust & safety", to: "/" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help centre", to: "/" },
      { label: "Contact us", to: "/" },
      { label: "Guarantee", to: "/" },
      { label: "Pricing", to: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-primary-foreground transition-transform duration-300 group-hover:scale-110">
              <Home size={18} aria-hidden />
            </span>
            <span className="font-display text-lg font-bold">FundiLink</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Trusted, background-checked professionals for every job around your home — booked in
            minutes, guaranteed in writing.
          </p>

          {/* Newsletter signup */}
          <div className="mt-6">
            <p className="text-sm font-semibold">Stay updated</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Mail
                  size={16}
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="h-10 pl-9 text-sm"
                />
              </div>
              <Button type="submit" size="sm" className="shrink-0 rounded-xl">
                <ArrowRight size={16} aria-hidden />
              </Button>
            </form>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FundiLink. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <span className="text-border">·</span>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
            <span className="text-border">·</span>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
