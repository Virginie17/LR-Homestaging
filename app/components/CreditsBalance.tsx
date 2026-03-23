'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CreditsBalance() {
  const [user, setUser] = useState<any | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(data.user || null)
      if (data.user) await fetchCredits(data.user.id)
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      if (session?.user) fetchCredits(session.user.id)
      if (!session) setCredits(null)
    })

    return () => {
      mounted = false
      listener?.subscription.unsubscribe()
    }
  }, [])

  const fetchCredits = async (userId: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('users').select('credits').eq('id', userId).single()
      if (error) {
        console.warn('fetchCredits error', error)
        setCredits(null)
      } else {
        setCredits(data?.credits ?? 0)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    setMessage(null)
    if (!email) return setMessage('Veuillez entrer un email')
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage('Erreur envoi lien: ' + error.message)
    else setMessage('Lien magique envoyé — vérifiez votre email')
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setCredits(null)
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-sm mx-auto">
      <h3 className="font-semibold mb-2">Crédits</h3>
      {user ? (
        <div>
          <p className="mb-2">Connecté : <span className="font-medium">{user.email}</span></p>
          <p className="text-2xl font-bold">{loading ? '…' : (credits ?? 0)} crédits</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={() => user && fetchCredits(user.id)}>Rafraîchir</button>
            <button type="button" className="px-3 py-1 bg-red-600 text-white rounded" onClick={handleSignOut}>Déconnexion</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-2">Vous n'êtes pas connecté.</p>
          <label htmlFor="credits-email" className="sr-only">Email</label>
          <input
            id="credits-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full p-2 mb-2 border rounded"
            aria-describedby="credits-email-desc"
          />
          <p id="credits-email-desc" className="sr-only">Entrez votre email pour recevoir un lien magique</p>
          <div className="flex gap-2">
            <button type="button" className="px-3 py-1 bg-black text-white rounded" onClick={handleSignIn} disabled={loading}>{loading ? 'Envoi...' : 'Se connecter'}</button>
          </div>
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>
      )}
    </div>
  )
}
