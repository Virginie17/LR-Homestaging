"use client";

import Image from "next/image";
import HomeStagingGenerator from "./components/HomeStagingGenerator";
import CreditsBalance from "./components/CreditsBalance";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import { trackEvent } from "../lib/analytics";

export default function LRHomeStaging() {
  return (
    <div className="font-sans text-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/logo/logo noir.png" alt="LR HomeStaging" width={140} height={50} />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#demo" className="hover:text-yellow-600 transition">Avant / Après</a>
          <a href="#pricing" className="hover:text-yellow-600 transition">Tarifs</a>
          <a href="#temoignages" className="hover:text-yellow-600 transition">Témoignages</a>
          <a href="/studio" className="hover:text-yellow-600 transition font-semibold text-yellow-600">Outil IA</a>
          <a href="#contact" className="hover:text-yellow-600 transition">Contact</a>
        </nav>
      </header>

      {/* 1. HERO + GÉNÉRATEUR */}
      <section className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* COLONNE GAUCHE */}
            <div className="text-white max-w-2xl">
              <p className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
                Home staging IA ultra réaliste
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Transformez votre photo immobilière en visuel coup de cœur en quelques secondes
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Importez votre photo, obtenez un rendu premium, et aidez acheteurs et locataires à se projeter immédiatement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="#generate"
                  onClick={() => trackEvent("cta_click", { button: "hero_test_photo" })}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl text-center transition"
                >
                  Tester votre photo maintenant
                </a>

                <a
                  href="#demo"
                  onClick={() => trackEvent("cta_click", { button: "hero_demo" })}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-center transition"
                >
                  Voir un avant / après réel
                </a>
              </div>

              <p className="text-sm text-gray-300 mb-8">
                1 image offerte • Sans engagement • Résultat premium
              </p>
            </div>

            {/* COLONNE DROITE */}
            <div id="generate" className="w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6">
                <div className="mb-4">
                  <p className="text-sm uppercase tracking-wide text-yellow-600 font-semibold mb-2">
                    Test immédiat
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Testez votre photo dès maintenant
                  </h2>
                  <p className="text-gray-600">
                    Importez votre image pour obtenir un home staging premium et déclencher le coup de cœur.
                  </p>
                </div>

                <HomeStagingGenerator />

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Avant / Après instantané • Idéal pour particuliers, agences et investisseurs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMMENT ÇA MARCHE */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment ça fonctionne
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Importez votre photo</h3>
              <p className="text-gray-600">Ajoutez une image d'une pièce vide ou peu valorisée</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">L'IA transforme votre intérieur</h3>
              <p className="text-gray-600">Ajout de mobilier réaliste et harmonieux</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Obtenez un visuel attractif</h3>
              <p className="text-gray-600">Un rendu prêt à convaincre acheteurs et locataires</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AVANT / APRÈS */}
      <section id="demo" className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Découvrez la transformation en quelques secondes
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Un visuel plus attractif permet de déclencher le coup de cœur dès la première impression
            </p>
          </div>

          <div className="space-y-12">
            <BeforeAfterSlider
              title="Chambre : transformation premium"
              beforeSrc="/chambre avant.png"
              afterSrc="/chambre avant.png"
              beforeText="Pièce difficile à projeter et peu valorisée."
              afterText="Une chambre chaleureuse et moderne qui donne immédiatement envie."
              badge="Projection immédiate des acheteurs"
            />

            <BeforeAfterSlider
              title="Cuisine : espace central valorisé"
              beforeSrc="/cuisine 2 avant apres.png"
              afterSrc="/cuisine 2 avant apres.png"
              beforeText="Cuisine ancienne et peu fonctionnelle."
              afterText="Un espace moderne et lumineux pensé pour séduire immédiatement."
              badge="Pièce centrale valorisée"
            />

            <BeforeAfterSlider
              title="Salle de bain : montée en gamme"
              beforeSrc="/cuisine avant apres.png"
              afterSrc="/cuisine avant apres.png"
              beforeText="Une salle de bain datée qui freine la perception du bien."
              afterText="Un espace premium qui renforce immédiatement l'attractivité du logement."
              badge="Montée en gamme visuelle"
            />
          </div>

          <div className="text-center mt-12">
            <a
              href="#generate"
              onClick={() => trackEvent("cta_click", { button: "demo_test" })}
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
            >
              Tester maintenant
            </a>
          </div>
        </div>
      </section>

      {/* 4. TARIFS */}
      <section id="pricing" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Des offres simples et adaptées à vos besoins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* STARTER */}
            <div className="border rounded-3xl p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-4">9€</p>
              <p className="text-gray-600 mb-6">10 crédits</p>

              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>&#10004; 10 transformations</li>
                <li>&#10004; Idéal pour tester</li>
                <li>&#10004; Parfait pour particuliers</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_starter" })}
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                Choisir Starter
              </button>
            </div>

            {/* PRO */}
            <div className="border-2 border-yellow-500 rounded-3xl p-8 text-center shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 px-4 py-1 rounded-full">
                <span className="text-sm font-bold text-black">Le plus populaire</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">19€</p>
              <p className="text-gray-600 mb-6">30 crédits</p>

              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>&#10004; 30 transformations</li>
                <li>&#10004; Meilleur rapport qualité/prix</li>
                <li>&#10004; Idéal agences et pros</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_pro" })}
                className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold"
              >
                Choisir Pro
              </button>
            </div>

            {/* BUSINESS */}
            <div className="border rounded-3xl p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Business</h3>
              <p className="text-4xl font-bold mb-4">49€</p>
              <p className="text-gray-600 mb-6">100 crédits</p>

              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>&#10004; 100 transformations</li>
                <li>&#10004; Idéal gros volumes</li>
                <li>&#10004; Utilisation intensive</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_business" })}
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                Choisir Business
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 text-sm">
              1 image gratuite • Payez seulement si vous aimez
            </p>
          </div>
        </div>
      </section>

      <div id="account" className="max-w-md mx-auto mt-10 px-4">
        <CreditsBalance />
      </div>

      {/* 5. TÉMOIGNAGES */}
      <section id="temoignages" className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ils voient immédiatement le potentiel du bien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "Le rendu a permis de mieux visualiser le potentiel du bien dès la première visite."
              </p>

              <p className="font-semibold text-gray-900">Propriétaire vendeur</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "Les visuels avant/après rendent l'annonce beaucoup plus attractive. Simple et rapide."
              </p>

              <p className="font-semibold text-gray-900">
                Professionnel de l'immobilier
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "La possibilité de générer un intérieur réaliste en quelques secondes apporte une vraie valeur perçue."
              </p>

              <p className="font-semibold text-gray-900">Investisseur immobilier</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-3">
            Passez à l'action
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Testez votre photo maintenant et déclenchez le coup de cœur
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Un visuel plus attractif peut changer la perception d'un bien en quelques secondes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="#generate"
              onClick={() => trackEvent("cta_click", { button: "final_cta_test" })}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
            >
              Tester votre photo maintenant
            </a>

            <a
              href="#pricing"
              onClick={() => trackEvent("cta_click", { button: "final_cta_packs" })}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition"
            >
              Voir les offres
            </a>
          </div>

          <p className="text-sm text-gray-400">
            1 image offerte • Idéal pour particuliers, agences et investisseurs
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image src="/logo/logo blanc.jpg" alt="LR HomeStaging" width={140} height={50} className="mb-4" />
              <p className="text-gray-400">Votre expert en home staging à La Rochelle</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="mb-2"> 06 12 34 56 78</p>
              <p className="mb-2"> contact@lr-homestaging.fr</p>
              <p> La Rochelle, France</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
              <div className="space-y-2">
                <a href="#demo" className="block hover:text-yellow-400 transition">Avant / Après</a>
                <a href="#pricing" className="block hover:text-yellow-400 transition">Tarifs</a>
                <a href="/studio" className="block hover:text-yellow-400 transition">Outil IA</a>
                <a href="#contact" className="block hover:text-yellow-400 transition">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LR HomeStaging. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
