"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProjectionGenerator() {
  const [room, setRoom] = useState<File | null>(null)
  const [furniture, setFurniture] = useState<File[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!room) {
      setError("Veuillez sélectionner la photo du bien")
      return
    }

    setLoading(true)
    setError(null)

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
    <div className="mt-10 p-6 border rounded-xl bg-white text-black">
      <p className="font-semibold">1. Photo du bien</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setRoom(e.target.files?.[0] || null)}
        className="w-full p-2 my-2"
      />

      <p className="mt-4 font-semibold">2. Vos meubles</p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFurniture(Array.from(e.target.files || []))}
        className="w-full p-2 my-2"
      />

      <button
        type="button"
        onClick={handleGenerate}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
        disabled={loading}
      >
        {loading ? "Projection..." : "Créer ma projection"}
      </button>

      {loading && (
        <div className="mt-3">
          <p className="text-sm text-gray-600">Génération premium — 20 à 40 secondes</p>
          <div className="animate-pulse h-56 bg-gray-100 rounded-lg mt-3" />
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <img src={result} alt="Projection générée" className="mt-6 rounded-lg w-full object-cover" />
      )}
    </div>
  )
}