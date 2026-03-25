import type { Metadata } from "next";
import { Heart, Shield, Users, TreePine, Smile, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { TripCardHorizontal } from "@/components/home/TripCardHorizontal";
import { JoinUsNewsletter } from "@/components/shared/JoinUsNewsletter";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Warsztaty z dziećmi",
  description:
    "Warsztaty rodzinne z dziećmi. Odpoczynek, wsparcie i czas pełen bliskości w otoczeniu natury — dla mam, babć, cioć i koleżanek.",
};

const benefits = [
  {
    icon: Heart,
    title: "Czas tylko dla Was",
    description:
      "Warsztaty zaprojektowane tak, abyś mógł/mogła cieszyć się czasem z dzieckiem bez pośpiechu i codziennych obowiązków.",
  },
  {
    icon: Shield,
    title: "Bezpieczna przestrzeń",
    description:
      "Kameralna grupa, w której każdy jest mile widziany. Bez oceniania, z pełnym szacunkiem dla Twojej historii.",
  },
  {
    icon: Users,
    title: "Społeczność",
    description:
      "Możliwość poznania innych rodziców, babć, cioć i opiekunów. Wspólne doświadczenia budują trwałe relacje.",
  },
  {
    icon: TreePine,
    title: "Natura leczy",
    description:
      "Las, jezioro, cisza — przyroda daje siłę i spokój, których tak bardzo potrzebujesz.",
  },
  {
    icon: Smile,
    title: "Zabawa i rozwój",
    description:
      "Warsztaty kreatywne, ruch i zabawy na świeżym powietrzu — dzieci poznają nowych przyjaciół.",
  },
  {
    icon: Sparkles,
    title: "Chwila dla Ciebie",
    description:
      "W programie znajdziesz czas na jogę, relaks i oddech — bo Ty też zasługujesz na regenerację.",
  },
];

export default async function FamilyTripsPage() {
  const trips = await getUpcomingTripsByCategory("rodzinny");

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Warsztaty z dziećmi", url: `${SITE_CONFIG.url}/warsztaty-z-dziecmi` },
      ])} />

      {/* Hero — reduced spacing */}
      <SectionWrapper className="py-4 sm:py-6">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-light text-graphite sm:text-5xl lg:text-6xl">
                <span className="relative inline-block">Warsztaty z dziećmi<svg className="mx-auto mt-1 h-[6px] w-[90%]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5" stroke="currentColor" className="text-graphite-light/40" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Nie musisz być samodzielnym rodzicem, żeby potrzebować chwili
                wytchnienia. Nasze warsztaty to bezpieczna przestrzeń dla każdego,
                kto chce spędzić wyjątkowy czas z dzieckiem — mamy, babcie,
                ciocie, koleżanki. Odpoczywaj, oddychaj i po prostu bądź.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits — reduced spacing */}
      <SectionWrapper variant="alternate" className="py-6 sm:py-8">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Dlaczego"
              italicText="warto?"
              underline
              subtitle="Warsztaty dopasowane do potrzeb rodziców i opiekunów"
            />
          </ScrollAnimation>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <ScrollAnimation
                  key={benefit.title}
                  variant="fadeUp"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <div className="flex h-full flex-col rounded-none border border-graphite/10 bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-moss/10">
                      <benefit.icon
                        className="h-6 w-6 text-moss"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-graphite">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite-light">
                      {benefit.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Experience Description — reduced spacing */}
      <SectionWrapper className="py-6 sm:py-8">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-light text-graphite sm:text-4xl">
                Jak wygląda{" "}
                <span className="relative inline-block"><em className="italic text-graphite-light">warsztat?</em><svg className="mx-auto mt-0.5 h-[5px] w-[90%]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5" stroke="currentColor" className="text-graphite-light/40" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-graphite-light">
                <p>
                  Każdy dzień zaczyna się spokojnie — od porannej jogi lub
                  spaceru w ciszy. Potem warsztaty: kreatywne zajęcia dla dzieci
                  i dorosłych, wspólne gotowanie, zabawy na świeżym powietrzu.
                </p>
                <p>
                  Wieczorem ognisko, rozmowy i cisza. Bez pośpiechu, bez planu
                  dnia włożonego w ramki. Każdy może uczestniczyć w swoim tempie.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Trips or Join Us */}
      {trips.length > 0 ? (
        <SectionWrapper variant="alternate" className="py-6 sm:py-8">
          <Container>
            <SectionHeading
              title="Nadchodzące"
              italicText="warsztaty"
              underline
              subtitle="Wybierz termin i dołącz do nas"
            />
            <div className="mx-auto max-w-4xl space-y-6">
              {trips.map((trip, index) => (
                <ScrollAnimation key={trip.slug} delay={index * 0.12}>
                  <TripCardHorizontal trip={trip} />
                </ScrollAnimation>
              ))}
            </div>
            <div className="mt-10 text-center">
              <ScrollAnimation variant="fadeUp" delay={0.3}>
                <Button href={ROUTES.trips} variant="secondary">
                  Zobacz wszystkie warsztaty
                </Button>
              </ScrollAnimation>
            </div>
          </Container>
        </SectionWrapper>
      ) : (
        <JoinUsNewsletter />
      )}
    </>
  );
}
