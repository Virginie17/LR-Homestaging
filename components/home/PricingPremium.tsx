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

const plans = [
  {
    name: "Starter",
    price: "9€",
    credits: "10 crédits",
    description: "Idéal pour découvrir l'outil et tester vos premiers rendus.",
    features: ["10 transformations", "Qualité premium", "Essai idéal"],
    cta: "Choisir Starter",
    priceId: "starter_price_id",
    featured: false,
  },
  {
    name: "Pro",
    price: "19€",
    credits: "30 crédits",
    description: "Le meilleur équilibre entre volume, prix et flexibilité.",
    features: ["30 transformations", "Meilleur rapport qualité / prix", "Idéal agences et pros"],
    cta: "Choisir Pro",
    priceId: "pro_price_id",
    featured: true,
    badge: "Le plus populaire",
  },
  {
    name: "Business",
    price: "49€",
    credits: "100 crédits",
    description: "Conçu pour les usages intensifs et les besoins réguliers.",
    features: ["100 transformations", "Gros volumes", "Utilisation intensive"],
    cta: "Choisir Business",
    priceId: "business_price_id",
    featured: false,
  },
  {
    name: "Vente Rapide",
    price: "29€",
    credits: "5 visuels optimisés",
    description: "Un pack ciblé pour relancer un bien avec des visuels plus vendeurs.",
    features: ["5 pièces optimisées pour annonce", "Home staging premium", "Idéal pour un bien à relancer"],
    cta: "Choisir Vente Rapide",
    priceId: "vente_rapide_price_id",
    featured: false,
  },
];

export default function PricingPremium() {
  return (
    <section
      id="tarifs"
      className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50/60 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
            Tarifs
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Des offres simples et adaptées à vos besoins
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Commencez gratuitement, puis choisissez le pack le plus adapté à votre usage,
            que vous soyez particulier, investisseur ou professionnel de l'immobilier.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-[30px] border bg-white p-6 shadow-sm transition ${
                plan.featured
                  ? "border-stone-900 shadow-[0_18px_50px_rgba(0,0,0,0.10)] lg:-translate-y-2"
                  : "border-stone-200 hover:-translate-y-1 hover:shadow-md"
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
                <StripeCheckoutButton
                  priceId={plan.priceId}
                  label={plan.cta}
                  className={
                    plan.featured
                      ? "w-full rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-stone-800"
                      : "w-full rounded-xl border border-stone-300 bg-white px-5 py-3 font-semibold text-stone-900 transition hover:bg-stone-50"
                  }
                />
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
          transition={{ delay: 0.42 }}
        >
          <p className="text-sm leading-7 text-stone-600">
            1 image offerte • Payez seulement si vous souhaitez continuer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
