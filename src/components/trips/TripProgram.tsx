import { Clock } from "lucide-react";
import type { TripScheduleDay } from "@/types/trip";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripProgramProps = {
  schedule: TripScheduleDay[];
};

export function TripProgram({ schedule }: TripProgramProps) {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeading title="Program" />
        <div className="mx-auto max-w-3xl space-y-8">
          {schedule.map((day, dayIndex) => (
            <ScrollAnimation key={day.date} delay={dayIndex * 0.15}>
              <div className="rounded-none bg-white p-5 shadow-sm sm:p-6 lg:p-8">
                <h3 className="font-heading text-xl font-bold text-graphite sm:text-2xl">
                  {day.dayLabel}
                </h3>
                <div className="mt-4 space-y-3">
                  {day.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="flex items-start gap-3"
                    >
                      <Clock
                        className="mt-0.5 h-4 w-4 shrink-0 text-moss"
                        strokeWidth={1.5}
                      />
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                        <span className="whitespace-nowrap text-sm font-medium text-moss">
                          {activity.time}
                        </span>
                        <span className="text-graphite-light">
                          {activity.activity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
