"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-stone-50 to-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
        {/* COLONNE GAUCHE */}
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
            1 image offerte • Sans inscription
          </div>

          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Transformez votre bien en coup de cœur en 15 secondes
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Importez une photo, obtenez un rendu ultra réaliste et aidez immédiatement
            acheteurs, locataires ou prospects à se projeter. Visualisez aussi le bien
            avec vos propres meubles avant de vous décider.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#tester"
              className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-stone-800"
            >
              Tester ma photo gratuitement
            </a>

            <a
              href="#avant-apres"
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              Voir les avant / après
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-500">
            <span className="rounded-full bg-stone-100 px-3 py-1">
              Résultat en quelques secondes
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1">
              Aucune compétence requise
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-stone-700">
            <span>✔ Home staging automatique</span>
            <span>✔ Projection personnalisée</span>
            <span>✔ Résultat premium</span>
          </div>
        </div>

        {/* COLONNE DROITE */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-2xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/hero/salon-apres.jpg"
                alt="Salon transformé grâce au home staging"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-800 shadow">
                Résultat généré par IA
              </div>
            </div>

            <div className="border-t border-stone-100 bg-white p-5 sm:p-6">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Test immédiat
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                Testez votre photo dès maintenant
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Ajoutez une photo de votre bien et laissez l'IA créer un rendu professionnel.
              </p>

              <div className="mt-5">
                <a
                  href="#tester"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#d6b98c] px-5 py-3 text-sm font-semibold text-stone-900 transition hover:opacity-90"
                >
                  Lancer un test gratuit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
