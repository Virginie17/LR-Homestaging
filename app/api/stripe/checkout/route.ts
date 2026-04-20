import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY est manquante.");
}

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL est manquante.");
}

const stripe = new Stripe(stripeSecretKey);

async function getAuthenticatedUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) return null;

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return user;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour acheter des crédits." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const priceId = body?.priceId;

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "priceId manquant ou invalide." },
        { status: 400 }
      );
    }

    const allowedPrices = [
      process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID,
    ].filter(Boolean) as string[];

    if (!allowedPrices.includes(priceId)) {
      return NextResponse.json(
        { error: "Prix Stripe invalide." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email || undefined,
      metadata: {
        userId: user.id,
        email: user.email || "",
        priceId,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/?checkout=success`,
      cancel_url: `${siteUrl}/?checkout=cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "URL Stripe introuvable." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("stripe checkout error:", error);

    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 }
    );
  }
}