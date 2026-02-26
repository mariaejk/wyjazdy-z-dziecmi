export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  trip: string;
  adults: number;
  children: number;
  childrenAges: string;
  notes?: string;
  consentRodo: boolean;
  consentMarketing?: boolean;
  website?: string; // honeypot
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  consentRodo: boolean;
  website?: string; // honeypot
};

export type NewsletterFormData = {
  email: string;
  consentRodo: boolean;
  website?: string; // honeypot
};
