import { cache } from "react";
import type { Place } from "@/types/place";
import { reader } from "@/lib/keystatic";

export const getAllPlaces = cache(async (): Promise<Place[]> => {
  const data = await reader.singletons.places.read();
  if (!data) return [];
  return data.items.map((p) => ({
    name: p.name,
    description: p.description,
    url: p.url || undefined,
    images: p.images.length > 0 ? [...p.images] : undefined,
    features: p.features.length > 0 ? [...p.features] : undefined,
  }));
});

export const getPlace = cache(async (name: string): Promise<Place | undefined> => {
  const all = await getAllPlaces();
  return all.find((p) => p.name === name);
});
