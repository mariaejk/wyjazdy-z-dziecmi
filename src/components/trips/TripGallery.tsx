import Image from "next/image";
import type { TripGalleryImage } from "@/types/trip";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripGalleryProps = {
  images: TripGalleryImage[];
};

export function TripGallery({ images }: TripGalleryProps) {
  if (images.length <= 1) return null;

  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title="Galeria" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <ScrollAnimation key={image.src} delay={index * 0.1}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-none",
                  image.isMain && "sm:col-span-2 sm:row-span-2",
                )}
              >
                <div className={cn("relative", image.isMain ? "aspect-[4/3]" : "aspect-square")}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      image.isMain
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
