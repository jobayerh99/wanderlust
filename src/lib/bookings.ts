export type Booking = {
  _id: string;
  destinationName: string;
  imageUrl: string;
  price: string | number;
  /** ISO date (or date string) the trip departs. */
  departureDate: string;
  /** Status as reported by the API, e.g. "Confirmed" / "Pending". */
  status?: string;
  /** Short human-readable reference shown on the card, e.g. "bt-123". */
  bookingId?: string;
  /** Destination id for the card's View link; falls back to `_id`. */
  destinationId?: string;
};

/**
 * Fetch every booking for a user. Never throws — returns [] on failure.
 * Mirrors `getDestinations` in `./destinations.ts`.
 */
export async function getBookings(email?: string): Promise<Booking[]> {
  if (!email) return [];

  try {
    const res = await fetch(
      `http://localhost:8000/my-bookings/${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];

    const data: unknown = await res.json();
    // Supports either a bare array or an { data: [...] } envelope.
    if (Array.isArray(data)) return data as Booking[];
    if (
      data &&
      typeof data === "object" &&
      Array.isArray((data as { data?: unknown }).data)
    ) {
      return (data as { data: Booking[] }).data;
    }
    return [];
  } catch {
    return [];
  }
}
