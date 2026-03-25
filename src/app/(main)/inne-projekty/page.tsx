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
  title: "Inne projekty",
  description:
    "Poznaj inne projekty Marii Kordalewskiej — Joga z Marią i Enviar, firma z przesłaniem. Wellbeing, joga i eventy firmowe.",
};

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Strona główna", url: ROUTES.home },
          { name: "Inne projekty", url: ROUTES.projects },
        ])}
      />

      {/* Intro */}
      <SectionWrapper className="py-10 sm:py-12">
        <Container>
          <SectionHeading
            as="h1"
            title="Przestrzeń dobrego życia"
            subtitle="Inne projekty"
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

      {/* Joga z Marią — image left, text right */}
      <SectionWrapper variant="alternate" className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* Video — left side */}
            <ScrollAnimation variant="fadeLeft" className="shrink-0">
              <div className="mx-auto max-w-lg overflow-hidden rounded-none shadow-xl ring-1 ring-graphite/5 sm:max-w-md lg:w-96">
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

            {/* Text — right side */}
            <ScrollAnimation variant="fadeRight" delay={0.15} className="flex-1">
              <h2 className="font-heading text-2xl font-light sm:text-3xl">
                <span className="text-moss">Joga z Marią</span>
              </h2>
              <p className="mt-1 text-base text-graphite-light">
                Twoja chwila oddechu
              </p>

              <p className="mt-4 text-base leading-relaxed text-graphite-light">
                Joga to dla mnie znacznie więcej niż tylko ruch ciała. To
                praktyka odpuszczania, łapania życiowego balansu i wyciszania
                przebodźcowanego umysłu, co w dzisiejszym szybkim świecie jest
                nam wszystkim niezwykle potrzebne.
              </p>

              <p className="mt-4 text-base leading-relaxed text-graphite-light">
                Prowadzę zajęcia, które pomagają zrzucić z barków codzienne
                napięcie i dają przestrzeń, by po prostu „być" tu
                i teraz. Niezależnie od tego, czy dopiero zaczynasz, czy
                praktykujesz od dawna, znajdziesz u mnie bezpieczną,
                nieoceniającą przystań.
              </p>

              <p className="mt-6 text-sm font-medium text-graphite">
                Dołącz do mojej społeczności i zacznij ćwiczyć ze mną:
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
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

      {/* Enviar — text left, image right (swapped) */}
      <SectionWrapper className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* Photo — left side */}
            <ScrollAnimation variant="fadeLeft" className="shrink-0">
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

            {/* Text — right side */}
            <ScrollAnimation variant="fadeRight" delay={0.15} className="flex-1">
              <h2 className="font-heading text-2xl font-light text-graphite sm:text-3xl">
                Enviar
              </h2>
              <p className="mt-1 text-base text-graphite-light">
                Firma z przesłaniem — Prezenty i eventy dla Twojego zespołu
              </p>

              <p className="mt-4 text-base leading-relaxed text-graphite-light">
                Czy w świecie biznesu jest miejsce na autentyczne emocje,
                empatię i wdzięczność? Zdecydowanie tak. Enviar to agencja,
                którą stworzyłam, aby wspierać firmy w budowaniu silnych,
                międzyludzkich relacji.
              </p>

              <p className="mt-4 text-base leading-relaxed text-graphite-light">
                W ramach Enviar łączymy wydarzenia z wyjątkowymi,
                personalizowanymi prezentami dostarczanymi prosto do rąk lub
                domów pracowników i kontrahentów. Naszą misją jest nie tylko
                przesyłanie pozytywnych emocji, ale również wspieranie kobiecych
                biznesów, promowanie polskich marek oraz dbanie o środowisko.
              </p>

              <p className="mt-6 text-sm font-medium text-graphite">
                Zobacz, jak możemy wesprzeć Twoją firmę:
              </p>
              <div className="mt-3">
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
              </div>
            </ScrollAnimation>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
