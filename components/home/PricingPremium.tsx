"use client";

import { motion } from "framer-motion";
import StripeCheckoutButton from "@/app/components/StripeCheckoutButton";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

type Plan = {
  name: string;
  price: string;
  credits: string;
  description: string;
  features: string[];
  cta: string;
  priceId?: string;
  featured?: boolean;
  badge?: string;
};

const rawPlans: Plan[] = [
  {
    name: "Starter",
    price: "9€",
    credits: "10 crédits",
    description: "Idéal pour découvrir l’outil et tester vos premiers rendus.",
    features: [
      "10 crédits inclus",
      "Qualité premium",
      "Parfait pour commencer",
    ],
    cta: "Choisir Starter",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID,
    featured: false,
  },
  {
    name: "Pro",
    price: "19€",
    credits: "30 crédits",
    description: "Le meilleur équilibre entre volume, prix et flexibilité.",
    features: [
      "30 crédits inclus",
      "Meilleur rapport qualité / prix",
      "Idéal pour un usage régulier",
    ],
    cta: "Choisir Pro",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID,
    featured: true,
    badge: "Le plus populaire",
  },
  {
    name: "Business",
    price: "49€",
    credits: "100 crédits",
    description: "Conçu pour les usages intensifs et les besoins réguliers.",
    features: [
      "100 crédits inclus",
      "Gros volumes",
      "Pensé pour les professionnels",
    ],
    cta: "Choisir Business",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID,
    featured: false,
  },
];

const plans = rawPlans.filter((plan) => Boolean(plan.priceId));

export default function PricingPremium() {
  return (
    <section
      id="tarifs"
      className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50/60 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
            Tarifs
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Des offres simples et adaptées à vos besoins
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Choisissez le pack qui correspond à votre usage, que vous soyez
            particulier, investisseur ou professionnel de l’immobilier.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-[30px] border bg-white p-6 shadow-sm transition ${
                plan.featured
                  ? "border-stone-300 ring-2 ring-stone-200"
                  : "border-stone-200"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ delay: 0.08 + index * 0.08 }}
            >
              {plan.badge && (
                <div className="absolute right-4 top-4 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  {plan.badge}
                </div>
              )}

              <div className="mt-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                  {plan.name}
                </p>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-stone-900">
                    {plan.price}
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-stone-700">
                  {plan.credits}
                </p>

                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700"
                  >
                    ✔ {feature}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                {plan.priceId ? (
                  <StripeCheckoutButton
                    priceId={plan.priceId}
                    label={plan.cta}
                    className={
                      plan.featured
                        ? "w-full rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-stone-800"
                        : "w-full rounded-xl border border-stone-300 bg-white px-5 py-3 font-semibold text-stone-900 transition hover:bg-stone-50"
                    }
                  />
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100 px-5 py-3 font-semibold text-stone-400"
                  >
                    Offre indisponible
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm leading-7 text-stone-600">
            1 image offerte • Paiement sécurisé • Utilisable immédiatement
          </p>
          <p className="mt-2 text-xs text-stone-500">
            1 crédit = 1 génération d’image
          </p>
        </motion.div>
      </div>
    </section>
  );
}