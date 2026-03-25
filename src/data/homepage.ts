import { cache } from "react";
import { reader } from "@/lib/keystatic";

export const getFeaturedTestimonialIds = cache(async (): Promise<string[]> => {
  const data = await reader.singletons.homepage.read();
  return [...(data?.featuredTestimonialIds ?? ["ania", "katarzyna", "malgorzata"])];
});
