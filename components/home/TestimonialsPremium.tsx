"use client";

import { motion } from "framer-motion";

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

const testimonials = [
  {
    name: "Agent immobilier",
    role: "Utilisateur professionnel",
    quote:
      "Les visuels générés permettent aux acheteurs de mieux se projeter. L'impact sur la perception du bien est immédiat.",
  },
  {
    name: "Investisseur immobilier",
    role: "Utilisateur régulier",
    quote:
      "L'outil m'a permis de valoriser rapidement plusieurs pièces avant publication. Le rendu est propre, rapide et très convaincant.",
    featured: true,
  },
  {
    name: "Propriétaire vendeur",
    role: "Utilisatrice",
    quote:
      "J'ai enfin pu montrer le potentiel de mon appartement sans engager de gros travaux. Le résultat fait vraiment plus professionnel.",
  },
];

export default function TestimonialsPremium() {
  return (
    <section
      id="temoignages"
      className="relative overflow-hidden bg-gradient-to-b from-stone-50/60 via-white to-white py-24"
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
            Témoignages
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Ils ont déjà testé l'expérience
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Des utilisateurs, des vendeurs et des professionnels constatent
            immédiatement une meilleure projection et une présentation plus attractive.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className={`relative rounded-[30px] border bg-white p-7 transition ${
                testimonial.featured
                  ? "border-stone-900 shadow-[0_18px_50px_rgba(0,0,0,0.10)] lg:-translate-y-2"
                  : "border-stone-200 shadow-sm hover:-translate-y-1 hover:shadow-md"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ delay: 0.08 + index * 0.08 }}
            >
              {testimonial.featured && (
                <div className="absolute right-4 top-4 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  Avis mis en avant
                </div>
              )}

              <div className="flex items-center gap-1 text-stone-900">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <blockquote className="mt-5 text-base leading-8 text-stone-700 sm:text-lg">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-8 border-t border-stone-100 pt-5">
                <p className="text-base font-semibold text-stone-900">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {testimonial.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-10 rounded-[28px] border border-stone-200 bg-stone-50/80 px-6 py-6 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ delay: 0.38 }}
        >
          <div className="grid gap-4 text-center md:grid-cols-3 md:text-left">
            <div>
              <p className="text-2xl font-bold tracking-tight text-stone-900">
                Rendu rapide
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Un résultat obtenu en quelques secondes seulement.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold tracking-tight text-stone-900">
                Plus de projection
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Les visiteurs comprennent mieux le potentiel du bien.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold tracking-tight text-stone-900">
                Plus de crédibilité
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Une annonce plus professionnelle inspire davantage confiance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
