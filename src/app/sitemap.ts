import type { MetadataRoute } from "next";
import { getAllTrips } from "@/data/trips";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/wyjazdy`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/o-nas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/matka-z-corka`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/wyjazd-z-dziecmi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/galeria`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/kontakt`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/opinie`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const tripPages: MetadataRoute.Sitemap = getAllTrips().map((trip) => ({
    url: `${baseUrl}/wyjazdy/${trip.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...tripPages];
}
