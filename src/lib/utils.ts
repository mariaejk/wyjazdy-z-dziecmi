import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Parses YYYY-MM-DD as local midnight (avoids UTC offset issues). */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDate(d: string | Date): Date {
  return typeof d === "string" ? parseLocalDate(d) : d;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(toDate(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
  }).format(toDate(date));
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = toDate(start);
  const e = toDate(end);

  const dayStart = s.getDate();
  const dayEnd = e.getDate();
  const monthStart = s.getMonth();
  const monthEnd = e.getMonth();
  const yearEnd = e.getFullYear();

  const monthNames = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];

  if (monthStart === monthEnd) {
    return `${dayStart}–${dayEnd} ${monthNames[monthEnd]} ${yearEnd}`;
  }

  return `${dayStart} ${monthNames[monthStart]} – ${dayEnd} ${monthNames[monthEnd]} ${yearEnd}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isNavActive(href: string, pathname: string): boolean {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
