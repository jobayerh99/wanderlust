"use client";

import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
];

/** Round prev/next controls that live in the section header, not on the slides. */
function CarouselNav() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <div className="ml-auto flex gap-3">
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous testimonial"
        className="size-11 rounded-full"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next testimonial"
        className="size-11 rounded-full"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="border-t-[3px] border-brand bg-white px-4 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-4xl font-light md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselNav />
          </div>

          <CarouselContent className="mt-8">
            {testimonials.map(({ quote, name, location, image }) => (
              <CarouselItem key={name} className="md:basis-1/2">
                <figure className="flex h-full flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:gap-5">
                  <div className="flex flex-1 flex-col">
                    <blockquote className="text-sm leading-snug">
                      {quote}
                    </blockquote>
                    <figcaption className="mt-auto pt-6">
                      <p className="text-sm text-brand">— {name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {location}
                      </p>
                    </figcaption>
                  </div>
                  <Image
                    src={image}
                    alt={name}
                    width={144}
                    height={144}
                    className="h-32 w-full shrink-0 rounded-md object-cover sm:h-auto sm:w-36 sm:self-stretch"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
