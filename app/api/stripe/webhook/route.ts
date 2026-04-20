import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY manquante.");
}

if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET manquante.");
}

const stripe = new Stripe(stripeSecretKey);

function getCreditsForPrice(priceId: string) {
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

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Signature Stripe manquante." },
        { status: 400 }
      );
    }

    const body = await req.text();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret!
    );

    // 👉 On traite uniquement l'événement utile
    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // =========================
    // ✅ TEST SUPABASE
    // =========================
    const { data: testData, error: testError } = await supabaseAdmin
      .from("credit_purchases")
      .select("id")
      .limit(1);

    console.log("SUPABASE TEST credit_purchases", {
      testData,
      testError,
    });

    // =========================
    // 🔎 RÉCUPÉRATION DATA
    // =========================
    const userId = session.metadata?.userId || "";
    const email = session.metadata?.email || "";
    const priceId = session.metadata?.priceId || "";

    const creditsToAdd = getCreditsForPrice(priceId);

    console.log("WEBHOOK CHECKOUT DEBUG", {
      sessionId: session.id,
      userId,
      email,
      priceId,
      creditsToAdd,
    });

    if (creditsToAdd <= 0) {
      console.warn("PriceId invalide ou crédits nuls.");
      return NextResponse.json({ received: true });
    }

    // =========================
    // 🔎 CHECK DOUBLON
    // =========================
    const { data: existingPurchase, error: existingPurchaseError } =
      await supabaseAdmin
        .from("credit_purchases")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

    console.log("WEBHOOK EXISTING PURCHASE", {
      existingPurchase,
      existingPurchaseError,
    });

    if (existingPurchase) {
      return NextResponse.json({ received: true });
    }

    // =========================
    // 🔎 RÉCUP USER
    // =========================
    let targetUserId = userId;

    if (!targetUserId && email) {
      const { data: userByEmail } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (userByEmail?.id) {
        targetUserId = userByEmail.id;
      }
    }

    if (!targetUserId) {
      console.error("Aucun utilisateur trouvé.");
      return NextResponse.json({ received: true });
    }

    // =========================
    // 💾 INSERT PURCHASE
    // =========================
    const { error: purchaseError } = await supabaseAdmin
      .from("credit_purchases")
      .insert({
        user_id: targetUserId,
        stripe_session_id: session.id,
        stripe_customer_email:
          session.customer_details?.email ||
          session.customer_email ||
          email,
        stripe_price_id: priceId,
        credits_added: creditsToAdd,
        amount_total: session.amount_total,
        currency: session.currency,
        status: "paid",
      });

    console.log("WEBHOOK INSERT RESULT", { purchaseError });

    if (purchaseError) {
      return NextResponse.json(
        { error: "Erreur insert purchase" },
        { status: 500 }
      );
    }

    // =========================
    // ➕ ADD CREDITS
    // =========================
    const { error: addCreditsError } = await supabaseAdmin.rpc(
      "add_credits",
      {
        p_user_id: targetUserId,
        p_credits: creditsToAdd,
      }
    );

    console.log("WEBHOOK ADD CREDITS RESULT", { addCreditsError });

    if (addCreditsError) {
      return NextResponse.json(
        { error: "Erreur ajout crédits" },
        { status: 500 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);

    return NextResponse.json(
      { error: "Webhook Stripe invalide" },
      { status: 400 }
    );
  }
}