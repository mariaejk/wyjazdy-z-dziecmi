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
  title: "O nas",
  description:
    "Poznaj Marię Kordalewską — twórczynię projektu Wyjazdy z Dziećmi, nauczycielkę jogi i organizatorkę eventów.",
};

const missionCards = [
  {
    icon: Leaf,
    title: "Natura i cisza",
    description:
      "Szukam miejsc w \„bezinterneciu\" i \„bezzasięgowie\", gdzie możemy zbliżyć się do siebie.",
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
      "Zapraszam do współpracy specjalistów od rozwoju, aby tworzyć spotkania \„lepsze niż bajka\".",
  },
];

export default async function AboutPage() {
  const maria = await getTeamMember("Maria Kordalewska");
  const kamila = await getTeamMember("Kamila Janczurewicz");
  const places = await getAllPlaces();

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "O nas", url: `${SITE_CONFIG.url}/o-nas` },
      ])} />

      {/* Maria */}
      {maria && (
        <PersonBio member={maria} variant="alternate" imagePosition="left" hideNameHeading>
          <Button href={ROUTES.projects} variant="secondary">
            Inne projekty
          </Button>
        </PersonBio>
      )}

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
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-moss/10">
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
      {kamila && <PersonBio member={kamila} variant="alternate" imagePosition="left" />}

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
            <div className="mx-auto max-w-xl text-center">
              <p className="text-sm leading-relaxed text-graphite-light sm:text-base">
                Szukasz czegoś dostępnego teraz?
              </p>
              <div className="mt-4">
                <Button href={ROUTES.trips}>
                  Zobacz wszystkie warsztaty
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
    </>
  );
}
