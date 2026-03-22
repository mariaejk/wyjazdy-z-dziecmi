import type { Trip } from "@/types/trip";

export type CategoryKey = Trip["category"];

export type CategoryConfig = {
  label: string;
  /** Full background for calendar cells */
  calendarBg: string;
  /** Legend dot color */
  legendBg: string;
  /** Tinted badge for trip cards: light bg + text */
  badgeBg: string;
  badgeText: string;
};

export const CATEGORY_CONFIG: Record<CategoryKey, CategoryConfig> = {
  rodzinny: {
    label: "Warsztaty z dziećmi",
    calendarBg: "bg-moss text-white",
    legendBg: "bg-moss",
    badgeBg: "bg-moss/15",
    badgeText: "text-moss",
  },
  "matka-corka": {
    label: "Matka i córka",
    calendarBg: "bg-mustard text-graphite",
    legendBg: "bg-mustard",
    badgeBg: "bg-mustard/20",
    badgeText: "text-amber-700",
  },
  "single-parents": {
    label: "Single parents",
    calendarBg: "bg-lavender text-graphite",
    legendBg: "bg-lavender",
    badgeBg: "bg-lavender/20",
    badgeText: "text-purple-700",
  },
  "dla-doroslych": {
    label: "Dla dorosłych",
    calendarBg: "bg-terracotta text-white",
    legendBg: "bg-terracotta",
    badgeBg: "bg-terracotta/15",
    badgeText: "text-terracotta-dark",
  },
};

export const PAST_CATEGORY = {
  calendarBg: "bg-parchment-dark text-graphite-light",
  legendBg: "bg-parchment-dark",
  label: "Zakończone",
};
