"use client";

import { useSearchParams } from "next/navigation";
import type { Trip } from "@/types/trip";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCard } from "@/components/home/TripCard";
import { CATEGORY_CONFIG, type CategoryKey } from "@/lib/category-config";

type TripsFilterProps = {
  upcomingTrips: Trip[];
};

const validCategories = Object.keys(CATEGORY_CONFIG) as CategoryKey[];

export function TripsFilter({ upcomingTrips }: TripsFilterProps) {
  const searchParams = useSearchParams();
  const kategoria = searchParams.get("kategoria");

  const validCategory = validCategories.includes(kategoria as CategoryKey) ? (kategoria as CategoryKey) : null;

  const filtered = validCategory
    ? upcomingTrips.filter((trip) => trip.category === validCategory)
    : upcomingTrips;

  const subtitle = validCategory
    ? (CATEGORY_CONFIG[validCategory].label)
    : "Wybierz warsztat i dołącz do nas!";

  return (
    <>
      <p className="mb-8 text-center text-lg text-graphite-light">{subtitle}</p>
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {filtered.map((trip, index) => (
            <ScrollAnimation key={trip.slug} delay={index * 0.15}>
              <TripCard trip={trip} />
            </ScrollAnimation>
          ))}
        </div>
      ) : (
        <p className="text-center text-graphite-light">
          Aktualnie nie mamy zaplanowanych wyjazdów w tej kategorii. Śledź
          nas w mediach społecznościowych, aby być na bieżąco!
        </p>
      )}
    </>
  );
}
