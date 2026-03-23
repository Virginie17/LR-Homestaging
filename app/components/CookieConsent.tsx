'use client'

import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const key = 'lr_cookie_consent_v1'

  useEffect(() => {
    try {
      const v = localStorage.getItem(key)
      if (!v) setShow(true)
    } catch (e) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(key, JSON.stringify({ accepted: true, date: new Date().toISOString() }))
    } catch (e) {
      // ignore
    }
    setShow(false)
  }

  const manage = () => {
    // open cookies page
    window.location.href = '/cookies'
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50">
      <div className="max-w-3xl mx-auto bg-white text-black p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium">Nous utilisons des cookies</p>
          <p className="text-xs text-gray-600">Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez accepter ou gérer vos préférences.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={manage} className="px-3 py-2 border rounded">Gérer</button>
          <button onClick={accept} className="px-3 py-2 bg-black text-white rounded">Accepter</button>
        </div>
      </div>
    </div>
  )
}
