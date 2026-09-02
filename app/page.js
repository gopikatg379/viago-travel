import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import TravelStats from "@/components/website/TravelStats";

import {
  ArrowRight,
  BadgeIndianRupee,
  Headphones,
  MapPin,
  ShieldCheck,
  Search,
  Star,
  Route,
  Palmtree,
  HeartHandshake,
  Quote,
} from "lucide-react";

import WebsiteShell from "@/components/website/WebsiteShell";
import PackageCard from "@/components/website/PackageCard";
import DestinationCard from "@/components/website/DestinationCard";
import SectionTitle from "@/components/website/SectionTitle";
import CTASection from "@/components/website/CTASection";

import { destinations } from "@/lib/data";
import { getPackages } from "@/lib/packages";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

const KERALA_HERO =
  "/images/sunset.jpg";

export default async function Home() {
  const packages = (
    await getPackages({
      featured: true,
    })
  ).slice(0, 3);

  const reviews = await prisma.review.findMany({
    where: {
      status: "APPROVED",
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const benefits = [
    {
      icon: Route,
      title: "Routes planned around you",
      text: "Not every traveller wants the same holiday. We build the pace around your dates, interests and budget.",
    },
    {
      icon: BadgeIndianRupee,
      title: "Clear, sensible pricing",
      text: "We keep the plan practical and explain what is included before you confirm.",
    },
    {
      icon: HeartHandshake,
      title: "A team you can actually reach",
      text: "From the first enquiry to the journey home, you have someone to speak with when you need help.",
    },
    {
      icon: ShieldCheck,
      title: "Stays we would choose ourselves",
      text: "Hotels and experiences are selected for location, comfort and overall value rather than just photos.",
    },
  ];

  return (
    <WebsiteShell>
      {/* HERO */}

<section className="relative min-h-[760px] overflow-hidden bg-[#173f35]">

  {/* Background image */}
  <div className="hero-image-wrap absolute inset-0 z-0">
    <Image
      src={KERALA_HERO}
      alt="Kerala backwaters surrounded by coconut trees"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>

  {/* Blue gradient overlay */}
  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B3042]/65 via-[#0B3042]/30 to-transparent" />

  {/* Hero content */}
  <div className="container-site relative z-20 flex min-h-[760px] items-center py-20">
    <div className="max-w-[720px] text-white">

      <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] !text-[#f1d199]">
        <Palmtree size={18} />
        Travel, at a gentler pace
      </div>

      <h1 className="mt-6 max-w-[700px] text-5xl font-bold leading-[1.02] tracking-[-0.045em] !text-white sm:text-6xl lg:text-[78px]">
        Journeys that feel
        <span className="font-serif italic !text-[#f2d39a]">
          {" "}
          personal.
        </span>
      </h1>

      <p className="mt-6 max-w-[590px] text-lg leading-8 !text-white">
        From misty hill roads and quiet backwaters to beaches and journeys
        abroad, Viago plans holidays with the time, care and local understanding
        they deserve.
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Link
          href="/packages"
          className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#f2d39a] px-8 py-4 text-[15px] font-bold !text-[#173f35] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f6dfb4] hover:shadow-md"
        >
          Explore Journeys
          <ArrowRight size={18} strokeWidth={2} />
        </Link>

        <Link
          href="/contact"
          className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-white/60 bg-white/5 px-8 py-4 text-[15px] font-bold !text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:!text-[#173f35]"
        >
          Plan With Us
        </Link>
      </div>

      {/* Search form */}
      <form
        action="/packages"
        className="relative z-30 mt-12 max-w-[680px] rounded-full border border-[#e8dfce] bg-[#fffdf8]/95 p-2 shadow-[0_18px_50px_rgba(23,63,53,0.18)] backdrop-blur-md transition-all duration-300 focus-within:border-[#c7923e]/60 focus-within:shadow-[0_22px_60px_rgba(23,63,53,0.24)] max-sm:rounded-[28px]"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

          <div className="flex flex-1 items-center gap-3 px-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4ead7] text-[#b78334]">
              <MapPin size={18} strokeWidth={2} />
            </div>

            <div className="flex-1">
              <label
                htmlFor="destination"
                className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#b78334]"
              >
                Destination
              </label>

              <input
                id="destination"
                name="destination"
                aria-label="Destination"
                placeholder="Where would you like to go?"
                className="w-full bg-transparent py-1.5 text-[15px] font-medium text-[#173f35] outline-none placeholder:font-normal placeholder:text-[#8d948f]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-full bg-[#173f35] px-7 font-bold !text-white shadow-lg shadow-[#173f35]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c7923e] hover:shadow-xl max-sm:w-full"
          >
            <Search
              size={18}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            Find a trip

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>
      </form>

    </div>
  </div>

  <div className="absolute bottom-0 left-0 z-30 h-[12px] w-full bg-[#f8f4e9]" />
</section>

      <TravelStats />
      {/* INTRO */}

      <section className="bg-[#f8f4e9] py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <span className="kerala-eyebrow">
              From Kerala, for travellers everywhere
            </span>

            <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-[#173f35] md:text-5xl">
              We believe a good holiday should never feel like a checklist.
            </h2>
          </div>

          <div className="border-l-0 border-[#c7923e]/50 lg:border-l lg:pl-10">
            <p className="text-base leading-8 text-[#68716c] md:text-lg">
              Some journeys are about waking up to tea gardens. Some are about a
              slow afternoon beside the water. Others begin with a flight
              somewhere completely new. We help put those moments together into
              a trip that makes sense for you.
            </p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}

      <section className="section-pad bg-[#fffdf8]">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="Journeys travellers love"
              title="A few places worth disappearing to."
              text="Start with one of our popular journeys and we'll help shape the details around your dates and preferences."
            />

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 font-bold text-[#173f35]"
            >
              See all packages
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* KERALA FEATURE */}

      <section className="overflow-hidden bg-[#173f35] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[500px]">
            <Image
              src="https://assets.luxtripper.co.uk/media/29dcaf70-25dc-4ab1-8de9-fcbbd00fecfc/en/enchanting_kerala_and_backwaters_1920x1080.jpg"
              alt="Traditional Kerala houseboat"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center px-7 py-16 md:px-14 lg:px-16">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e3bd78]">
                Close to home
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Kerala is more than a destination. It is a way of slowing down.
              </h2>

              <p className="mt-6 leading-8 text-white/70">
                Drift past coconut groves, wake up among tea-covered hills,
                spend an evening beside the Arabian Sea or take the long scenic
                road between them.
              </p>

              <Link
                href="/packages?destination=Kerala"
                className="mt-8 inline-flex items-center gap-2 border-b border-[#e3bd78] pb-2 font-bold text-[#f0d29c]"
              >
                Explore Kerala
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}

      <section className="section-pad kerala-pattern">
        <div className="container-site">
          <SectionTitle
            eyebrow="Places to go"
            title="Mountains, islands, cities and everything between."
            text="Browse destinations and find the kind of journey you feel like taking next."
          />

          <div className="mt-12 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((item, index) => (
              <DestinationCard
                key={item.name}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY VIAGO */}

      <section className="section-pad bg-[#fffdf8]">
        <div className="container-site grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionTitle
              eyebrow="Why travel with Viago"
              title="Less confusion. More time to enjoy the journey."
              text="Travel planning does not need to involve twenty tabs, ten calls and uncertainty about what happens next."
            />
          </div>

          <div className="border-t border-[#173f35]/15">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                className="grid gap-5 border-b border-[#173f35]/15 py-8 sm:grid-cols-[70px_1fr]"
              >
                <div className="flex">
                  <span className="text-sm font-bold text-[#b78334]">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-[#50765c]" />

                    <h3 className="text-xl font-bold text-[#173f35]">
                      {title}
                    </h3>
                  </div>

                  <p className="mt-3 max-w-xl leading-7 text-[#6e746f]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section className="bg-[#efe5d0] py-24">
        <div className="container-site">
          <SectionTitle
            center
            eyebrow="How we plan your holiday"
            title="Tell us where your mind is wandering."
            text="We take it from there."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-0 border-y border-[#173f35]/15 md:grid-cols-4">
            {[
              ["01", "Tell us your idea"],
              ["02", "We shape the route"],
              ["03", "Confirm the details"],
              ["04", "Go make memories"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="border-b border-[#173f35]/15 px-6 py-9 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="font-serif text-3xl italic text-[#b78334]">
                  {number}
                </div>

                <h3 className="mt-4 font-bold text-[#173f35]">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}

      <section className="relative overflow-hidden bg-[#0B3042] py-24 text-white">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#c7923e]/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="container-site relative">
          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8c986]/25 bg-[#e8c986]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8c986]">
              <Star size={14} fill="currentColor" />
              Traveller Stories
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl lg:text-6xl">
              Journeys remembered.
              <span className="font-serif italic text-[#f2d39a]">
                {" "}
                Stories shared.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Real experiences from travellers who trusted Viago to turn their
              holiday plans into memories worth sharing.
            </p>
          </div>

          {/* Review Cards */}

          {reviews.length > 0 ? (
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => {
                const initial = review.name
                  ? review.name.charAt(0).toUpperCase()
                  : "V";

                return (
                  <article
                    key={review.id}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.07] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-[#e8c986]/30 hover:bg-white/[0.1] md:p-8"
                  >
                    {/* Quote + Stars */}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-1 text-[#e8c986]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={17}
                            strokeWidth={1.8}
                            className={
                              star <= review.rating
                                ? "text-[#e8c986]"
                                : "text-white/20"
                            }
                            fill={
                              star <= review.rating
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8c986]/10 text-[#e8c986] transition group-hover:bg-[#e8c986] group-hover:text-[#173f35]">
                        <Quote size={19} />
                      </div>
                    </div>

                    {/* Review */}

                    <p className="mt-7 flex-1 text-[17px] leading-8 text-white/80">
                      “{review.review}”
                    </p>

                    {/* Customer */}

                    <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2d39a] text-lg font-bold text-[#173f35] shadow-sm">
                        {initial}
                      </div>

                      <div>
                        <h3 className="font-bold text-white">
                          {review.name}
                        </h3>

                        {review.location && (
                          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                            <MapPin size={13} />
                            {review.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto mt-14 max-w-2xl rounded-[30px] border border-white/10 bg-white/[0.06] px-8 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8c986]/10 text-[#e8c986]">
                <Quote size={26} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Your story could be the first.
              </h3>

              <p className="mx-auto mt-3 max-w-md leading-7 text-white/60">
                Travelled with Viago? Tell us about the places, moments and
                memories that made your journey special.
              </p>
            </div>
          )}

          {/* Bottom CTA */}

          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-9 sm:flex-row">
            <div>
              <p className="font-serif text-xl italic text-[#f2d39a]">
                Been somewhere beautiful with us?
              </p>

              <p className="mt-1 text-sm text-white/50">
                We'd love to hear about your Viago journey.
              </p>
            </div>

            <Link
              href="/reviews"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#f2d39a] px-7 py-3.5 text-sm font-bold text-[#173f35] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white hover:shadow-xl"
            >
              Share your experience

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Viago",
            url: siteConfig.url,
            telephone: siteConfig.phone,
            email: siteConfig.email,
          }),
        }}
      />
    </WebsiteShell>
  );
}