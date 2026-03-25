import type { Metadata } from "next";
import { Sun, Flower2, Music, TreePine, Coffee, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCardHorizontal } from "@/components/home/TripCardHorizontal";
import { JoinUsNewsletter } from "@/components/shared/JoinUsNewsletter";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { ROUTES } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Warsztaty dla dorosłych — Wyjazdy z Dziećmi",
  description:
    "Warsztaty wyjazdowe tylko dla dorosłych — joga, konie, ruch w naturze. Czas na regenerację i rozwój osobisty.",
  robots: { index: false },
};

const benefits = [
  {
    icon: Sun,
    title: "Czas tylko dla Ciebie",
    description:
      "Zostawiasz codzienność za sobą. To wyjazd, w którym skupiasz się wyłącznie na sobie.",
  },
  {
    icon: Flower2,
    title: "Joga i oddech",
    description:
      "Poranna joga, medytacja i ćwiczenia oddechowe — ciało i umysł odzyskują równowagę.",
  },
  {
    icon: Music,
    title: "Ruch i ekspresja",
    description:
      "Taniec intuicyjny, praca z ciałem i głosem — odkryj swoją kreatywność.",
  },
  {
    icon: TreePine,
    title: "Natura i cisza",
    description:
      "Las, jezioro, ognisko wieczorem. Miejsca, które przynoszą ukojenie.",
  },
  {
    icon: Coffee,
    title: "Regeneracja",
    description:
      "Czas na rozmowy, spacery i bycie w swoim tempie. Bez pośpiechu, bez planu.",
  },
  {
    icon: Sparkles,
    title: "Kameralna grupa",
    description:
      "Małe grupy sprzyjają autentycznym relacjom i głębszemu doświadczeniu.",
  },
];

export default async function AdultOnlyPage() {
  const trips = await getUpcomingTripsByCategory("dla-doroslych");

  return (
    <>
      {/* Hero */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-light text-graphite sm:text-5xl lg:text-6xl">
                Warsztaty dla dorosłych
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Wyjazdy stworzone wyłącznie dla dorosłych — przestrzeń
                na regenerację, ruch i spotkanie z sobą. Joga, konie, natura
                i kameralna grupa ludzi, z którymi dobrze jest po prostu być.
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
              subtitle="Czas na siebie, w otoczeniu natury"
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
                  <div className="rounded-none border border-graphite/10 bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-moss/10">
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

      {/* Trips or Join Us */}
      {trips.length > 0 ? (
        <>
          <SectionWrapper>
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
        <JoinUsNewsletter className="bg-white" />
      )}
    </>
  );
}
