import type { Metadata } from "next";
import { Leaf, Heart, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { PersonBio } from "@/components/about/PersonBio";
import { PlaceCard } from "@/components/about/PlaceCard";
import { getTeamMember } from "@/data/team";
import { getAllPlaces } from "@/data/places";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "O mnie",
  description:
    "Poznaj Marię Kordalewską — twórczynię projektu Wyjazdy z Dziećmi, nauczycielkę jogi i organizatorkę eventów.",
};

const missionCards = [
  {
    icon: Leaf,
    title: "Natura i cisza",
    description:
      "Szukam miejsc w \u201Ebezinterneciu\u201D i \u201Ebezzasięgowie\u201D, gdzie możemy zbliżyć się do siebie.",
  },
  {
    icon: Heart,
    title: "Autentyczne relacje",
    description:
      "Tworzę przestrzeń do wspólnego bycia — bez pośpiechu, bez oceniania, z pełną obecnością.",
  },
  {
    icon: Star,
    title: "Najlepsi specjaliści",
    description:
      "Zapraszam do współpracy specjalistów od rozwoju, aby tworzyć spotkania \u201Elepsze niż bajka\u201D.",
  },
];

export default async function AboutPage() {
  const maria = (await getTeamMember("Maria Kordalewska"))!;
  const kamila = (await getTeamMember("Kamila Janczurewicz"))!;
  const places = await getAllPlaces();

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "O mnie", url: `${SITE_CONFIG.url}/o-nas` },
      ])} />

      {/* Intro */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <h1 className="mb-8 text-center font-heading text-3xl font-bold text-graphite sm:mb-10 sm:text-4xl lg:mb-12 lg:text-5xl">
              O mnie
            </h1>
            <p className="mx-auto -mt-4 max-w-3xl text-center text-lg text-graphite-light sm:-mt-6 sm:text-xl">
              Poznaj moją historię i wartości
            </p>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Maria */}
      <PersonBio member={maria} variant="alternate" imagePosition="left" />

      {/* Moja misja */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Moja misja"
              subtitle="Wartości, które stoją za każdym wyjazdem"
            />
          </ScrollAnimation>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {missionCards.map((card, index) => (
              <ScrollAnimation key={card.title} variant="fadeUp" delay={index * 0.15}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
                    <card.icon className="h-8 w-8 text-moss" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-semibold text-graphite">
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed text-graphite-light">
                    {card.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Moje inne projekty CTA */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg text-graphite-light">
                Chcesz poznać moje inne projekty? Joga, eventy firmowe
                i więcej.
              </p>
              <div className="mt-6">
                <Button href={ROUTES.projects} variant="secondary">
                  Moje inne projekty
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Współpracują ze mną */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Współpracują ze mną"
              subtitle="Specjaliści, którzy współtworzą nasze wyjazdy"
            />
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
      <PersonBio member={kamila} variant="alternate" imagePosition="right" />

      {/* Places */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Nasze miejsca"
              subtitle="Wyjątkowe przestrzenie, w których organizujemy wyjazdy"
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
                Dołącz do mnie
              </h2>
              <p className="mt-4 text-lg text-graphite-light">
                Sprawdź nadchodzące wyjazdy i znajdź coś dla siebie i swoich dzieci.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href={ROUTES.trips}>
                  Zobacz wyjazdy
                </Button>
                <Button href={ROUTES.contact} variant="secondary">
                  Skontaktuj się
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
    </>
  );
}
