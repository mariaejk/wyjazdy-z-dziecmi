import { HeroSection } from "@/components/home/HeroSection";
import { TripCardsSection } from "@/components/home/TripCardsSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { OpinionsTeaser } from "@/components/home/OpinionsTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TripCardsSection />
      <AboutTeaser />
      <OpinionsTeaser />
    </>
  );
}
