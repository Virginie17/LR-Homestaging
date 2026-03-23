 # Stripe integration — Next steps

 ## Goal

 Add Stripe billing to enable paid tiers (Starter / Pro / Business) and grant credits per purchase.

 ## Quick plan

 - Create Stripe products/prices for Starter, Pro, Business.
 - On successful payment create or update user record with `stripe_customer_id` and `credits`.
 - Use Stripe Webhooks (e.g., `checkout.session.completed`, `invoice.payment_succeeded`) to securely grant credits.
 - Provide server-side endpoints to create Checkout Sessions and to query user credits.

 ## Required env vars

 - `STRIPE_SECRET_KEY` — server-side secret
 - `STRIPE_WEBHOOK_SECRET` — webhook signing secret

 ## Minimal implementation notes

 - Create a server endpoint `/api/stripe/create-checkout` that calls `stripe.checkout.sessions.create` with the chosen price id and `metadata: { user_email }` or `client_reference_id`.
 - Add a webhook endpoint `/api/stripe/webhook` that verifies events using `STRIPE_WEBHOOK_SECRET`. On `checkout.session.completed` or `invoice.payment_succeeded`, find the user by email or `client_reference_id` and update their `credits` in Supabase.
 - Store `stripe_customer_id` in your `users` table to manage subscriptions and billing portal.

 ## Credits model

 - Starter: X credits
 - Pro: Y credits
 - Business: Z credits

 ## Security

 - Always use server-side Stripe secret keys for creating sessions and verifying webhooks.
 - Do not rely on client-provided credit changes — update credits only from server or verified webhooks.

 ## Useful links

 - Stripe Checkout docs: [https://stripe.com/docs/payments/checkout](https://stripe.com/docs/payments/checkout)
 - Webhooks docs: [https://stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)
