'use client'

import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

type NavLinkItem = {
  label: string;
  href: string;
  /** Marks the link for the current page (mock shows Home active). */
  active?: boolean;
  /** Only shown when there is no signed-in user. */
  guestOnly?: boolean;
};

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

// The avatar popover doubles as the profile entry point, so no Profile link.
const accountLinks: NavLinkItem[] = [
  { label: "Login", href: "/login", guestOnly: true },
  { label: "Sign Up", href: "/signup", guestOnly: true },
];

/** Shared tap-friendly styling for links inside the mobile sheet. */
const sheetLinkClassName = "rounded-md px-3 py-2.5 text-base hover:bg-muted";

function NavLink({ link, className }: { link: NavLinkItem; className?: string }) {
  return (
    <Link
      href={link.href}
      aria-current={link.active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 transition-colors hover:text-brand",
        link.active
          ? "text-brand underline decoration-2 underline-offset-4"
          : "text-foreground",
        className,
      )}
    >
      {link.label}
    </Link>
  );
}

export function Navbar() {

  const { data: session } = authClient.useSession()
  const user = session?.user;

  // Guests see Login/Sign Up; signed-in users use the avatar popover instead.
  const visibleAccountLinks = accountLinks.filter((link) =>
    user ? !link.guestOnly : true,
  );

  const handleSignOut = () => {
    authClient.signOut()
  }

  return (
    <header className="grid h-20 shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-background px-4 md:px-9">
      {/* Left slot: hamburger on mobile, inline nav on desktop */}
      <div className="flex items-center gap-8">
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring md:hidden"
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Menu">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  link={link}
                  className={sheetLinkClassName}
                />
              ))}
              <div className="my-2 border-t border-border" />
              {visibleAccountLinks.map((link) => (
                <NavLink
                  key={link.label}
                  link={link}
                  className={sheetLinkClassName}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
        </nav>
      </div>

      {/* Center: logo */}
      <Link href="/" className="justify-self-center">
        <Image
          src="/assets/Wanderlast.png"
          alt="Wanderlast"
          width={162}
          height={24}
        />
      </Link>



      {/* Right: account actions */}
      <nav
        className="hidden items-center justify-end gap-8 md:flex"
        aria-label="Account"
      >


        {user ? (
          <Popover>
            <PopoverTrigger
              render={
                <button type="button" aria-label="Open account menu">
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image as string}
                    />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              }
            />

            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user.name}</PopoverTitle>
                <PopoverDescription>{user.email}</PopoverDescription>

                <Button onClick={handleSignOut} variant="destructive">
                  Sign out
                </Button>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ) : null}
        {visibleAccountLinks.map((link) => (
          <NavLink key={link.label} link={link} />
        ))}
      </nav>
    </header>
  );
}
