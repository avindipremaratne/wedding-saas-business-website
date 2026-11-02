"use server";

import { sendEnquiryNotification } from "@/lib/email";
import { parseEnquiry, type EnquiryFieldErrors, type EnquiryInput } from "@/lib/enquiry";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: EnquiryFieldErrors; values?: Record<string, string> }
  | { status: "success"; names: string };

// Saves the enquiry to Supabase (the `enquiries` table, owned by the
// wedding-saas repo) and emails it to the owner. Either one is enough: an
// enquiry is only lost if both fail, and then the couple is asked to retry.
export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = Object.fromEntries(
    ["names", "email", "phone", "weddingDate", "design", "message"].map((key) => [key, String(formData.get(key) ?? "")]),
  );
  const parsed = parseEnquiry(formData);
  if (!parsed.ok) return { status: "error", message: "Please check the highlighted fields.", fieldErrors: parsed.errors, values };
  const enquiry = parsed.data;
  const success: EnquiryState = { status: "success", names: enquiry.names };

  // Hidden honeypot field: people never see it, simple bots fill it in.
  if (formData.get("company")) return success;

  const [saved, emailed] = await Promise.all([saveEnquiry(enquiry), sendEnquiryNotification(enquiry)]);
  if (saved || emailed) return success;

  if (process.env.NODE_ENV !== "production") {
    console.info("[enquiry] (dev, nothing configured)", enquiry);
    return success;
  }
  console.error("[enquiry] Neither saved nor emailed:", enquiry.email);
  return { status: "error", message: "Sorry, something went wrong. Please try again, or email us directly.", values };
}

async function saveEnquiry(enquiry: EnquiryInput): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.info("[enquiry] Not saved: Supabase is not configured.");
    return false;
  }
  const { error } = await supabase.from("enquiries").insert({
    names: enquiry.names,
    email: enquiry.email,
    phone: enquiry.phone || null,
    wedding_date: enquiry.weddingDate || null,
    design: enquiry.design,
    message: enquiry.message || null,
  });
  if (error) {
    console.error("[enquiry] Saving failed:", error.message);
    return false;
  }
  return true;
}
