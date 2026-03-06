import type { Metadata } from "next";
import { getUpcomingTrips, getPastTrips, getUpcomingTripsByCategory } from "@/data/trips";
import type { Trip } from "@/types/trip";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { TripCard } from "@/components/home/TripCard";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Wyjazdy",
  description:
    "Zobacz nasze nadchodzące i zakończone wyjazdy warsztatowe dla rodzin. Joga, taniec, ceramika, konie — w otoczeniu natury.",
};

type PageProps = {
  searchParams: Promise<{ kategoria?: string }>;
};

const categoryLabels: Record<string, string> = {
  rodzinny: "Wyjazdy rodzinne",
  "matka-corka": "Wyjazdy matka z córką",
};

export default async function TripsPage({ searchParams }: PageProps) {
  const { kategoria } = await searchParams;

  let upcomingTrips: Trip[];
  let subtitle: string;

  if (kategoria && (kategoria === "rodzinny" || kategoria === "matka-corka")) {
    upcomingTrips = await getUpcomingTripsByCategory(kategoria);
    subtitle = categoryLabels[kategoria] ?? "Wybierz swój wyjazd i dołącz do nas!";
  } else {
    upcomingTrips = await getUpcomingTrips();
    subtitle = "Wybierz swój wyjazd i dołącz do nas!";
  }

  const pastTrips = await getPastTrips();

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Wyjazdy", url: `${SITE_CONFIG.url}/wyjazdy` },
      ])} />

      <SectionWrapper>
        <Container>
          <SectionHeading
            title="Nadchodzące wyjazdy"
            subtitle={subtitle}
          />
          {upcomingTrips.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {upcomingTrips.map((trip, index) => (
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
        </Container>
      </SectionWrapper>

      {pastTrips.length > 0 && (
        <SectionWrapper variant="alternate">
          <Container>
            <SectionHeading
              title="Zakończone wyjazdy"
              subtitle="Zobacz, co było wcześniej"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {pastTrips.map((trip, index) => (
                <ScrollAnimation key={trip.slug} delay={index * 0.15}>
                  <TripCard trip={trip} />
                </ScrollAnimation>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      )}
    </>
  );
}
