import fs from "fs/promises";
import path from "path";
// @ts-expect-error js-yaml has no type declarations
import yaml from "js-yaml";
import Markdoc from "@markdoc/markdoc";

const BLOG_DIR = "content/blog";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  image?: string;
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const meta = await readBlogMeta(slug);
    if (!meta) continue;
    posts.push({ slug, ...meta });
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
  const meta = await readBlogMeta(slug);
  if (!meta) return undefined;

  const contentPath = path.join(BLOG_DIR, slug, "content.mdoc");
  const raw = await fs.readFile(contentPath, "utf-8");
  const ast = Markdoc.parse(raw);
  const content = Markdoc.transform(ast);

  return {
    slug,
    ...meta,
    content,
  };
}

async function readBlogMeta(
  slug: string
): Promise<Omit<BlogPost, "slug"> | null> {
  const dir = path.join(BLOG_DIR, slug);

  // Try YAML first, then JSON
  for (const filename of ["index.yaml", "index.json"]) {
    const filePath = path.join(dir, filename);
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const data =
        filename.endsWith(".yaml")
          ? (yaml.load(raw) as Record<string, string>)
          : (JSON.parse(raw) as Record<string, string>);
      return {
        title: data.title,
        subtitle: data.subtitle,
        publishedDate: data.publishedDate,
        image: data.image || undefined,
      };
    } catch {
      continue;
    }
  }
  return null;
}
