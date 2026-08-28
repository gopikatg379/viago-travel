import Link from "next/link";

import {
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { whatsappUrl } from "@/lib/config";

export default function CTASection() {
  return (
    <section className="bg-[#fffdf8] pb-24 pt-10">
      <div className="container-site">
        <div className="relative overflow-hidden bg-[#173f35] px-7 py-16 text-white md:px-16 md:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />

          <div className="relative max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e7c27d]">
              Thinking about a holiday?
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Tell us what kind of trip you have
              in mind.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/70">
              A place, a budget, a few dates or
              even just an idea is enough to get
              started.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-[#f6e8c7] px-6 py-4 font-bold text-[#173f35]"
              >
                Browse Journeys
                <ArrowRight size={18} />
              </Link>

              <a
                href={whatsappUrl(
                  "Hi Viago, I would like help planning a trip."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/40 px-6 py-4 font-bold text-white transition hover:bg-white hover:text-[#173f35]"
              >
                <MessageCircle size={18} />
                Talk to us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}