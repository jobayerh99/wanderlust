import { DestinationsBrowser } from "@/components/destination/destinations-browser";
import { getDestinations } from "@/lib/destinations";

/**
 * `/destinations` is the list/browse route the navbar and footer link to.
 * The per-item detail view lives in `./[id]/page.tsx`.
 */
export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main className="flex flex-1 flex-col px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <DestinationsBrowser destinations={destinations} />
      </div>
    </main>
  );
}
