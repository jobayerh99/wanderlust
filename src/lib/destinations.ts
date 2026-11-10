export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const API_URL = "http://localhost:8000/destinations";

/** Fetch every destination from the backend. Never throws — returns [] on failure. */
export async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    return Array.isArray(data) ? (data as Destination[]) : [];
  } catch {
    return [];
  }
}
