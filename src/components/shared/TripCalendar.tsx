"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

type CalendarTrip = {
  slug: string;
  title: string;
  date: string;
  dateEnd: string;
  category: "rodzinny" | "matka-corka";
  isPast: boolean;
};

type TripCalendarProps = {
  trips: CalendarTrip[];
};

const MONTH_NAMES = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

const DAY_NAMES = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

const CATEGORY_COLORS: Record<string, string> = {
  rodzinny: "bg-moss text-white",
  "matka-corka": "bg-amber-500 text-white",
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return d >= s && d <= e;
}

export function TripCalendar({ trips }: TripCalendarProps) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function goToPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function getTripForDay(day: number): CalendarTrip | undefined {
    const date = new Date(currentYear, currentMonth, day);
    return trips.find((trip) => {
      const start = new Date(trip.date);
      const end = new Date(trip.dateEnd);
      return isDateInRange(date, start, end);
    });
  }

  function isStartDay(day: number, trip: CalendarTrip): boolean {
    const date = new Date(currentYear, currentMonth, day);
    return isSameDay(date, new Date(trip.date));
  }

  function isEndDay(day: number, trip: CalendarTrip): boolean {
    const date = new Date(currentYear, currentMonth, day);
    return isSameDay(date, new Date(trip.dateEnd));
  }

  const isToday = (day: number) => {
    return currentYear === now.getFullYear() && currentMonth === now.getMonth() && day === now.getDate();
  };

  // Build grid: empty cells for first day offset + day cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="overflow-hidden rounded-2xl border border-graphite/10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-graphite/10 px-4 py-3">
        <button
          onClick={goToPrevMonth}
          className="rounded-md p-1.5 text-graphite-light transition-colors hover:bg-parchment-dark hover:text-graphite"
          aria-label="Poprzedni miesiąc"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <span className="font-heading text-base font-bold text-graphite sm:text-lg">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <button
          onClick={goToNextMonth}
          className="rounded-md p-1.5 text-graphite-light transition-colors hover:bg-parchment-dark hover:text-graphite"
          aria-label="Następny miesiąc"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 border-b border-graphite/10">
        {DAY_NAMES.map((name) => (
          <div key={name} className="py-2 text-center text-xs font-medium text-graphite-light">
            {name}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="aspect-square border-b border-r border-graphite/5" />;
          }

          const trip = getTripForDay(day);
          const isStart = trip ? isStartDay(day, trip) : false;
          const isEnd = trip ? isEndDay(day, trip) : false;

          return (
            <div
              key={day}
              className={cn(
                "relative flex aspect-square items-center justify-center border-b border-r border-graphite/5 text-sm",
                isToday(day) && "font-bold",
                trip && !trip.isPast && CATEGORY_COLORS[trip.category],
                trip && trip.isPast && "bg-graphite/10 text-graphite-light",
                isStart && "rounded-l-lg",
                isEnd && "rounded-r-lg",
              )}
            >
              {trip && !trip.isPast ? (
                <Link
                  href={`${ROUTES.trips}/${trip.slug}`}
                  className="flex h-full w-full items-center justify-center hover:opacity-80"
                  title={trip.title}
                >
                  {day}
                </Link>
              ) : (
                <span className={!trip ? "text-graphite" : ""}>{day}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 border-t border-graphite/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-graphite-light">
          <span className="inline-block h-3 w-3 rounded bg-moss" />
          Rodzinne
        </div>
        <div className="flex items-center gap-2 text-xs text-graphite-light">
          <span className="inline-block h-3 w-3 rounded bg-amber-500" />
          Matka z córką
        </div>
        <div className="flex items-center gap-2 text-xs text-graphite-light">
          <span className="inline-block h-3 w-3 rounded bg-graphite/20" />
          Zakończone
        </div>
      </div>
    </div>
  );
}
