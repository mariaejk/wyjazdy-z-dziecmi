"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, parseLocalDate } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { CATEGORY_CONFIG, PAST_CATEGORY } from "@/lib/category-config";
import type { CategoryKey } from "@/lib/category-config";
import type { CalendarTrip } from "@/data/trips";

type TripCalendarProps = {
  trips: CalendarTrip[];
};

const MONTH_NAMES = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

const DAY_NAMES = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

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

function getNextMonth(year: number, month: number): { year: number; month: number } {
  return month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };
}

function getPrevMonth(year: number, month: number): { year: number; month: number } {
  return month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
}

function MonthGrid({
  year,
  month,
  trips,
  activeFilter,
  now,
  onPrev,
  onNext,
}: {
  year: number;
  month: number;
  trips: CalendarTrip[];
  activeFilter: CategoryKey | null;
  now: Date;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Returns first matching trip for a given day.
  // Assumption: trips don't overlap on the same dates in the current data model.
  function getTripForDay(day: number): CalendarTrip | undefined {
    const date = new Date(year, month, day);
    return trips.find((trip) => {
      const start = parseLocalDate(trip.date);
      const end = parseLocalDate(trip.dateEnd);
      return isDateInRange(date, start, end);
    });
  }

  function isStartDay(day: number, trip: CalendarTrip): boolean {
    return isSameDay(new Date(year, month, day), parseLocalDate(trip.date));
  }

  function isEndDay(day: number, trip: CalendarTrip): boolean {
    return isSameDay(new Date(year, month, day), parseLocalDate(trip.dateEnd));
  }

  function isToday(day: number): boolean {
    return year === now.getFullYear() && month === now.getMonth() && day === now.getDate();
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between pb-2">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="rounded-none p-1 text-graphite-light transition-colors hover:bg-parchment-dark hover:text-graphite"
            aria-label="Poprzedni miesiąc"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
          </button>
        ) : (
          <div className="w-6 sm:w-7" />
        )}
        <span className="font-heading text-sm font-bold text-graphite sm:text-base">
          {MONTH_NAMES[month]} {year}
        </span>
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="rounded-none p-1 text-graphite-light transition-colors hover:bg-parchment-dark hover:text-graphite"
            aria-label="Następny miesiąc"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
          </button>
        ) : (
          <div className="w-6 sm:w-7" />
        )}
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7">
        {DAY_NAMES.map((name) => (
          <div key={name} className="py-1.5 text-center text-xs font-medium text-graphite-light">
            {name}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${month}-${i}`} className="aspect-square" />;
          }

          const trip = getTripForDay(day);
          const isStart = trip ? isStartDay(day, trip) : false;
          const isEnd = trip ? isEndDay(day, trip) : false;
          const isFiltered = activeFilter && trip && trip.category !== activeFilter;

          return (
            <div
              key={day}
              className={cn(
                "relative flex aspect-square items-center justify-center text-xs sm:text-sm",
                isToday(day) && "font-bold",
                trip && !trip.isPast && !isFiltered && CATEGORY_CONFIG[trip.category].calendarBg,
                trip && !trip.isPast && isFiltered && "bg-graphite/5 text-graphite-light",
                trip && trip.isPast && cn(PAST_CATEGORY.calendarBg, "cursor-default"),
                isStart && "rounded-l-md",
                isEnd && "rounded-r-md",
              )}
            >
              {trip && !trip.isPast && !isFiltered ? (
                <Link
                  href={`${ROUTES.trips}/${trip.slug}`}
                  className="flex h-full w-full items-center justify-center hover:opacity-80"
                  aria-label={`${trip.title} — dzień ${day}`}
                >
                  {day}
                </Link>
              ) : (
                <span className={cn(!trip && "text-graphite", isFiltered && "text-graphite-light/50")}>{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TripCalendar({ trips }: TripCalendarProps) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [activeFilter, setActiveFilter] = useState<CategoryKey | null>(null);

  const next = getNextMonth(currentYear, currentMonth);

  function goToPrevMonth() {
    const prev = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(prev.year);
    setCurrentMonth(prev.month);
  }

  function goToNextMonth() {
    const n = getNextMonth(currentYear, currentMonth);
    setCurrentYear(n.year);
    setCurrentMonth(n.month);
  }

  function toggleFilter(category: CategoryKey) {
    const newFilter = activeFilter === category ? null : category;
    setActiveFilter(newFilter);

    // Auto-navigate to the month of the first upcoming trip in this category
    if (newFilter) {
      const firstTrip = trips.find(
        (t) => t.category === newFilter && !t.isPast
      );
      if (firstTrip) {
        const tripDate = parseLocalDate(firstTrip.date);
        setCurrentYear(tripDate.getFullYear());
        setCurrentMonth(tripDate.getMonth());
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-none border border-graphite/10 bg-white" aria-label="Kalendarz warsztatów" role="region">
      {/* Two-month grid */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6" aria-live="polite">
        <MonthGrid
          year={currentYear}
          month={currentMonth}
          trips={trips}
          activeFilter={activeFilter}
          now={now}
          onPrev={goToPrevMonth}
        />
        <MonthGrid
          year={next.year}
          month={next.month}
          trips={trips}
          activeFilter={activeFilter}
          now={now}
          onNext={goToNextMonth}
        />
      </div>

      {/* Legend — interactive filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-graphite/10 px-4 py-3 sm:gap-4">
        {(Object.entries(CATEGORY_CONFIG) as [CategoryKey, typeof CATEGORY_CONFIG[CategoryKey]][]).map(([key, config]) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={cn(
              "flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
              activeFilter === key
                ? cn(config.badgeBg, config.badgeText, "ring-1 ring-current")
                : activeFilter === null
                  ? "text-graphite-light hover:text-graphite"
                  : "text-graphite-light/50 hover:text-graphite-light",
            )}
            aria-pressed={activeFilter === key}
            aria-label={`Filtruj: ${config.label}`}
          >
            <span className={cn("inline-block h-3 w-3 rounded-sm", config.legendBg)} />
            {config.label}
          </button>
        ))}
      </div>
    </div>
  );
}
