import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Menu, Moon, Sun, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const links = [
  { to: "/services", label: "Find services" },
  { to: "/dashboard", label: "My dashboard" },
  { to: "/pro-dashboard", label: "For professionals" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 glass transition-all duration-300",
        scrolled && "shadow-soft"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground transition-transform duration-300 group-hover:scale-110">
            <Home size={18} aria-hidden />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            FundiLink
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex" role="menubar">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                role="menuitem"
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                activeProps={{ className: "text-foreground" }}
                aria-current={isActive ? "page" : undefined}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" aria-hidden />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden rounded-xl sm:inline-flex">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="hidden rounded-xl sm:inline-flex">
            <Link to="/register">
              Get started <ArrowRight size={14} className="ml-1" aria-hidden />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu with animation */}
      <div
        id="mobile-menu"
        role="menu"
        className={cn(
          "overflow-hidden border-t bg-card transition-all duration-300 ease-in-out md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-transparent"
        )}
      >
        <div className="container-page flex flex-col py-2">
          {[...links, { to: "/login", label: "Log in" }, { to: "/register", label: "Get started" }].map(
            (l, i) => (
              <Link
                key={l.to}
                to={l.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  location.pathname === l.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {l.label}
                <ArrowRight size={14} className="opacity-40" aria-hidden />
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
