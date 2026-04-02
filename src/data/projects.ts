import { cache } from "react";
import { reader } from "@/lib/keystatic";
import { warnInvalidSlug } from "@/lib/utils";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  paragraphs: string[];
  image?: string;
  logo?: string;
  videoUrl?: string;
  order: number;
  links: ProjectLink[];
};

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const slugs = await reader.collections.projects.list();
  const projects: Project[] = [];

  for (const slug of slugs) {
    warnInvalidSlug(slug, "projects");
    const entry = await reader.collections.projects.read(slug);
    if (!entry) continue;
    projects.push({
      slug,
      title: entry.title,
      tagline: entry.tagline,
      description: entry.description,
      paragraphs: entry.description.split(/\n\n+/).filter(Boolean),
      image: entry.image || undefined,
      logo: entry.logo || undefined,
      videoUrl: entry.videoUrl || undefined,
      order: entry.order ?? 0,
      links: entry.links.map((l) => ({ label: l.label, url: l.url })),
    });
  }

  return projects.sort((a, b) => a.order - b.order);
});
