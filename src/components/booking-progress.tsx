import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type BookingStep = "requested" | "matched" | "scheduled" | "in-progress" | "completed";

interface BookingProgressProps {
  currentStep: BookingStep;
  className?: string;
}

const steps: { key: BookingStep; label: string }[] = [
  { key: "requested", label: "Requested" },
  { key: "matched", label: "Matched" },
  { key: "scheduled", label: "Scheduled" },
  { key: "in-progress", label: "In progress" },
  { key: "completed", label: "Completed" },
];

export function BookingProgress({
  currentStep,
  className,
}: BookingProgressProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className={cn("flex items-center gap-2", className)} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={steps.length}>
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isFuture = i > currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary/20 text-primary ring-2 ring-primary",
                  isFuture && "bg-secondary text-muted-foreground"
                )}
              >
                {isCompleted ? <Check size={14} /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-8 transition-colors sm:w-12",
                  i < currentIndex ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface BookingCardProps {
  id: string;
  service: string;
  professional: string;
  status: BookingStep;
  date: string;
  amount: string;
}

export function BookingCard({
  id,
  service,
  professional,
  status,
  date,
  amount,
}: BookingCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{id}</p>
          <h3 className="mt-0.5 font-semibold">{service}</h3>
        </div>
        <p className="font-display text-lg font-bold">{amount}</p>
      </div>

      <BookingProgress currentStep={status} className="mt-4" />

      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <span>Professional: {professional}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
