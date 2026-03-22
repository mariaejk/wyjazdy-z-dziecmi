import type { MetadataRoute } from "next";
import { getAllTrips } from "@/data/trips";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/wyjazdy`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/o-nas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/kontakt`, changeFrequency: "monthly", priority: 0.7 },
    // /opinie and /single-parents excluded — placeholder content, robots: { index: false }
  ];

  const tripPages: MetadataRoute.Sitemap = getAllTrips().map((trip) => ({
    url: `${baseUrl}/wyjazdy/${trip.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...tripPages];
}
