import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { getAllBlogPosts, getBlogPost } from "@/data/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Artykuł nie znaleziony" };
  }

  return {
    title: post.title,
    description: post.subtitle,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { node } = await post.content();
  const renderable = Markdoc.transform(node);
  const html = Markdoc.renderers.html(renderable);

  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
        { name: post.title, url: `${SITE_CONFIG.url}/blog/${slug}` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                as="h1"
                title={post.title}
                subtitle={post.subtitle}
              />
              <p className="mt-2 text-center text-sm text-graphite-light">
                {post.publishedDate}
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      <SectionWrapper variant="alternate">
        <Container>
          <article className="mx-auto max-w-3xl">
            <ScrollAnimation variant="fadeUp">
              <div
                className="prose prose-graphite max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </ScrollAnimation>

            <ScrollAnimation variant="fadeUp">
              <div className="mt-16 rounded-2xl border border-graphite/10 bg-white p-6 sm:p-8">
                <h3 className="font-heading text-xl font-bold text-graphite">
                  Chcesz więcej praktycznych wskazówek?
                </h3>
                <p className="mt-2 text-base text-graphite-light">
                  Pobierz nasz darmowy poradnik PDF z checklistą pakowania
                  i wskazówkami, jak przygotować dziecko na wyjazd.
                </p>
                <NewsletterForm />
              </div>
            </ScrollAnimation>
          </article>
        </Container>
      </SectionWrapper>
    </>
  );
}
