import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";
import { getAllBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktyczne wskazówki dla rodziców — jak przygotować dziecko na wyjazd warsztatowy, radzenie sobie z tęsknotą i więcej.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const sorted = [...posts].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              as="h1"
              title="Blog"
              subtitle="Praktyczne wskazówki dla rodziców"
            />
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      <SectionWrapper variant="alternate">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post, index) => (
              <ScrollAnimation key={post.slug} variant="fadeUp" delay={index * 0.1} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-none border border-graphite/10 bg-white transition-colors hover:border-moss/30 hover:bg-moss/5"
                >
                  {post.image && (
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="font-heading text-lg font-bold text-graphite group-hover:text-moss sm:text-xl">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-graphite-light">
                      <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      {formatDate(post.publishedDate)}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite-light">
                      {post.subtitle}
                    </p>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
