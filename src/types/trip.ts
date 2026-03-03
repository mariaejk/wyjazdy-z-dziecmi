export type TripScheduleActivity = {
  time: string;
  activity: string;
};

export type TripScheduleDay = {
  date: string;
  dayLabel: string;
  activities: TripScheduleActivity[];
};

export type TripPricing = {
  label: string;
  price: number;
};

export type TripFAQ = {
  question: string;
  answer: string;
};

export type TripGalleryImage = {
  src: string;
  alt: string;
  isMain?: boolean;
};

export type TripCollaborator = {
  name: string;
  role?: string;
  bio: string;
  image?: string;
};

export type TripTargetAudience = {
  label: string;
  description?: string;
};

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string };

export type Trip = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateEnd: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  isPast: boolean;
  category: "rodzinny" | "matka-corka";
  targetAudience: TripTargetAudience[];
  schedule: TripScheduleDay[];
  practicalInfo: {
    accommodation: string;
    food: string;
    transport?: string;
  };
  pricing: TripPricing[];
  deposit: number;
  spotsTotal?: number;
  spotsLeft?: number;
  earlyBirdDeadline?: string;
  earlyBirdPrice?: number;
  priceIncludes?: string[];
  priceExcludes?: string[];
  collaborator?: TripCollaborator;
  faq: TripFAQ[];
  gallery: TripGalleryImage[];
  contentBlocks?: ContentBlock[];
};
