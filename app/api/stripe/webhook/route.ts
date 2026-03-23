import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY || ''
const supa = SUPABASE_URL && SUPABASE_SERVICE_ROLE ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE) : null

export async function POST(req: NextRequest) {
  const buf = Buffer.from(await req.arrayBuffer())
  const sig = req.headers.get('stripe-signature') || ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle the checkout session completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.metadata?.email
    const priceId = session.metadata?.priceId

    if (email && supa) {
      // Map Stripe price IDs to credits. Set env vars STRIPE_PRICE_*_ID or use defaults.
      const priceToCredits: Record<string, number> = {
        [process.env.STRIPE_PRICE_STARTER_ID || 'starter']: Number(process.env.STARTER_CREDITS || 1),
        [process.env.STRIPE_PRICE_PRO_ID || 'pro']: Number(process.env.PRO_CREDITS || 5),
        [process.env.STRIPE_PRICE_BUSINESS_ID || 'business']: Number(process.env.BUSINESS_CREDITS || 20),
      }

      const creditsToAdd = priceId && priceToCredits[priceId] ? priceToCredits[priceId] : Number(process.env.DEFAULT_CREDITS || 1)

      try {
        const { data, error } = await supa.from('users').select('id,credits').eq('email', email).single()
        if (error && error.code !== 'PGRST116') {
          console.warn('Supabase select error', error)
        }

        if (data) {
          await supa.from('users').update({ credits: (data.credits || 0) + creditsToAdd }).eq('id', data.id)
        } else {
          await supa.from('users').insert({ email, credits: creditsToAdd })
        }
      } catch (err) {
        console.error('Error updating credits in Supabase', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
