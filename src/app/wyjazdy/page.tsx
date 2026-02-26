import type { Metadata } from "next";
import { getUpcomingTrips, getPastTrips } from "@/data/trips";
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

export default function TripsPage() {
  const upcomingTrips = getUpcomingTrips();
  const pastTrips = getPastTrips();

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
            subtitle="Wybierz wyjazd i dołącz do nas!"
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
              Aktualnie nie mamy zaplanowanych wyjazdów. Śledź nas w mediach
              społecznościowych, aby być na bieżąco!
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
