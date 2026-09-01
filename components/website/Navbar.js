"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
} from "lucide-react";

import Logo from "./Logo";
import { siteConfig } from "@/lib/config";

const links = [
  ["Home", "/"],
  ["Packages", "/packages"],
  ["Destinations", "/destinations"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}

      <div className="hidden bg-[#173f35] text-white md:block">
        <div className="container-site flex h-10 items-center justify-between text-[13px]">
          <span className="font-serif text-lg italic tracking-wide text-[#f2d39a] md:text-l">
            Thoughtfully planned holidays from Kerala
          </span>

          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 font-semibold text-white"
          >
            <Phone size={14} />

            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* MAIN NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-[#173f35]/10 bg-[#fffdf8]/95 backdrop-blur-xl">
        <div className="container-site flex h-[94px] items-center justify-between">
          {/* LOGO */}

          <Logo />

          {/* DESKTOP LINKS */}

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-[15px] font-semibold text-[#1d2924] transition-colors duration-200 hover:text-[#3A86FF]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}

          <Link
  href="/contact"
  className="nav-journey-btn hidden items-center gap-2 rounded-[8px] px-6 py-3.5 text-sm font-bold shadow-sm transition-all duration-200 lg:inline-flex"
>
  <span>Plan a Journey</span>

  <ArrowUpRight
    size={17}
    strokeWidth={2}
  />
</Link>

          {/* MOBILE MENU */}

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-md border border-[#173f35]/20 text-[#173f35] lg:hidden"
          >
            {open ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>

        {/* MOBILE NAV */}

        {open && (
          <div className="border-t border-[#173f35]/10 bg-[#fffdf8] lg:hidden">
            <div className="container-site py-5">
              <nav className="grid">
                {links.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="border-b border-[#173f35]/10 py-4 font-semibold text-[#31473e]"
                  >
                    {label}
                  </Link>
                ))}

                <Link
  href="/contact"
  onClick={() => setOpen(false)}
  className="nav-journey-btn mt-5 flex items-center justify-center gap-2 rounded-md px-5 py-3.5 font-bold"
>
  <span>Plan a Journey</span>

  <ArrowUpRight
    size={17}
  />
</Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}