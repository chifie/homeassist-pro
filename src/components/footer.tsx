import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

const columns = [
  {
    title: "Services",
    items: ["Electrical", "Plumbing", "Cleaning", "Repairs", "Maintenance"],
  },
  { title: "Company", items: ["About", "Careers", "Press", "Trust & safety"] },
  { title: "Support", items: ["Help centre", "Contact", "Guarantee", "Pricing"] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-primary-foreground">
              <Home size={18} aria-hidden />
            </span>
            <span className="font-display text-lg font-bold">FundiLink</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Trusted, background-checked professionals for every job around your home — booked in
            minutes, guaranteed in writing.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FundiLink. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
