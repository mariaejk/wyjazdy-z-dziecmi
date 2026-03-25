import { reader } from "@/lib/keystatic";

export type FAQItem = {
  question: string;
  answer: string;
};

export async function getFAQItems(): Promise<FAQItem[]> {
  const data = await reader.singletons.faq.read();
  if (!data) return [];
  return data.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
}
