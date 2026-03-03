import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import type { Place } from "@/types/place";

type PlaceCardProps = {
  place: Place;
  index?: number;
};

export function PlaceCard({ place, index = 0 }: PlaceCardProps) {
  const paragraphs = place.description.split("\n\n");

  return (
    <ScrollAnimation variant="fadeUp" delay={index * 0.15}>
      <div className="rounded-2xl border border-graphite/10 bg-white p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss/10">
            <MapPin className="h-5 w-5 text-moss" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-graphite sm:text-2xl">
              {place.name}
            </h3>
            {place.url && (
              <a
                href={place.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-moss hover:text-moss-light"
                aria-label={`${place.name} na Facebooku (otwiera się w nowej karcie)`}
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Facebook</span>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-graphite-light"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {place.images && place.images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {place.images.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${place.name} — zdjęcie ${i + 1}`}
                  width={300}
                  height={200}
                  sizes="(max-width: 640px) calc(50vw - 2rem), 150px"
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {place.features && place.features.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {place.features.map((feature) => (
              <Badge key={feature}>{feature}</Badge>
            ))}
          </div>
        )}
      </div>
    </ScrollAnimation>
  );
}
