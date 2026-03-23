import type { Metadata } from "next";
import { Heart, Shield, Users, TreePine, Smile, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCard } from "@/components/home/TripCard";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { ROUTES } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Single Parents — Wyjazdy z Dziećmi",
  description:
    "Wyjazdy dla samodzielnych rodziców z dziećmi. Bezpieczna przestrzeń, wsparcie i czas pełen bliskości w otoczeniu natury.",
  robots: { index: false },
};

const benefits = [
  {
    icon: Heart,
    title: "Bez oceniania",
    description:
      "Bezpieczna, kameralna grupa ludzi, którzy rozumieją codzienność samodzielnego rodzica.",
  },
  {
    icon: Shield,
    title: "Wsparcie grupy",
    description:
      "Spotkania z innymi single parents budują siłę i poczucie wspólnoty.",
  },
  {
    icon: Users,
    title: "Czas dla dziecka i dla Ciebie",
    description:
      "Program łączy wspólne aktywności z chwilą tylko dla dorosłych — na oddech i regenerację.",
  },
  {
    icon: TreePine,
    title: "Natura jako terapia",
    description:
      "Las, jezioro, ognisko — natura daje siłę i spokój, których potrzebujesz.",
  },
  {
    icon: Smile,
    title: "Zabawa dla dzieci",
    description:
      "Warsztaty kreatywne, zabawy na świeżym powietrzu — dzieci poznają nowych przyjaciół.",
  },
  {
    icon: Sparkles,
    title: "Nowe relacje",
    description:
      "Wyjazdy to okazja do poznania ludzi w podobnej sytuacji życiowej. Przyjaźnie, które trwają.",
  },
];

export default async function SingleParentsPage() {
  const trips = await getUpcomingTripsByCategory("single-parents");

  return (
    <>
      {/* Hero */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl lg:text-6xl">
                Single Parents
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Wyjazdy stworzone z myślą o samodzielnych rodzicach i ich
                dzieciach. Przestrzeń bez pośpiechu, pełna wsparcia i zrozumienia
                — bo zasługujesz na chwilę wytchnienia.
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
              subtitle="Wyjazdy dopasowane do potrzeb samodzielnych rodziców"
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

      {/* Trips */}
      {trips.length > 0 && (
        <SectionWrapper>
          <Container>
            <SectionHeading
              title="Nadchodzące warsztaty"
              subtitle="Wybierz termin i dołącz do nas"
            />
            <div className="mx-auto max-w-2xl">
              <div className="grid gap-6">
                {trips.map((trip, index) => (
                  <ScrollAnimation key={trip.slug} delay={index * 0.15} className="h-full">
                    <TripCard trip={trip} />
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Dołącz do nas
              </h2>
              <p className="mt-4 text-lg text-graphite-light">
                Masz pytania? Napisz do nas — chętnie pomożemy wybrać
                odpowiedni wyjazd.
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
