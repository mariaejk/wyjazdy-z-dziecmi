import { createReader } from "@keystatic/core/reader";
import config from "./keystatic.config";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const reader = createReader(process.cwd(), config);

  // Check blog directory
  const blogDir = path.join(process.cwd(), "content", "blog");
  const blogEntries = fs.readdirSync(blogDir);
  console.log("Blog fs entries:", blogEntries);

  if (blogEntries.length > 0) {
    const subdir = path.join(blogDir, blogEntries[0]);
    const files = fs.readdirSync(subdir);
    console.log("Blog subdir files:", files);
  }

  const blog = await reader.collections.blog.list();
  console.log("Blog collection list:", blog);

  if (blog.length > 0) {
    const post = await reader.collections.blog.read(blog[0]);
    console.log("Blog post:", post?.title);
  }
}
main().catch(console.error);
