import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <p className="text-6xl font-bold text-moss">404</p>
        <h1 className="font-heading text-2xl font-bold text-graphite">
          Strona nie znaleziona
        </h1>
        <p className="text-graphite-light">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.
        </p>
        <Link
          href="/"
          className="rounded-none bg-terracotta px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </Container>
  );
}
