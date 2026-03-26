import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getCreditsForPrice(priceId: string) {
  const starterId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID;
  const proId = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID;
  const businessId = process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID;

  if (priceId === starterId) return Number(process.env.STARTER_CREDITS || 10);
  if (priceId === proId) return Number(process.env.PRO_CREDITS || 30);
  if (priceId === businessId) return Number(process.env.BUSINESS_CREDITS || 100);

  return 0;
}

export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
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

      if (userId) {
        const { data: existingUser } = await supabaseAdmin
          .from("users")
          .select("id, credits")
          .eq("id", userId)
          .single();

        if (existingUser) {
          await (supabaseAdmin as any)
            .from("users")
            .update({
              credits: ((existingUser as any).credits || 0) + creditsToAdd,
              stripe_customer_id: session.customer?.toString() || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);

          return NextResponse.json({ received: true });
        }
      }

      if (email) {
        const { data: existingByEmail } = await supabaseAdmin
          .from("users")
          .select("id, credits")
          .eq("email", email)
          .single();

        if (existingByEmail) {
          await (supabaseAdmin as any)
            .from("users")
            .update({
              credits: ((existingByEmail as any).credits || 0) + creditsToAdd,
              stripe_customer_id: session.customer?.toString() || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", (existingByEmail as any).id);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("stripe webhook error", error);
    return NextResponse.json({ error: "Webhook Stripe invalide." }, { status: 400 });
  }
}