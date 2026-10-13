"use client";

import Image from "next/image";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function LoginForm({ error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#f5f8ff] p-5 sm:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#3A86FF]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#173f35]/10 blur-3xl" />

      <div className="relative m-auto w-full max-w-[1050px] overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(23,63,53,0.12)]">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT BRANDING */}
          <div className="relative hidden overflow-hidden bg-[#0B3042] p-10 text-white md:flex md:flex-col md:justify-between">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative z-10">

              {/* Logo */}
              <div className="mb-10 inline-flex rounded-2xl bg-white px-5 py-3 shadow-lg">
                <Image
                  src="/images/viago-logo.png"
                  alt="Viago"
                  width={150}
                  height={55}
                  className="h-auto w-[140px] object-contain"
                  priority
                />
              </div>

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#8fb8ff]">
                Admin Portal
              </p>

              <h2 className="max-w-sm text-4xl font-black leading-tight">
                Manage every journey from one place.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Manage travel packages, enquiries, customer reviews and
                everything that keeps Viago moving.
              </p>
            </div>

            {/* Security box */}
            <div className="relative z-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#3A86FF]">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Secure Admin Access
                </p>

                <p className="mt-0.5 text-xs text-white/50">
                  Your dashboard is protected
                </p>
              </div>
            </div>
          </div>

          {/* LOGIN AREA */}
          <div className="p-7 sm:p-10 lg:p-14">

            {/* Mobile logo */}
            <div className="mb-8 flex justify-center md:hidden">
              <div className="rounded-2xl bg-white px-5 py-3 shadow-[0_8px_30px_rgba(23,63,53,0.08)]">
                <Image
                  src="/images/viago-logo.png"
                  alt="Viago"
                  width={150}
                  height={55}
                  className="h-auto w-[135px] object-contain"
                  priority
                />
              </div>
            </div>

            {/* Heading */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3A86FF]/10 px-3 py-1.5 text-xs font-bold text-[#176bff]">
                <LockKeyhole size={13} />
                Secure Login
              </div>

              <h1 className="text-3xl font-black tracking-tight text-[#0B3042] sm:text-4xl">
                Welcome back.
              </h1>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Sign in to your Viago admin dashboard to manage your travel
                packages and enquiries.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-semibold text-rose-600">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />

                <span>
                  Invalid email or password. Please try again.
                </span>
              </div>
            )}

            {/* Login form */}
            <form
              action="/api/admin/login"
              method="post"
              className="mt-8 grid gap-5"
            >

              {/* EMAIL */}
              <label className="grid gap-2 text-sm font-bold text-[#1b2924]">
                Email address

                <div className="group relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#3A86FF]"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="admin@viago.in"
                    autoComplete="email"
                    required
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 text-sm font-medium text-[#1b2924] outline-none transition-all placeholder:text-slate-400 focus:border-[#3A86FF] focus:bg-white focus:ring-4 focus:ring-[#3A86FF]/10"
                  />
                </div>
              </label>

              {/* PASSWORD */}
              <label className="grid gap-2 text-sm font-bold text-[#1b2924]">
                Password

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#3A86FF]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-12 text-sm font-medium text-[#1b2924] outline-none transition-all placeholder:text-slate-400 focus:border-[#3A86FF] focus:bg-white focus:ring-4 focus:ring-[#3A86FF]/10"
                  />

                  {/* SHOW PASSWORD */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-[#3A86FF]/10 hover:text-[#3A86FF]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </label>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="group mt-2 flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#3A86FF] px-5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(58,134,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#176bff] hover:shadow-[0_16px_32px_rgba(58,134,255,0.3)] active:translate-y-0"
              >
                Sign in to Dashboard

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>

            {/* Security note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
              <ShieldCheck size={15} />
              Protected admin access
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}