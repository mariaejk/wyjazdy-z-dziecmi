import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { PersonBio } from "@/components/about/PersonBio";
import { PlaceCard } from "@/components/about/PlaceCard";
import { getTeamMember } from "@/data/team";
import { places } from "@/data/places";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Poznaj zesp\u00F3\u0142 Wyjazd\u00F3w z Dzie\u0107mi \u2014 Maria Kordalewska, Kamila Janczurewicz oraz miejsca, w kt\u00F3rych organizujemy wyjazdy.",
};

export default function AboutPage() {
  const maria = getTeamMember("Maria Kordalewska")!;
  const kamila = getTeamMember("Kamila Janczurewicz")!;

  return (
    <>
      {/* Intro */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <h1 className="mb-8 text-center font-heading text-3xl font-bold text-graphite sm:mb-10 sm:text-4xl lg:mb-12 lg:text-5xl">
              O nas
            </h1>
            <p className="mx-auto -mt-4 max-w-3xl text-center text-lg text-graphite-light sm:-mt-6 sm:text-xl">
              Poznaj ludzi i miejsca, kt\u00F3re tworz\u0105 wyjazdy z sercem
            </p>
          </ScrollAnimation>
          <ScrollAnimation variant="fadeUp" delay={0.15}>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-graphite-light">
              Wyjazdy z Dzie\u0107mi to spotkania dla rodzin, kt\u00F3re szukaj\u0105 chwili
              zatrzymania. W otoczeniu natury, z dala od codziennego po\u015Bpiechu,
              tworzymy przestrze\u0144 do wsp\u00F3lnego bycia, zabawy i rozwoju.
            </p>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Maria */}
      <PersonBio member={maria} variant="alternate" imagePosition="left" />

      {/* Kamila */}
      <PersonBio member={kamila} variant="default" imagePosition="right" />

      {/* Places */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Nasze miejsca"
              subtitle="Wyj\u0105tkowe przestrzenie, w kt\u00F3rych organizujemy wyjazdy"
            />
          </ScrollAnimation>

          <div className="mx-auto max-w-4xl space-y-6">
            {places.map((place, index) => (
              <PlaceCard key={place.name} place={place} index={index} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Do\u0142\u0105cz do nas
              </h2>
              <p className="mt-4 text-lg text-graphite-light">
                Sprawd\u017A nadchodz\u0105ce wyjazdy i znajd\u017A co\u015B dla siebie i swoich dzieci.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href={ROUTES.trips}>
                  Zobacz wyjazdy
                </Button>
                <Button href={ROUTES.contact} variant="secondary">
                  Skontaktuj si\u0119
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
    </>
  );
}
