'use client'

import { useState } from 'react'

type Props = {
  priceId: string
  label?: string
}

export default function StripeCheckoutButton({ priceId, label = 'S&apos;abonner' }: Props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setError(null)
    if (!email) return setError('Veuillez renseigner votre email')

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erreur création session')

      // Redirect to Stripe Checkout
      if (data.url) window.location.href = data.url
    } catch (err: any) {
      setError(err.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <label htmlFor="stripe-email" className="block text-sm mb-2">Email pour la facture / crédits</label>
      <input
        id="stripe-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        className="w-full p-2 mb-3 border rounded"
        aria-describedby="stripe-email-desc"
      />
      <p id="stripe-email-desc" className="sr-only">Email utilisé pour la facturation et l'attribution des crédits</p>

      <button
        type="button"
        onClick={handleClick}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Redirection...' : label}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  )
}
