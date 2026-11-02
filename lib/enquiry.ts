// Validation for the enquiry form, kept free of Next.js and Supabase imports
// so it can be unit tested.

export const DESIGN_CHOICES = {
  heirloom: "Heirloom",
  custom: "Something custom",
  unsure: "Not sure yet",
} as const;

export type DesignChoice = keyof typeof DESIGN_CHOICES;

export interface EnquiryInput {
  names: string;
  email: string;
  phone: string;
  /** YYYY-MM-DD, or "" when not given. */
  weddingDate: string;
  design: DesignChoice;
  message: string;
}

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export const ENQUIRY_LIMITS = { names: 120, email: 254, phone: 40, message: 4000 } as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseEnquiry(form: FormData): { ok: true; data: EnquiryInput } | { ok: false; errors: EnquiryFieldErrors } {
  const value = (key: string) => {
    const raw = form.get(key);
    return typeof raw === "string" ? raw.trim() : "";
  };
  const names = value("names");
  const email = value("email").toLowerCase();
  const phone = value("phone");
  const weddingDate = value("weddingDate");
  const designRaw = value("design");
  const message = value("message");

  const errors: EnquiryFieldErrors = {};
  if (!names) errors.names = "Please tell us your names.";
  else if (names.length > ENQUIRY_LIMITS.names) errors.names = "Please shorten this.";
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > ENQUIRY_LIMITS.email || !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (phone.length > ENQUIRY_LIMITS.phone) errors.phone = "Please shorten this.";
  if (weddingDate && !DATE_PATTERN.test(weddingDate)) errors.weddingDate = "Please enter a valid date.";
  if (message.length > ENQUIRY_LIMITS.message) errors.message = "Please keep your message a little shorter.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  const design: DesignChoice = designRaw in DESIGN_CHOICES ? (designRaw as DesignChoice) : "unsure";
  return { ok: true, data: { names, email, phone, weddingDate, design, message } };
}
