import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import type { Professional } from "@/data/professionals";

export function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="flex items-start gap-4 p-5">
        <div className="relative shrink-0">
          <img
            src={pro.image}
            alt={`${pro.name}, ${pro.profession}`}
            loading="lazy"
            className="h-16 w-16 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {pro.available && (
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card bg-success" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold">{pro.name}</h3>
            {pro.verified && (
              <BadgeCheck
                size={16}
                className="shrink-0 text-primary"
                aria-label="Verified"
              />
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">{pro.profession}</p>
          <StarRating value={pro.rating} reviews={pro.reviews} className="mt-1.5" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-5">
        <Badge variant="secondary">{pro.years}+ yrs experience</Badge>
        <Badge variant="outline">{pro.category}</Badge>
        {pro.available ? (
          <Badge className="bg-success/15 text-success-foreground dark:text-success">
            Available now
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            <Clock size={12} className="mr-1" aria-hidden />
            Booked this week
          </Badge>
        )}
      </div>

      <p className="line-clamp-2 px-5 pt-3 text-sm leading-relaxed text-muted-foreground">
        {pro.bio}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t p-5 pt-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
            <MapPin size={14} className="shrink-0" aria-hidden /> {pro.city}
          </p>
          <p className="text-sm font-semibold">{pro.rate}</p>
        </div>
        <Button asChild size="sm" className="rounded-xl">
          <Link to="/professionals/$proId" params={{ proId: pro.id }}>
            View profile
          </Link>
        </Button>
      </div>
    </article>
  );
}
