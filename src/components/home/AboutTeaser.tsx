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
        <div className="mx-auto max-w-4xl text-center">
          {/* Large atmospheric photo — full width like TCW */}
          <ScrollAnimation variant="fadeUp">
            <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
              <Image
                src="/images/marysia.png"
                alt="Maria Kordalewska"
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </ScrollAnimation>

          {/* Text — centered editorial like TCW */}
          <ScrollAnimation variant="fadeUp" delay={0.15}>
            <h2 className="mt-10 font-heading text-2xl font-light italic text-graphite sm:text-3xl lg:text-4xl">
              Pomagam rodzinom odnaleźć wspólny rytm w otoczeniu natury.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-graphite-light">
              Witaj! Nazywam się Maria Kordalewska — jestem mamą Laury,
              nauczycielką jogi, pilotką wycieczek i wieloletnią organizatorką
              eventów z tytułem doktora.
            </p>

            <p className="mt-4 text-base leading-relaxed text-graphite-light">
              Projekt „Wyjazdowe warsztaty z Dziećmi" powstał z mojej osobistej
              potrzeby ucieczki od przebodźcowania. Moje autorskie wyjazdy to
              idealny balans — Ty się regenerujesz, a Twoje dziecko świetnie
              się bawi pod okiem naszych specjalistów.
            </p>

            <p className="mt-4 text-sm text-graphite-light/80">
              Tworzone z pasją. Oparte na doświadczeniu. Bez kompromisów.
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
