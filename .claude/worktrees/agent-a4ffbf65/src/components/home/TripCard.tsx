import type { Trip } from "@/types/trip";
import { MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

type TripCardProps = {
  trip: Trip;
};

export function TripCard({ trip }: TripCardProps) {
  return (
    <Card
      image={{ src: trip.image, alt: trip.title }}
      href={`${ROUTES.trips}/${trip.slug}`}
      grayscale={trip.isPast}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge>
          <Calendar className="mr-1 h-3 w-3" strokeWidth={1.5} />
          {formatDate(trip.date)}
        </Badge>
        {trip.isPast && <Badge variant="outline">Zakończony</Badge>}
      </div>

      <h3 className="font-heading text-xl font-bold text-graphite sm:text-2xl">
        {trip.title}
      </h3>

      <p className="mt-1 text-sm text-graphite-light">{trip.subtitle}</p>

      <div className="mt-3 flex items-center gap-1.5 text-sm text-graphite-light">
        <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        <span>{trip.location}</span>
      </div>

      <p className="mt-4 text-base text-graphite-light line-clamp-3">
        {trip.shortDescription}
      </p>

      <span className="mt-4 inline-flex items-center text-sm font-medium text-moss group-hover:underline">
        Dowiedz się więcej &rarr;
      </span>
    </Card>
  );
}
