import Image from "next/image";
import Link from "next/link";
import { MenuIcon, UserIcon, type LucideIcon } from "lucide-react";
import { cn } from "cn";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavLinkItem = {
  label: string;
  href: string;
  /** Marks the link for the current page (mock shows Home active). */
  active?: boolean;
  icon?: LucideIcon;
};

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const accountLinks: NavLinkItem[] = [
  { label: "Profile", href: "/profile", icon: UserIcon },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

/** Shared tap-friendly styling for links inside the mobile sheet. */
const sheetLinkClassName = "rounded-md px-3 py-2.5 text-base hover:bg-muted";

function NavLink({ link, className }: { link: NavLinkItem; className?: string }) {
  const Icon = link.icon;
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
      {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
      {link.label}
    </Link>
  );
}

export function Navbar() {
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
              {accountLinks.map((link) => (
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
        {accountLinks.map((link) => (
          <NavLink key={link.label} link={link} />
        ))}
      </nav>
    </header>
  );
}
