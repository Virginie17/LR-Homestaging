"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

const benefits = [
  "Valorisez vos mandats dès la première visite",
  "Aidez les acheteurs à mieux se projeter",
  "Proposez une expérience moderne et différenciante",
  "Générez des visuels premium sans gros travaux",
];

export default function AgenciesPremium() {
  return (
    <section
      id="agences"
      className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50/60 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                Offre agences
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Un outil pensé aussi pour les agences immobilières
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                Aidez vos clients à se projeter plus vite, valorisez vos annonces
                et différenciez votre accompagnement avec une expérience visuelle
                plus moderne.
              </p>
            </motion.div>

            <motion.div
              className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                Bénéfices clés
              </div>

              <div className="mt-5 grid gap-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700"
                  >
                    ✔ {benefit}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Idéal pour
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-50 p-4">
                  <h3 className="text-base font-semibold text-stone-900">
                    Agences indépendantes
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Pour enrichir les annonces et améliorer l'expérience de visite.
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4">
                  <h3 className="text-base font-semibold text-stone-900">
                    Réseaux & mandataires
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Pour industrialiser la valorisation visuelle de plusieurs biens.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ delay: 0.12 }}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/home/agencies-main.jpg"
                  alt="Valorisation immobilière pour les agences"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-semibold text-stone-800 shadow-md backdrop-blur">
                  Usage professionnel
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-stone-900/88 px-4 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur">
                  Agences immobilières
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ delay: 0.22 }}
              >
                <p className="text-2xl font-bold tracking-tight text-stone-900">
                  + de projection
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Les visiteurs visualisent plus vite le potentiel réel du bien.
                </p>
              </motion.div>

              <motion.div
                className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ delay: 0.3 }}
              >
                <p className="text-2xl font-bold tracking-tight text-stone-900">
                  + d'impact
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Une présentation plus attractive améliore immédiatement la qualité perçue.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
