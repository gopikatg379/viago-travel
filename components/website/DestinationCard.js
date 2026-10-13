import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

export default function DestinationCard({
  item,
  index = 0,
}) {
  const tall = index % 4 === 0 || index % 4 === 3;

  return (
    <Link
      href={`/packages?destination=${encodeURIComponent(
        item.name
      )}`}
      className={`group relative block overflow-hidden rounded-[4px] ${
        tall ? "h-[430px]" : "h-[330px]"
      }`}
    >
      <Image
        src={item.image}
        alt={`${item.name}, Kerala`}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102a23]/95 via-[#102a23]/20 to-transparent" />

      {/* Kerala label */}
      <div className="absolute left-5 top-5">
        <span className="inline-flex items-center gap-1.5 bg-[#fffdf8]/95 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#173f35]">
          <MapPin size={12} />
          Kerala
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e8c986]">
          {item.subtitle || "God's Own Country"}
        </p>

        <div className="flex items-end justify-between gap-5">
          <div>
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              {item.name}
            </h3>

            <p className="mt-1 text-xs text-white/65">
              Explore {item.name}
            </p>
          </div>

          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-white transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#173f35]">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}