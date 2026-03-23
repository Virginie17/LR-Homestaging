import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, email } = body

    if (!priceId || !email) {
      return NextResponse.json({ error: 'priceId and email required' }, { status: 400 })
    }

    // Build base url
    const host = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    const baseUrl = host ? `https://${host}` : 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=true`,
      metadata: { email, priceId },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-checkout error', err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
