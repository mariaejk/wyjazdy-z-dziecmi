import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = new Date(start);
  const e = new Date(end);

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
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
