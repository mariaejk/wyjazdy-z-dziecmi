import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripDescriptionProps = {
  shortDescription: string;
  longDescription: string;
};

export function TripDescription({
  shortDescription,
  longDescription,
}: TripDescriptionProps) {
  const paragraphs = longDescription.split("\n\n").filter(Boolean);

  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title="O wyjeździe" />
        <div className="mx-auto max-w-3xl">
          <ScrollAnimation>
            <p className="text-lg font-medium leading-relaxed text-graphite sm:text-xl">
              {shortDescription}
            </p>
          </ScrollAnimation>
          <div className="mt-8 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <p className="leading-relaxed text-graphite-light">
                  {paragraph}
                </p>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
