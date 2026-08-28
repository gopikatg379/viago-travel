import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import WebsiteShell from "@/components/website/WebsiteShell";
import ContactForm from "@/components/website/ContactForm";

import {
  siteConfig,
  whatsappUrl,
} from "@/lib/config";

export const metadata = {
  title: "Contact Viago",
  description:
    "Contact Viago to plan your next domestic or international holiday.",
};

export default async function Contact({
  searchParams,
}) {
  const q = await searchParams;

  return (
    <WebsiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#173f35] text-white">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full border border-white" />
          <div className="absolute bottom-[-100px] right-[-60px] h-96 w-96 rounded-full border border-white" />
        </div>

        <div className="container-site relative grid gap-12 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e8c986]">
              <span className="h-px w-8 bg-[#c7923e]" />
              Contact Viago
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Your next trip starts with a conversation.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              Tell us where you want to go, when you want to travel
              and what kind of experience you have in mind. We’ll help
              shape the rest.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl(
                  "Hi Viago, I would like help planning a trip."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border border-white/30 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#173f35]"
              >
                <Phone size={18} />
                Call us
              </a>
            </div>
          </div>

          {/* Hero info panel */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e8c986]">
              Quick contact
            </p>

            <div className="mt-6 grid gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                  <Phone size={18} />
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                    Phone
                  </p>
                  <p className="mt-1 font-semibold">
                    {siteConfig.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                  <Mail size={18} />
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                    Email
                  </p>
                  <p className="mt-1 break-all font-semibold">
                    {siteConfig.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                  <MapPin size={18} />
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                    Office
                  </p>
                  <p className="mt-1 leading-6 text-white/80">
                    {siteConfig.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT */}
      <section className="bg-[#fffdf8] py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          {/* LEFT INFO */}
          <div>
            <span className="kerala-eyebrow">
              Let’s plan your journey
            </span>

            <h2 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-[-0.03em] text-[#173f35] md:text-4xl">
              Reach us your way.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-[#6e746f]">
              Call us, send an email, visit our office or simply start a
              WhatsApp conversation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* CALL */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="group rounded-[22px] border border-[#173f35]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c7923e]/40 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#173f35] text-white">
                  <Phone size={19} />
                </span>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#c7923e]">
                  Call us
                </p>

                <p className="mt-2 font-bold text-[#173f35]">
                  {siteConfig.phone}
                </p>

                <ArrowUpRight
                  size={18}
                  className="mt-4 text-[#173f35]/50 transition group-hover:text-[#173f35]"
                />
              </a>

              {/* EMAIL */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="group rounded-[22px] border border-[#173f35]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c7923e]/40 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#173f35] text-white">
                  <Mail size={19} />
                </span>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#c7923e]">
                  Email us
                </p>

                <p className="mt-2 break-all font-bold text-[#173f35]">
                  {siteConfig.email}
                </p>

                <ArrowUpRight
                  size={18}
                  className="mt-4 text-[#173f35]/50 transition group-hover:text-[#173f35]"
                />
              </a>

              {/* VISIT */}
              <div className="rounded-[22px] border border-[#173f35]/10 bg-white p-6 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#173f35] text-white">
                    <MapPin size={19} />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c7923e]">
                      Visit our office
                    </p>

                    <p className="mt-2 max-w-xl font-semibold leading-7 text-[#173f35]">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* OFFICE HOURS */}
            <div className="mt-6 flex items-start gap-4 rounded-[20px] bg-[#f8f4e9] p-5">
              <Clock3
                size={20}
                className="mt-0.5 shrink-0 text-[#c7923e]"
              />

              <div>
                <p className="font-bold text-[#173f35]">
                  Need a quick response?
                </p>

                <p className="mt-1 text-sm leading-6 text-[#6e746f]">
                  WhatsApp is the fastest way to reach our travel team.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="relative">
            <div className="absolute -right-6 -top-6 hidden h-28 w-28 rounded-full bg-[#c7923e]/10 lg:block" />

            <div className="relative rounded-[30px] border border-[#173f35]/10 bg-white p-5 shadow-[0_24px_70px_rgba(23,63,53,.08)] md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c7923e]">
                Plan your trip
              </p>

              <h3 className="mt-3 text-2xl font-black text-[#173f35] md:text-3xl">
                Tell us a little about your travel idea.
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6e746f]">
                Fill in the form and our team can get back to you with a
                suitable plan.
              </p>

              <div className="mt-7">
                <ContactForm
                  defaultPackage={q.package || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-[#f8f4e9] py-20">
        <div className="container-site">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="kerala-eyebrow">
                Find us
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#173f35] md:text-4xl">
                Visit Viago in Thiruvananthapuram.
              </h2>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=TC%2058%2F3079%2C%20Meleputhen%20Veedu%2C%20Paravila%2C%20Pachalloor%2C%20Thiruvananthapuram%2C%20Kerala%20695027"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#173f35]"
            >
              Open in Google Maps
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[#173f35]/10 bg-white shadow-sm">
            <iframe
              title="Viago Trips Office Location"
              src="https://www.google.com/maps?q=TC%2058%2F3079%2C%20Meleputhen%20Veedu%2C%20Paravila%2C%20Pachalloor%2C%20Thiruvananthapuram%2C%20Kerala%20695027&output=embed"
              width="100%"
              height="470"
              style={{
                border: 0,
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-[#102f28] py-16 text-white">
        <div className="container-site flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e8c986]">
              Prefer WhatsApp?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">
              Send us a message and start planning.
            </h2>
          </div>

          <a
            href={whatsappUrl(
              "Hi Viago, I would like help planning a trip."
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-bold text-white transition hover:scale-105"
          >
            <MessageCircle size={19} />
            Start WhatsApp Chat
          </a>
        </div>
      </section>
    </WebsiteShell>
  );
}