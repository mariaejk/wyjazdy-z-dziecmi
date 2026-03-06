import { HeroSection } from "@/components/home/HeroSection";
import { TripCardsSection } from "@/components/home/TripCardsSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { OpinionsTeaser } from "@/components/home/OpinionsTeaser";
import { PastTripsSection } from "@/components/home/PastTripsSection";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCalendar } from "@/components/shared/TripCalendar";
import { getAllTrips } from "@/data/trips";

export default async function Home() {
  const allTrips = await getAllTrips();
  const calendarTrips = allTrips.map((t) => ({
    slug: t.slug,
    title: t.title,
    date: t.date,
    dateEnd: t.dateEnd,
    category: t.category,
    isPast: t.isPast,
  }));

  return (
    <>
      <HeroSection />

      {/* USP */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg font-medium leading-relaxed text-moss sm:text-xl">
                Jedyne w Polsce wyjazdy warsztatowe łączące rozwój osobisty
                rodziców z programem dla dzieci.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      <TripCardsSection />

      {/* Calendar */}
      <SectionWrapper variant="alternate">
        <Container>
          <SectionHeading
            title="Kalendarz wyjazdów"
            subtitle="Znajdź termin idealny dla siebie"
          />
          <div className="mx-auto max-w-md">
            <ScrollAnimation variant="fadeUp">
              <TripCalendar trips={calendarTrips} />
            </ScrollAnimation>
          </div>
        </Container>
      </SectionWrapper>

      <AboutTeaser />
      <OpinionsTeaser />
      <PastTripsSection />
    </>
  );
}
