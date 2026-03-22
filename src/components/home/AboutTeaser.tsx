import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Poznajmy się!"
            subtitle="Nazywam się Maria Kordalewska"
          />
        </ScrollAnimation>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Large photo */}
          <ScrollAnimation variant="fadeLeft" className="shrink-0">
            <div className="relative h-72 w-56 overflow-hidden rounded-3xl shadow-lg sm:h-80 sm:w-64 lg:h-96 lg:w-72">
              <Image
                src="/images/marysia.png"
                alt="Maria Kordalewska"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                className="object-cover"
              />
            </div>
          </ScrollAnimation>

          {/* Text */}
          <ScrollAnimation variant="fadeRight" delay={0.15} className="flex-1">
            <p className="text-lg leading-relaxed text-graphite-light sm:text-xl">
              Jestem mamą Laury, nauczycielką jogi, pilotką wycieczek
              i wieloletnią organizatorką eventów z tytułem doktora. Od lat
              łączę świat profesjonalnej komunikacji z miłością do natury.
            </p>

            <p className="mt-4 text-base leading-relaxed text-graphite-light">
              Projekt &bdquo;Wyjazdowe warsztaty z Dziećmi&rdquo; powstał
              z mojej osobistej potrzeby ucieczki od przebodźcowania. Moje
              autorskie wyjazdy to idealny balans: z jednej strony tworzymy
              przestrzeń na beztroską bliskość i budowanie wspólnych wspomnień
              z dzieckiem, a z drugiej — dajemy Ci święte prawo do odpoczynku.
              Kiedy Twoje dziecko świetnie się bawi na mądrych warsztatach pod
              okiem naszych specjalistów, Ty w końcu masz czas tylko dla siebie.
              Na ciepłą kawę w ciszy, spacer, albo po prostu nicnierobienie —
              bez cienia poczucia winy.
            </p>

            <div className="mt-8">
              <Button href={ROUTES.about} variant="secondary">
                Poznaj mnie bliżej
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
