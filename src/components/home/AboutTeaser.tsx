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
            title="Poznaj twórczynię warsztatów"
            subtitle="Poznaj twórczynię wyjazdów — Marię Kordalewską"
          />
        </ScrollAnimation>

        <ScrollAnimation variant="fadeUp" delay={0.15}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full shadow-md sm:h-40 sm:w-40">
              <Image
                src="/images/maria.jpg"
                alt="Maria Kordalewska"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="text-lg leading-relaxed text-graphite-light sm:text-xl">
              <strong className="text-graphite">Maria Kordalewska</strong> —
              jestem mamą Laury, nauczycielką jogi i wieloletnią organizatorką eventów.
              Od ponad dekady łączę świat profesjonalnej komunikacji z miłością do podróży.
            </p>

            <p className="mt-4 text-base text-graphite-light">
              Projekt &bdquo;Wyjazdy z Dziećmi&rdquo; powstał z mojej osobistej potrzeby
              spędzania z córką czasu, który jest naprawdę wartościowy.
            </p>

            <div className="mt-8">
              <Button href={ROUTES.about} variant="secondary">
                Poznaj mnie bliżej
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
