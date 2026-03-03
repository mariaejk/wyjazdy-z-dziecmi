import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Zdjęcia z naszych wyjazdów warsztatowych — warsztaty, natura, wspólny czas rodziców z dziećmi.",
};

const galleryImages = [
  { src: "/images/kazce-bagno-1.jpg", alt: "Kacze Bagno — przestrzeń warsztatowa" },
  { src: "/images/kazce-bagno-2.jpg", alt: "Kacze Bagno — eko-domki" },
  { src: "/images/kazce-bagno-3.jpg", alt: "Kacze Bagno — otoczenie natury" },
  { src: "/images/kazce-bagno-4.jpg", alt: "Kacze Bagno — wspólne chwile" },
  { src: "/images/matki-corki-1.jpg", alt: "Warsztaty matka i córka" },
  { src: "/images/matki-corki-2.jpg", alt: "Wspólne warsztaty dla mam i córek" },
  { src: "/images/matki-corki-3.jpg", alt: "Taniec i ruch — matki i córki" },
  { src: "/images/matki-corki-4.jpg", alt: "Kreatywne warsztaty" },
  { src: "/images/matki-corki-5.jpg", alt: "Czas wspólny na łonie natury" },
  { src: "/images/matki-corki-6.jpg", alt: "Warsztaty w kręgu kobiet" },
  { src: "/images/matki-corki-7.jpg", alt: "Integracja i zabawa" },
  { src: "/images/matki-corki-8.jpg", alt: "Warsztaty artystyczne" },
  { src: "/images/przeszly-1.jpg", alt: "Poprzedni wyjazd — wspólne chwile" },
  { src: "/images/przeszly-2.jpg", alt: "Poprzedni wyjazd — warsztaty" },
  { src: "/images/przeszly-3.jpg", alt: "Poprzedni wyjazd — natura" },
  { src: "/images/przeszly-4.jpg", alt: "Poprzedni wyjazd — aktywności" },
  { src: "/images/przeszly-5.jpg", alt: "Poprzedni wyjazd — rodziny" },
];

export default function GalleryPage() {
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
                <div className="mb-4 break-inside-avoid overflow-hidden rounded-2xl">
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
