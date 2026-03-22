import { Quote } from "lucide-react";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import type { Testimonial } from "@/types/testimonial";

type TestimonialCardProps = {
  testimonial: Testimonial;
  index?: number;
};

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <ScrollAnimation variant="fadeUp" delay={index * 0.15} className="h-full">
      <blockquote className="flex h-full flex-col rounded-none border border-graphite/10 bg-white p-6 sm:p-8">
        <Quote className="mb-4 h-8 w-8 shrink-0 text-moss/30" strokeWidth={1.5} />

        <p className="flex-1 font-heading text-base leading-relaxed text-graphite-light italic">
          {testimonial.quote}
        </p>

        <footer className="mt-4">
          <cite className="not-italic">
            <span className="font-semibold text-graphite">
              {testimonial.author}
            </span>
            <span className="ml-2 text-sm text-graphite-light">
              {testimonial.context}
            </span>
          </cite>
        </footer>
      </blockquote>
    </ScrollAnimation>
  );
}
