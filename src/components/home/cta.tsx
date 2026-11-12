import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

/**
 * Full-bleed call-to-action band with the airplane photo behind it.
 * The photo ships bright, so a dark overlay keeps the white copy readable.
 */
export function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/assets/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative flex flex-col items-center px-4 py-24 text-center text-white md:py-28">
        <h2 className="text-4xl leading-[1.1] font-light md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-6 text-base text-white/85">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button
          type="button"
          className="mt-10 inline-flex items-center gap-6 rounded-sm bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-black uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
