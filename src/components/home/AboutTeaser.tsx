import { Users } from "lucide-react";
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
            title="O nas"
            subtitle="Poznaj ludzi, którzy tworzą wyjazdy z sercem"
          />
        </ScrollAnimation>

        <ScrollAnimation variant="fadeUp" delay={0.15}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
              <Users className="h-8 w-8 text-moss" strokeWidth={1.5} />
            </div>

            <p className="text-lg leading-relaxed text-graphite-light sm:text-xl">
              <strong className="text-graphite">Maria Kordalewska</strong> —
              wieloletnia organizatorka wyjazdów i eventów, pilotka wycieczek,
              specjalistka od komunikacji, wykładowca uniwersytecki i mama Laury.
              Kocha podróże, ale coraz częściej wraca do miejsc, gdzie czuje spokój.
            </p>

            <p className="mt-4 text-base text-graphite-light">
              Pośród ciszy, w &bdquo;bezinterneciu&rdquo; i w &bdquo;bezzasięgowie&rdquo;
              organizuje spotkania dla dorosłych i dzieci, które przybliżają ich
              do nich samych.
            </p>

            <div className="mt-8">
              <Button href={ROUTES.about} variant="secondary">
                Poznaj nas bliżej
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
