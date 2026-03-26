import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is required");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getBaseUrl() {
  const baseUrl = process.env.APP_BASE_URL;
  if (baseUrl) return baseUrl;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, email, userId } = body;

    if (!priceId) {
      return NextResponse.json({ error: "priceId requis." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "email requis." }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${getBaseUrl()}/?checkout=success`,
      cancel_url: `${getBaseUrl()}/?checkout=cancel`,
      metadata: {
        email,
        userId: userId || "",
        priceId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("create checkout error", error);
    return NextResponse.json(
      { error: "Impossible de créer la session Stripe." },
      { status: 500 }
    );
  }
}