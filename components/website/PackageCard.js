import Image from "next/image";
import Link from "next/link";

import {
  Clock3,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function PackageCard({ pkg }) {
  return (
    <article className="card-lift group overflow-hidden rounded-[18px] kerala-card">
      <Link href={`/packages/${pkg.slug}`}>
        <div className="relative h-[270px] overflow-hidden">
          <Image
            src={pkg.image}
            alt={`${pkg.title} travel package`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <span className="absolute left-5 top-5 bg-[#fffdf8] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#173f35]">
            {pkg.category}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-[#7a827e]">
          <MapPin
            size={15}
            className="text-[#b78334]"
          />

          {pkg.destination}, {pkg.country}
        </div>

        <Link href={`/packages/${pkg.slug}`}>
          <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#173f35] transition group-hover:text-[#3A86FF]">
            {pkg.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#6e746f]">
          {pkg.shortDescription}
        </p>

        <div className="mt-6 border-t border-[#173f35]/10 pt-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#747d78]">
                <Clock3 size={14} />
                {pkg.duration}
              </div>

              <div className="mt-2">
                <span className="text-xl font-extrabold text-[#173f35]">
                  ₹
                  {Number(pkg.price).toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="ml-1 text-xs text-[#8b918e]">
                  onwards
                </span>
              </div>
            </div>

            <Link
              href={`/packages/${pkg.slug}`}
              aria-label={`View ${pkg.title}`}
              className="grid h-11 w-11 place-items-center border border-[#173f35]/20 text-[#173f35] transition hover:bg-[#173f35] hover:text-white"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}