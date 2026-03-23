"use client";

import Image from "next/image";
import HomeStagingGenerator from "./components/HomeStagingGenerator";
import ProjectionGenerator from "./components/ProjectionGenerator";
import CreditsBalance from "./components/CreditsBalance";
import StripeCheckoutButton from "./components/StripeCheckoutButton";
import CookieConsent from "./components/CookieConsent";
import { trackEvent } from "../lib/analytics";

export default function LRHomeStaging() {
  return (
    <div className="font-sans text-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/logo/logo noir.png" alt="LR HomeStaging" width={140} height={50} />
        </div>
      </header>

      <section className="h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center justify-center text-center text-white">
        <div className="bg-black/50 p-8 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Le coup de cœur dès la première visite
          </h1>
          <p className="mb-6 text-lg">
            Valorisez un bien avec un rendu IA ultra réaliste
          </p>
          <button
            onClick={() => trackEvent("cta_click", { button: "hero_try" })}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Tester maintenant
          </button>
        </div>
      </section>

      <div className="max-w-md mx-auto mt-10 px-4">
        <CreditsBalance />
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <HomeStagingGenerator />
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <ProjectionGenerator />
      </div>

      <div className="max-w-md mx-auto mt-10 space-y-3 px-4">
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

      <footer className="bg-black text-white text-center py-8 px-4 mt-16">
        <p>© {new Date().getFullYear()} LR HomeStaging</p>
      </footer>

      <CookieConsent />
    </div>
  );
}