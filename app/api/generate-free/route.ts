import { NextRequest, NextResponse } from "next/server";

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
  try {
    const replicateApiToken = process.env.REPLICATE_API_TOKEN;

    if (!replicateApiToken) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN manquante." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Aucune image reçue." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const prompt = `
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
      console.error("Replicate free try error:", {
        status: replicateResponse.status,
        body: responseText,
      });

      return NextResponse.json(
        { error: "Erreur côté moteur de génération." },
        { status: 502 }
      );
    }

    const imageUrl = extractImageUrl(responseJson?.output);

    if (!imageUrl) {
      console.error("Replicate free try missing output:", responseJson);

      return NextResponse.json(
        { error: "Aucune image exploitable n'a été retournée." },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("generate-free route error", error);

    return NextResponse.json(
      { error: "Erreur serveur pendant la génération." },
      { status: 500 }
    );
  }
}
