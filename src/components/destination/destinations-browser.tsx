"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import { cn } from "cn";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Destination } from "@/lib/destinations";

/** Filter bar placeholder shown before the user picks an option. */
const placeholderClassName = "uppercase tracking-wide";

const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $2,000", min: 0, max: 2000 },
  { label: "$2,000 – $4,000", min: 2000, max: 4000 },
  { label: "Over $4,000", min: 4000, max: Infinity },
] as const;

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
] as const;

const ALL = "all";

function DestinationCard({ destination }: { destination: Destination }) {
  const { destinationName, country, price, duration, imageUrl } = destination;

  return (
    <div className="flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {/* Static rating pill — the API has no rating field */}
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold shadow-sm">
          4.5
          <StarIcon className="size-3 fill-black text-black" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPinIcon className="size-3.5" aria-hidden="true" />
          {country}
        </p>

        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-medium">{destinationName}</h2>
          <p className="shrink-0">
            <span className="text-lg font-semibold">${price}</span>
            <span className="text-xs text-muted-foreground"> /Person</span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarIcon className="size-3.5" aria-hidden="true" />
          {duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-1 inline-flex w-fit items-center gap-0.5 text-xs font-semibold tracking-wide text-brand uppercase underline underline-offset-2 hover:text-brand/90"
        >
          Book Now
          <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function DestinationsBrowser({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState(ALL);
  const [priceRange, setPriceRange] = useState<string>(priceRanges[0].label);
  const [sort, setSort] = useState("price-asc");

  /** Base UI passes null when the value clears — keep the current selection. */
  const keepValue =
    (setter: (value: string) => void) =>
    (value: string | null) => {
      if (value !== null) setter(value);
    };

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category))).sort(),
    [destinations],
  );

  const visible = useMemo(() => {
    const range =
      priceRanges.find((r) => r.label === priceRange) ?? priceRanges[0];

    const filtered = destinations.filter((d) => {
      if (category !== ALL && d.category !== category) return false;
      const price = Number(d.price);
      return price >= range.min && price < range.max;
    });

    return filtered.sort((a, b) => {
      if (sort === "name-asc") {
        return a.destinationName.localeCompare(b.destinationName);
      }
      const diff = Number(a.price) - Number(b.price);
      return sort === "price-desc" ? -diff : diff;
    });
  }, [destinations, category, priceRange, sort]);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-light">Explore All Destinations</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      {/* Filter bar */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Select value={category} onValueChange={keepValue(setCategory)}>
          <SelectTrigger
            size="sm"
            className={cn(
              "h-10 w-full justify-between rounded-md bg-background px-4 text-sm",
              category === ALL && placeholderClassName,
            )}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Categories</SelectItem>
            {categories.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={keepValue(setPriceRange)}>
          <SelectTrigger
            size="sm"
            className="h-10 w-full justify-between rounded-md bg-background px-4 text-sm"
          >
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={keepValue(setSort)}>
          <SelectTrigger
            size="sm"
            className="h-10 w-full justify-between rounded-md bg-background px-4 text-sm"
          >
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Showing {visible.length} destination{visible.length === 1 ? "" : "s"}
      </p>

      {/* Card grid */}
      {visible.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">
          No destinations match your filters.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </div>
  );
}
