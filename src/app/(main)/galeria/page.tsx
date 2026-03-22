import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { getAllGalleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Zdjęcia z naszych wyjazdów warsztatowych — warsztaty, natura, wspólny czas rodziców z dziećmi.",
};

export default async function GalleryPage() {
  const galleryImages = await getAllGalleryImages();

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Galeria", url: `${SITE_CONFIG.url}/galeria` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              as="h1"
              title="Galeria"
              subtitle="Zobacz jak wyglądają nasze wyjazdy"
            />
          </ScrollAnimation>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((image, index) => (
              <ScrollAnimation key={image.src} variant="fadeUp" delay={(index % 6) * 0.05}>
                <div className="mb-4 break-inside-avoid overflow-hidden rounded-none">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
