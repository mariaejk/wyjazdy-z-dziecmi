"use client";

import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { analytics } from "@/lib/analytics";

export function PhoneLink() {
  return (
    <a
      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
      className="inline-flex items-center gap-1.5 text-sm text-graphite-light transition-colors hover:text-moss"
      onClick={() => analytics.phoneClick()}
    >
      <Phone className="h-4 w-4" strokeWidth={1.5} />
      <span>Zadzwoń: {CONTACT.phoneDisplay}</span>
    </a>
  );
}
