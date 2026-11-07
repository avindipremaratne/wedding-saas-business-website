// The business name and contact details, in one place. The name defaults
// to "Vindora Invites"; NEXT_PUBLIC_BRAND_NAME overrides it if ever needed.

export const brand = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME?.trim() || "Vindora Invites",
  /** Shown in the footer when set. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  /** A live wedding-saas site for the "View the live demo" buttons. */
  demoUrl: process.env.NEXT_PUBLIC_EXAMPLE_SITE_URL?.trim() || "",
};
