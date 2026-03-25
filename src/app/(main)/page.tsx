import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { TripCardsSection } from "@/components/home/TripCardsSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { OpinionsTeaser } from "@/components/home/OpinionsTeaser";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { getFAQItems } from "@/data/faq";
import { StructuredData } from "@/components/shared/StructuredData";
import { ImageBreaker } from "@/components/shared/ImageBreaker";
import { getFAQSchema } from "@/lib/structured-data";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCalendar } from "@/components/shared/TripCalendar";
import { getCalendarTrips } from "@/data/trips";

export const revalidate = 3600; // ISR: revalidate every hour for auto-isPast

export default async function Home() {
  const calendarTrips = await getCalendarTrips();
  const faqData = await getFAQItems();

  const faqSchema = getFAQSchema(faqData);

  return (
    <>
      {faqSchema && <StructuredData data={faqSchema} />}

      <HeroSection />

      <CategoryCards />

      {/* Calendar */}
      <SectionWrapper variant="alternate">
        <Container>
          <SectionHeading
            title="Znajdź termin"
            italicText="idealny dla siebie"
            underline
          />
          <div className="mx-auto max-w-3xl">
            <ScrollAnimation variant="fadeUp">
              <TripCalendar trips={calendarTrips} />
            </ScrollAnimation>
          </div>
        </Container>
      </SectionWrapper>

      <TripCardsSection />

      {/* Image breaker #2 — atmosfera warsztatu */}
      <ImageBreaker
        src="/images/przeszly-1.jpg"
        alt="Uczestnicy warsztatów na łonie natury"
      />

      <AboutTeaser />
      <OpinionsTeaser />

      {/* Image breaker #3 — matki i córki */}
      <ImageBreaker
        src="/images/matki-corki-1.jpg"
        alt="Warsztaty matka i córka w naturze"
        aspectRatio="16/9"
      />

      <BlogTeaser />
      <HomeFAQ faqData={faqData} />
    </>
  );
}
