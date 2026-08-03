import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth-layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — HomeAssist" },
      { name: "description", content: "Log in to manage your HomeAssist bookings and saved professionals." },
      { property: "og:title", content: "Log in — HomeAssist" },
      { property: "og:description", content: "Access your HomeAssist account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to track requests and rebook your favourite pros."
      footer={
        <>
          New to HomeAssist?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div data-auth-field className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
        </div>
        <div data-auth-field className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
        </div>
        <div data-auth-field className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember" /> Remember me
          </label>
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Button data-auth-field type="submit" size="lg" className="w-full">
          Log in
        </Button>
        <div data-auth-field className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or continue with{" "}
          <span className="h-px flex-1 bg-border" />
        </div>
        <div data-auth-field className="grid gap-2 sm:grid-cols-2">
          <Button type="button" variant="outline">Google</Button>
          <Button type="button" variant="outline">Apple</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
