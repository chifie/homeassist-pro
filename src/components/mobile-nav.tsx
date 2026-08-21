import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, LayoutDashboard, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Search", icon: Search },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pro-dashboard", label: "Pro", icon: Briefcase },
  { to: "/register", label: "Account", icon: User },
] as const;

export function MobileNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-lg sm:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  aria-hidden
                />
                <span className={cn("font-medium", isActive && "font-semibold")}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
