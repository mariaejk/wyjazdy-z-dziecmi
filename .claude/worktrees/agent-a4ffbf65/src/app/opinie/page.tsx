import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Opinie",
  description:
    "Opinie rodzin, kt\u00F3re uczestniczy\u0142y w naszych wyjazdach warsztatowych w naturze.",
};

export default function OpinionsPage() {
  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Opinie", url: `${SITE_CONFIG.url}/opinie` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
                <Quote className="h-8 w-8 text-moss" strokeWidth={1.5} />
              </div>

              <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl">
                Opinie
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Do\u0142\u0105cz do rodzin, kt\u00F3re ju\u017C z nami podr\u00F3\u017Cowa\u0142y. Wkr\u00F3tce pojawi\u0105
                si\u0119 tutaj ich historie i wspomnienia z wyjazd\u00F3w.
              </p>

              <div className="mt-8">
                <Button href={ROUTES.trips}>
                  We\u017A udzia\u0142 w wyje\u017Adzie
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
    </>
  );
}
