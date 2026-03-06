"use client";

import { useSearchParams } from "next/navigation";
import type { Trip } from "@/types/trip";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCard } from "@/components/home/TripCard";

type TripsFilterProps = {
  upcomingTrips: Trip[];
};

const categoryLabels: Record<string, string> = {
  rodzinny: "Wyjazdy rodzinne",
  "matka-corka": "Wyjazdy matka z córką",
};

export function TripsFilter({ upcomingTrips }: TripsFilterProps) {
  const searchParams = useSearchParams();
  const kategoria = searchParams.get("kategoria");

  const validCategory = kategoria === "rodzinny" || kategoria === "matka-corka" ? kategoria : null;

  const filtered = validCategory
    ? upcomingTrips.filter((trip) => trip.category === validCategory)
    : upcomingTrips;

  const subtitle = validCategory
    ? (categoryLabels[validCategory] ?? "Wybierz swój wyjazd i dołącz do nas!")
    : "Wybierz swój wyjazd i dołącz do nas!";

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
