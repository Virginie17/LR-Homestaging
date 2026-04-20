"use client";

import Image from "next/image";
import HomeStagingGenerator from "../components/HomeStagingGenerator";
import ProjectionGenerator from "../components/ProjectionGenerator";
import CreditsBalance from "../components/CreditsBalance";
import StripeCheckoutButton from "../components/StripeCheckoutButton";
import CookieConsent from "../components/CookieConsent";
import { trackEvent } from "@/lib/analytics";

type CreditPlan = {
  name: string;
  label: string;
  priceId?: string;
};

const creditPlans: CreditPlan[] = [
  {
    name: "Starter",
    label: "Acheter 10 crédits — 9€",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID,
  },
  {
    name: "Pro",
    label: "Acheter 30 crédits — 19€",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID,
  },
  {
    name: "Business",
    label: "Acheter 100 crédits — 49€",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID,
  },
];

export default function StudioPage() {
  const availablePlans = creditPlans.filter((plan) => Boolean(plan.priceId));

  const handleTryNow = () => {
    trackEvent("cta_click", { button: "studio_try" });

    const generatorSection = document.getElementById("generateurs");
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo noir.png"
              alt="LR Homestaging"
              width={140}
              height={50}
              priority
            />
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
              Studio
            </span>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-white to-stone-50 px-6 py-14 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
              Espace de génération
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Générez vos visuels immobiliers avec l’IA
            </h1>

            <p className="mt-5 text-base leading-7 text-stone-600 md:text-lg">
              Transformez un intérieur, améliorez la présentation d’un bien et
              créez des projections premium. Chaque génération consomme des
              crédits.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={handleTryNow}
                className="rounded-xl bg-stone-900 px-6 py-3 font-semibold text-white transition hover:bg-stone-800"
              >
                Tester maintenant
              </button>

              <a
                href="#credits"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-900 transition hover:bg-stone-50"
              >
                Acheter des crédits
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto max-w-md">
            <CreditsBalance />
          </div>
        </section>

        <section id="generateurs" className="px-4 py-6">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-stone-900">
                  Home staging IA
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Valorisez un intérieur avec un rendu plus moderne, plus
                  lumineux et plus attractif.
                </p>
              </div>
              <HomeStagingGenerator />
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-stone-900">
                  Projection avec meubles du client
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Importez une pièce et projetez les meubles du client pour
                  l’aider à mieux se projeter dans l’espace.
                </p>
              </div>
              <ProjectionGenerator />
            </div>
          </div>
        </section>

        <section id="credits" className="px-4 py-14">
          <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Crédits
              </p>
              <h2 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">
                Rechargez vos crédits en quelques clics
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Choisissez le pack adapté à votre usage. Les crédits sont
                utilisables immédiatement après le paiement.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-md space-y-3">
              {availablePlans.map((plan) =>
                plan.priceId ? (
                  <StripeCheckoutButton
                    key={plan.name}
                    priceId={plan.priceId}
                    label={plan.label}
                    className="w-full rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-stone-800"
                  />
                ) : null
              )}

              {availablePlans.length === 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
                  Les offres ne sont pas encore disponibles. Vérifie tes
                  variables d’environnement Stripe.
                </div>
              )}
            </div>

            <p className="mt-6 text-center text-xs text-stone-500">
              1 crédit = 1 génération d’image
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-16 bg-black px-4 py-8 text-center text-white">
        <p>© {new Date().getFullYear()} LR Homestaging</p>
      </footer>

      <CookieConsent />
    </div>
  );
}