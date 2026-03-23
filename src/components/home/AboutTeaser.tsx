import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:gap-20 lg:gap-24">
          {/* Portrait photo — 3:4 aspect */}
          <ScrollAnimation variant="fadeLeft" className="w-full shrink-0 md:w-5/12">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none">
              <Image
                src="/images/marysia.png"
                alt="Maria Kordalewska"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </ScrollAnimation>

          {/* Text */}
          <ScrollAnimation variant="fadeRight" delay={0.15} className="flex-1">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-graphite-light">
              Poznajmy się
            </p>
            <h2 className="font-heading text-3xl font-light text-graphite sm:text-4xl md:text-5xl">
              Nazywam się{" "}
              <em className="italic text-graphite-light">Maria</em>
            </h2>

            <p className="mt-6 text-[15px] font-light leading-[1.8] text-graphite-light">
              Jestem mamą Laury, nauczycielką jogi, pilotką wycieczek
              i wieloletnią organizatorką eventów z tytułem doktora. Od lat
              łączę świat profesjonalnej komunikacji z miłością do natury.
            </p>

            <p className="mt-4 text-[15px] font-light leading-[1.8] text-graphite-light">
              Projekt &bdquo;Wyjazdowe warsztaty z Dziećmi&rdquo; powstał
              z mojej osobistej potrzeby ucieczki od przebodźcowania. Moje
              autorskie wyjazdy to idealny balans: z jednej strony tworzymy
              przestrzeń na beztroską bliskość i budowanie wspólnych wspomnień
              z dzieckiem, a z drugiej — dajemy Ci święte prawo do odpoczynku.
            </p>

            <div className="mt-10">
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
