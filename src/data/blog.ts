import { cache } from "react";
import Markdoc from "@markdoc/markdoc";
import type { RenderableTreeNode } from "@markdoc/markdoc";
import { reader } from "@/lib/keystatic";
import { warnInvalidSlug, parseLocalDate } from "@/lib/utils";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  image?: string;
};

export type BlogPostWithContent = BlogPost & {
  content: RenderableTreeNode;
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
    warnInvalidSlug(slug, "blog");
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

  return posts.sort(
    (a, b) =>
      parseLocalDate(b.publishedDate).getTime() -
      parseLocalDate(a.publishedDate).getTime(),
  );
});

export async function getLatestBlogPosts(
  limit = 3,
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

export const getBlogPost = cache(
  async (slug: string): Promise<BlogPostWithContent | undefined> => {
    if (!isSafeSlug(slug)) return undefined;

    try {
      // resolveLinkedFiles: true is REQUIRED — without it, entry.content is a
      // lazy loader function, not { node: Node }. Calling .node on it returns
      // undefined and Markdoc.transform() silently produces empty output.
      const entry = await reader.collections.blog.read(slug, {
        resolveLinkedFiles: true,
      });
      if (!entry) return undefined;

      // Runtime guard — ensure content was resolved to a Markdoc AST node
      if (!entry.content || !("node" in entry.content)) {
        console.error(
          `[Blog] entry.content missing node for slug "${slug}" — resolveLinkedFiles may have failed`,
        );
        return undefined;
      }

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
  },
);
