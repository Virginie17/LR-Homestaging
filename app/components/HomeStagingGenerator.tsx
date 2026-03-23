'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HomeStagingGenerator() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) {
      setError('Veuillez sélectionner une image')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error('Connectez-vous d’abord pour utiliser vos crédits.')
      }

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Erreur génération')
      }

      setResult(data.imageUrl)
    } catch (err: any) {
      setError(err.message || 'Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 p-6 border rounded-xl bg-white text-black">
      <div className="mb-4">
        <strong className="block">Qualité Premium — rendu photo professionnel</strong>
        <div className="text-sm text-gray-600 mt-1">
          1 crédit consommé par génération
        </div>
      </div>

      <label htmlFor="home-file" className="block text-sm mb-2">
        Photo à transformer
      </label>

      <input
        id="home-file"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        type="button"
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
        disabled={loading}
      >
        {loading ? 'Génération...' : 'Générer mon home staging'}
      </button>

      {loading && (
        <div className="mt-2">
          <p className="mt-2 text-sm text-gray-500">
            Génération en cours (qualité premium ~15-30 secondes)
          </p>
          <div className="animate-pulse h-64 bg-gray-200 rounded-lg mt-4" />
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && file && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <img src={URL.createObjectURL(file)} alt="Avant" className="rounded-lg" />
          <img src={result} alt="Après" className="rounded-lg" />
        </div>
      )}
    </div>
  )
}