import Image from "next/image";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { getTeamMember } from "@/data/team";

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
    value: "Wyjazdy z Dziećmi",
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

export async function ContactInfo() {
  const maria = await getTeamMember("Maria Kordalewska");

  return (
    <div className="space-y-6">
      <ScrollAnimation variant="fadeUp">
        {maria?.image && (
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-none">
              <Image
                src="/images/marysia-kontakt.jpeg"
                alt={maria.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-graphite">
                {maria.name}
              </p>
              <p className="text-sm text-graphite-light">{maria.role}</p>
            </div>
          </div>
        )}
        <h2 className="font-heading text-2xl font-bold text-graphite sm:text-3xl">
          Dane kontaktowe
        </h2>
        <p className="mt-3 text-graphite-light">
          Masz pytania? Napisz do mnie lub zadzwoń — chętnie pomogę.
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
                    "aria-label": `${item.label} (otwiera się w nowej karcie)`,
                  }
                : {})}
              className="flex items-center gap-4 rounded-none border border-graphite/10 bg-white p-4 transition-colors hover:border-moss/30 hover:bg-moss/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-moss/10">
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
