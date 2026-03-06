import type { MetadataRoute } from "next";
import { getAllTrips } from "@/data/trips";
import { getAllBlogPosts } from "@/data/blog";
import { SITE_CONFIG } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const allTrips = await getAllTrips();
  const tripPages: MetadataRoute.Sitemap = allTrips.map((trip) => ({
    url: `${baseUrl}/wyjazdy/${trip.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...tripPages, ...blogPages];
}
