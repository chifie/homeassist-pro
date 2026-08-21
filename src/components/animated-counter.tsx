import { useRef, useEffect, useState } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useGsap(({ gsap }) => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        setDisplayValue(Math.round(counter.val));
      },
    });
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

interface AnimatedStatProps {
  label: string;
  value: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  description?: string;
  icon?: React.ReactNode;
}

export function AnimatedStat({
  label,
  value,
  prefix,
  suffix,
  description,
  icon,
}: AnimatedStatProps) {
  return (
    <div className="group rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-center justify-between">
        {icon && (
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-bold">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="text-sm font-medium">{label}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
