
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  ShieldCheck,
  Headphones,
  Clock,
  Tag,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EditDestinationDialoge from "@/components/destination/EditDestinationDialoge";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";

interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const DestinationDetails = async ({
  id,
}: {
  id: string;
}) => {
  const res = await fetch(
    `http://localhost:8000/destination/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destination details");
  }

  const result = await res.json();

  // Supports either { data: destination } or direct destination response.
  const destination: Destination = result.data ?? result;

  const formattedDate = new Date(
    `${destination.departureDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Header Actions */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={15} />
            Back to Destinations
          </Link>

          <div className="flex gap-2">

            <EditDestinationDialoge destination={destination} />

            <DeleteDestinationDialog id={id} />
            
          </div>
        </div>

        {/* Destination Image */}
        <div className="h-[230px] overflow-hidden rounded-lg bg-gray-100 sm:h-[350px] lg:h-[430px]">
          <img
            src={destination.imageUrl}
            alt={destination.destinationName}
            className="h-full w-full object-cover"
          />
        </div>

        <Separator className="my-6" />

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">

          {/* Left Content */}
          <div className="space-y-7">

            {/* Destination Information */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={15} />
                {destination.country.trim()}
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {destination.destinationName}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                  <Tag size={15} />
                  <Badge
                    variant="secondary"
                    className="font-medium"
                  >
                    {destination.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={15} />
                  {destination.duration}
                </div>
              </div>
            </section>

            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Overview
              </h2>

              <p className="max-w-3xl text-sm leading-7 text-gray-500">
                {destination.description}
              </p>
            </section>

            {/* Trip Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Trip Information
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
                  <CalendarDays
                    size={19}
                    className="mt-0.5 text-cyan-600"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Departure Date
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
                  <Clock
                    size={19}
                    className="mt-0.5 text-cyan-600"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Trip Duration
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {destination.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
                  <MapPin
                    size={19}
                    className="mt-0.5 text-cyan-600"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Destination
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {destination.destinationName}, {destination.country.trim()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
                  <Tag
                    size={19}
                    className="mt-0.5 text-cyan-600"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Travel Category
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {destination.category}
                    </p>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* Booking Sidebar */}
          <aside>
            <Card className="sticky top-6 rounded-lg border-gray-200 shadow-sm">
              <CardContent className="space-y-5 p-5">

                {/* Price */}
                <div>
                  <p className="text-xs text-gray-500">
                    Starting from
                  </p>

                  <p className="mt-1 text-3xl font-bold text-cyan-600">
                    ${Number(destination.price).toLocaleString("en-US")}
                  </p>

                  <p className="text-xs text-gray-500">
                    per person
                  </p>
                </div>

                <Separator />

                {/* Departure Date */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    Departure Date
                  </label>

                  <div className="flex h-11 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700">
                    <CalendarDays
                      size={15}
                      className="text-gray-400"
                    />
                    {formattedDate}
                  </div>
                </div>

                {/* Booking Button */}
                <Link
                  href={`/destinations/${id}/booking`}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 text-sm font-medium text-white hover:bg-cyan-700"
                >
                  Book Now
                  <ArrowRight size={16} />
                </Link>

                {/* Benefits */}
                <div className="space-y-3">

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Check
                      size={15}
                      className="text-green-600"
                    />
                    Free cancellation up to 7 days
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ShieldCheck
                      size={15}
                      className="text-green-600"
                    />
                    Secure travel booking
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Headphones
                      size={15}
                      className="text-green-600"
                    />
                    24/7 customer support
                  </div>

                </div>

                <Separator />

                <p className="text-center text-xs text-gray-400">
                  Your next adventure starts here!
                </p>

              </CardContent>
            </Card>
          </aside>

        </div>
      </div>
    </main>
  );
};

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-6">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-[350px] rounded-lg bg-gray-200" />
          <div className="h-8 w-64 rounded bg-gray-200" />
        </div>
      }
    >
      <DestinationDetails id={id} />
    </Suspense>
  );
};

export default DestinationDetailsPage;
