import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const rawStripeSecretKey = process.env.STRIPE_SECRET_KEY;
const rawStripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!rawStripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

if (!rawStripeWebhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is missing");
}

const stripeSecretKey: string = rawStripeSecretKey;
const stripeWebhookSecret: string = rawStripeWebhookSecret;

const stripe = new Stripe(stripeSecretKey);

function getCreditsForPrice(priceId: string): number {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID) {
    return Number(process.env.STARTER_CREDITS || 10);
  }

  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID) {
    return Number(process.env.PRO_CREDITS || 30);
  }

  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID) {
    return Number(process.env.BUSINESS_CREDITS || 100);
  }

  return 0;
}

async function findTargetUserId(
  userId?: string,
  email?: string
): Promise<string | null> {
  if (userId) {
    const { data: userById, error } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Erreur recherche utilisateur par id :", error);
      return null;
    }

    if (userById?.id) {
      return userById.id;
    }
  }

  if (email) {
    const { data: userByEmail, error } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Erreur recherche utilisateur par email :", error);
      return null;
    }

    if (userByEmail?.id) {
      return userByEmail.id;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
  } catch (error) {
    console.error("Erreur vérification signature Stripe :", error);

    return NextResponse.json(
      { error: "Webhook Stripe invalide." },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    const userId = session.metadata?.userId?.trim() || "";
    const email =
      session.metadata?.email?.trim() ||
      session.customer_details?.email?.trim() ||
      session.customer_email?.trim() ||
      "";
    const priceId = session.metadata?.priceId?.trim() || "";

    const creditsToAdd = getCreditsForPrice(priceId);

    if (!priceId || creditsToAdd <= 0) {
      console.warn("Webhook Stripe : priceId inconnu ou crédits invalides.", {
        sessionId: session.id,
        priceId,
        creditsToAdd,
      });

      return NextResponse.json({ received: true });
    }

    const { data: existingPurchase, error: existingPurchaseError } =
      await supabaseAdmin
        .from("credit_purchases")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

    if (existingPurchaseError) {
      console.error(
        "Erreur vérification achat existant :",
        existingPurchaseError
      );

      return NextResponse.json(
        { error: "Erreur vérification achat existant." },
        { status: 500 }
      );
    }

    if (existingPurchase) {
      return NextResponse.json({ received: true });
    }

    const targetUserId = await findTargetUserId(userId, email);

    if (!targetUserId) {
      console.error("Aucun utilisateur trouvé pour attribuer les crédits.", {
        sessionId: session.id,
        userId,
        email,
      });

      return NextResponse.json({ received: true });
    }

    const { error: purchaseError } = await supabaseAdmin
      .from("credit_purchases")
      .insert({
        user_id: targetUserId,
        stripe_session_id: session.id,
        stripe_customer_email: email || null,
        stripe_price_id: priceId,
        credits_added: creditsToAdd,
        amount_total: session.amount_total ?? null,
        currency: session.currency ?? null,
        status: "paid",
      });

    if (purchaseError) {
      if (purchaseError.code === "23505") {
        return NextResponse.json({ received: true });
      }

      console.error("Erreur insert credit_purchases :", purchaseError);

      return NextResponse.json(
        { error: "Erreur enregistrement achat." },
        { status: 500 }
      );
    }

    const { error: addCreditsError } = await supabaseAdmin.rpc("add_credits", {
      p_user_id: targetUserId,
      p_credits: creditsToAdd,
    });

    if (addCreditsError) {
      console.error("Erreur add_credits :", addCreditsError);

      await supabaseAdmin
        .from("credit_purchases")
        .update({ status: "credit_failed" })
        .eq("stripe_session_id", session.id);

      return NextResponse.json(
        { error: "Erreur ajout crédits." },
        { status: 500 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur interne webhook Stripe :", error);

    return NextResponse.json(
      { error: "Erreur interne webhook Stripe." },
      { status: 500 }
    );
  }
}