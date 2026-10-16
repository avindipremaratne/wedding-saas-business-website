# Wedding SaaS — Business Website

The marketing site for Wedding SaaS: landing page, pricing and Stripe checkout. Next.js 16 with TypeScript and Tailwind CSS.

The wedding website template itself lives in [`wedding-saas`](https://github.com/avindipremaratne/wedding-saas). Both use the same Supabase project, and `wedding-saas` owns the database schema (including the `orders` table this site writes to).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (Vitest)
npm run lint
npm run typecheck
```

No keys are needed to see the site. Without Stripe keys the checkout button is disabled. Copy `.env.example` to `.env.local` to turn services on.

## How it fits together

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Landing page with the "Start your site" form |
| `app/api/checkout/route.ts` | Starts a Stripe Checkout session from the form |
| `app/api/stripe/webhook/route.ts` | Verifies Stripe's signature and records the paid order in Supabase |
| `app/checkout/success/page.tsx` | Thank-you page after payment |
| `lib/checkout.ts` | Form validation (unit tested) |
| `lib/stripe.ts`, `lib/supabase/server.ts` | Server-only Stripe and Supabase admin clients |

## Setting up services

**Stripe.** Create a product and price, then set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` and optionally `STRIPE_CHECKOUT_MODE=subscription` (the pricing model is still open, so it is configuration, not code). Add a webhook for `checkout.session.completed` pointing at `https://<your domain>/api/stripe/webhook` and set `STRIPE_WEBHOOK_SECRET`. To test locally, run `stripe listen --forward-to localhost:3000/api/stripe/webhook` with the Stripe CLI.

**Supabase.** Apply the migrations from the `wedding-saas` repo first, then set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` here. Paid checkouts appear in the `orders` table.

**Example link.** Set `NEXT_PUBLIC_EXAMPLE_SITE_URL` to a live `wedding-saas` deployment to show the "See an example" button.

## After a payment (service phase)

1. The order appears in Supabase → `orders`.
2. Collect the couple's details, then create their site in `wedding-saas` (see its README, "Adding a couple").
3. Optionally link it back by setting `orders.site_id`.
