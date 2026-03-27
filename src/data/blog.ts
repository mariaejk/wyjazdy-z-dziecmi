import { cache } from "react";
import Markdoc from "@markdoc/markdoc";
import { reader } from "@/lib/keystatic";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  image?: string;
};

function isSafeSlug(slug: string): boolean {
  return (
    !slug.includes("/") &&
    !slug.includes("\\") &&
    !slug.includes("..") &&
    !slug.startsWith(".")
  );
}

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const slugs = await reader.collections.blog.list();
  const posts: BlogPost[] = [];

  for (const slug of slugs) {
    if (!isSafeSlug(slug)) continue;

    const entry = await reader.collections.blog.read(slug);
    if (!entry) continue;

    posts.push({
      slug,
      title: entry.title,
      subtitle: entry.subtitle,
      publishedDate: entry.publishedDate,
      image: entry.image || undefined,
    });
  }

  return posts.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
});

export const getLatestBlogPosts = cache(
  async (limit = 3): Promise<BlogPost[]> => {
    const posts = await getAllBlogPosts();
    return posts.slice(0, limit);
  },
);

export const getBlogPost = cache(async (slug: string) => {
  if (!isSafeSlug(slug)) return undefined;

  try {
    const entry = await reader.collections.blog.read(slug, {
      resolveLinkedFiles: true,
    });
    if (!entry) return undefined;

    // Keystatic returns { node: Node } for markdoc contentField with resolveLinkedFiles.
    // Transform the Markdoc AST node to RenderableTreeNode for Markdoc.renderers.react()
    const content = Markdoc.transform(entry.content.node);

    return {
      slug,
      title: entry.title,
      subtitle: entry.subtitle,
      publishedDate: entry.publishedDate,
      image: entry.image || undefined,
      content,
    };
  } catch {
    return undefined;
  }
});
