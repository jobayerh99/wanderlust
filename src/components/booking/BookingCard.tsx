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

type StatusMeta = {
  label: string;
  className: string;
  Icon: typeof Clock;
};

/** Status pill styles — keyed by the lowercased API status. */
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

/** Formats "2026-05-15" (or an ISO timestamp) as "May 15, 2026". */
function formatDepartureDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price: string | number) {
  const value = Number(price);
  return Number.isFinite(value) ? value.toLocaleString("en-US") : String(price);
}

function statusMeta(status?: string): StatusMeta {
  const key = status?.trim().toLowerCase() || "pending";
  const match = statusStyles[key];
  if (match) return match;

  // Unknown status — show it as-is with neutral styling.
  const label = status?.trim();
  return label
    ? {
        label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(),
        className: unknownStatus.className,
        Icon: unknownStatus.Icon,
      }
    : unknownStatus;
}

type BookingCardProps = {
  booking: Booking;
  /**
   * Cancel handler. Nothing is sent to the backend unless you wire this up —
   * the button stays inert without it.
   */
  onCancel?: () => void;
};

/** Horizontal booking card: cover image, status pill, trip details, actions. */
export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const { label, className, Icon } = statusMeta(booking.status);

  const bookingRef = booking.bookingId ?? booking._id;
  const destinationId = booking.destinationId ?? booking._id;

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 shadow-sm sm:flex-row">
      {/* Cover image — stretches to the card height on desktop */}
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
        <Badge className={cn(className)}>
          <Icon aria-hidden="true" />
          {label}
        </Badge>

        <h2 className="mt-2 text-xl font-semibold">{booking.destinationName}</h2>

        <div className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            Departure: {formatDepartureDate(booking.departureDate)}
          </span>
          <span className="flex items-center gap-2">
            <Hash className="size-4 shrink-0" aria-hidden="true" />
            Booking ID: {bookingRef}
          </span>
        </div>

        <p className="mt-3 text-2xl font-bold text-brand">
          ${formatPrice(booking.price)}
        </p>

        <div className="mt-auto flex items-center justify-end gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-destructive/30 bg-background text-destructive hover:bg-destructive/50 hover:text-destructive"
          >
            <Lock aria-hidden="true" />
            Cancel
          </Button>
          <Button
            render={<Link href={`/destinations/${destinationId}`} />}
            size="sm"
            className="bg-brand text-white hover:bg-brand/90"
          >
            <Eye aria-hidden="true" />
            View
          </Button>
        </div>
      </div>
    </article>
  );
}
