import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { getAllBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktyczne wskazówki dla rodziców — jak przygotować dziecko na wyjazd warsztatowy, radzenie sobie z tęsknotą i więcej.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                as="h1"
                title="Blog"
                subtitle="Praktyczne wskazówki dla rodziców"
              />
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      <SectionWrapper variant="alternate">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {posts.map((post, index) => (
              <ScrollAnimation key={post.slug} variant="fadeUp" delay={index * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-graphite/10 bg-white p-6 transition-colors hover:border-moss/30 hover:bg-moss/5 sm:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-graphite sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-graphite-light">
                    {post.publishedDate}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-graphite-light">
                    {post.subtitle}
                  </p>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
