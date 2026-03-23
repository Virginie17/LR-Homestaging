"use client";
import React from "react";
import Image from "next/image";
import HomeStagingGenerator from './components/HomeStagingGenerator'
import StripeCheckoutButton from './components/StripeCheckoutButton'
import ProjectionGenerator from "./components/ProjectionGenerator";
import CreditsBalance from './components/CreditsBalance'
import CookieConsent from './components/CookieConsent'
// import { supabase } from "../lib/supabase";
import { trackEvent } from "../lib/analytics";

export default function LRHomeStaging() {
  // Form logic removed for static projection section

  return (
    <div className="font-sans text-gray-900">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/logo/logo noir.png" alt="LR HomeStaging" width={140} height={50} />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#offres" className="hover:text-yellow-500">Offres</a>
          <a href="#form" className="hover:text-yellow-500">Diagnostic</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center justify-center text-center text-white">
        <div className="bg-black/50 p-8 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Le coup de cœur dès la première visite
          </h1>
          <p className="mb-6 text-lg">
            Vendez votre bien plus vite grâce au home staging
          </p>
          <a href="#form" onClick={() => trackEvent('cta_click', { button: 'hero_diagnostic' })}>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
              Demander un diagnostic
            </button>
          </a>
        </div>
      </section>

      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Pourquoi faire du home staging ?
        </h2>

        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-xl font-bold">⏱️ Vente plus rapide</p>
          </div>
          <div>
            <p className="text-xl font-bold">💰 Meilleur prix</p>
          </div>
          <div>
            <p className="text-xl font-bold">❤️ Coup de cœur immédiat</p>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Ils ont vendu grâce au home staging</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Marie L.", result: "Vendu en 10 jours", property: "T3 La Rochelle", image: "🏠" },
            { name: "Thomas B.", result: "Visites x3", property: "Appartement 85m²", image: "🏢" },
            { name: "Sophie M.", result: "+15% sur le prix", property: "Maison 4 pièces", image: "🏡" }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">
              <div className="text-4xl mb-4">{testimonial.image}</div>
              <h3 className="font-bold text-lg mb-2">{testimonial.name}</h3>
              <p className="text-2xl font-bold text-yellow-600 mb-1">{testimonial.result}</p>
              <p className="text-gray-600">{testimonial.property}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVANT APRES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Avant / Après</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Image 
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" 
            alt="Avant home staging - salon" 
            className="rounded-xl shadow" 
            width={600} height={400} 
          />
          <Image 
            src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc" 
            alt="Après home staging - salon" 
            className="rounded-xl shadow" 
            width={600} height={400} 
          />
        </div>
      </section>

      {/* OFFRES */}
      <div className="max-w-md mx-auto mt-6 space-y-3">
  <StripeCheckoutButton
    priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID || ""}
    label="Acheter 10 crédits — 9€"
  />
  <StripeCheckoutButton
    priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID || ""}
    label="Acheter 30 crédits — 19€"
  />
  <StripeCheckoutButton
    priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID || ""}
    label="Acheter 100 crédits — 49€"
  />
</div>

      {/* IMPACT */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">90% des acheteurs décident en 90 secondes</h2>
      </section>

      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">
          Vous vous posez peut-être ces questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">

          <div>
            <p className="font-semibold">
              ❓ &quot;Le home staging, ça coûte cher ?&quot;
            </p>
            <p>
              Non. C&apos;est un investissement rentable. Un bien valorisé se vend plus vite
              et évite des baisses de prix souvent bien plus importantes.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              ❓ &quot;Est-ce vraiment utile ?&quot;
            </p>
            <p>
              Oui. 90% des acheteurs prennent leur décision dans les premières secondes.
              Le home staging permet de déclencher ce coup de cœur.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              ❓ &quot;Mon bien est déjà bien, pourquoi changer ?&quot;
            </p>
            <p>
              Votre bien vous plaît… mais il doit plaire au plus grand nombre.
              L&apos;objectif est de séduire un maximum d&apos;acheteurs potentiels.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              ❓ &quot;Et si je vends sans home staging ?&quot;
            </p>
            <p>
              C&apos;est possible. Mais souvent plus long… avec négociation à la baisse.
              Le home staging accélère la vente et sécurise votre prix.
            </p>
          </div>

        </div>
      </section>


      {/* TRANSITION AVANT SECTION PROJECTION */}
      <p className="text-center mt-10 text-lg">
        Aujourd’hui, la majorité des acheteurs n’arrivent pas à se projeter.
      </p>

      {/* SECTION PROJECTION OPTIMISÉE */}
      <div className="max-w-4xl mx-auto mt-8">
  <ProjectionGenerator />
</div>
      <section className="py-16 px-6 bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Et si vous pouviez vous projeter avant même de visiter ?
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          Envoyez une photo du bien + vos meubles.<br/>
          Je vous crée une projection réaliste pour vous aider à vous projeter immédiatement.
        </p>
        <div className="bg-white text-black p-6 rounded-xl max-w-md mx-auto">
          <label htmlFor="projection-name" className="text-sm block text-left mb-1">Votre prénom</label>
          <input id="projection-name" type="text" placeholder="Votre prénom" title="Votre prénom" className="w-full p-3 mb-3 border rounded" />
          <label htmlFor="projection-phone" className="text-sm block text-left mb-1">Téléphone</label>
          <input id="projection-phone" type="tel" placeholder="Téléphone" title="Téléphone" className="w-full p-3 mb-3 border rounded" />
          <label htmlFor="projection-photo-bien" className="text-sm block text-left mb-1">Photo du bien</label>
          <input id="projection-photo-bien" type="file" title="Photo du bien" className="w-full p-3 mb-3 border rounded" />
          <label htmlFor="projection-photo-meuble" className="text-sm block text-left mb-1">Photo de votre meuble</label>
          <input id="projection-photo-meuble" type="file" title="Photo de votre meuble" className="w-full p-3 mb-3 border rounded" />
          <button className="bg-yellow-500 w-full py-3 rounded-xl font-semibold">
            Recevoir ma projection gratuite
          </button>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <HomeStagingGenerator />
        </div>
        <div className="max-w-md mx-auto mt-6">
          <StripeCheckoutButton priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID || 'starter'} label="Acheter des crédits" />
        </div>
        <div className="max-w-md mx-auto mt-6">
          <CreditsBalance />
        </div>
        <p className="mt-4 text-sm">
          ⚡ Réponse sous 24h – Sans engagement
        </p>
        <p className="mt-4 text-sm">
          🎁 1ère projection offerte
        </p>
      </section>

      {/* ENCOURAGEMENT APRÈS SECTION */}
      <p className="text-center mt-6 font-semibold">
        Je peux également vous accompagner pour valoriser entièrement votre bien.
      </p>

      {/* CTA FINAL */}
      <section className="py-16 text-center bg-yellow-500">
        <h2 className="text-3xl font-bold mb-6">Recevez votre plan d&apos;action en 24h</h2>
        <a href="#form" onClick={() => trackEvent('cta_click', { button: 'final_appointment' })}>
          <button className="bg-black text-white px-6 py-3 rounded-xl">Prendre rendez-vous</button>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Image src="/logo/logo blanc.jpg" alt="LR HomeStaging" width={120} height={40} />
          </div>
          <div className="text-sm text-gray-300 space-y-2">
            <p>© {new Date().getFullYear()} LR HomeStaging — Tous droits réservés</p>
            <p>
              LR HomeStaging SASU — SIRET: 000 000 000 00000 — 123 Rue Exemple, 17000 La Rochelle
            </p>
            <p>Contact: <a href="mailto:contact@lr-homestaging.fr" className="underline">contact@lr-homestaging.fr</a></p>
            <p>
              Responsable du traitement: Nom Prénom — Données collectées: email, fichiers envoyés pour génération d'images.
            </p>
            <p>
              <a href="/privacy" className="underline mr-3">Politique de confidentialité</a>
              <a href="/cookies" className="underline mr-3">Cookies</a>
              <a href="/terms" className="underline">Conditions générales</a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Conformément au RGPD vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité des
              données. Pour exercer ces droits, contactez-nous à l'adresse ci-dessus.
            </p>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}