import { reader } from "@/lib/keystatic";

export async function getFeaturedTestimonialIds(): Promise<string[]> {
  const data = await reader.singletons.homepage.read();
  return [...(data?.featuredTestimonialIds ?? ["ania", "katarzyna"])];
}
