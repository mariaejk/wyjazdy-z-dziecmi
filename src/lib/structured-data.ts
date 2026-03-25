import type { Trip } from "@/types/trip";
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "./constants";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
    description: SITE_CONFIG.description,
  };
}

export function getEventSchema(trip: Trip) {
  const baseUrl = SITE_CONFIG.url;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: trip.title,
    description: trip.shortDescription,
    startDate: trip.date,
    endDate: trip.dateEnd,
    location: {
      "@type": "Place",
      name: trip.location,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    image: `${baseUrl}${trip.image}`,
    url: `${baseUrl}/wyjazdy/${trip.slug}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };

  // Past trips keep EventScheduled (they happened, not cancelled).
  // Only omit offers for past trips (no longer bookable).
  schema.eventStatus = "https://schema.org/EventScheduled";

  if (trip.pricing.length > 0 && !trip.isPast) {
    const prices = trip.pricing.map((p) => p.price);

    let availability = "https://schema.org/InStock";
    if (trip.spotsLeft === 0) {
      availability = "https://schema.org/SoldOut";
    } else if (trip.spotsLeft !== undefined && trip.spotsLeft <= 3) {
      availability = "https://schema.org/LimitedAvailability";
    }

    schema.offers = {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      priceCurrency: "PLN",
      availability,
      url: `${baseUrl}/wyjazdy/${trip.slug}`,
    };
  }

  return schema;
}

export function getFAQSchema(faq: { question: string; answer: string }[]) {
  if (faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
