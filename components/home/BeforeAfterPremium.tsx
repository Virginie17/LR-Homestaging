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

export default function BeforeAfterPremium() {
  return (
    <section
      id="avant-apres"
      className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50/70 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
            Avant / Après
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Découvrez la transformation en quelques secondes
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Une image suffit pour révéler le potentiel d’un bien, faciliter la projection
            et créer un véritable effet coup de cœur.
          </p>
        </motion.div>

        {/* Bloc principal */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Visuel principal */}
          <motion.div
            className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.1}
            variants={fadeUp}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/sejour-avant-apres.png"
                alt="Transformation avant après d’un salon par home staging"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-semibold text-stone-800 shadow-md backdrop-blur">
                Avant
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-stone-900/88 px-4 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur">
                Après
              </div>

              <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-medium text-stone-800 shadow-md backdrop-blur">
                Résultat généré par IA
              </div>
            </div>
          </motion.div>

          {/* Colonne contenu */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.18}
              variants={fadeUp}
            >
              <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                Effet immédiat
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
                Une transformation qui change la perception du bien
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
                En quelques secondes, un espace sombre, encombré ou peu valorisé
                devient plus lumineux, plus harmonieux et beaucoup plus désirable.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  ✔ Meilleure projection des acheteurs
                </div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  ✔ Valorisation immédiate du potentiel
                </div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  ✔ Rendu premium sans gros travaux
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.26}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Ce que ressent le visiteur
              </p>

              <blockquote className="mt-4 text-lg font-medium leading-8 text-stone-900">
                “Je peux enfin me projeter dans ce bien.”
              </blockquote>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                C’est ce déclic émotionnel qui augmente l’attractivité d’une annonce
                et donne envie d’aller plus loin.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mini visuels secondaires */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            className="group rounded-[28px] border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.34}
            variants={fadeUp}
          >
            <div className="relative overflow-hidden rounded-[22px]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/cuisine avant apres.png"
                  alt="Transformation avant après d’une cuisine"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold text-stone-800 shadow">
                  Avant
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-stone-900/85 px-3 py-1 text-[11px] font-semibold text-white shadow">
                  Après
                </div>
              </div>
            </div>

            <div className="px-2 pb-2 pt-4">
              <h3 className="text-lg font-semibold text-stone-900">
                Cuisine modernisée
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Une cuisine plus claire et mieux valorisée aide immédiatement à projeter
                un mode de vie plus attractif.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="group rounded-[28px] border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.42}
            variants={fadeUp}
          >
            <div className="relative overflow-hidden rounded-[22px]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/chambre avant.png"
                  alt="Transformation avant après d’une chambre"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold text-stone-800 shadow">
                  Avant
                </div>
              </div>
            </div>

            <div className="px-2 pb-2 pt-4">
              <h3 className="text-lg font-semibold text-stone-900">
                Chambre plus désirable
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Une chambre transformée donne une sensation immédiate de confort,
                de douceur et de valeur perçue.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mx-auto mt-12 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={0.5}
          variants={fadeUp}
        >
          <p className="text-base text-stone-600">
            Testez votre propre photo et obtenez un rendu en quelques secondes.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#tester"
              className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Tester ma photo maintenant
            </a>

            <a
              href="#tarifs"
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              Voir les tarifs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
