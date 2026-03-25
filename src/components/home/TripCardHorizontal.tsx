import type { Trip } from "@/types/trip";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateRange, formatCurrency, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { CATEGORY_CONFIG } from "@/lib/category-config";

type TripCardHorizontalProps = {
  trip: Trip;
};

function getScarcityBadge(spotsLeft?: number) {
  if (spotsLeft === undefined) return null;
  if (spotsLeft === 0) {
    return <Badge className="border-0 bg-red-100 text-red-700">Komplet</Badge>;
  }
  if (spotsLeft <= 3) {
    return <Badge className="border-0 bg-amber-100 text-amber-700">Ostatnie miejsca!</Badge>;
  }
  return null;
}

function getMinPrice(pricing: Trip["pricing"]): number | null {
  if (pricing.length === 0) return null;
  return Math.min(...pricing.map((p) => p.price));
}

export function TripCardHorizontal({ trip }: TripCardHorizontalProps) {
  const tripUrl = `${ROUTES.trips}/${trip.slug}`;
  const minPrice = getMinPrice(trip.pricing);
  const scarcityBadge = getScarcityBadge(trip.spotsLeft);
  const isSoldOut = trip.spotsLeft === 0;

  return (
    <div className="group overflow-hidden rounded-none border border-graphite/8 bg-white transition-colors duration-300 hover:border-graphite/20">
      <div className="flex flex-col sm:flex-row">
        {/* Image — left side on desktop, top on mobile */}
        <Link href={tripUrl} className="relative shrink-0 sm:w-72 lg:w-80">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:h-full">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Content — right side */}
        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="px-3 py-1 text-xs font-semibold sm:text-sm">
              <Calendar className="mr-1 h-3.5 w-3.5" strokeWidth={1.5} />
              {formatDateRange(trip.date, trip.dateEnd)}
            </Badge>
            <Badge className={cn(CATEGORY_CONFIG[trip.category].badgeBg, CATEGORY_CONFIG[trip.category].badgeText, "border-0")}>
              {CATEGORY_CONFIG[trip.category].label}
            </Badge>
            {trip.isPast && <Badge variant="outline">Zakończony</Badge>}
            {!trip.isPast && scarcityBadge}
          </div>

          <Link href={tripUrl}>
            <h3 className="mt-3 font-heading text-xl font-light text-graphite transition-colors group-hover:text-moss sm:text-2xl">
              {trip.title}
            </h3>
          </Link>

          <p className="mt-1 text-sm text-graphite-light">{trip.subtitle}</p>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-graphite-light">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span>{trip.location}</span>
          </div>

          {minPrice !== null && (
            <p className="mt-1 text-sm font-medium text-moss">
              od {formatCurrency(minPrice)}
            </p>
          )}

          <p className="mt-3 text-sm leading-relaxed text-graphite-light line-clamp-2 sm:text-base sm:line-clamp-3">
            {trip.shortDescription}
          </p>

          <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
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
        </div>
      </div>
    </div>
  );
}
