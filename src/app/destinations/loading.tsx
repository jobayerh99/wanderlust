/** Shown while the destination list is fetched from the backend. */
export default function DestinationsLoading() {
  return (
    <main className="flex flex-1 flex-col px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto w-full max-w-6xl" aria-busy="true">
        <div className="h-10 w-72 max-w-full rounded-md bg-muted" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-md bg-muted" />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="h-10 rounded-md bg-muted" />
          <div className="h-10 rounded-md bg-muted" />
          <div className="h-10 rounded-md bg-muted" />
        </div>

        <div className="mt-5 h-4 w-48 max-w-full rounded-md bg-muted" />

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="aspect-[16/10] rounded-lg bg-muted" />
              <div className="h-4 w-24 rounded-md bg-muted" />
              <div className="h-5 w-3/4 rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
