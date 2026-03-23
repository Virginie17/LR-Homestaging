/**
 * Local Stripe webhook tester
 *
 * Usage:
 *  STRIPE_SECRET_KEY=sk_test_... STRIPE_WEBHOOK_SECRET=whsec_... node scripts/stripe_local_webhook_tester.js
 *
 * This script builds a fake `checkout.session.completed` event payload and sends it
 * to your local webhook endpoint (http://localhost:3000/api/stripe/webhook).
 */

const Stripe = require('stripe')
const fetch = global.fetch || require('node-fetch')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '')
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
const localUrl = process.env.LOCAL_WEBHOOK_URL || 'http://localhost:3000/api/stripe/webhook'

async function sendTestEvent() {
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    console.error('Please set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET environment variables')
    process.exit(1)
  }

  const session = {
    id: 'cs_test_123',
    object: 'checkout.session',
    metadata: { email: process.env.TEST_EMAIL || 'test@example.com', priceId: process.env.TEST_PRICE_ID || 'starter' },
  }

  const payload = JSON.stringify({ id: 'evt_test_webhook', object: 'event', type: 'checkout.session.completed', data: { object: session } })

  const header = stripe.webhooks.generateTestHeaderString({ payload, secret: webhookSecret })

  console.log('Sending test event to', localUrl)

  const res = await fetch(localUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': header,
    },
    body: payload,
  })

  console.log('Status:', res.status)
  const text = await res.text()
  console.log('Response:', text)
}

sendTestEvent().catch((err) => { console.error(err); process.exit(1) })
