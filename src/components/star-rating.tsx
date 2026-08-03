import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  size = 14,
  className,
  showValue = true,
  reviews,
}: {
  value: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  reviews?: number;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`${value} out of 5`}>
      <div className="flex items-center gap-0.5 text-accent">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={size}
            aria-hidden
            className={i < Math.round(value) ? "fill-current" : "opacity-30"}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-semibold">{value.toFixed(1)}</span>}
      {reviews !== undefined && (
        <span className="text-sm text-muted-foreground">({reviews})</span>
      )}
    </div>
  );
}
