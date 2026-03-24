import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCard } from "@/components/home/TripCard";
import { getUpcomingTrips } from "@/data/trips";
import { ROUTES } from "@/lib/constants";

export async function TripCardsSection() {
  const upcomingTrips = await getUpcomingTrips();
  if (upcomingTrips.length === 0) return null;
  const displayTrips = upcomingTrips.slice(0, 3);

  return (
    <SectionWrapper id="wyjazdy">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Nadchodzące"
            italicText="warsztaty"
            underline
            subtitle="Wybierz warsztat dla siebie i swojego dziecka"
          />
        </ScrollAnimation>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {displayTrips.map((trip, index) => (
            <ScrollAnimation
              key={trip.slug}
              variant="fadeUp"
              delay={index * 0.15}
              className="h-full"
            >
              <TripCard trip={trip} />
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ScrollAnimation variant="fadeUp" delay={0.3}>
            <Button href={ROUTES.trips} variant="secondary">
              Zobacz wszystkie warsztaty
            </Button>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
