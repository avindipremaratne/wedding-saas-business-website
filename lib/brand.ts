// The business name and contact details, in one place. The name isn't
// decided yet, so it comes from NEXT_PUBLIC_BRAND_NAME with a neutral
// stand-in; set the variable (or change the default) once it is chosen.

export const brand = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME?.trim() || "Wedding Websites",
  /** Shown in the footer when set. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  /** A live wedding-saas site for the "View the live demo" buttons. */
  demoUrl: process.env.NEXT_PUBLIC_EXAMPLE_SITE_URL?.trim() || "",
};
