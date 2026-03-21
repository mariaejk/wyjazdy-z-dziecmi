import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ROUTES } from "@/lib/constants";
import { getFeaturedTestimonials } from "@/data/testimonials";
import { getFeaturedTestimonialIds } from "@/data/homepage";

export async function OpinionsTeaser() {
  const ids = await getFeaturedTestimonialIds();
  const featured = await getFeaturedTestimonials(ids);

  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="Opinie uczestników"
        />
        <ScrollAnimation variant="fadeUp">
          <div className="mb-8 flex items-center justify-center gap-1.5 text-sm text-graphite-light" aria-label="5 z 5 gwiazdek">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-mustard text-mustard"
                strokeWidth={1}
              />
            ))}
            <span className="ml-1">Polecane przez rodziców</span>
          </div>
        </ScrollAnimation>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href={ROUTES.opinions} variant="secondary">
            Zobacz wszystkie opinie
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
