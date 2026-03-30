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

export default function FinalCtaPremium() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-[36px] border border-stone-200 bg-stone-900 shadow-[0_25px_70px_rgba(0,0,0,0.16)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="absolute inset-0">
            <Image
              src="/images/home/final-cta-bg.jpg"
              alt="Salon lumineux valorisé"
              fill
              className="object-cover opacity-20"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/80 to-stone-900/70" />

          <div className="relative grid gap-10 px-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-300">
                Prêt à tester ?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Transformez vos photos en visuels premium dès aujourd'hui
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-200 sm:text-lg">
                Donnez plus d'impact à vos annonces, facilitez la projection
                et créez un effet coup de cœur en quelques secondes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-200">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  1 image offerte
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Sans inscription
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Rendu en quelques secondes
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:min-w-[260px]">
              <a
                href="#tester"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                Tester ma photo maintenant
              </a>

              <a
                href="#tarifs"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Voir les offres
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
