import { cache } from "react";
import type { Trip, ContentBlock } from "@/types/trip";
import { reader } from "@/lib/keystatic";
import { parseLocalDate, warnInvalidSlug } from "@/lib/utils";

function mapTrip(
  slug: string,
  entry: NonNullable<Awaited<ReturnType<typeof reader.collections.trips.read>>>
): Trip {
  return {
    slug,
    title: entry.title,
    subtitle: entry.subtitle,
    date: entry.date,
    dateEnd: entry.dateEnd,
    location: entry.location,
    category: entry.category as "rodzinny" | "matka-corka" | "single-parents" | "dla-doroslych",
    shortDescription: entry.shortDescription,
    longDescription: entry.longDescription,
    image: entry.image,
    imagePosition: (entry.imagePosition as Trip["imagePosition"]) || undefined,
    videoUrl: entry.videoUrl || undefined,
    isPast: parseLocalDate(entry.dateEnd) < new Date(),
    spotsTotal: entry.spotsTotal ?? undefined,
    spotsLeft: entry.spotsLeft ?? undefined,
    deposit: entry.deposit ?? 0,
    earlyBirdDeadline: entry.earlyBirdDeadline || undefined,
    earlyBirdPrice: entry.earlyBirdPrice ?? undefined,
    targetAudience: entry.targetAudience.map((ta) => ({
      label: ta.label,
      description: ta.description || undefined,
    })),
    schedule: entry.schedule.map((day) => ({
      date: day.date,
      dayLabel: day.dayLabel,
      activities: day.activities.map((a) => ({
        time: a.time,
        activity: a.activity,
      })),
    })),
    practicalInfo: {
      accommodation: entry.practicalInfo.accommodation,
      food: entry.practicalInfo.food,
      transport: entry.practicalInfo.transport || undefined,
      childCare: entry.practicalInfo.childCare || undefined,
    },
    pricing: entry.pricing.map((p) => ({
      label: p.label,
      price: p.price ?? 0,
    })),
    priceIncludes:
      entry.priceIncludes.length > 0 ? [...entry.priceIncludes] : undefined,
    priceExcludes:
      entry.priceExcludes.length > 0 ? [...entry.priceExcludes] : undefined,
    collaborator:
      entry.collaborator.name
        ? {
            name: entry.collaborator.name,
            role: entry.collaborator.role || undefined,
            bio: entry.collaborator.bio,
            image: entry.collaborator.image || undefined,
          }
        : undefined,
    facebookEventUrl: entry.facebookEventUrl || undefined,
    faq: entry.faq.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
    gallery: entry.gallery.map((g) => ({
      src: g.src,
      alt: g.alt,
      isMain: g.isMain || undefined,
    })),
    contentBlocks:
      entry.contentBlocks.length > 0
        ? entry.contentBlocks
            .map((cb) =>
              cb.discriminant === "text"
                ? { type: "text" as const, text: cb.value.text }
                : cb.value.image
                  ? { type: "image" as const, src: cb.value.image, alt: cb.value.alt }
                  : null
            )
            .filter(Boolean) as ContentBlock[]
        : undefined,
  };
}

export const getAllTrips = cache(async (): Promise<Trip[]> => {
  const slugs = await reader.collections.trips.list();
  const trips: Trip[] = [];
  for (const slug of slugs) {
    warnInvalidSlug(slug, "trips");
    const entry = await reader.collections.trips.read(slug);
    if (!entry) continue;
    trips.push(mapTrip(slug, entry));
  }
  // Sort chronologically by start date (earliest first)
  return trips.sort(
    (a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime()
  );
});

export const getTripBySlug = cache(async (
  slug: string
): Promise<Trip | undefined> => {
  const entry = await reader.collections.trips.read(slug);
  if (!entry) return undefined;
  return mapTrip(slug, entry);
});

export async function getUpcomingTrips(): Promise<Trip[]> {
  const all = await getAllTrips();
  return all.filter((trip) => !trip.isPast);
}

export async function getPastTrips(): Promise<Trip[]> {
  const all = await getAllTrips();
  return all.filter((trip) => trip.isPast);
}

export async function getTripsByCategory(
  cat: Trip["category"]
): Promise<Trip[]> {
  const all = await getAllTrips();
  return all.filter((trip) => trip.category === cat);
}

export type CalendarTrip = {
  slug: string;
  title: string;
  date: string;
  dateEnd: string;
  category: Trip["category"];
  isPast: boolean;
};

/** Maps full Trip objects to lightweight CalendarTrip format. */
export function toCalendarTrips(trips: Trip[]): CalendarTrip[] {
  return trips.map((t) => ({
    slug: t.slug,
    title: t.title,
    date: t.date,
    dateEnd: t.dateEnd,
    category: t.category,
    isPast: t.isPast,
  }));
}

export async function getCalendarTrips(): Promise<CalendarTrip[]> {
  const all = await getAllTrips();
  return toCalendarTrips(all);
}

export async function getUpcomingTripsByCategory(
  cat: Trip["category"]
): Promise<Trip[]> {
  const all = await getAllTrips();
  return all.filter((trip) => !trip.isPast && trip.category === cat);
}
