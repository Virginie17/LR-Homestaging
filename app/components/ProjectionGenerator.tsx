"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProjectionGenerator() {
  const [room, setRoom] = useState<File | null>(null)
  const [furniture, setFurniture] = useState<File[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resultVisible, setResultVisible] = useState(false)

  const roomPreviewUrl = useMemo(() => {
    if (!room) return null
    return URL.createObjectURL(room)
  }, [room])

  const furniturePreviewUrls = useMemo(() => {
    if (!furniture.length) return []
    return furniture.map((file) => URL.createObjectURL(file))
  }, [furniture])

  useEffect(() => {
    if (!result) {
      setResultVisible(false)
      return
    }

    setResultVisible(false)
    const t = setTimeout(() => setResultVisible(true), 30)
    return () => clearTimeout(t)
  }, [result])

  const handleGenerate = async () => {
    if (!room) {
      setError("Veuillez sélectionner la photo du bien")
      return
    }

    setLoading(true)
    setError(null)
    setResultVisible(false)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error("Connectez-vous d’abord pour utiliser vos crédits.")
      }

      const formData = new FormData()
      formData.append("room", room)

      furniture.forEach((file) => {
        formData.append("furniture", file)
      })

      const res = await fetch("/api/projection", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Erreur génération")
      }

      setResult(data.imageUrl)
    } catch (err: any) {
      setError(err.message || "Erreur serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-black">
      <div className="mb-6">
        <p className="text-sm uppercase text-yellow-600 font-semibold">Mode avancé</p>
        <h3 className="text-2xl font-bold">Projection avec vos meubles</h3>
        <p className="text-gray-600">
          Visualisez votre futur intérieur avec vos propres meubles avant d’acheter
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">1. Photo du bien</p>
            <span className={`text-xs font-semibold ${room ? "text-green-700" : "text-gray-400"}`}>
              {room ? "Ajoutée" : "Requise"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">2. Vos meubles</p>
            <span className={`text-xs font-semibold ${furniture.length ? "text-green-700" : "text-gray-400"}`}>
              {furniture.length ? `${furniture.length} photo(s)` : "Optionnel"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">3. Résultat</p>
            <span className={`text-xs font-semibold ${result ? "text-green-700" : "text-gray-400"}`}>
              {result ? "Prêt" : "À générer"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-semibold mb-2">Photo du bien</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setRoom(e.target.files?.[0] || null)
              setResult(null)
            }}
            className="w-full border border-gray-200 rounded-xl p-3"
          />

          <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            {roomPreviewUrl ? (
              <img src={roomPreviewUrl} alt="Aperçu bien" className="w-full h-56 object-cover" />
            ) : (
              <div className="h-56 flex items-center justify-center text-sm text-gray-500">
                Ajoutez la photo du bien
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Vos meubles</p>
            <p className="text-xs text-gray-500">(1 à 5 photos conseillées)</p>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              setFurniture(Array.from(e.target.files || []))
              setResult(null)
            }}
            className="w-full border border-gray-200 rounded-xl p-3"
          />

          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-3">
            {furniturePreviewUrls.length ? (
              <div className="grid grid-cols-3 gap-2">
                {furniturePreviewUrls.slice(0, 3).map((url) => (
                  <div key={url} className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                    <img src={url} alt="Aperçu meuble" className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center text-sm text-gray-500">
                Ajoutez vos meubles (optionnel)
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Aperçu</p>
            <p className="text-sm text-gray-600">
              {room ? "[photo bien]" : "[photo bien]"} + {furniture.length ? "[vos meubles]" : "[vos meubles]"} → [projection]
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold disabled:opacity-50"
            disabled={loading || !room}
          >
            {loading ? "Projection..." : "Créer ma projection"}
          </button>
        </div>

        {loading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Génération premium — 20 à 40 secondes</p>
            <div className="animate-pulse h-56 bg-gray-100 rounded-2xl mt-3" />
          </div>
        )}

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-6">
            <div className="mb-3">
              <p className="text-sm font-semibold">✨ Projection terminée</p>
              <p className="text-sm text-gray-600">🎯 Résultat</p>
            </div>
            <img
              src={result}
              alt="Projection générée"
              className={`rounded-2xl w-full object-cover transition duration-700 ease-out ${
                resultVisible ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  )
}