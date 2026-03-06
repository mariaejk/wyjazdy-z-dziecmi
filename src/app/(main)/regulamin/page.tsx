import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin serwisu Wyjazdy z Dziećmi.",
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
              Regulamin jest w przygotowaniu. Wkrótce zostanie opublikowany na tej stronie.
            </p>
            <div className="mt-8">
              <Button href={ROUTES.home} variant="secondary">
                Wróć na stronę główną
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
