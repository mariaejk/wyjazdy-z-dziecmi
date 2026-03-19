type EventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

function trackEvent({ action, category, label, value }: EventParams) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export const analytics = {
  bookingSubmit(tripSlug: string) {
    trackEvent({
      action: "booking_submit",
      category: "conversion",
      label: tripSlug,
    });
  },

  contactSubmit() {
    trackEvent({
      action: "contact_submit",
      category: "conversion",
    });
  },

  newsletterSignup() {
    trackEvent({
      action: "newsletter_signup",
      category: "conversion",
    });
  },

  waitlistSignup(tripSlug: string) {
    trackEvent({
      action: "waitlist_signup",
      category: "conversion",
      label: tripSlug,
    });
  },

  phoneClick() {
    trackEvent({
      action: "phone_click",
      category: "engagement",
    });
  },

  faqClick(question: string) {
    trackEvent({
      action: "faq_click",
      category: "engagement",
      label: question,
    });
  },

  socialClick(platform: string) {
    trackEvent({
      action: "social_click",
      category: "engagement",
      label: platform,
    });
  },
};
