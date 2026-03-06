export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-parchment-dark border-t-moss" />
        <p className="text-sm text-graphite-light">Ładowanie...</p>
      </div>
    </div>
  );
}
