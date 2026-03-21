import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripVideoProps = {
  videoUrl: string;
  shortDescription?: string;
  longDescription?: string;
};

export function TripVideo({
  videoUrl,
  shortDescription,
  longDescription,
}: TripVideoProps) {
  const hasDescription = shortDescription || longDescription;

  return (
    <SectionWrapper className="py-8 sm:py-12">
      <Container>
        {hasDescription && (
          <SectionHeading title="O wyjeździe" />
        )}
        <div
          className={
            hasDescription
              ? "mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:gap-12"
              : "mx-auto max-w-lg sm:max-w-xl"
          }
        >
          {/* Video */}
          <ScrollAnimation variant="fadeUp" className={hasDescription ? "w-full lg:w-2/5 lg:shrink-0" : ""}>
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-graphite/5">
              <video
                controls
                playsInline
                preload="metadata"
                aria-label="Film promocyjny z warsztatów"
                className="w-full bg-graphite"
              >
                <source src={videoUrl} type="video/mp4" />
                Twoja przeglądarka nie obsługuje odtwarzacza wideo.
              </video>
            </div>
          </ScrollAnimation>

          {/* Description alongside video */}
          {hasDescription && (
            <ScrollAnimation variant="fadeUp" delay={0.15} className="w-full lg:w-3/5">
              {shortDescription && (
                <p className="text-lg font-medium leading-relaxed text-graphite sm:text-xl">
                  {shortDescription}
                </p>
              )}
              {longDescription && (
                <div className="mt-4 space-y-4">
                  {longDescription
                    .split("\n\n")
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index} className="leading-relaxed text-graphite-light">
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
            </ScrollAnimation>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}
