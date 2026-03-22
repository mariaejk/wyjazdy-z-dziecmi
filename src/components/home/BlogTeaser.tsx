import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { getLatestBlogPosts } from "@/data/blog";

export async function BlogTeaser() {
  const posts = await getLatestBlogPosts(3);

  if (posts.length === 0) return null;

  return (
    <SectionWrapper>
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Najnowsze wpisy na moim blogu"
            subtitle="Praktyczne wskazówki, inspiracje i kulisy warsztatów"
          />
        </ScrollAnimation>

        <div className="mx-auto max-w-4xl space-y-4">
          {posts.map((post, index) => (
            <ScrollAnimation key={post.slug} variant="fadeUp" delay={index * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-graphite/10 bg-white p-5 transition-colors hover:border-moss/30 hover:bg-moss/5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-bold text-graphite group-hover:text-moss sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-graphite-light">
                      <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      {formatDate(post.publishedDate)}
                    </p>
                    <p className="mt-2 line-clamp-2 text-base leading-relaxed text-graphite-light">
                      {post.subtitle}
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-1 h-5 w-5 shrink-0 text-graphite-light transition-transform group-hover:translate-x-1 group-hover:text-moss"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation variant="fadeUp" delay={posts.length * 0.1}>
          <div className="mt-8 text-center">
            <Button href={ROUTES.blog} variant="secondary">
              Zobacz wszystkie wpisy
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
