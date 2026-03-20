import type { Metadata } from "next";
import { Heart, Shield, Users, TreePine, Smile, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { TripCard } from "@/components/home/TripCard";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Wyjazd z dziećmi",
  description:
    "Wyjazdy rodzinne z dziećmi. Odpoczynek, wsparcie i czas pełen bliskości w otoczeniu natury — dla mam, babć, cioć i koleżanek.",
};

const benefits = [
  {
    icon: Heart,
    title: "Czas tylko dla Was",
    description:
      "Wyjazdy zaprojektowane tak, abyś mógł/mogła cieszyć się czasem z dzieckiem bez pośpiechu i codziennych obowiązków.",
  },
  {
    icon: Shield,
    title: "Bezpieczna przestrzeń",
    description:
      "Kameralna grupa, w której każdy jest mile widziany. Bez oceniania, z pełnym szacunkiem dla Twojej historii.",
  },
  {
    icon: Users,
    title: "Społeczność",
    description:
      "Możliwość poznania innych rodziców, babć, cioć i opiekunów. Wspólne doświadczenia budują trwałe relacje.",
  },
  {
    icon: TreePine,
    title: "Natura leczy",
    description:
      "Las, jezioro, cisza — przyroda daje siłę i spokój, których tak bardzo potrzebujesz.",
  },
  {
    icon: Smile,
    title: "Zabawa i rozwój",
    description:
      "Warsztaty kreatywne, ruch i zabawy na świeżym powietrzu — dzieci poznają nowych przyjaciół.",
  },
  {
    icon: Sparkles,
    title: "Chwila dla Ciebie",
    description:
      "W programie znajdziesz czas na jogę, relaks i oddech — bo Ty też zasługujesz na regenerację.",
  },
];

export default async function FamilyTripsPage() {
  const trips = await getUpcomingTripsByCategory("rodzinny");

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Wyjazd z dziećmi", url: `${SITE_CONFIG.url}/wyjazd-z-dziecmi` },
      ])} />

      {/* Hero */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl lg:text-6xl">
                Wyjazd z dziećmi
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Nie musisz być samodzielnym rodzicem, żeby potrzebować chwili
                wytchnienia. Nasze wyjazdy to bezpieczna przestrzeń dla każdego,
                kto chce spędzić wyjątkowy czas z dzieckiem &mdash; mamy, babcie,
                ciocie, koleżanki. Odpoczywaj, oddychaj i po prostu bądź.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Dlaczego warto?"
              subtitle="Wyjazdy dopasowane do potrzeb rodziców i opiekunów"
            />
          </ScrollAnimation>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <ScrollAnimation
                  key={benefit.title}
                  variant="fadeUp"
                  delay={index * 0.1}
                >
                  <div className="rounded-2xl border border-graphite/10 bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-moss/10">
                      <benefit.icon
                        className="h-6 w-6 text-moss"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-graphite">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite-light">
                      {benefit.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Experience Description */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Jak wygląda wyjazd?
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-graphite-light">
                <p>
                  Każdy dzień zaczyna się spokojnie &mdash; od porannej jogi lub
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

      {/* Trips */}
      {trips.length > 0 && (
        <SectionWrapper variant="alternate">
          <Container>
            <SectionHeading
              title="Nadchodzące wyjazdy"
              subtitle="Wybierz termin i dołącz do nas"
            />
            <div className="mx-auto max-w-2xl">
              <div className="grid gap-6">
                {trips.map((trip, index) => (
                  <ScrollAnimation key={trip.slug} delay={index * 0.15}>
                    <TripCard trip={trip} />
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Dołącz do nas
              </h2>
              <p className="mt-4 text-lg text-graphite-light">
                Sprawdź dostępne terminy lub napisz do nas &mdash; pomożemy
                znaleźć wyjazd idealny dla Ciebie i Twojego dziecka.
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
  );
}
