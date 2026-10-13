"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Instagram,
  Facebook,
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


      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-[#fffdf8]/80 shadow-[0_4px_24px_rgba(23,63,53,0.06)] backdrop-blur-xl">
        <div className="container-site flex h-[94px] items-center justify-between">

          {/* LOGO */}
          <Logo />

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center lg:flex">

            <nav className="flex items-center gap-8">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative py-3 font-serif text-[16px] font-semibold tracking-[0.02em] !text-[#263b32] transition-colors duration-300 hover:!text-[#0051FF]"
                >
                  {label}

                  {/* Animated underline */}
                  <span
                    className="
                      absolute bottom-1 left-1/2
                      h-[2px] w-0
                      -translate-x-1/2
                      rounded-full
                      bg-[#0051FF]
                      transition-all duration-300
                      group-hover:w-full
                    "
                  />
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-5 h-6 w-px bg-[#173f35]/20" />

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-2">

              <a
                href="https://www.instagram.com/viago_trips_?igsi=NDB3dm8xeWpjaWRt"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"  
                className="
                  grid h-9 w-9 place-items-center
                  rounded-full
                  border border-[#173f35]/15
                  !text-[#173f35]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#0051FF]
                  hover:bg-[#0051FF]
                  hover:!text-white
                "
              >
                <Instagram size={17} />
              </a>

              <a
                href="https://www.facebook.com/people/viago-trips/61588733623985/?rdid=FREEW9Zmi6nKdN1R&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19PP4Hkzyt%2F"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="
                  grid h-9 w-9 place-items-center
                  rounded-full
                  border border-[#173f35]/15
                  !text-[#173f35]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#0051FF]
                  hover:bg-[#0051FF]
                  hover:!text-white
                "
              >
                <Facebook size={17} />
              </a>

            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="nav-journey-btn hidden items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-sm transition-all duration-300 lg:inline-flex"
          >
            <span>Plan a Journey</span>

            <ArrowUpRight
              size={17}
              strokeWidth={2}
            />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#173f35]/20 text-[#173f35] transition hover:border-[#0051FF] hover:text-[#0051FF] lg:hidden"
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
                    className="
                      border-b border-[#173f35]/10
                      py-4
                      font-serif
                      text-[17px]
                      font-semibold
                      !text-[#31473e]
                      transition-all duration-300
                      hover:pl-2
                      hover:!text-[#0051FF]
                    "
                  >
                    {label}
                  </Link>
                ))}

                {/* MOBILE SOCIAL ICONS */}
                <div className="flex items-center gap-3 py-5">

                  <a
                    href="https://www.instagram.com/viago_trips_?igsi=NDB3dm8xeWpjaWRt"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#173f35]/15 !text-[#173f35] transition hover:border-[#0051FF] hover:bg-[#0051FF] hover:!text-white"
                  >
                    <Instagram size={18} />
                  </a>

                  <a
                    href="https://www.facebook.com/people/viago-trips/61588733623985/?rdid=FREEW9Zmi6nKdN1R&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19PP4Hkzyt%2F"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#173f35]/15 !text-[#173f35] transition hover:border-[#0051FF] hover:bg-[#0051FF] hover:!text-white"
                  >
                    <Facebook size={18} />
                  </a>

                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="nav-journey-btn mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-bold"
                >
                  <span>Plan a Journey</span>
                  <ArrowUpRight size={17} />
                </Link>

              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}