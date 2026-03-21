import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTripBySlug, getAllTrips, getUpcomingTrips } from "@/data/trips";
import { SITE_CONFIG } from "@/lib/constants";
import { StructuredData } from "@/components/shared/StructuredData";
import { getEventSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import { TripHero } from "@/components/trips/TripHero";
import { TripVideo } from "@/components/trips/TripVideo";
import { TripTargetAudience } from "@/components/trips/TripTargetAudience";
import { TripDescription } from "@/components/trips/TripDescription";
import { TripProgram } from "@/components/trips/TripProgram";
import { TripPracticalInfo } from "@/components/trips/TripPracticalInfo";
import { TripPricing } from "@/components/trips/TripPricing";
import { TripCollaborator } from "@/components/trips/TripCollaborator";
import { TripFAQ } from "@/components/trips/TripFAQ";
// TripGallery removed — images now inline via contentBlocks
import { BookingForm } from "@/components/trips/BookingForm";
import { WaitlistForm } from "@/components/trips/WaitlistForm";
import { StickyBookingCTA } from "@/components/trips/StickyBookingCTA";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allTrips = await getAllTrips();
  return allTrips.map((trip) => ({
    slug: trip.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    return { title: "Wyjazd nie znaleziony" };
  }

  return {
    title: trip.title,
    description: trip.shortDescription,
    openGraph: {
      title: `${trip.title} | ${SITE_CONFIG.name}`,
      description: trip.shortDescription,
      images: [{ url: trip.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${trip.title} | ${SITE_CONFIG.name}`,
      description: trip.shortDescription,
      images: [trip.image],
    },
  };
}

export default async function TripPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const upcoming = await getUpcomingTrips();
  const upcomingTrips = upcoming.map((t) => ({
    slug: t.slug,
    title: t.title,
  }));

  const hasSchedule = trip.schedule.length > 0;
  const hasPricing = trip.pricing.length > 0;
  const hasFAQ = trip.faq.length > 0;
  const hasCollaborator = trip.collaborator && trip.collaborator.name !== "Wkrótce";

  const baseUrl = SITE_CONFIG.url;
  const breadcrumbItems = [
    { name: "Strona główna", url: baseUrl },
    { name: "Wyjazdy", url: `${baseUrl}/wyjazdy` },
    { name: trip.title, url: `${baseUrl}/wyjazdy/${trip.slug}` },
  ];

  return (
    <>
      <StructuredData data={getEventSchema(trip)} />
      {hasFAQ && <StructuredData data={getFAQSchema(trip.faq)} />}
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* 1. Hero */}
      <TripHero
        title={trip.title}
        subtitle={trip.subtitle}
        date={trip.date}
        dateEnd={trip.dateEnd}
        location={trip.location}
        image={trip.image}
        isPast={trip.isPast}
        spotsLeft={trip.spotsLeft}
      />

      {/* 1.5. Video + Description (side by side) */}
      {trip.videoUrl && (
        <div id="opis">
          <TripVideo
            videoUrl={trip.videoUrl}
            shortDescription={trip.shortDescription}
            longDescription={trip.longDescription}
          />
        </div>
      )}

      {/* 2. Target Audience */}
      {trip.targetAudience.length > 0 && (
        <TripTargetAudience items={trip.targetAudience} />
      )}

      {/* 3. Description (only when no video — otherwise shown alongside video) */}
      {!trip.videoUrl && (
        <div id="opis">
          <TripDescription
            shortDescription={trip.shortDescription}
            longDescription={trip.longDescription}
            contentBlocks={trip.contentBlocks}
          />
        </div>
      )}

      {/* 4. Program */}
      {hasSchedule && <TripProgram schedule={trip.schedule} />}

      {/* 5. Practical Info */}
      <TripPracticalInfo info={trip.practicalInfo} />

      {/* 6. Pricing */}
      {hasPricing && (
        <TripPricing
          pricing={trip.pricing}
          deposit={trip.deposit}
          spotsTotal={trip.spotsTotal}
          spotsLeft={trip.spotsLeft}
          priceIncludes={trip.priceIncludes}
          priceExcludes={trip.priceExcludes}
        />
      )}

      {/* 7. Collaborator */}
      {trip.collaborator && hasCollaborator && <TripCollaborator collaborator={trip.collaborator} />}

      {/* 8. FAQ */}
      {hasFAQ && <TripFAQ items={trip.faq} />}

      {/* Gallery removed — images are now inline in contentBlocks */}

      {/* 10. Booking Form or Waitlist */}
      {!trip.isPast && trip.spotsLeft === 0 && (
        <WaitlistForm tripSlug={trip.slug} tripTitle={trip.title} />
      )}
      {!trip.isPast && trip.spotsLeft !== 0 && (
        <BookingForm trips={upcomingTrips} preselectedTrip={trip.slug} />
      )}

      {/* Sticky CTA mobile */}
      {!trip.isPast && trip.spotsLeft !== 0 && <StickyBookingCTA />}
    </>
  );
}
