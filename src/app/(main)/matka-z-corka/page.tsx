import type { Metadata } from "next";
import Image from "next/image";
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
  title: "Matka i córka",
  description:
    "Warsztaty wyjazdowe dla mam i córek — taniec, joga, uważność i kobieca moc. Także dla babć, cioć i koleżanek z córką.",
};

export default async function MotherDaughterPage() {
  const trips = await getUpcomingTripsByCategory("matka-corka");
  const benefits = await getBenefitsByCategory("matka-corka");

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Matka i córka", url: `${SITE_CONFIG.url}/matka-z-corka` },
      ])} />

      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]">
        <Image
          src="/images/okladka-matki-hero.jpeg"
          alt="Warsztaty matka i córka — kobiety siedzące na drewnianej podłodze"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 to-transparent" />
      </div>

      {/* Hero text */}
      <SectionWrapper className="py-4 sm:py-6">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-light text-graphite sm:text-5xl lg:text-6xl">
                Matka i córka
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-graphite-light sm:text-xl">
                To spotkanie dwóch kobiet. Każda zamknięta w swoim czasie,
                a jednocześnie żyjące równolegle, tak bardzo zespolone ze sobą
                od zawsze. Nierozerwalne, a jednak tak bardzo różne. Ten warsztat
                to okazja do zaobserwowania tej relacji taką, jaka ona jest.
                To czas, aby na chwilę wyjść z ról i w zabawie i szczerym
                uśmiechu odnaleźć radość z bycia razem.
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
                Jak wygląda warsztat?
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-graphite-light">
                <p>
                  Podczas warsztatu spotykamy się w ruchu i obecności —
                  poprzez jogę, taniec intuicyjny, medytacje, sztukę, muzykę
                  i głos. Tworzymy przestrzeń, w której córki poczują się częścią
                  kręgu kobiet — widziane, ważne i zaproszone do bycia sobą.
                </p>
                <p>
                  Jednocześnie dbamy o równowagę. Będzie czas wspólny, pogłębiający
                  relację matki i córki, ale także czas oddzielny — moment
                  tylko dla mam, na regenerację, refleksję i bycie w kobiecym kręgu.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Trips or Join Us */}
      {trips.length > 0 ? (
        <>
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
            </Container>
          </SectionWrapper>

          <SectionWrapper>
            <Container>
              <ScrollAnimation variant="fadeUp">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="font-heading text-3xl font-light text-graphite sm:text-4xl">
                    Dołącz do nas
                  </h2>
                  <p className="mt-4 text-lg text-graphite-light">
                    Jeśli czujesz, że chcesz zatrzymać się, odetchnąć i spotkać
                    swoją córkę w nowy sposób — ten wyjazd jest dla Was.
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
        <JoinUsNewsletter />
      )}
    </>
  );
}
