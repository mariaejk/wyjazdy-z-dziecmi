import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <p className="text-6xl font-bold text-moss">404</p>
        <h1 className="font-heading text-2xl font-light text-graphite">
          Strona nie znaleziona
        </h1>
        <p className="text-graphite-light">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.
        </p>
        <Button href="/">
          Wróć na stronę główną
        </Button>
      </div>
    </Container>
  );
}
