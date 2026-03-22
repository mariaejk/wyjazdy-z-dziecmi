import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

function extractHandle(url: string, prefix: string): string {
  return url.split(prefix).pop() ?? url;
}

const contactItems = [
  {
    icon: Mail,
    label: "E-mail",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: extractHandle(SOCIAL_LINKS.facebook, "facebook.com/"),
    href: SOCIAL_LINKS.facebook,
    external: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: `@${extractHandle(SOCIAL_LINKS.instagram, "instagram.com/")}`,
    href: SOCIAL_LINKS.instagram,
    external: true,
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <ScrollAnimation variant="fadeUp">
        <h2 className="font-heading text-2xl font-bold text-graphite sm:text-3xl">
          Dane kontaktowe
        </h2>
        <p className="mt-3 text-graphite-light">
          Masz pytania? Napisz do nas lub zadzwo\u0144 &mdash; ch\u0119tnie pomo\u017Cemy.
        </p>
      </ScrollAnimation>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <ScrollAnimation key={item.label} variant="fadeUp" delay={index * 0.1}>
            <a
              href={item.href}
              {...(item.external
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": `${item.label} (otwiera si\u0119 w nowej karcie)`,
                  }
                : {})}
              className="flex items-center gap-4 rounded-xl border border-graphite/10 bg-white p-4 transition-colors hover:border-moss/30 hover:bg-moss/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss/10">
                <item.icon className="h-5 w-5 text-moss" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-graphite-light uppercase">
                  {item.label}
                </p>
                <p className="text-base font-medium text-graphite">
                  {item.value}
                </p>
              </div>
            </a>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}
