"use client";

import { useState } from "react";

export default function ContactForm({
  defaultPackage = "",
}) {
  const [state, setState] = useState({
    loading: false,
    message: "",
    success: false,
  });

  async function submit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    setState({
      loading: true,
      message: "",
      success: false,
    });

    const data = Object.fromEntries(
      new FormData(form)
    );

    // Remove spaces, +91, hyphens, etc.
    const phone = data.phone
      .replace(/\D/g, "")
      .replace(/^91(?=\d{10}$)/, "");

    // Indian mobile number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setState({
        loading: false,
        message:
          "Please enter a valid 10-digit mobile number.",
        success: false,
      });

      return;
    }

    data.phone = phone;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();

        setState({
          loading: false,
          message:
            "Thank you. Viago will contact you shortly.",
          success: true,
        });
      } else {
        setState({
          loading: false,
          message:
            "Could not send your enquiry. Please try again.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Enquiry error:", error);

      setState({
        loading: false,
        message:
          "Could not send your enquiry. Please try again.",
        success: false,
      });
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[30px] border border-slate-100 bg-white p-6 soft-shadow md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          required
        />

        {/* PHONE */}
        <Field
          name="phone"
          label="Phone"
          type="tel"
          inputMode="numeric"
          placeholder="9876543210"
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          title="Enter a valid 10-digit mobile number"
          required
        />

        <Field
          name="email"
          label="Email"
          type="email"
        />

        <Field
          name="destination"
          label="Destination interested in"
          defaultValue={defaultPackage}
        />
      </div>

      <label className="mt-5 block text-sm font-bold">
        Message

        <textarea
          name="message"
          required
          rows="5"
          placeholder="Tell us your dates, number of travellers and what kind of trip you want."
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#3A86FF]"
        />
      </label>

      <button
        type="submit"
        disabled={state.loading}
        className="mt-6 rounded-full bg-[#3A86FF] px-7 py-3.5 font-bold text-white transition hover:bg-[#1267e5] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading
          ? "Sending..."
          : "Send enquiry"}
      </button>

      {state.message && (
        <p
          className={`mt-4 text-sm font-semibold ${
            state.success
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-bold">
      {label}

      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#3A86FF]"
      />
    </label>
  );
}