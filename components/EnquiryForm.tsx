"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { DESIGN_CHOICES, ENQUIRY_LIMITS } from "@/lib/enquiry";

const labelClass = "mb-2 block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink";
const fieldClass =
  "w-full border-0 border-b border-taupe bg-transparent py-2 font-sans text-base font-light text-charcoal outline-none placeholder:text-charcoal/40 focus:border-ink aria-[invalid=true]:border-red-600";

export default function EnquiryForm() {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <p className="mb-3 font-serif text-5xl font-light text-ink">Thank you!</p>
        <p className="mx-auto max-w-sm font-sans text-[0.95rem] font-light leading-relaxed text-charcoal">
          We&apos;ve received your enquiry and will be in touch soon to talk about your day.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const values = state.status === "error" ? state.values ?? {} : {};
  const error = (key: keyof typeof errors) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1 font-sans text-xs text-red-700">
        {errors[key]}
      </p>
    ) : null;
  const a11y = (key: keyof typeof errors) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <form action={formAction} className="space-y-6">
      {/* Honeypot: hidden from people and screen readers, bots tend to fill it. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="names" className={labelClass}>
            Your names *
          </label>
          <input id="names" name="names" required maxLength={ENQUIRY_LIMITS.names} defaultValue={values.names} placeholder="e.g. Amali & Ashen" className={fieldClass} {...a11y("names")} />
          {error("names")}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" maxLength={ENQUIRY_LIMITS.email} defaultValue={values.email} placeholder="you@example.com" className={fieldClass} {...a11y("email")} />
          {error("email")}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone (optional)
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={ENQUIRY_LIMITS.phone} defaultValue={values.phone} className={fieldClass} {...a11y("phone")} />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="weddingDate" className={labelClass}>
            Wedding date (if set)
          </label>
          <input id="weddingDate" name="weddingDate" type="date" defaultValue={values.weddingDate} className={fieldClass} {...a11y("weddingDate")} />
          {error("weddingDate")}
        </div>
      </div>

      <div>
        <label htmlFor="design" className={labelClass}>
          Design
        </label>
        <select id="design" name="design" defaultValue={values.design || "heirloom"} className={fieldClass}>
          {Object.entries(DESIGN_CHOICES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your day
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={ENQUIRY_LIMITS.message}
          defaultValue={values.message}
          placeholder="Your venue, your colours, anything you'd love your site to have…"
          className={`${fieldClass} resize-none`}
          {...a11y("message")}
        />
        {error("message")}
      </div>

      {state.status === "error" && (
        <p className="font-sans text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-6 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
