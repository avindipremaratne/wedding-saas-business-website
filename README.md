# Vindora Invites: business website

The public website for Vindora Invites: a showcase for the done-for-you wedding website service (an envelope, wax seal and invitation opening), with an enquiry form. Couples enquire here; their site is then built in the `wedding-saas` admin area. Next.js 16 with TypeScript and Tailwind CSS.

The wedding website template itself lives in [`wedding-saas`](https://github.com/avindipremaratne/wedding-saas). Both use the same Supabase project, and `wedding-saas` owns the database schema (including the `enquiries` and `orders` tables this site writes to).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (Vitest)
npm run lint
npm run typecheck
```

No keys are needed to see the site; without them, enquiries are printed to the terminal. Copy `.env.example` to `.env.local` to turn services on.

## How it fits together

| Path | What it is |
| --- | --- |
| `app/page.tsx` | The showcase: what's included, designs, how it works, pricing ("Contact for pricing") and the enquiry form |
| `components/EnquiryForm.tsx`, `app/actions/enquiry.ts` | The enquiry form and its Server Action: validates, saves to Supabase and emails you |
| `lib/enquiry.ts`, `lib/email.ts` | Enquiry validation (unit tested) and the Resend email |
| `lib/brand.ts` | Business name, contact email and demo link, from environment variables |
| `public/showcase/` | Stills from the Heirloom envelope video, shown in the phone frames |
| `app/api/checkout`, `app/api/stripe/webhook`, `app/checkout/success` | Stripe checkout, no longer linked from the page; kept for deposits later |

## Setting up services

**Brand.** The site is called "Vindora Invites" by default; `NEXT_PUBLIC_BRAND_NAME` overrides it. Optionally set `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_EXAMPLE_SITE_URL` (the live demo).

**Enquiries.** Run `supabase/migrations/20261102000000_enquiries.sql` from the `wedding-saas` repo, then set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` here. For the email, set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` and `ENQUIRY_TO_EMAIL`. Either one is enough to receive an enquiry; with both, each enquiry is emailed to you and listed in the `wedding-saas` admin area under **Enquiries**. Replying to the email replies to the couple.

**Stripe (later).** The checkout code still works if you want online deposits: create a product and price, set `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID`, add a webhook for `checkout.session.completed` at `https://<your domain>/api/stripe/webhook` and set `STRIPE_WEBHOOK_SECRET`. Paid checkouts appear in the `orders` table.

## After an enquiry

1. It arrives in your inbox and in the `wedding-saas` admin area → **Enquiries**.
2. Reply to the couple, agree the design and price.
3. Create their site in the admin area (**New site**), then mark the enquiry as handled.
