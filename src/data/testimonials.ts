import type { Testimonial } from "@/types/testimonial";
import { reader } from "@/lib/keystatic";

export async function getTestimonials(): Promise<Testimonial[]> {
  const slugs = await reader.collections.testimonials.list();
  const testimonials: Testimonial[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.testimonials.read(slug);
    if (!entry) continue;
    testimonials.push({
      id: slug,
      quote: entry.quote,
      author: entry.author,
      context: entry.context,
      trip: entry.trip || undefined,
    });
  }
  return testimonials;
}

export async function getFeaturedTestimonials(
  ids: string[]
): Promise<Testimonial[]> {
  const all = await getTestimonials();
  return ids
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is Testimonial => t !== undefined);
}
