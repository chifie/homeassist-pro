import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const links = [
  { to: "/services", label: "Find services" },
  { to: "/dashboard", label: "My dashboard" },
  { to: "/pro-dashboard", label: "For professionals" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
            <Home size={18} aria-hidden />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">HomeAssist</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/register">Get started</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t bg-card md:hidden">
          <div className="container-page flex flex-col py-3">
            {[...links, { to: "/login", label: "Log in" }, { to: "/register", label: "Get started" }].map(
              (l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
