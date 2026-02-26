import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";

export function OpinionsTeaser() {
  return (
    <SectionWrapper>
      <Container>
        <ScrollAnimation variant="fadeUp">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
              <Quote className="h-8 w-8 text-moss" strokeWidth={1.5} />
            </div>

            <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
              Opinie
            </h2>

            <p className="mt-4 text-lg text-graphite-light sm:text-xl">
              Dołącz do rodzin, które już z nami podróżowały. Wkrótce
              pojawią się tutaj ich historie i wspomnienia z wyjazdów.
            </p>

            <div className="mt-8">
              <Button href={ROUTES.trips}>
                Weź udział w wyjeździe
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
