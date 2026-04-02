import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { TripCardHorizontal } from "@/components/home/TripCardHorizontal";
import { JoinUsNewsletter } from "@/components/shared/JoinUsNewsletter";
import { BenefitCards } from "@/components/shared/BenefitCards";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { getBenefitsByCategory } from "@/data/benefits";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Warsztaty z dziećmi",
  description:
    "Warsztaty rodzinne z dziećmi. Odpoczynek, wsparcie i czas pełen bliskości w otoczeniu natury — dla mam, babć, cioć i koleżanek.",
};

export default async function FamilyTripsPage() {
  const trips = await getUpcomingTripsByCategory("rodzinny");
  const benefits = await getBenefitsByCategory("rodzinny");

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Warsztaty z dziećmi", url: `${SITE_CONFIG.url}/warsztaty-z-dziecmi` },
      ])} />

      {/* Hero — reduced spacing */}
      <SectionWrapper className="py-4 sm:py-6">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-light text-graphite sm:text-5xl lg:text-6xl">
                <span className="relative inline-block">Warsztaty z dziećmi<svg className="mx-auto mt-1 h-[6px] w-[90%]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5" stroke="currentColor" className="text-graphite-light/40" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-graphite-light sm:text-xl">
                To propozycja dla rodzin, które szukają alternatywy dla tłocznych
                miejsc, popularnych atrakcji i hotelowych animacji. Z nami
                zwolnicie, zapomnicie o bajce i spędzicie naprawdę jakościowy
                czas razem.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits from CMS */}
      {benefits && (
        <SectionWrapper variant="alternate" className="py-6 sm:py-8">
          <Container>
            <BenefitCards benefits={benefits} />
          </Container>
        </SectionWrapper>
      )}

      {/* Experience Description — reduced spacing */}
      <SectionWrapper className="py-6 sm:py-8">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-light text-graphite sm:text-4xl">
                Jak wygląda{" "}
                <span className="relative inline-block"><em className="italic text-graphite-light">warsztat?</em><svg className="mx-auto mt-0.5 h-[5px] w-[90%]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5" stroke="currentColor" className="text-graphite-light/40" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-graphite-light">
                <p>
                  Każdy dzień zaczyna się spokojnie — od porannej jogi lub
                  spaceru w ciszy. Potem warsztaty: kreatywne zajęcia dla dzieci
                  i dorosłych, wspólne gotowanie, zabawy na świeżym powietrzu.
                </p>
                <p>
                  Wieczorem ognisko, rozmowy i cisza. Bez pośpiechu, bez planu
                  dnia włożonego w ramki. Każdy może uczestniczyć w swoim tempie.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Trips or Join Us */}
      {trips.length > 0 ? (
        <SectionWrapper variant="alternate" className="py-6 sm:py-8">
          <Container>
            <SectionHeading
              title="Nadchodzące"
              italicText="warsztaty"
              underline
              subtitle="Wybierz termin i dołącz do nas"
            />
            <div className="mx-auto max-w-4xl space-y-6">
              {trips.map((trip, index) => (
                <ScrollAnimation key={trip.slug} delay={index * 0.12}>
                  <TripCardHorizontal trip={trip} />
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
      ) : (
        <JoinUsNewsletter />
      )}
    </>
  );
}
