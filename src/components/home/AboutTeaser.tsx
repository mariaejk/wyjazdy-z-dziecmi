import { User } from "lucide-react";
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
            title="O mnie"
            subtitle="Poznaj twórczynię wyjazdów — Marię Kordalewską"
          />
        </ScrollAnimation>

        <ScrollAnimation variant="fadeUp" delay={0.15}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
              <User className="h-8 w-8 text-moss" strokeWidth={1.5} />
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
