import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth-layout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create an account — FundiLink" },
      {
        name: "description",
        content:
          "Join FundiLink as a homeowner or a professional and start booking in minutes.",
      },
      { property: "og:title", content: "Create an account — FundiLink" },
      {
        property: "og:description",
        content: "Join FundiLink as a homeowner or a professional.",
      },
    ],
  }),
  component: RegisterPage,
});

const roles = [
  { id: "customer", label: "I need a service", hint: "Book vetted pros", icon: User },
  { id: "pro", label: "I'm a professional", hint: "Get more jobs", icon: Briefcase },
] as const;

function RegisterPage() {
  const [role, setRole] = useState<string>("customer");

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free to join. No card required until you book."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div data-auth-field className="grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              aria-pressed={role === r.id}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200",
                role === r.id
                  ? "border-primary bg-primary-soft shadow-soft"
                  : "border-transparent bg-secondary hover:border-primary/30"
              )}
            >
              <r.icon
                size={20}
                className={cn(
                  "transition-colors",
                  role === r.id ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden
              />
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="text-xs text-muted-foreground">{r.hint}</span>
            </button>
          ))}
        </div>

        <div data-auth-field className="grid gap-2">
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Hannah Wells"
            autoComplete="name"
            className="rounded-xl"
          />
        </div>
        <div data-auth-field className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="rounded-xl"
          />
        </div>
        {role === "pro" && (
          <div data-auth-field className="grid gap-2">
            <Label htmlFor="trade">Your trade</Label>
            <Input
              id="trade"
              placeholder="Electrician, plumber, cleaner…"
              className="rounded-xl"
            />
          </div>
        )}
        <div data-auth-field className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            className="rounded-xl"
          />
        </div>
        <label data-auth-field className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox id="terms" className="mt-0.5" /> I agree to the FundiLink terms and privacy
          policy.
        </label>
        <Button data-auth-field type="submit" size="lg" className="w-full rounded-xl">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
