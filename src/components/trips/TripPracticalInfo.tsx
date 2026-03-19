import { Home, UtensilsCrossed, Car, Baby } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type PracticalInfo = {
  accommodation: string;
  food: string;
  transport?: string;
  childCare?: string;
};

type TripPracticalInfoProps = {
  info: PracticalInfo;
};

const infoItems = [
  { key: "accommodation" as const, icon: Home, label: "Zakwaterowanie" },
  { key: "food" as const, icon: UtensilsCrossed, label: "Wyżywienie" },
  { key: "transport" as const, icon: Car, label: "Dojazd" },
  { key: "childCare" as const, icon: Baby, label: "Opieka nad dziećmi" },
];

export function TripPracticalInfo({ info }: TripPracticalInfoProps) {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title="Informacje praktyczne" />
        <div className="mx-auto max-w-2xl space-y-4">
          {infoItems.map((item, index) => {
            const value = info[item.key];
            if (!value) return null;

            return (
              <ScrollAnimation key={item.key} delay={index * 0.15}>
                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm sm:p-5">
                  <item.icon
                    className="mt-0.5 h-6 w-6 shrink-0 text-moss"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-medium text-graphite">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-graphite-light">{value}</p>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
