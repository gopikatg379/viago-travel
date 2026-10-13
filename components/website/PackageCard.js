import Image from "next/image";
import Link from "next/link";

import {
  Clock3,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function PackageCard({ pkg }) {
  const isOneDayTrip = Number(pkg.days) === 1;

  return (
    <article className="card-lift group overflow-hidden rounded-[18px] kerala-card">

      {/* IMAGE */}
      <Link href={`/packages/${pkg.slug}`}>
        <div className="relative h-[270px] overflow-hidden">

          <Image
            src={pkg.image}
            alt={`${pkg.title} travel package`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          {/* IMAGE GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* CATEGORY */}
          <span className="absolute left-5 top-5 rounded-full bg-[#fffdf8]/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] !text-[#173f35] shadow-sm backdrop-blur">
            {pkg.category}
          </span>

          {/* SPECIAL OFFER - ONLY ONE DAY TRIPS */}
{isOneDayTrip && (
  <div className="absolute right-0 top-5 z-20">

    <div className="relative flex items-center bg-[#0051FF] py-2 pl-5 pr-4 shadow-[0_6px_18px_rgba(0,81,255,0.35)]">

      {/* LEFT ARROW / TAG SHAPE */}
      <span
        className="
          absolute
          -left-[14px]
          top-0
          h-full
          w-[15px]
          bg-[#0051FF]
          [clip-path:polygon(100%_0,100%_100%,0_50%)]
        "
      />

      {/* BADGE CONTENT */}
      <div className="flex items-center gap-1.5">

        <span className="text-[12px]">
          🔥
        </span>

        <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.12em] !text-white">
          Special Offer
        </span>

      </div>

    </div>

  </div>
)}

          {/* ONE DAY LABEL */}
          {isOneDayTrip && (
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#0B3042]/85 px-4 py-2 text-xs font-bold !text-white shadow-md backdrop-blur-md">
              <Clock3 size={14} />
              One Day Trip
            </span>
          )}

        </div>
      </Link>

      {/* CARD CONTENT */}
      <div className="p-6">

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-sm text-[#7a827e]">

          <MapPin
            size={15}
            className="text-[#b78334]"
          />

          {pkg.destination}, {pkg.country}

        </div>

        {/* TITLE */}
        <Link href={`/packages/${pkg.slug}`}>

          <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#173f35] transition duration-300 group-hover:text-[#0051FF]">
            {pkg.title}
          </h3>

        </Link>

        {/* DESCRIPTION */}
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#6e746f]">
          {pkg.shortDescription}
        </p>

        {/* BOTTOM */}
        <div className="mt-6 border-t border-[#173f35]/10 pt-5">

          <div className="flex items-end justify-between gap-4">

            <div>

              {/* DURATION */}
              <div className="flex items-center gap-2 text-xs text-[#747d78]">

                <Clock3 size={14} />

                {isOneDayTrip
                  ? "One Day Trip"
                  : pkg.duration}

              </div>

              {/* PRICE */}
              <div className="mt-2">

                {/* ORIGINAL PRICE */}
                {pkg.originalPrice &&
                  Number(pkg.originalPrice) >
                    Number(pkg.price) && (

                  <div className="mb-0.5 flex items-center gap-2">

                    <span className="text-xs text-[#9ca3af] line-through">
                      ₹
                      {Number(
                        pkg.originalPrice
                      ).toLocaleString("en-IN")}
                    </span>

                    {isOneDayTrip && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-[#0051FF]">
                        Offer Price
                      </span>
                    )}

                  </div>
                )}

                <div className="flex items-end">

                  <span
                    className={`text-xl font-extrabold ${
                      isOneDayTrip
                        ? "text-[#0051FF]"
                        : "text-[#173f35]"
                    }`}
                  >
                    ₹
                    {Number(
                      pkg.price
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-xs text-[#8b918e]">
                    onwards
                  </span>

                </div>

              </div>

            </div>

            {/* VIEW BUTTON */}
            <Link
              href={`/packages/${pkg.slug}`}
              aria-label={`View ${pkg.title}`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#173f35]/20 !text-[#173f35] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0051FF] hover:bg-[#0051FF] hover:!text-white"
            >
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </div>

    </article>
  );
}