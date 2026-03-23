import type { Metadata } from "next";
import { Heart, Sparkles, Music, Users, Sun, Flower2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { TripCard } from "@/components/home/TripCard";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Matka z córką",
  description:
    "Warsztaty wyjazdowe dla mam i córek — taniec, joga, uważność i kobieca moc. Także dla babć, cioć i koleżanek z córką.",
};

const benefits = [
  {
    icon: Heart,
    title: "Pogłębienie więzi",
    description:
      "Wspólne warsztaty, ruch i rozmowy budują głębszą relację między mamą a córką — poza codziennymi obowiązkami.",
  },
  {
    icon: Music,
    title: "Taniec i ruch",
    description:
      "Intuicyjny taniec, choreoterapia i joga — ciało jako droga do siebie i do siebie nawzajem.",
  },
  {
    icon: Sparkles,
    title: "Kobieca moc",
    description:
      "Córki doświadczają mocy kobiecych spotkań od najmłodszych lat. Krąg kobiet, który wspiera i inspiruje.",
  },
  {
    icon: Users,
    title: "Czas oddzielny i wspólny",
    description:
      "Czas dla mam na regenerację i refleksję, a córki budują własne relacje w bezpiecznej grupie rówieśniczek.",
  },
  {
    icon: Sun,
    title: "Rytuały na co dzień",
    description:
      "Proste praktyki ruchu, oddechu i obecności, które zabierzecie do codzienności jako Wasz wspólny język.",
  },
  {
    icon: Flower2,
    title: "Bezpieczna przestrzeń",
    description:
      "Nie trzeba nic udowadniać, przyspieszać ani dopasowywać się. Wystarczy być. Zapraszamy mamy, babcie, ciocie i koleżanki.",
  },
];

export default async function MotherDaughterPage() {
  const trips = await getUpcomingTripsByCategory("matka-corka");

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Matka z córką", url: `${SITE_CONFIG.url}/matka-z-corka` },
      ])} />

      {/* Hero */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl lg:text-6xl">
                Matka z córką
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Zapraszamy Cię w podróż poza codzienny pośpiech, hałas i role,
                w które tak łatwo wpadamy. To wyjazdowe warsztaty stworzone
                z myślą o kobietach — tych dużych i tych małych —
                które pragną spotkać się naprawdę: w ruchu, w uważności
                i w sercu.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Dlaczego warto?"
              subtitle="Wspólny czas, który zmienia relację"
            />
          </ScrollAnimation>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <ScrollAnimation
                  key={benefit.title}
                  variant="fadeUp"
                  delay={index * 0.1}
                >
                  <div className="rounded-none border border-graphite/10 bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-moss/10">
                      <benefit.icon
                        className="h-6 w-6 text-moss"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-graphite">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite-light">
                      {benefit.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Experience Description */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Jak wygląda wyjazd?
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-graphite-light">
                <p>
                  Podczas wyjazdu spotykamy się w ruchu i obecności —
                  poprzez jogę, taniec intuicyjny, medytacje, sztukę, muzykę
                  i głos. Tworzymy przestrzeń, w której córki poczują się częścią
                  kręgu kobiet — widziane, ważne i zaproszone do bycia sobą.
                </p>
                <p>
                  Jednocześnie dbamy o równowagę. Będzie czas wspólny, pogłębiający
                  relację matki i córki, ale także czas oddzielny — moment
                  tylko dla mam, na regenerację, refleksję i bycie w kobiecym kręgu.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Trips */}
      {trips.length > 0 && (
        <SectionWrapper variant="alternate">
          <Container>
            <SectionHeading
              title="Nadchodzące warsztaty"
              subtitle="Wybierz termin i dołącz do nas"
            />
            <div className="mx-auto max-w-2xl">
              <div className="grid gap-6">
                {trips.map((trip, index) => (
                  <ScrollAnimation key={trip.slug} delay={index * 0.15} className="h-full">
                    <TripCard trip={trip} />
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Dołącz do nas
              </h2>
              <p className="mt-4 text-lg text-graphite-light">
                Jeśli czujesz, że chcesz zatrzymać się, odetchnąć i spotkać
                swoją córkę w nowy sposób — ten wyjazd jest dla Was.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href={ROUTES.trips}>
                  Zobacz wszystkie warsztaty
                </Button>
                <Button href={ROUTES.contact} variant="secondary">
                  Napisz do nas
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
    </>
  );
}
