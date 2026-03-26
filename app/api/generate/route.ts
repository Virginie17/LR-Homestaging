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

  await (supabaseAdmin as any)
    .from("users")
    .update({ credits: ((existingUser as any).credits || 0) + 1 })
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
        { error: "Vous devez être connecté pour générer une image." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const mode = formData.get("mode") as string || "homeStaging";

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Aucune image reçue." },
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

    if (!currentUser || (currentUser as any).credits <= 0) {
      return NextResponse.json(
        { error: "Crédits insuffisants. Choisissez un pack pour continuer.", needsUpgrade: true },
        { status: 402 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const prompt = mode === "projection" 
      ? `
Ultra photorealistic interior projection with user's furniture.
STRICT: Maintain exact room structure, walls, windows, and architectural elements.
Add realistic furniture placement that respects the existing space and proportions.
Use natural real-estate photography lighting with soft shadows.
DO NOT modify walls, windows, or room structure.
Make the projection credible and emotionally engaging for buyers.
      `.trim()
      : `
Ultra photorealistic interior home staging.
Maintain the exact room structure and perspective.
Add elegant modern furniture with realistic placement and proportions.
Use natural real-estate photography lighting, soft shadows, and realistic materials.
Do not distort the room or architecture.
Make the room attractive, warm, and credible for buyers.
      `.trim();

    const replicateResponse = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-max/predictions",
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
            input_image: dataUri,
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
      console.error("Replicate API HTTP error:", {
        status: replicateResponse.status,
        body: responseText,
      });

      return NextResponse.json(
        {
          error:
            "Erreur côté moteur de génération Replicate. Vérifiez la clé API ou les paramètres du modèle.",
        },
        { status: 502 }
      );
    }

    if (responseJson?.error) {
      console.error("Replicate prediction error:", responseJson.error);

      return NextResponse.json(
        {
          error: "Replicate a retourné une erreur pendant la génération.",
        },
        { status: 502 }
      );
    }

    const predictionStatus = responseJson?.status;

    if (
      predictionStatus &&
      predictionStatus !== "succeeded" &&
      predictionStatus !== "successful"
    ) {
      console.error("Replicate unexpected status:", responseJson);

      return NextResponse.json(
        {
          error:
            "La génération n'a pas abouti. Réessaie dans quelques instants.",
        },
        { status: 502 }
      );
    }

    const imageUrl = extractImageUrl(responseJson?.output);

    if (!imageUrl) {
      console.error("Replicate output missing image URL:", responseJson);

      return NextResponse.json(
        { error: "Aucune image exploitable n'a été retournée par Replicate." },
        { status: 502 }
      );
    }

    const { error: creditError } = await (supabaseAdmin as any).rpc("consume_credit", {
      p_user_id: user.id,
    });

    if (creditError) {
      console.error("Credit consumption error:", creditError);
      // On retourne quand même l'image mais on log l'erreur
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (debitedUserId) {
      await refundCredit(debitedUserId);
    }

    console.error("generate route error", error);

    return NextResponse.json(
      { error: "Erreur serveur pendant la génération." },
      { status: 500 }
    );
  }
}