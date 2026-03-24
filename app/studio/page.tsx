"use client";

import Image from "next/image";
import HomeStagingGenerator from "../components/HomeStagingGenerator";
import ProjectionGenerator from "../components/ProjectionGenerator";
import CreditsBalance from "../components/CreditsBalance";
import StripeCheckoutButton from "../components/StripeCheckoutButton";
import CookieConsent from "../components/CookieConsent";
import { trackEvent } from "@/lib/analytics";

export default function StudioPage() {
  return (
    <div className="font-sans text-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <Image src="/logo/logo noir.png" alt="LR HomeStaging" width={140} height={50} />
          <span className="text-sm text-gray-600">Studio</span>
        </div>
      </header>

      <section className="py-12 px-6 text-center bg-gray-50">
        <h1 className="text-3xl md:text-4xl font-bold">Outils IA LR HomeStaging</h1>
        <p className="mt-3 text-gray-700">
          Transformez un intérieur et créez des projections premium. Les générations consomment des crédits.
        </p>
        <button
          onClick={() => trackEvent("cta_click", { button: "studio_try" })}
          className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
        >
          Tester maintenant
        </button>
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
