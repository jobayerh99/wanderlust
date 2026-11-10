import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeftIcon,
    CalendarIcon,
    MapPinIcon,
    TagIcon,
} from "lucide-react";

import { getDestinations } from "@/lib/destinations";

const DestinationDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const destinations = await getDestinations();
    const destination = destinations.find((item) => item._id === id);

    if (!destination) notFound();

    const { destinationName, country, category, price, duration, departureDate, imageUrl, description } =
        destination;

    return (
        <main className="flex-1 px-4 py-10 md:px-8 md:py-14">
            <div className="mx-auto w-full max-w-4xl">
                <Link
                    href="/destinations"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                    <ArrowLeftIcon className="size-4" aria-hidden="true" />
                    Back to destinations
                </Link>

                <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                        src={imageUrl}
                        alt={destinationName}
                        fill
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
                    <h1 className="text-4xl font-light">{destinationName}</h1>
                    <p>
                        <span className="text-2xl font-semibold">${price}</span>
                        <span className="text-sm text-muted-foreground"> /Person</span>
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <MapPinIcon className="size-4" aria-hidden="true" />
                        {country}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <TagIcon className="size-4" aria-hidden="true" />
                        {category}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <CalendarIcon className="size-4" aria-hidden="true" />
                        {duration} &middot; Departs {departureDate}
                    </span>
                </div>

                <p className="mt-6 leading-relaxed">{description}</p>

                {/* Placeholder until a booking flow exists */}
                <button
                    type="button"
                    className="mt-8 inline-flex items-center gap-3 rounded-md bg-brand px-8 py-4 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand/90"
                >
                    Book Now
                </button>
            </div>
        </main>
    );
};

export default DestinationDetailPage;
