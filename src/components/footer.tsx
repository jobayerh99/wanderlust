import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks: FooterLink[] = [
  { label: "Help Center", href: "/help-center" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contact = {
  phone: "786 901 1622",
  email: "info@wanderland.com",
} as const;

/** Column heading style shared by all four footer columns. */
const columnHeadingClassName =
  "text-sm font-medium uppercase tracking-[0.18em] text-white/90";

/** Dim link style shared by the link columns. */
const linkClassName =
  "text-sm text-white/60 transition-colors hover:text-white";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 21.95H3.555V9h3.564v12.953ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

const socialLinks = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
] as const;

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className={columnHeadingClassName}>{heading}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={linkClassName}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 pt-14 pb-7 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Brand statement */}
        <p className="text-6xl leading-none font-bold tracking-tight md:text-8xl lg:text-9xl">
          Wanderlast
        </p>
        <p className="mt-4 text-sm text-white/60 md:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Link columns + newsletter signup */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1.3fr_1.4fr_1fr]">
          <div>
            <h3 className={columnHeadingClassName}>Newsletter</h3>
            <p className="mt-4 max-w-xs text-xs text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-4 max-w-[13.5rem]">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="h-10 w-full rounded-md bg-neutral-800 pr-10 pl-4 text-sm text-white transition-colors placeholder:text-white/50 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
              >
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          <LinkColumn heading="Quick Links" links={quickLinks} />
          <LinkColumn heading="Support" links={supportLinks} />
          <div>
            <h3 className={columnHeadingClassName}>Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className={linkClassName}
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={linkClassName}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-white/80 transition-colors hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
