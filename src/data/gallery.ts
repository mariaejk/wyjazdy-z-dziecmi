import { reader } from "@/lib/keystatic";

export type GalleryImage = {
  src: string;
  alt: string;
  category?: string;
};

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const slugs = await reader.collections.gallery.list();
  const entries: GalleryImage[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.gallery.read(slug);
    if (!entry) continue;
    entries.push({
      src: entry.src,
      alt: entry.alt,
      category: entry.category || undefined,
    });
  }
  return entries;
}
