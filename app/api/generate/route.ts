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
        { error: "Vous devez être connecté pour générer une image." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const mode = formData.get("mode");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Aucune image reçue." },
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const prompt =
      mode === "projection"
        ? `
Ultra photorealistic interior projection.
Preserve EXACT room structure, walls, windows, doors, floor, ceiling and perspective.
Do not add or remove any window or structural element.
Insert elegant realistic furniture while preserving scale, geometry and light.
Natural daylight only from existing windows.
No distortion, no artificial look, no geometry change.
          `.trim()
        : `
Ultra photorealistic interior home staging.
Preserve EXACT room structure, walls, windows, doors, floor, ceiling and perspective.
Do not add or remove any window or structural element.
Create a warm, modern, realistic and elegant real estate result.
Natural daylight only from existing windows.
No distortion, no artificial look, no geometry change.
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
      return NextResponse.json(
        { error: "Erreur côté moteur de génération." },
        { status: 502 }
      );
    }

    const imageUrl = extractImageUrl(responseJson?.output);

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Aucune image exploitable n’a été retournée." },
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
    console.error("generate route error", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}