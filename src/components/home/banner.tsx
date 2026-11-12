import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "cn";

/** Static search summary shown at the bottom of the banner (display only). */
const searchFields = [
  { label: "Location", detail: "Address, City Or Zip" },
  { label: "Date/Duration", detail: "Anytime/3 Days" },
  { label: "Budget", detail: "$0–$3000" },
  { label: "People", detail: "5-10" },
] as const;

export function Banner() {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden">
      {/* Pre-darkened hero photo — no extra overlay needed for contrast */}
      <Image
        src="/assets/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Hero copy */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center text-white">
        <h1 className="text-4xl leading-[1.05] font-light sm:text-5xl md:text-7xl lg:text-8xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="max-w-xl text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-md bg-brand px-8 py-4 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand/90"
          >
            Explore Now
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="rounded-md bg-white/20 px-8 py-4 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/30"
          >
            View Destination
          </button>
        </div>
      </div>

      {/* Search summary bar pinned to the banner bottom */}
      <div className="relative grid grid-cols-1 bg-black/40 lg:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map((field, index) => (
          <div
            key={field.label}
            className={cn(
              "flex flex-col justify-center gap-1 px-6 py-6",
              index > 0 && "border-t border-white/20 lg:border-t-0 lg:border-l",
            )}
          >
            <span className="text-base font-medium text-white md:text-lg">
              {field.label}
            </span>
            <span className="text-sm text-white/70">{field.detail}</span>
          </div>
        ))}
        <button
          type="button"
          className="bg-brand px-12 py-6 text-lg font-medium text-white transition-colors hover:bg-brand/90"
        >
          Search
        </button>
      </div>
    </section>
  );
}
