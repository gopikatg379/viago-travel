import Link from "next/link";

import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Logo from "./Logo";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#0051FF] text-white">
      <div className="container-site">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.7fr_1fr]">

          {/* BRAND */}
          <div>
            <Logo light />

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/75">
              Thoughtfully planned journeys from
              Kerala to places near and far.
            </p>

            <div className="mt-6 flex gap-3">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/viago_trips_?igsi=NDB3dm8xeWpjaWRt"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="group grid h-10 w-10 place-items-center rounded-full border border-white/25 !text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
  >
    <Instagram
      size={17}
      className="!text-white transition-colors duration-300 group-hover:!text-[#0051FF]"
    />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/people/viago-trips/61588733623985/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="group grid h-10 w-10 place-items-center rounded-full border border-white/25 !text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
  >
    <Facebook
      size={17}
      className="!text-white transition-colors duration-300 group-hover:!text-[#0051FF]"
    />
  </a>
</div>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Explore
            </h3>

            <div className="mt-5 grid gap-3 text-sm text-white/70">
              <Link
                href="/packages"
                className="transition hover:text-white"
              >
                Packages
              </Link>

              <Link
                href="/destinations"
                className="transition hover:text-white"
              >
                Destinations
              </Link>

              <Link
                href="/about"
                className="transition hover:text-white"
              >
                About Viago
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* POPULAR */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Popular
            </h3>

            <div className="mt-5 grid gap-3 text-sm text-white/70">
              <Link
                href="/packages?destination=Kumarakom"
                className="transition hover:text-white"
              >
                Kumarakom
              </Link>

              <Link
                href="/packages?destination=Alleppey"
                className="transition hover:text-white"
              >
                Alleppey
              </Link>

              <Link
                href="/packages?destination=Munnar"
                className="transition hover:text-white"
              >
                Munnar
              </Link>

              <Link
                href="/packages?destination=Wayanad"
                className="transition hover:text-white"
              >
                Wayanad
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Reach us
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-white/70">
              <span className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="mt-0.5 shrink-0"
                />
                {siteConfig.phone}
              </span>

              <span className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="mt-0.5 shrink-0"
                />
                {siteConfig.email}
              </span>

              <span className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0"
                />
                {siteConfig.address}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col justify-between gap-3 border-t border-white/20 py-6 text-xs text-white/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Viago.
            All rights reserved.
          </span>

          <span>
            Travel thoughtfully. Travel well.
          </span>
        </div>
      </div>
    </footer>
  );
}