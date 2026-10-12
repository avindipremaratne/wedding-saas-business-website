// Validation for the "Start your site" form, kept free of Stripe and Next.js
// imports so it can be unit tested.

export interface CheckoutInput {
  email: string;
  coupleNames: string;
  /** YYYY-MM-DD, or "" when not given. */
  weddingDate: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseCheckoutForm(form: FormData): CheckoutInput | null {
  const value = (key: string) => {
    const raw = form.get(key);
    return typeof raw === "string" ? raw.trim() : "";
  };
  const email = value("email").toLowerCase();
  const coupleNames = value("coupleNames").slice(0, 120);
  const date = value("weddingDate");

  if (!coupleNames || email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  return { email, coupleNames, weddingDate: DATE_PATTERN.test(date) ? date : "" };
}
