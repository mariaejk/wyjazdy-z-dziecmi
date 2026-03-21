import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripVideoProps = {
  videoUrl: string;
};

export function TripVideo({ videoUrl }: TripVideoProps) {
  return (
    <SectionWrapper className="py-8 sm:py-12">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <div className="mx-auto max-w-lg overflow-hidden rounded-2xl shadow-xl ring-1 ring-graphite/5 sm:max-w-xl">
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
      </Container>
    </SectionWrapper>
  );
}
