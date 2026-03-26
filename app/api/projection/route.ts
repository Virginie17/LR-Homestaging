import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

async function getAuthenticatedUser(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return null;

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) return null;
  return user;
}

async function refundCredit(userId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: existingUser } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  if (!existingUser) return;

  // @ts-ignore
  // @ts-ignore
  await supabaseAdmin
    .from("users")
    .update({ credits: (existingUser.credits as number || 0) + 1 })
    .eq("id", userId);
}

function extractImageUrl(output: unknown): string | null {
  if (typeof output === "string" && output.length > 0) {
    return output;
  }

  if (Array.isArray(output) && output.length > 0) {
    const first = output[0];

    if (typeof first === "string" && first.length > 0) {
      return first;
    }

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

export async function POST(req: NextRequest) {
  let debitedUserId: string | null = null;

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const replicateApiToken = process.env.REPLICATE_API_TOKEN;

    if (
      !replicateApiToken ||
      replicateApiToken === "your_replicate_api_token_here"
    ) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN est manquante ou invalide." },
        { status: 500 }
      );
    }

    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour générer une projection." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const room = formData.get("room");
    const furnitureFiles = formData.getAll("furniture");

    if (!(room instanceof File)) {
      return NextResponse.json(
        { error: "La photo du bien est obligatoire." },
        { status: 400 }
      );
    }

    const validFurnitureFiles = furnitureFiles.filter(
      (item): item is File => item instanceof File && item.size > 0
    );

    if (validFurnitureFiles.length === 0) {
      return NextResponse.json(
        { error: "Ajoutez au moins une photo de meuble." },
        { status: 400 }
      );
    }

    const { data: currentUser, error: currentUserError } = await supabaseAdmin
      .from("users")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (currentUserError) {
      return NextResponse.json(
        { error: "Impossible de récupérer vos crédits." },
        { status: 500 }
      );
    }

    // @ts-ignore
    if (!currentUser || (currentUser.credits as number) <= 0) {
      return NextResponse.json(
        { error: "Vous n'avez plus de crédits." },
        { status: 402 }
      );
    }

    // @ts-ignore
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

    debitedUserId = user.id;

    const roomBuffer = Buffer.from(await room.arrayBuffer());
    const roomMimeType = room.type || "image/png";
    const roomDataUri = `data:${roomMimeType};base64,${roomBuffer.toString("base64")}`;

    // MVP: on utilise uniquement le premier meuble
    const firstFurniture = validFurnitureFiles[0];
    const furnitureBuffer = Buffer.from(await firstFurniture.arrayBuffer());
    const furnitureMimeType = firstFurniture.type || "image/png";
    const furnitureDataUri = `data:${furnitureMimeType};base64,${furnitureBuffer.toString("base64")}`;

    const prompt = `
Create an ultra photorealistic real-estate projection.
Use the first image as the empty or existing room.
Use the second image as a furniture reference to place naturally into the room.
Preserve the room architecture exactly: walls, floor, windows, doors, ceiling, camera angle, and perspective.
Integrate the furniture with correct scale, realistic placement, matching light direction, shadows, and materials.
Do not redesign the room structure.
The final result must look like a premium real-estate photograph, elegant, realistic, and credible for buyers.
    `.trim();

    const replicateResponse = await fetch(
      "https://api.replicate.com/v1/models/flux-kontext-apps/multi-image-kontext-max/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${replicateApiToken}`,
          "Content-Type": "application/json",
          Prefer: "wait",
        },
        body: JSON.stringify({
          input: {
            prompt,
            image_input_1: roomDataUri,
            image_input_2: furnitureDataUri,
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
      if (debitedUserId) {
        await refundCredit(debitedUserId);
      }

      console.error("Replicate projection HTTP error:", {
        status: replicateResponse.status,
        body: responseText,
      });

      return NextResponse.json(
        {
          error:
            "Erreur côté moteur de projection Replicate. Vérifiez la clé API ou les paramètres envoyés.",
        },
        { status: 502 }
      );
    }

    if (responseJson?.error) {
      if (debitedUserId) {
        await refundCredit(debitedUserId);
      }

      console.error("Replicate projection error:", responseJson.error);

      return NextResponse.json(
        { error: "Replicate a retourné une erreur pendant la projection." },
        { status: 502 }
      );
    }

    const predictionStatus = responseJson?.status;

    if (
      predictionStatus &&
      predictionStatus !== "succeeded" &&
      predictionStatus !== "successful"
    ) {
      if (debitedUserId) {
        await refundCredit(debitedUserId);
      }

      console.error("Replicate projection unexpected status:", responseJson);

      return NextResponse.json(
        {
          error:
            "La projection n'a pas abouti. Réessaie dans quelques instants.",
        },
        { status: 502 }
      );
    }

    const imageUrl = extractImageUrl(responseJson?.output);

    if (!imageUrl) {
      if (debitedUserId) {
        await refundCredit(debitedUserId);
      }

      console.error("Replicate projection missing output URL:", responseJson);

      return NextResponse.json(
        {
          error: "Aucune image exploitable n’a été retournée par Replicate.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (debitedUserId) {
      await refundCredit(debitedUserId);
    }

    console.error("projection route error", error);

    return NextResponse.json(
      { error: "Erreur serveur pendant la projection." },
      { status: 500 }
    );
  }
}