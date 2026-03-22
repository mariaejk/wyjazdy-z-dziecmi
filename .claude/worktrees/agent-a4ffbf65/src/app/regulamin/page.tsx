import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin serwisu Wyjazdy z Dzie\u0107mi.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <SectionWrapper>
      <Container>
        <ScrollAnimation variant="fadeUp">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl">
              Regulamin
            </h1>
            <p className="mt-6 text-lg text-graphite-light">
              Regulamin jest w przygotowaniu. Wkr\u00F3tce zostanie opublikowany na tej stronie.
            </p>
            <div className="mt-8">
              <Button href={ROUTES.home} variant="secondary">
                Wr\u00F3\u0107 na stron\u0119 g\u0142\u00F3wn\u0105
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
