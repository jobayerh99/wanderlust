
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CircleCheckBig,
  CircleX,
  Clock,
  Eye,
  Hash,
  Lock,
} from "lucide-react";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/lib/bookings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type StatusMeta = {
  label: string;
  className: string;
  Icon: typeof Clock;
};

/* Status pill styles */
const statusStyles: Record<string, StatusMeta> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-50 text-green-700 hover:bg-green-50",
    Icon: CircleCheckBig,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 hover:bg-amber-50",
    Icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 hover:bg-red-50",
    Icon: CircleX,
  },
};

const unknownStatus: StatusMeta = {
  label: "Pending",
  className: "bg-muted text-muted-foreground hover:bg-muted",
  Icon: Clock,
};

/* Format departure date */
function formatDepartureDate(value?: string) {
  if (!value) return "—";

  const date = new Date(
    value.includes("T") ? value : `${value}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* Format price */
function formatPrice(price: string | number) {
  const value = Number(price);

  return Number.isFinite(value)
    ? value.toLocaleString("en-US")
    : String(price);
}

/* Get booking status */
function statusMeta(status?: string): StatusMeta {
  const key = status?.trim().toLowerCase() || "pending";
  const match = statusStyles[key];

  if (match) return match;

  const label = status?.trim();

  return label
    ? {
      label:
        label.charAt(0).toUpperCase() +
        label.slice(1).toLowerCase(),
      className: unknownStatus.className,
      Icon: unknownStatus.Icon,
    }
    : unknownStatus;
}

type BookingCardProps = {
  booking: Booking;
  onCancel?: () => void | Promise<void>;
};

/* Booking Card Component */
export function BookingCard({ booking, onCancel }: BookingCardProps) {

  const router = useRouter();

  const [isCancelling, setIsCancelling] = useState(false);

  /* Cancel Booking */
  const handleCancelBooking = async () => {
    try {
      setIsCancelling(true);

      const res = await fetch(
        `http://localhost:8000/mybookings/${booking._id}`,
        {
          method: "DELETE",
        }
      );

      // Read response safely
      const responseText = await res.text();

      let data;

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      // Handle API errors
      if (!res.ok) {
        throw new Error(
          data.message || "Failed to cancel booking."
        );
      }

      // The API answers 200 even when nothing matched (deletedCount: 0) —
      // never report success in that case, or the list looks "stale".
      if (data?.deletedCount === 0) {
        throw new Error(
          "Booking not found. It may already be cancelled."
        );
      }

      // Success notification
      toast.success("Booking Cancelled!", {
        description: "Your booking has been cancelled successfully.",
      });

      // Run optional parent callback
      await onCancel?.();

      // Refresh server components
      router.refresh();

    } catch (error) {
      console.error("Cancel booking error:", error);

      toast.error("Cancellation Failed!", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });

    } finally {
      setIsCancelling(false);
    }
  };

  const { label, className, Icon } = statusMeta(booking.status);

  const bookingRef = booking.bookingId ?? booking._id;
  const destinationId = booking.destinationId ?? booking._id;

  const isCancelled =
    booking.status?.trim().toLowerCase() === "cancelled";

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 shadow-sm sm:flex-row">

      {/* Cover image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-auto sm:min-h-32 sm:w-52">
        <Image
          src={booking.imageUrl}
          alt={booking.destinationName}
          fill
          sizes="(max-width: 640px) 100vw, 208px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Status */}
        <Badge className={cn(className)}>
          <Icon aria-hidden="true" />
          {label}
        </Badge>

        <h2 className="mt-2 text-xl font-semibold">
          {booking.destinationName}
        </h2>

        {/* Booking information */}
        <div className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">

          <span className="flex items-center gap-2">
            <CalendarDays
              className="size-4 shrink-0"
              aria-hidden="true"
            />
            Departure: {formatDepartureDate(booking.departureDate)}
          </span>

          <span className="flex items-center gap-2">
            <Hash
              className="size-4 shrink-0"
              aria-hidden="true"
            />
            Booking ID: {bookingRef}
          </span>

        </div>

        {/* Price */}
        <p className="mt-3 text-2xl font-bold text-brand">
          ${formatPrice(booking.price)}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-end gap-2 pt-4">

          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleCancelBooking}
            disabled={isCancelling || isCancelled}
            className="border-destructive/30 bg-background text-destructive hover:bg-destructive/50 hover:text-destructive"
          >
            <Lock aria-hidden="true" />
            {isCancelling
              ? "Cancelling..."
              : isCancelled
                ? "Cancelled"
                : "Cancel"}
          </Button>

          <Link
            href={`/destinations/${destinationId}`}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-brand px-3 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            <Eye aria-hidden="true" size={16} />
            View
          </Link>

        </div>
      </div>
    </article>
  );
}
