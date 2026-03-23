import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    const response = await fetch('https://api.blink.ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BLINK_API_KEY}`,
      },
      body: JSON.stringify({
        image: base64,
        // Prompt ultra-réaliste pour rendu photo immobilier professionnel
        prompt: `
Ultra photorealistic interior home staging.
Preserve original room structure and perspective.
Add high-end modern furniture with perfect scale and proportions.
Natural lighting, soft shadows, realistic materials (wood, fabric, glass).
Professional real estate photography style.
No distortion, no artificial look, no overdesign.
Make the space warm, elegant, and highly attractive for buyers.
`,
        // Paramètres de qualité (si supportés par l'API Blink)
        quality: 'high',
        steps: 40,
        guidance: 8,
      }),
    })

    if (!response.ok) throw new Error('API error')

    const data = await response.json()

    return NextResponse.json({ imageUrl: data.output_url })
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
