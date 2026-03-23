import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

async function getAuthenticatedUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) return null;

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) return null;
  return user;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour générer une projection." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const room = formData.get("room") as File | null;
    const furniture = formData.getAll("furniture") as File[];

    if (!room) {
      return NextResponse.json(
        { error: "La photo du bien est obligatoire." },
        { status: 400 }
      );
    }

    const { error: creditError } = await supabaseAdmin.rpc("consume_credit", {
      p_user_id: user.id,
    });

    if (creditError) {
      const isNoCredits = creditError.message?.includes("NO_CREDITS");
      return NextResponse.json(
        {
          error: isNoCredits
            ? "Vous n'avez plus de crédits."
            : "Impossible de consommer un crédit.",
        },
        { status: 402 }
      );
    }

    const roomBase64 = Buffer.from(await room.arrayBuffer()).toString("base64");
    const furnitureBase64 = await Promise.all(
      furniture.map(async (file) =>
        Buffer.from(await file.arrayBuffer()).toString("base64")
      )
    );

    const blinkResponse = await fetch("https://api.blink.ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BLINK_API_KEY}`,
      },
      body: JSON.stringify({
        room_image: roomBase64,
        furniture_images: furnitureBase64,
        prompt: `
Insert the provided furniture into the room.
Respect exact proportions and perspective.
Do not change room structure.
Place furniture naturally and realistically.
Match lighting, shadows and materials.
Ultra photorealistic real estate rendering.
        `,
        quality: "high",
        steps: 40,
        guidance: 8,
      }),
    });

    if (!blinkResponse.ok) {
      return NextResponse.json(
        { error: "Erreur côté moteur de projection." },
        { status: 502 }
      );
    }

    const data = await blinkResponse.json();

    return NextResponse.json({
      imageUrl: data.output_url,
    });
  } catch (error) {
    console.error("projection route error", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}