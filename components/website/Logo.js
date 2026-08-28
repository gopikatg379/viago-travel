import Image from "next/image";
import Link from "next/link";

export default function Logo({ light = false }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-3"
      aria-label="Viago Trips Home"
    >
      {/* Circular Logo */}
      <div
        className={`relative flex h-[64px] w-[64px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 ${
          light
            ? "border-white/40 bg-white"
            : "border-[#c7923e] bg-white"
        }`}
      >
        <Image
          src="/images/viago-logo.png"
          alt="Viago"
          fill
          priority
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      {/* Trips */}
      <div className="flex items-center gap-3">
        <span
          className={`hidden h-px w-5 sm:block ${
            light ? "bg-white/50" : "bg-[#c7923e]"
          }`}
        />

        <span
          className={`text-[17px] font-bold uppercase tracking-[0.28em] ${
            light ? "text-white" : "text-[#173f35]"
          }`}
        >
          Trips
        </span>
      </div>
    </Link>
  );
}