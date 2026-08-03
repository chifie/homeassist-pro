import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth-layout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create an account — HomeAssist" },
      {
        name: "description",
        content: "Join HomeAssist as a homeowner or a professional and start booking in minutes.",
      },
      { property: "og:title", content: "Create an account — HomeAssist" },
      { property: "og:description", content: "Join HomeAssist as a homeowner or a professional." },
    ],
  }),
  component: RegisterPage,
});

const roles = [
  { id: "customer", label: "I need a service", hint: "Book vetted pros" },
  { id: "pro", label: "I'm a professional", hint: "Get more jobs" },
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
        <div data-auth-field className="grid grid-cols-2 gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              aria-pressed={role === r.id}
              className={cn(
                "rounded-xl border p-3 text-left transition-colors",
                role === r.id
                  ? "border-primary bg-primary-soft"
                  : "hover:border-primary/40 hover:bg-secondary",
              )}
            >
              <span className="block text-sm font-semibold">{r.label}</span>
              <span className="block text-xs text-muted-foreground">{r.hint}</span>
            </button>
          ))}
        </div>

        <div data-auth-field className="grid gap-2">
          <Label htmlFor="fullname">Full name</Label>
          <Input id="fullname" placeholder="Hannah Wells" autoComplete="name" />
        </div>
        <div data-auth-field className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
        </div>
        {role === "pro" && (
          <div data-auth-field className="grid gap-2">
            <Label htmlFor="trade">Your trade</Label>
            <Input id="trade" placeholder="Electrician, plumber, cleaner…" />
          </div>
        )}
        <div data-auth-field className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />
        </div>
        <label data-auth-field className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox id="terms" className="mt-0.5" /> I agree to the HomeAssist terms and privacy
          policy.
        </label>
        <Button data-auth-field type="submit" size="lg" className="w-full">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
