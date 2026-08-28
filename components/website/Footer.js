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
    <footer className="bg-[#102f28] text-white">
      <div className="container-site">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.7fr_1fr]">
          <div>
            <Logo light />

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Thoughtfully planned journeys from
              Kerala to places near and far.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center border border-white/20"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center border border-white/20"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#e3bd78]">
              Explore
            </h3>

            <div className="mt-5 grid gap-3 text-sm text-white/60">
              <Link href="/packages">
                Packages
              </Link>

              <Link href="/destinations">
                Destinations
              </Link>

              <Link href="/about">
                About Viago
              </Link>

              <Link href="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#e3bd78]">
              Popular
            </h3>

            <div className="mt-5 grid gap-3 text-sm text-white/60">
              <Link href="/packages?destination=Kumarakom">
                Kumarakom
              </Link>

              <Link href="/packages?destination=Alleppey">
                Alleppey
              </Link>

              <Link href="/packages?destination=Munnar">
                Munnar
              </Link>

              <Link href="/packages?destination=Wayanad">
                Wayanad
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#e3bd78]">
              Reach us
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-white/60">
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

        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
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