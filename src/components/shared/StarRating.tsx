import { Star } from "lucide-react";

export function StarRating() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-graphite-light"
      role="img"
      aria-label="5 z 5 gwiazdek — polecane przez rodziców"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-mustard text-mustard"
          strokeWidth={1}
        />
      ))}
      <span className="ml-1">Polecane przez rodziców</span>
    </div>
  );
}
