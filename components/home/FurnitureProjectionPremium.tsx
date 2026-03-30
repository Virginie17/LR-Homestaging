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

export default function FurnitureProjectionPremium() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50/70 via-white to-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                Projection personnalisée
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Aidez vos clients à se projeter avec leurs propres meubles
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                Importez la photo d'un bien, ajoutez les meubles du client et obtenez
                une projection réaliste en quelques secondes.
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
                Pourquoi c'est puissant
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  ✔ Le client visualise immédiatement son futur intérieur
                </div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  ✔ La projection émotionnelle devient beaucoup plus forte
                </div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  ✔ L'outil facilite la décision d'achat ou de location
                </div>
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
                Cas d'usage
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-50 p-4">
                  <h3 className="text-base font-semibold text-stone-900">
                    Acheteurs particuliers
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Ils peuvent vérifier si leurs meubles s'intègrent bien avant de faire une offre.
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4">
                  <h3 className="text-base font-semibold text-stone-900">
                    Agents immobiliers
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Ils proposent une expérience plus moderne et plus engageante aux visiteurs.
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
                  src="/images/projection-signature.jpg"
                  alt="Projection d'un bien avec les meubles du client"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-semibold text-stone-800 shadow-md backdrop-blur">
                  Photo du bien
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-stone-900/88 px-4 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur">
                  Projection personnalisée
                </div>

                <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-medium text-stone-800 shadow-md backdrop-blur">
                  Avec les meubles du client
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ delay: 0.22 }}
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/projection-signature.jpg"
                      alt="Exemple de meuble client intégré dans un intérieur"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="mt-4 text-base font-semibold text-stone-900">
                  Meubles intégrés visuellement
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Le client se projette avec ses propres repères, ce qui rend la visualisation bien plus concrète.
                </p>
              </motion.div>

              <motion.div
                className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ delay: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/projection-signature.jpg"
                      alt="Exemple de projection d'aménagement personnalisé"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="mt-4 text-base font-semibold text-stone-900">
                  Visualisation plus crédible
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  L'espace semble immédiatement plus réel, plus habitable et plus facile à imaginer au quotidien.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ delay: 0.38 }}
        >
          <p className="text-base text-stone-600">
            Une expérience idéale pour convaincre plus vite et rendre chaque visite plus impactante.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#tester"
              className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Tester ma photo maintenant
            </a>

            <a
              href="#agences"
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              Découvrir l'offre agences
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
