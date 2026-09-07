import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CheckCircle2,
  XCircle,
  Clock3,
  MapPin,
  MessageCircle,
  ArrowRight,
  Hotel,
  Car,
} from "lucide-react";

import WebsiteShell from "@/components/website/WebsiteShell";
import CTASection from "@/components/website/CTASection";

import { getPackageBySlug } from "@/lib/packages";
import { whatsappUrl, siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return {};
  }

  return {
    title: pkg.seoTitle || pkg.title,

    description:
      pkg.seoDescription ||
      pkg.shortDescription,

    alternates: {
      canonical: `/packages/${pkg.slug}`,
    },

    openGraph: {
      title: pkg.title,
      description: pkg.shortDescription,
      images: [pkg.image],
    },

    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description: pkg.shortDescription,
      images: [pkg.image],
    },
  };
}

const lines = (value) =>
  String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default async function PackageDetail({
  params,
}) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg || pkg.active === false) {
    notFound();
  }

  const isOneDayTrip = Number(pkg.days) === 1;

  const msg = `Hi Viago, I'm interested in the ${pkg.title} ${pkg.duration} package. Please send me more details.`;

  return (
    <WebsiteShell>

      {/* HERO */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#0B3042] text-white">

        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3042] via-[#0B3042]/45 to-transparent" />

        <div className="container-site relative z-10 flex min-h-[520px] items-end py-14">

          <div className="max-w-4xl">

            <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-md">
              {pkg.category}
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              {pkg.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-5 text-white/80">

              <span className="flex items-center gap-2">
                <MapPin size={17} />
                {pkg.destination}, {pkg.country}
              </span>

              <span className="flex items-center gap-2">
                <Clock3 size={17} />
                {pkg.duration}
              </span>

            </div>

          </div>
        </div>

      </section>

      {/* CONTENT */}
      <section className="section-pad">

        <div className="container-site grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}
          <div>

            {/* OVERVIEW */}
            <h2 className="text-3xl font-black tracking-tight text-[#0B3042]">
              Overview
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
              {pkg.description}
            </p>

            {/* HIGHLIGHTS */}
            {lines(pkg.highlights).length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">

                {lines(pkg.highlights).map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-[#0051FF]/10 bg-[#f4f8ff] p-4 font-semibold text-[#0B3042]"
                  >
                    <CheckCircle2
                      className="shrink-0 text-[#0051FF]"
                      size={20}
                    />

                    {item}
                  </div>
                ))}

              </div>
            )}

            {/* GALLERY */}
            {pkg.images?.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl font-black text-[#0B3042]">
                  Gallery
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  {pkg.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative h-64 overflow-hidden rounded-3xl"
                    >
                      <Image
                        src={img.image}
                        alt={`${pkg.title} gallery`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}

                </div>
              </>
            )}

{/* ITINERARY */}
<h2 className="mt-12 text-3xl font-black text-[#0B3042]">
  {isOneDayTrip ? "Trip Itinerary" : "Day-by-day Itinerary"}
</h2>

<div className="mt-6 grid gap-4">

  {isOneDayTrip ? (

    /* =========================
       ONE DAY TRIP
       ========================= */
    (pkg.itineraries || []).length > 0 ? (

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex items-start gap-4">

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#eaf2ff] text-[#0051FF]">
            <MapPin size={21} />
          </div>

          <div className="min-w-0">

            {/* Use first itinerary title */}
            <h3 className="text-xl font-extrabold text-[#0B3042]">
              {pkg.itineraries[0]?.title || pkg.title}
            </h3>

            {/* Combine all itinerary content */}
            <div className="mt-4 grid gap-3">

              {pkg.itineraries.map((item, index) => {

                const text =
                  index === 0
                    ? item.description
                    : [item.title, item.description]
                        .filter(Boolean)
                        .join(" ");

                if (!text) return null;

                return (
                  <p
                    key={item.id || index}
                    className="whitespace-pre-line text-sm leading-7 text-slate-600"
                  >
                    {text}
                  </p>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    ) : (

      <p className="rounded-2xl bg-slate-50 p-5 text-slate-500">
        Detailed trip plan will be shared with your final quotation.
      </p>

    )

  ) : (

    /* =========================
       MULTI DAY TRIP
       ========================= */
    (pkg.itineraries || []).length > 0 ? (

      pkg.itineraries.map((item) => (

        <div
          key={item.id || item.day}
          className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 sm:grid-cols-[85px_1fr]"
        >

          <div className="flex h-14 items-center justify-center rounded-2xl bg-[#0051FF] px-3 text-sm font-black !text-white">
            Day {item.day}
          </div>

          <div>

            <h3 className="text-lg font-extrabold text-[#0B3042]">
              {item.title}
            </h3>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">
              {item.description}
            </p>

          </div>

        </div>

      ))

    ) : (

      <p className="rounded-2xl bg-slate-50 p-5 text-slate-500">
        Detailed day plan will be shared with your final quotation.
      </p>

    )

  )}

</div>
            {/* INCLUSIONS / EXCLUSIONS */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">

              <Info
                title="Inclusions"
                items={lines(pkg.inclusions)}
                good
              />

              <Info
                title="Exclusions"
                items={lines(pkg.exclusions)}
              />

            </div>

            {/* HOTEL - ONLY MULTI DAY */}
            {!isOneDayTrip && (
              <div className="mt-8 rounded-3xl bg-slate-50 p-6">

                <Hotel className="text-[#0051FF]" />

                <h3 className="mt-4 text-lg font-black text-[#0B3042]">
                  Hotel details
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">
                  {pkg.hotelDetails ||
                    "Shared with final quotation."}
                </p>

              </div>
            )}

            {/* TRANSPORTATION */}
            <div className="mt-8 overflow-hidden rounded-[28px] border border-[#0051FF]/15 bg-[#f7faff] shadow-sm">

              {/* TRANSPORT HEADER */}
              <div className="flex items-center gap-4 bg-[#0B3042] px-6 py-5 sm:px-8">

                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10">

                  <Car
                    size={23}
                    className="text-white"
                  />

                </div>

                <div>

                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
                    Travel comfortably
                  </span>

                  <h3 className="mt-1 text-xl font-black text-white">
                    Vehicle & Transportation
                  </h3>

                </div>

              </div>

              {/* TRANSPORT BODY */}
              <div className="p-6 sm:p-8">

                <TransportationDetails
                  value={pkg.transportation}
                  price={pkg.price}
                  originalPrice={pkg.originalPrice}
                />

              </div>

            </div>

            {/* TERMS */}
            <div className="mt-8 rounded-3xl border border-slate-200 p-6">

              <h3 className="font-black text-[#0B3042]">
                Terms & conditions
              </h3>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">
                {pkg.terms ||
                  "Final rates and terms depend on travel dates, availability and selected services."}
              </p>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="h-fit rounded-[30px] border border-slate-100 bg-white p-7 soft-shadow lg:sticky lg:top-28">

            <div className="text-sm text-slate-400">
              Starting from
            </div>

            <div className="mt-1 text-4xl font-black text-[#0B3042]">
              ₹
              {Number(pkg.price).toLocaleString(
                "en-IN"
              )}
            </div>

            {pkg.originalPrice && (
              <div className="mt-1 text-sm text-slate-400 line-through">
                ₹
                {Number(
                  pkg.originalPrice
                ).toLocaleString("en-IN")}
              </div>
            )}

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Get a personalized quote based on your
              travel dates, room preference and
              departure city.
            </p>

            <Link
              href={`/contact?package=${encodeURIComponent(
                pkg.title
              )}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#0051FF] px-5 py-3.5 font-bold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B3042]"
            >
              Enquire Now

              <ArrowRight size={17} />
            </Link>

            <a
              href={whatsappUrl(msg)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3.5 font-bold !text-[#0B3042] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366] hover:!text-white"
            >
              <MessageCircle size={18} />

              WhatsApp Us
            </a>

          </aside>

        </div>

      </section>

      <CTASection />

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: pkg.title,
            description: pkg.shortDescription,
            url: `${siteConfig.url}/packages/${pkg.slug}`,
          }),
        }}
      />

    </WebsiteShell>
  );
}

/* INCLUSIONS / EXCLUSIONS */
function Info({
  title,
  items,
  good,
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6">

      <h3 className="text-xl font-black text-[#0B3042]">
        {title}
      </h3>

      <div className="mt-5 grid gap-3">

        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              {good ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
              ) : (
                <XCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-rose-400"
                />
              )}

              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            Details will be shared with the final
            quotation.
          </p>
        )}

      </div>

    </div>
  );
}

/* TRANSPORTATION */
function TransportationDetails({
  value,
  price,
  originalPrice,
}) {
  const items = String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div>

      {/* OFFER PRICE */}
      {price && (
        <div className="mb-7 overflow-hidden rounded-2xl border border-[#0051FF]/15 bg-white">

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <span className="inline-flex rounded-full bg-[#0051FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#0051FF]">
                Special Offer
              </span>

              <p className="mt-3 text-sm font-medium text-slate-500">
                Package starting from
              </p>
            </div>

            <div className="sm:text-right">

              {originalPrice &&
                Number(originalPrice) >
                  Number(price) && (
                  <div className="mb-1 text-sm font-semibold text-slate-400 line-through">
                    ₹
                    {Number(
                      originalPrice
                    ).toLocaleString("en-IN")}
                  </div>
                )}

              <div className="text-3xl font-black tracking-tight text-[#0051FF]">
                ₹
                {Number(price).toLocaleString(
                  "en-IN"
                )}
              </div>

              <div className="mt-1 text-xs font-semibold text-slate-400">
                Starting price
              </div>

            </div>

          </div>

          {originalPrice &&
            Number(originalPrice) >
              Number(price) && (
              <div className="border-t border-[#0051FF]/10 bg-[#f4f8ff] px-5 py-3 text-xs font-semibold text-[#0B3042]">

                Save ₹
                {(
                  Number(originalPrice) -
                  Number(price)
                ).toLocaleString("en-IN")}{" "}
                on this package

              </div>
            )}

        </div>
      )}

      {/* TRANSPORTATION DETAILS */}
      {items.length > 0 ? (
        <div className="grid gap-3">

          {items.map((item, index) => {

            const lower =
              item.toLowerCase();

            /*
             * Vehicle price
             *
             * Example:
             * Toyota Rumion – ₹2,499
             * Toyota Crysta – ₹2,999
             */
            const isVehicle =
              item.includes("₹") &&
              (
                lower.includes("toyota") ||
                lower.includes("rumion") ||
                lower.includes("crysta") ||
                lower.includes("hycross") ||
                lower.includes("innova") ||
                lower.includes("ertiga")
              ) &&
              !lower.includes("extra");

            /*
             * Package Limit
             *
             * Example:
             * Package Limit: 8 Hours / 80 KM
             */
            const isLimit =
              lower.includes(
                "package limit"
              );

            /*
             * Extra Charges heading
             */
            const isExtraHeading =
              lower === "extra charges:" ||
              lower === "extra charges";

            /*
             * Extra Charge lines
             *
             * Example:
             * Rumion – ₹199 per extra hour / ₹20 per extra KM
             */
            const isExtraCharge =
              item.includes("₹") &&
              (
                lower.includes(
                  "extra hour"
                ) ||
                lower.includes(
                  "extra km"
                )
              );

            /*
             * VEHICLE PRICE CARD
             */
            if (isVehicle) {

              const parts =
                item.split(/[–-]/);

              const vehicleName =
                parts[0]?.trim();

              const vehiclePrice =
                parts
                  .slice(1)
                  .join("–")
                  .trim();

              return (
                <div
                  key={index}
                  className="group flex flex-col gap-3 rounded-2xl border border-[#0051FF]/15 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0051FF]/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >

                  <div className="flex items-center gap-3">

                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eaf2ff] text-[#0051FF]">
                      <Car size={20} />
                    </div>

                    <div>

                      <div className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Vehicle
                      </div>

                      <span className="mt-1 block font-bold text-[#0B3042]">
                        {vehicleName}
                      </span>

                    </div>

                  </div>

                  <div className="sm:text-right">

                    <div className="text-xs font-semibold text-slate-400">
                      Package Price
                    </div>

                    <span className="mt-1 block text-xl font-black text-[#0051FF]">
                      {vehiclePrice}
                    </span>

                  </div>

                </div>
              );
            }

            /*
             * PACKAGE LIMIT
             */
            if (isLimit) {
              return (
                <div
                  key={index}
                  className="mt-2 flex items-center gap-3 rounded-2xl bg-[#0B3042] px-5 py-4 !text-white"
                >

                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10">

                    <Clock3
                      size={19}
                      className="text-[#f2d39a]"
                    />

                  </div>

                  <div>

                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
                      Package Limit
                    </div>

                    <span className="mt-1 block font-bold">
                      {item.replace(
                        /package limit\s*:/i,
                        ""
                      )}
                    </span>

                  </div>

                </div>
              );
            }

            /*
             * EXTRA CHARGES HEADING
             */
            if (isExtraHeading) {
              return (
                <div
                  key={index}
                  className="mt-5"
                >

                  <h4 className="text-xs font-black uppercase tracking-[0.15em] text-[#0B3042]">
                    Extra Charges
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    Applicable when the package
                    limit is exceeded.
                  </p>

                </div>
              );
            }

            /*
             * EXTRA CHARGE
             */
            if (isExtraCharge) {

              const parts =
                item.split(/[–-]/);

              const vehicle =
                parts[0]?.trim();

              const charge =
                parts
                  .slice(1)
                  .join("–")
                  .trim();

              return (
                <div
                  key={index}
                  className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >

                  <span className="font-bold text-[#0B3042]">
                    {vehicle}
                  </span>

                  <span className="text-sm font-medium text-slate-600">
                    {charge}
                  </span>

                </div>
              );
            }

            /*
             * NORMAL TEXT
             */
            return (
              <div
                key={index}
                className="px-2 py-2 text-sm leading-6 text-slate-600"
              >
                {item}
              </div>
            );
          })}

        </div>
      ) : (
        <p className="text-sm text-slate-500">
          Transportation details will be
          shared with your final quotation.
        </p>
      )}

    </div>
  );
}