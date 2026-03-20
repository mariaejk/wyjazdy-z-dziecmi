import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { getTestimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Opinie",
  description:
    "Opinie rodzin, które uczestniczyły w naszych wyjazdach warsztatowych w naturze.",
};

export default async function OpinionsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Opinie", url: `${SITE_CONFIG.url}/opinie` },
      ])} />

      <SectionWrapper>
        <Container>
          <SectionHeading
            as="h1"
            title="Opinie"
            subtitle="Co mówią uczestnicy naszych warsztatów"
          />

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href={ROUTES.trips}>
              Weź udział w warsztatach
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
