import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj si\u0119 z nami \u2014 napisz wiadomo\u015B\u0107, zadzwo\u0144 lub znajd\u017A nas w mediach spo\u0142eczno\u015Bciowych.",
};

export default function ContactPage() {
  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Kontakt", url: `${SITE_CONFIG.url}/kontakt` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <h1 className="mb-8 text-center font-heading text-3xl font-bold text-graphite sm:mb-10 sm:text-4xl lg:mb-12 lg:text-5xl">
              Kontakt
            </h1>
            <p className="-mt-4 text-center text-lg text-graphite-light sm:-mt-6 sm:text-xl">
              Masz pytania? Ch\u0119tnie pomo\u017Cemy.
            </p>
          </ScrollAnimation>

          <div className="mx-auto mt-8 max-w-5xl sm:mt-10 lg:mt-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Contact Info */}
              <ContactInfo />

              {/* Contact Form */}
              <ScrollAnimation variant="fadeUp" delay={0.2}>
                <ContactForm />
              </ScrollAnimation>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
