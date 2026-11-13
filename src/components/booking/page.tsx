
"use client";

import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import {
    ArrowRight,
    CalendarDays,
    Check,
    Headphones,
    ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

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

interface BookingData extends Destination {
    userName?: string;
    email?: string;
    image?: string | null;
    bookingDate: Date;
}

const BookingPage = ({
    destination,
    id,
}: {
    destination: Destination;
    id: string;
}) => {
    const [departureDate, setDepartureDate] = useState(() => {
        if (!destination.departureDate) return "";

        const date = new Date(destination.departureDate);

        return Number.isNaN(date.getTime())
            ? ""
            : date.toISOString().split("T")[0];
    });

    const today = new Date().toISOString().split("T")[0];
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const departureDate = (e.target as HTMLFormElement & {
            departureDate: HTMLInputElement;
        }).departureDate.value
        
        const data: BookingData = {
            userName: user?.name,
            email: user?.email,
            image: user?.image,
            ...destination,
            departureDate: departureDate,
            bookingDate: new Date()
        }
        
        const res = await fetch('http://localhost:8000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const bookingRes = await res.json()
        console.log(bookingRes);
    }

    return (
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

                    <form onSubmit={handleBooking}>
                        {/* Departure Date */}
                        <div className="space-y-2">
                            <label
                                htmlFor="departureDate"
                                className="text-xs font-medium text-gray-600"
                            >
                                Departure Date
                            </label>

                            <div className="relative">
                                <CalendarDays
                                    size={15}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    name="departureDate"
                                    id="departureDate"
                                    type="date"
                                    value={departureDate}
                                    onChange={(e) =>
                                        setDepartureDate(e.target.value)
                                    }
                                    min={today}
                                    className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                />
                            </div>
                        </div>

                        {/* Booking Button */}
                        <Button
                            type="submit"
                            disabled={!departureDate || departureDate < today}
                            // onClick={() =>
                            //     router.push(
                            //         `/destinations/${id}/booking?departureDate=${departureDate}`,
                            //     )
                            // }
                            className="h-11 w-full bg-cyan-600 text-sm font-medium text-white hover:bg-cyan-700"
                        >
                            Book Now
                            <ArrowRight size={16} />
                        </Button>
                    </form>

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
    );
};

export default BookingPage;
