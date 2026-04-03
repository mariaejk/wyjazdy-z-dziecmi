import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCardHorizontal } from "@/components/home/TripCardHorizontal";
import { JoinUsNewsletter } from "@/components/shared/JoinUsNewsletter";
import { BenefitCards } from "@/components/shared/BenefitCards";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { getBenefitsByCategory } from "@/data/benefits";
import { ROUTES } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Warsztaty dla dorosłych — Wyjazdy z Dziećmi",
  description:
    "Warsztaty wyjazdowe tylko dla dorosłych — joga, konie, ruch w naturze. Bo liczysz się także ty.",
  robots: { index: false },
};

export default async function AdultOnlyPage() {
  const trips = await getUpcomingTripsByCategory("dla-doroslych");
  const benefits = await getBenefitsByCategory("dla-doroslych");

  return (
    <>
      {/* Hero */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-light text-graphite sm:text-5xl lg:text-6xl">
                Warsztaty dla dorosłych
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Zapraszamy Was także na wydarzenia bez dzieci. To spotkania
                doskonałe dla rodziców, osób szukających spokoju, odpoczynku,
                ale też kontaktu ze sobą.
              </p>
            </div>
            <div className="relative mx-auto mt-8 aspect-[4/3] max-w-2xl overflow-hidden rounded-none">
              <Image
                src="/images/okladka-czas-bez-dzieci.jpeg"
                alt="Czas bez dzieci — relaks na huśtawce w otoczeniu zieleni"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits from CMS */}
      {benefits && (
        <SectionWrapper>
          <Container>
            <BenefitCards benefits={benefits} />
          </Container>
        </SectionWrapper>
      )}

      {/* Trips or Join Us */}
      {trips.length > 0 ? (
        <>
          <SectionWrapper className="bg-moss/10">
            <Container>
              <SectionHeading
                title="Nadchodzące warsztaty"
                subtitle="Najbliższe warsztaty tylko dla dorosłych"
              />
              <div className="mx-auto max-w-4xl space-y-6">
                {trips.map((trip, index) => (
                  <ScrollAnimation key={trip.slug} delay={index * 0.12}>
                    <TripCardHorizontal trip={trip} />
                  </ScrollAnimation>
                ))}
              </div>
            </Container>
          </SectionWrapper>

          <SectionWrapper variant="alternate">
            <Container>
              <ScrollAnimation variant="fadeUp">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="font-heading text-3xl font-light text-graphite sm:text-4xl">
                    Dołącz do nas
                  </h2>
                  <p className="mt-4 text-lg text-graphite-light">
                    Masz pytania lub szukasz innego terminu? Napisz do nas
                    — chętnie pomożemy.
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button href={ROUTES.trips}>
                      Zobacz wszystkie warsztaty
                    </Button>
                    <Button href={ROUTES.contact} variant="secondary">
                      Napisz do nas
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            </Container>
          </SectionWrapper>
        </>
      ) : (
        <JoinUsNewsletter className="bg-moss/10" />
      )}
    </>
  );
}
