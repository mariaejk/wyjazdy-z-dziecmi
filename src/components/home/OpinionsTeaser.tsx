import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StarRating } from "@/components/shared/StarRating";
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
          title="Co mówią"
          italicText="uczestnicy"
          underline
        />
        <ScrollAnimation variant="fadeUp">
          <div className="mb-8">
            <StarRating />
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
