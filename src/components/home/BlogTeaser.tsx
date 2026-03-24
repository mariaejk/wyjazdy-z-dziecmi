import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
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
            overline="Z bloga"
            title="Najnowsze"
            italicText="wpisy"
            underline
            subtitle="Praktyczne wskazówki, inspiracje i kulisy warsztatów"
          />
        </ScrollAnimation>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
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
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-light italic text-graphite group-hover:text-graphite-light">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-graphite-light">
                    <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                    {formatDate(post.publishedDate)}
                  </p>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-graphite-light">
                    {post.subtitle}
                  </p>
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
