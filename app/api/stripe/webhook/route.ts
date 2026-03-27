import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId || "";
      const email = session.metadata?.email || "";
      const priceId = session.metadata?.priceId || "";

      const creditsToAdd = getCreditsForPrice(priceId);

      if (creditsToAdd <= 0) {
        return NextResponse.json({ received: true });
      }

      const { data: existingPurchase } = await supabaseAdmin
        .from("credit_purchases")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

      if (existingPurchase) {
        return NextResponse.json({ received: true });
      }

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
        console.error("Aucun utilisateur trouvé pour attribuer les crédits.");
        return NextResponse.json({ received: true });
      }

      const { error: purchaseError } = await supabaseAdmin
        .from("credit_purchases")
        .insert({
          user_id: targetUserId,
          stripe_session_id: session.id,
          stripe_customer_email:
            session.customer_details?.email || session.customer_email || email,
          stripe_price_id: priceId,
          credits_added: creditsToAdd,
          amount_total: session.amount_total,
          currency: session.currency,
          status: "paid",
        });

      if (purchaseError) {
        console.error("Erreur insert credit_purchases", purchaseError);
        return NextResponse.json(
          { error: "Erreur enregistrement achat." },
          { status: 500 }
        );
      }

      const { error: addCreditsError } = await supabaseAdmin.rpc(
        "add_credits",
        {
          p_user_id: targetUserId,
          p_credits: creditsToAdd,
        }
      );

      if (addCreditsError) {
        console.error("Erreur add_credits", addCreditsError);
        return NextResponse.json(
          { error: "Erreur ajout crédits." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("stripe webhook error", error);
    return NextResponse.json(
      { error: "Webhook Stripe invalide." },
      { status: 400 }
    );
  }
}