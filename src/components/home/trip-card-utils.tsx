import type { Trip } from "@/types/trip";
import { Badge } from "@/components/ui/Badge";

export function getScarcityBadge(spotsLeft?: number) {
  if (spotsLeft === undefined) return null;
  if (spotsLeft === 0) {
    return <Badge className="border-0 bg-red-100 text-red-700">Komplet</Badge>;
  }
  if (spotsLeft <= 3) {
    return <Badge className="border-0 bg-amber-100 text-amber-700">Ostatnie miejsca!</Badge>;
  }
  return null;
}

export function getMinPrice(pricing: Trip["pricing"]): number | null {
  if (pricing.length === 0) return null;
  return Math.min(...pricing.map((p) => p.price));
}
