import { HeroSection } from "@/components/home/HeroSection";
import { TripCardsSection } from "@/components/home/TripCardsSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { OpinionsTeaser } from "@/components/home/OpinionsTeaser";
import { HomeFAQ, faqData } from "@/components/home/HomeFAQ";
import { StructuredData } from "@/components/shared/StructuredData";
import { getFAQSchema } from "@/lib/structured-data";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCalendar } from "@/components/shared/TripCalendar";
import { ForestPattern } from "@/components/shared/ForestPattern";
import { getCalendarTrips } from "@/data/trips";

export const revalidate = 3600; // ISR: revalidate every hour for auto-isPast

export default async function Home() {
  const calendarTrips = await getCalendarTrips();

  const faqSchema = getFAQSchema(faqData);

  return (
    <>
      {faqSchema && <StructuredData data={faqSchema} />}

      {/* USP — pod menu, przed hero */}
      <SectionWrapper className="pt-4 pb-2 sm:pt-6 sm:pb-2">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xl font-medium leading-relaxed text-moss sm:text-2xl">
                Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      <HeroSection />

      {/* Calendar — przed Nadchodzącymi wyjazdami */}
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
        <ForestPattern variant="fairytale" />
      </SectionWrapper>

      <TripCardsSection />
      <AboutTeaser />
      <OpinionsTeaser />
      <HomeFAQ />
    </>
  );
}
