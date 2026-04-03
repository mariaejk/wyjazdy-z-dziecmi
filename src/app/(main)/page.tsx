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

export const dynamic = "force-static";

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

      {/* Image breaker #2 — przed Poznajmy się */}
      <ImageBreaker
        src="/images/image-breaker-5.jpeg"
        alt="Rodziny na warsztatach w naturze"
      />

      <AboutTeaser />
      <OpinionsTeaser />

      {/* Image breaker #3 — przed FAQ */}
      <ImageBreaker
        src="/images/image-breaker-6.jpeg"
        alt="Dzieci i rodzice na warsztatach w naturze"
        aspectRatio="16/9"
        objectPosition="bottom"
      />

      <BlogTeaser />
      <HomeFAQ faqData={faqData} />
    </>
  );
}
