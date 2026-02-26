import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <Image
        src="/images/logo.jpeg"
        alt="Wyjazdy z Dziećmi — logo"
        width={120}
        height={120}
        priority
      />
      <h1 className="font-heading text-4xl font-bold text-moss">
        Wyjazdy z Dziećmi
      </h1>
      <p className="max-w-md text-center text-lg text-graphite-light">
        Rodzinne wyjazdy warsztatowe w naturze — joga, taniec, ceramika, konie.
      </p>
      <div className="flex gap-4">
        <span className="rounded-full bg-moss px-4 py-2 text-sm text-white">
          Akcent (moss)
        </span>
        <span className="rounded-full bg-parchment-dark px-4 py-2 text-sm text-graphite">
          Sekcja (parchment-dark)
        </span>
      </div>
    </main>
  );
}
