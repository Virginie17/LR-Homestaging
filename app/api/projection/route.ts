import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function extractImageUrl(output: unknown): string | null {
  if (typeof output === "string" && output.length > 0) return output;

  if (Array.isArray(output) && output.length > 0) {
    const first = output[0];

    if (typeof first === "string" && first.length > 0) return first;

    if (
      first &&
      typeof first === "object" &&
      "url" in first &&
      typeof (first as { url?: unknown }).url === "string"
    ) {
      return (first as { url: string }).url;
    }
  }

  if (
    output &&
    typeof output === "object" &&
    "url" in output &&
    typeof (output as { url?: unknown }).url === "string"
  ) {
    return (output as { url: string }).url;
  }

  return null;
}

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
        { error: "Vous devez être connecté pour utiliser cette fonctionnalité." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const room = formData.get("room");
    const furniture = formData.getAll("furniture");

    if (!(room instanceof File)) {
      return NextResponse.json(
        { error: "La photo du bien est obligatoire." },
        { status: 400 }
      );
    }

    const validFurniture = furniture.filter(
      (item): item is File => item instanceof File
    );

    if (validFurniture.length === 0) {
      return NextResponse.json(
        { error: "Ajoutez au moins un meuble." },
        { status: 400 }
      );
    }

    const { data: userRow } = await supabaseAdmin
      .from("users")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (!userRow || userRow.credits <= 0) {
      return NextResponse.json(
        { error: "Vous n'avez plus de crédits." },
        { status: 402 }
      );
    }

    const roomBase64 = Buffer.from(await room.arrayBuffer()).toString("base64");
    const roomDataUri = `data:${room.type || "image/png"};base64,${roomBase64}`;

    const furnitureDataUris = await Promise.all(
      validFurniture.map(async (file) => {
        const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
        return `data:${file.type || "image/png"};base64,${base64}`;
      })
    );

    const prompt = `
Ultra photorealistic interior furniture projection.
Preserve EXACT room structure, walls, windows, doors, floor, ceiling and perspective.
Do not add or remove any structural element.
Insert the provided furniture into the room naturally and realistically.
Respect exact proportions, perspective, contact points, shadows and lighting.
No floating objects, no distortion, no geometry change, no artificial look.
Create a believable future-home result.
    `.trim();

    const replicateResponse = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-max/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          Prefer: "wait",
        },
        body: JSON.stringify({
          input: {
            prompt,
            input_image: roomDataUri,
            reference_images: furnitureDataUris,
            aspect_ratio: "match_input_image",
          },
        }),
      }
    );

    const responseText = await replicateResponse.text();
    let responseJson: any = null;

    try {
      responseJson = JSON.parse(responseText);
    } catch {
      responseJson = null;
    }

    if (!replicateResponse.ok) {
      return NextResponse.json(
        { error: "Erreur côté moteur de projection." },
        { status: 502 }
      );
    }

    const imageUrl = extractImageUrl(responseJson?.output);

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Aucune projection exploitable n’a été retournée." },
        { status: 502 }
      );
    }

    const { error: creditError } = await supabaseAdmin.rpc("consume_credit", {
      p_user_id: user.id,
    });

    if (creditError) {
      return NextResponse.json(
        { error: "Impossible de consommer un crédit." },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("projection route error", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}