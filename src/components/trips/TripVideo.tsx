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
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-graphite/5">
            <video
              controls
              playsInline
              preload="metadata"
              aria-label="Film promocyjny z warsztatów"
              className="aspect-video w-full bg-graphite object-cover"
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
