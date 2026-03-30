"use client";

import Image from "next/image";
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

const cards = [
  {
    title: "Chambre accueillante",
    description:
      "Transformez une pièce neutre ou vide en espace chaleureux, harmonieux et immédiatement plus désirable.",
    image: "/images/chambre-premium.jpg",
    alt: "Transformation premium d'une chambre",
    badge: "Chambre",
  },
  {
    title: "Cuisine valorisée",
    description:
      "Révélez le potentiel d'une cuisine en quelques secondes avec un rendu plus lumineux, plus moderne et plus vendeur.",
    image: "/images/cuisine-premium.jpg",
    alt: "Transformation premium d'une cuisine",
    badge: "Cuisine",
    featured: true,
  },
  {
    title: "Salle de bain modernisée",
    description:
      "Apportez une impression immédiate de propreté, de clarté et de qualité perçue sans recourir à de gros travaux.",
    image: "/images/sdb-premium.jpg",
    alt: "Transformation premium d'une salle de bain",
    badge: "Salle de bain",
  },
];

export default function PremiumTransformations() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
            Transformations
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Des rendus qui convainquent au premier regard
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Chaque image est pensée pour révéler le potentiel d'un bien,
            renforcer la projection et créer un effet coup de cœur immédiat.
          </p>
        </motion.div>

        {/* Grid premium */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const featured = Boolean(card.featured);

            return (
              <motion.article
                key={card.title}
                className={`group relative overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-sm transition ${
                  featured
                    ? "lg:translate-y-0 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
                    : "hover:-translate-y-1 hover:shadow-md"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ delay: 0.1 + index * 0.08 }}
              >
                <div className="relative">
                  <div className={`relative w-full ${featured ? "aspect-[4/4.8]" : "aspect-[4/4.5]"}`}>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                  </div>

                  <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-semibold text-stone-800 shadow-md backdrop-blur">
                    {card.badge}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
                    {card.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-stone-800">
                    <span className="h-2 w-2 rounded-full bg-stone-400" />
                    Rendu premium en quelques secondes
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom strip */}
        <motion.div
          className="mt-10 rounded-[28px] border border-stone-200 bg-stone-50/80 px-6 py-6 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <div className="grid gap-4 text-center md:grid-cols-3 md:text-left">
            <div>
              <p className="text-2xl font-bold tracking-tight text-stone-900">+ de projection</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Les visiteurs comprennent immédiatement le potentiel du bien.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold tracking-tight text-stone-900">+ d'attractivité</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Les espaces paraissent plus lumineux, plus harmonieux et plus désirables.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold tracking-tight text-stone-900">+ de crédibilité</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Un rendu propre et cohérent renforce immédiatement la qualité perçue.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
