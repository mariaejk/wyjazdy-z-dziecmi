"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-2xl font-light text-graphite">
          Coś poszło nie tak
        </h2>
        <p className="text-graphite-light">
          Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
        </p>
        <Button type="button" onClick={reset}>
          Spróbuj ponownie
        </Button>
      </div>
    </div>
  );
}
