import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ROUTES } from "@/lib/constants";
import { getFeaturedTestimonials } from "@/data/testimonials";

export function OpinionsTeaser() {
  const featured = getFeaturedTestimonials(["ania", "katarzyna"]);

  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="Opinie"
          subtitle="Co m\u00F3wi\u0105 rodziny po naszych wyjazdach"
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
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
