import type { Trip } from "@/types/trip";
import { MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateRange, formatCurrency, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { CATEGORY_CONFIG } from "@/lib/category-config";

type TripCardProps = {
  trip: Trip;
};

function getScarcityBadge(spotsLeft?: number) {
  if (spotsLeft === undefined) return null;
  if (spotsLeft === 0) {
    return <Badge className="bg-red-100 text-red-700 border-0">Komplet</Badge>;
  }
  if (spotsLeft <= 3) {
    return <Badge className="bg-amber-100 text-amber-700 border-0">Ostatnie miejsca!</Badge>;
  }
  return null;
}

function getMinPrice(pricing: Trip["pricing"]): number | null {
  if (pricing.length === 0) return null;
  return Math.min(...pricing.map((p) => p.price));
}

export function TripCard({ trip }: TripCardProps) {
  const tripUrl = `${ROUTES.trips}/${trip.slug}`;
  const minPrice = getMinPrice(trip.pricing);
  const scarcityBadge = getScarcityBadge(trip.spotsLeft);
  const isSoldOut = trip.spotsLeft === 0;

  return (
    <Card
      image={{ src: trip.image, alt: trip.title }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge className="px-4 py-1.5 text-sm font-semibold">
          <Calendar className="mr-1.5 h-4 w-4" strokeWidth={1.5} />
          {formatDateRange(trip.date, trip.dateEnd)}
        </Badge>
        <Badge className={cn(CATEGORY_CONFIG[trip.category].badgeBg, CATEGORY_CONFIG[trip.category].badgeText, "border-0")}>
          {CATEGORY_CONFIG[trip.category].label}
        </Badge>
        {trip.isPast && <Badge variant="outline">Zakończony — komplet</Badge>}
        {!trip.isPast && scarcityBadge}
      </div>

      <h3 className="font-heading text-xl font-bold text-graphite sm:text-2xl">
        {trip.title}
      </h3>

      <p className="mt-1 text-sm text-graphite-light">{trip.subtitle}</p>

      <div className="mt-3 flex items-center gap-1.5 text-sm text-graphite-light">
        <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        <span>{trip.location}</span>
      </div>

      {minPrice !== null && (
        <p className="mt-1 text-sm font-medium text-moss">
          od {formatCurrency(minPrice)}
        </p>
      )}

      <p className="mt-4 text-base text-graphite-light line-clamp-3">
        {trip.shortDescription}
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button href={tripUrl} variant="secondary" size="sm">
          Szczegóły
        </Button>
        {!trip.isPast && (
          isSoldOut ? (
            <Button href={`${tripUrl}#lista-oczekujacych`} size="sm">
              Lista oczekujących
            </Button>
          ) : (
            <Button href={`${tripUrl}#formularz`} size="sm">
              Zarezerwuj
            </Button>
          )
        )}
      </div>
    </Card>
  );
}
