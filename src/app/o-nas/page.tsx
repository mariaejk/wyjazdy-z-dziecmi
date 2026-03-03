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
import { places } from "@/data/places";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "O mnie",
  description:
    "Poznaj Mari\u0119 Kordalewsk\u0105 \u2014 tw\u00F3rczyni\u0119 projektu Wyjazdy z Dzie\u0107mi, nauczycielk\u0119 jogi i organizatork\u0119 event\u00F3w.",
};

const missionCards = [
  {
    icon: Leaf,
    title: "Natura i cisza",
    description:
      "Szukam miejsc w \u201Ebezinterneciu\u201D i \u201Ebezzasi\u0119gowie\u201D, gdzie mo\u017Cemy zbli\u017Cy\u0107 si\u0119 do siebie.",
  },
  {
    icon: Heart,
    title: "Autentyczne relacje",
    description:
      "Tworz\u0119 przestrze\u0144 do wsp\u00F3lnego bycia \u2014 bez po\u015Bpiechu, bez oceniania, z pe\u0142n\u0105 obecno\u015Bci\u0105.",
  },
  {
    icon: Star,
    title: "Najlepsi specjali\u015Bci",
    description:
      "Zapraszam do wsp\u00F3\u0142pracy specjalist\u00F3w od rozwoju, aby tworzy\u0107 spotkania \u201Elepsze ni\u017C bajka\u201D.",
  },
];

export default function AboutPage() {
  const maria = getTeamMember("Maria Kordalewska")!;
  const kamila = getTeamMember("Kamila Janczurewicz")!;

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona g\u0142\u00F3wna", url: SITE_CONFIG.url },
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
              Poznaj moj\u0105 histori\u0119 i warto\u015Bci
            </p>
          </ScrollAnimation>
          <ScrollAnimation variant="fadeUp" delay={0.15}>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-graphite-light">
              Tworz\u0119 wyjazdy dla rodzin, kt\u00F3re szukaj\u0105 chwili zatrzymania.
              W otoczeniu natury, z dala od codziennego po\u015Bpiechu,
              buduj\u0119 przestrze\u0144 do wsp\u00F3lnego bycia, zabawy i rozwoju.
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
              subtitle="Warto\u015Bci, kt\u00F3re stoj\u0105 za ka\u017Cdym wyjazdem"
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

      {/* Wsp\u00F3\u0142pracuj\u0105 ze mn\u0105 */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Wsp\u00F3\u0142pracuj\u0105 ze mn\u0105"
              subtitle="Specjali\u015Bci, kt\u00F3rzy wsp\u00F3\u0142tworz\u0105 nasze wyjazdy"
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
                Do\u0142\u0105cz do mnie
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
