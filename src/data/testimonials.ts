import { cache } from "react";
import type { Testimonial } from "@/types/testimonial";
import { reader } from "@/lib/keystatic";
import { warnInvalidSlug } from "@/lib/utils";

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const slugs = await reader.collections.testimonials.list();
  const testimonials: Testimonial[] = [];
  for (const slug of slugs) {
    warnInvalidSlug(slug, "testimonials");
    const entry = await reader.collections.testimonials.read(slug);
    if (!entry) continue;
    testimonials.push({
      id: slug,
      quote: entry.quote,
      author: entry.author,
      context: entry.context,
      trip: entry.trip || undefined,
      date: entry.date || undefined,
    });
  }
  // Sort newest first (testimonials with dates before those without)
  return testimonials.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
});

export const getFeaturedTestimonials = cache(
  async (ids: string[]): Promise<Testimonial[]> => {
    const all = await getTestimonials();
    return ids
      .map((id) => all.find((t) => t.id === id))
      .filter((t): t is Testimonial => t !== undefined);
  }
);
