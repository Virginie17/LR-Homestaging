'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type AppUser = {
  id: string
  email: string
}

export default function CreditsBalance() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const fetchCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single()

    if (error) {
      setCredits(0)
      return
    }

    setCredits(data?.credits ?? 0)
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
        })
        await fetchCredits(data.user.id)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        })
        await fetchCredits(session.user.id)
      } else {
        setUser(null)
        setCredits(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async () => {
    setMessage(null)

    if (!email) {
      setMessage('Veuillez entrer votre email.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}`,
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Lien magique envoyé. Vérifiez votre boîte mail.')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setCredits(null)
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-sm mx-auto text-black">
      <h3 className="font-semibold mb-2">Mon compte</h3>

      {user ? (
        <>
          <p className="mb-2 text-sm">
            Connecté : <span className="font-medium">{user.email}</span>
          </p>
          <p className="text-2xl font-bold mb-3">
            {credits ?? 0} crédits
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fetchCredits(user.id)}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Rafraîchir
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-2 bg-red-600 text-white rounded"
            >
              Déconnexion
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full px-3 py-2 bg-black text-white rounded"
          >
            {loading ? 'Envoi...' : 'Se connecter / Créer un compte'}
          </button>
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
          <p className="mt-2 text-xs text-gray-500">
            1 crédit gratuit à la création du compte
          </p>
        </>
      )}
    </div>
  )
}