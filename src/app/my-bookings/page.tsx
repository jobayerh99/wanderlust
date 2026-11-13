import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/bookings";
import { BookingCard } from "@/components/booking/BookingCard";
import { Button } from "@/components/ui/button";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const bookings = await getBookings(user?.email);

    return (
        <main className="flex flex-1 flex-col px-4 py-10 md:px-8 md:py-14">
            <div className="mx-auto w-full max-w-6xl">
                <h1 className="text-4xl font-light">My Bookings</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    Manage and view your upcoming travel plans
                </p>

                {!user ? (
                    <div className="mt-10 rounded-xl border border-border bg-background p-10 text-center">
                        <p className="text-muted-foreground">
                            Log in to see your bookings.
                        </p>
                        <Button
                            render={<Link href="/login" />}
                            className="mt-4 bg-brand text-white hover:bg-brand/90"
                        >
                            Log In
                        </Button>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="mt-10 rounded-xl border border-border bg-background p-10 text-center">
                        <p className="text-muted-foreground">
                            No trips booked yet.
                        </p>
                        <Button
                            render={<Link href="/destinations" />}
                            className="mt-4 bg-brand text-white hover:bg-brand/90"
                        >
                            Explore Destinations
                        </Button>
                    </div>
                ) : (
                    <div className="mt-8 flex flex-col gap-5">
                        {bookings.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyBookingsPage;
