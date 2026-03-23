'use client'

import { useState } from 'react'

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
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Erreur génération')

      const data = await res.json()
      setResult(data.imageUrl)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 p-6 border rounded-xl">
      <div className="mb-4">
        <strong className="block">Qualité Premium — rendu photo professionnel</strong>
        <div className="text-sm text-gray-600 mt-1">
          Starter: 9€ — Pro: 29€ — Business: 79€
        </div>
      </div>
      <label htmlFor="home-file" className="block text-sm mb-2">Photo à transformer</label>
      <input
        id="home-file"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        aria-describedby="home-file-desc"
      />
      <p id="home-file-desc" className="sr-only">Téléversez une photo du bien (jpg, png). Taille recommandée 1024×768.</p>

      <button
        type="button"
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
        aria-busy={loading}
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

      {error && <p className="text-red-500 mt-2" role="alert">{error}</p>}

      {result && file && (
        <div className="grid grid-cols-2 gap-4 mt-6" role="region" aria-label="Avant et après">
          <img src={URL.createObjectURL(file)} alt="Photo avant home staging" />
          <img src={result} alt="Photo après home staging" />
        </div>
      )}
    </div>
  )
}
