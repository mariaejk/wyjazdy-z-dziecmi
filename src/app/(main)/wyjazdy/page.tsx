import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllTrips, toCalendarTrips } from "@/data/trips";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { TripCardHorizontal } from "@/components/home/TripCardHorizontal";
import { TripCalendar } from "@/components/shared/TripCalendar";
import { ForestPattern } from "@/components/shared/ForestPattern";
import { TripsFilter } from "@/components/trips/TripsFilter";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 3600; // ISR: revalidate every hour for auto-isPast

export const metadata: Metadata = {
  title: "Nadchodzące warsztaty wyjazdowe — terminy i ceny",
  description:
    "Zobacz nasze nadchodzące i zakończone wyjazdy warsztatowe dla rodzin. Joga, taniec, ceramika, konie — w otoczeniu natury.",
};

export default async function TripsPage() {
  const allTrips = await getAllTrips();
  const upcomingTrips = allTrips.filter((t) => !t.isPast);
  const pastTrips = allTrips.filter((t) => t.isPast);
  const calendarTrips = toCalendarTrips(allTrips);

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Wyjazdy", url: `${SITE_CONFIG.url}/wyjazdy` },
      ])} />

      {/* Calendar */}
      <SectionWrapper variant="alternate" className="relative overflow-hidden">
        <Container>
          <SectionHeading
            title="Kalendarz warsztatów"
            subtitle="Znajdź termin idealny dla siebie"
          />
          <div className="mx-auto max-w-3xl">
            <ScrollAnimation variant="fadeUp">
              <TripCalendar trips={calendarTrips} />
            </ScrollAnimation>
          </div>
        </Container>
        <ForestPattern variant="realistic" />
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <SectionHeading title="Nadchodzące warsztaty" />
          <Suspense fallback={null}>
            <TripsFilter upcomingTrips={upcomingTrips} />
          </Suspense>
        </Container>
      </SectionWrapper>

      {pastTrips.length > 0 && (
        <SectionWrapper className="bg-moss/10">
          <Container>
            <SectionHeading
              title="Zakończone warsztaty"
              subtitle="Zobacz, co było wcześniej"
            />
            <div className="mx-auto max-w-4xl space-y-6">
              {pastTrips.map((trip, index) => (
                <ScrollAnimation key={trip.slug} delay={index * 0.12}>
                  <TripCardHorizontal trip={trip} />
                </ScrollAnimation>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      )}
    </>
  );
}
