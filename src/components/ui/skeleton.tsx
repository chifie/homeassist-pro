import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-primary/8",
        className
      )}
      {...props}
    />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-16 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-8 w-20 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-28 rounded-lg" />
      <Skeleton className="mt-1 h-3 w-24 rounded-lg" />
    </div>
  );
}

function SkeletonRow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4",
        className
      )}
    >
      <Skeleton className="h-11 w-11 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 rounded-lg" />
        <Skeleton className="h-3 w-48 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
}

function SkeletonHero() {
  return (
    <div className="py-16 lg:py-24">
      <Skeleton className="h-6 w-48 rounded-full" />
      <Skeleton className="mt-6 h-12 w-96 rounded-xl" />
      <Skeleton className="mt-2 h-12 w-80 rounded-xl" />
      <Skeleton className="mt-2 h-12 w-72 rounded-xl" />
      <Skeleton className="mt-6 h-5 w-96 rounded-lg" />
      <div className="mt-8 flex gap-3">
        <Skeleton className="h-12 w-40 rounded-xl" />
        <Skeleton className="h-12 w-44 rounded-xl" />
      </div>
    </div>
  );
}

function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-card p-6 shadow-card"
        >
          <Skeleton className="h-12 w-12 rounded-xl" />
          <Skeleton className="mt-5 h-5 w-28 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-full rounded-lg" />
          <Skeleton className="mt-1 h-4 w-3/4 rounded-lg" />
          <Skeleton className="mt-4 h-4 w-32 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonRow, SkeletonHero, SkeletonGrid };
