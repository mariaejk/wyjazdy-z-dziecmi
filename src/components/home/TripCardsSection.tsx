import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCard } from "@/components/home/TripCard";
import { getUpcomingTrips } from "@/data/trips";

export async function TripCardsSection() {
  const upcomingTrips = await getUpcomingTrips();

  return (
    <SectionWrapper id="wyjazdy">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Nadchodzące wyjazdy"
            subtitle="Wybierz wyjazd dla siebie i swojego dziecka"
          />
        </ScrollAnimation>

        <div className="mx-auto grid max-w-2xl gap-6 sm:gap-8">
          {upcomingTrips.map((trip, index) => (
            <ScrollAnimation
              key={trip.slug}
              variant="fadeUp"
              delay={index * 0.15}
            >
              <TripCard trip={trip} />
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
