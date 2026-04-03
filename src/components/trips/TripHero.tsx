import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

type TripHeroProps = {
  title: string;
  subtitle: string;
  date: string;
  dateEnd: string;
  location: string;
  image: string;
  imagePosition?: "center" | "top" | "bottom";
  isPast: boolean;
  spotsLeft?: number;
};

const POSITION_CLASS = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export function TripHero({
  title,
  subtitle,
  date,
  dateEnd,
  location,
  image,
  imagePosition = "center",
  isPast,
  spotsLeft,
}: TripHeroProps) {
  const isSoldOut = spotsLeft === 0;
  return (
    <section id="hero" className="relative flex min-h-[60svh] items-end overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className={cn("object-cover", POSITION_CLASS[imagePosition])}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <Container className="relative z-10 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white/20 text-white backdrop-blur-sm">
              <Calendar className="mr-1 h-3 w-3" strokeWidth={1.5} />
              {formatDate(date)} – {formatDate(dateEnd)}
            </Badge>
            <Badge className="bg-white/20 text-white backdrop-blur-sm">
              <MapPin className="mr-1 h-3 w-3" strokeWidth={1.5} />
              {location}
            </Badge>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-light text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-lg text-white/90 sm:text-xl">
            {subtitle}
          </p>

          {!isPast && (
            <div className="mt-6">
              <Button
                href={isSoldOut ? "#lista-oczekujacych" : "#formularz"}
                className="bg-white text-moss hover:bg-white/90 focus-visible:ring-white"
              >
                {isSoldOut ? "Zapisz się na listę oczekujących" : "Zapisz się"}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
