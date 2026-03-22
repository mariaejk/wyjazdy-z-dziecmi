import { reader } from "@/lib/keystatic";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  publishedDate: string;
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await reader.collections.blog.list();
  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.blog.read(slug);
    if (!entry) continue;
    posts.push({
      slug,
      title: entry.title,
      subtitle: entry.subtitle,
      publishedDate: entry.publishedDate,
    });
  }
  return posts;
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .slice(0, limit);
}

export async function getBlogPost(slug: string) {
  const entry = await reader.collections.blog.read(slug);
  if (!entry) return undefined;
  return {
    slug,
    title: entry.title,
    subtitle: entry.subtitle,
    publishedDate: entry.publishedDate,
    content: entry.content,
  };
}
