import { getPastTrips } from "@/data/trips";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCard } from "@/components/home/TripCard";

export async function PastTripsSection() {
  const pastTrips = await getPastTrips();

  if (pastTrips.length === 0) return null;

  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading
          title="Zrealizowane warsztaty"
          subtitle="Zobacz jak wyglądały nasze poprzednie wyjazdy"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {pastTrips.map((trip, index) => (
            <ScrollAnimation key={trip.slug} delay={index * 0.15} className="h-full">
              <TripCard trip={trip} />
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
