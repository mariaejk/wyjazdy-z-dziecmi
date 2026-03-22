import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { ROUTES } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Moje inne projekty",
  description:
    "Poznaj inne projekty Marii Kordalewskiej — Joga z Marią i Enviar, firma z przesłaniem. Wellbeing, joga i eventy firmowe.",
};

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Strona główna", url: ROUTES.home },
          { name: "Moje inne projekty", url: ROUTES.projects },
        ])}
      />

      {/* Intro */}
      <SectionWrapper>
        <Container>
          <SectionHeading
            as="h1"
            title="Przestrzeń dobrego życia"
            subtitle="Moje inne projekty"
          />
          <ScrollAnimation variant="fadeUp">
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-graphite-light">
              Wierzę, że dobrostan to naczynie połączone. Dbanie o siebie, swoje
              emocje i relacje nie kończy się tylko na warsztatach dla rodziców.
              Od lat angażuję się również w inne inicjatywy, które pomagają
              odzyskiwać wewnętrzny spokój i budować silne więzi — zarówno
              w życiu prywatnym, jak i zawodowym. Poznaj moje pozostałe
              przestrzenie działań.
            </p>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Joga z Marią */}
      <SectionWrapper variant="alternate">
        <Container>
          <SectionHeading title="Joga z Marią" subtitle="Twoja chwila oddechu" />

          <div className="mx-auto max-w-5xl">
            <ScrollAnimation variant="fadeUp">
              <p className="mb-8 text-lg leading-relaxed text-graphite-light">
                Joga to dla mnie znacznie więcej niż tylko ruch ciała. To
                praktyka odpuszczania, łapania życiowego balansu i wyciszania
                przebodźcowanego umysłu, co w dzisiejszym szybkim świecie jest
                nam wszystkim niezwykle potrzebne.
              </p>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeUp" delay={0.1}>
              <p className="mb-8 text-base leading-relaxed text-graphite-light">
                Zobacz krótki materiał, w którym opowiadam, jak zaczęła się moja
                osobista przygoda z jogą i dlaczego tak bardzo zmieniła moje
                życie.
              </p>
            </ScrollAnimation>

            {/* Video */}
            <ScrollAnimation variant="fadeUp" delay={0.15}>
              <div className="mx-auto mb-8 max-w-lg overflow-hidden rounded-none shadow-xl ring-1 ring-graphite/5 sm:max-w-xl">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Maria opowiada o swojej przygodzie z jogą"
                  className="w-full bg-graphite"
                >
                  <source src="/videos/joga.mp4" type="video/mp4" />
                  Twoja przeglądarka nie obsługuje odtwarzacza wideo.
                </video>
              </div>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeUp" delay={0.2}>
              <p className="mb-8 text-base leading-relaxed text-graphite-light">
                Prowadzę zajęcia, które pomagają zrzucić z barków codzienne
                napięcie i dają przestrzeń, by po prostu &bdquo;być&rdquo; tu
                i teraz. Niezależnie od tego, czy dopiero zaczynasz, czy
                praktykujesz od dawna, znajdziesz u mnie bezpieczną,
                nieoceniającą przystań.
              </p>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeUp" delay={0.25}>
              <p className="mb-4 font-medium text-graphite">
                Dołącz do mojej społeczności i zacznij ćwiczyć ze mną:
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  href="https://www.facebook.com/maria.kordalewska"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profil Marii na Facebooku (otwiera się w nowej karcie)"
                  icon={<ExternalLink className="h-4 w-4" strokeWidth={1.5} />}
                >
                  Facebook — Maria Kordalewska
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  href="https://www.instagram.com/maria_ejk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profil Marii na Instagramie (otwiera się w nowej karcie)"
                  icon={<ExternalLink className="h-4 w-4" strokeWidth={1.5} />}
                >
                  Instagram — maria_ejk
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </Container>
      </SectionWrapper>

      {/* Enviar */}
      <SectionWrapper>
        <Container>
          <SectionHeading
            title="Enviar"
            subtitle="Firma z przesłaniem — Prezenty i eventy dla Twojego zespołu"
          />

          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row-reverse lg:gap-12">
          {/* Photo */}
          <ScrollAnimation variant="fadeRight" className="shrink-0">
            <div className="relative h-72 w-56 overflow-hidden rounded-none shadow-lg sm:h-80 sm:w-64 lg:h-96 lg:w-72">
              <Image
                src="/images/marysia.png"
                alt="Maria Kordalewska"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                className="object-cover"
              />
            </div>
          </ScrollAnimation>

          <div className="flex-1">
            <ScrollAnimation variant="fadeUp">
              <p className="mb-6 text-lg leading-relaxed text-graphite-light">
                Czy w świecie biznesu jest miejsce na autentyczne emocje,
                empatię i wdzięczność? Zdecydowanie tak. Enviar to agencja,
                którą stworzyłam, aby wspierać firmy w budowaniu silnych,
                międzyludzkich relacji.
              </p>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeUp" delay={0.1}>
              <p className="mb-8 text-base leading-relaxed text-graphite-light">
                W ramach Enviar łączymy wydarzenia z wyjątkowymi,
                personalizowanymi prezentami dostarczanymi prosto do rąk lub
                domów pracowników i kontrahentów. Naszą misją jest nie tylko
                przesyłanie pozytywnych emocji, ale również wspieranie kobiecych
                biznesów, promowanie polskich marek oraz dbanie o środowisko. To
                idealne rozwiązanie dla pracodawców, którzy chcą mądrze docenić
                swój zespół, podnieść motywację i zadbać o przyjazną atmosferę
                w miejscu pracy.
              </p>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeUp" delay={0.15}>
              <p className="mb-4 font-medium text-graphite">
                Zobacz, jak możemy wesprzeć Twoją firmę:
              </p>
              <Button
                variant="secondary"
                size="sm"
                href="https://www.facebook.com/enviar.firmazprzeslaniem/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar na Facebooku (otwiera się w nowej karcie)"
                icon={<ExternalLink className="h-4 w-4" strokeWidth={1.5} />}
              >
                Facebook — Enviar
              </Button>
            </ScrollAnimation>
          </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
