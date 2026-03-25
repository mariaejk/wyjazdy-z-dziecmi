import { cache } from "react";
import { reader } from "@/lib/keystatic";

export type BenefitItem = {
  icon: string;
  title: string;
  description: string;
};

export type CategoryBenefits = {
  category: string;
  subtitle: string;
  items: BenefitItem[];
};

export const getBenefitsByCategory = cache(
  async (category: string): Promise<CategoryBenefits | undefined> => {
    const data = await reader.singletons.categoryBenefits.read();
    if (!data) return undefined;

    const match = data.categories.find((c) => c.category === category);
    if (!match) return undefined;

    return {
      category: match.category,
      subtitle: match.subtitle,
      items: match.items.map((item) => ({
        icon: item.icon,
        title: item.title,
        description: item.description,
      })),
    };
  }
);
