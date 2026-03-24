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
          <a href="/agences" className="hover:text-yellow-600 transition">Agences</a>
          <a href="#pricing" className="hover:text-yellow-600 transition">Tarifs</a>
          <a href="#temoignages" className="hover:text-yellow-600 transition">Témoignages</a>
          <a href="/studio" className="hover:text-yellow-600 transition font-semibold text-yellow-600">Outil IA</a>
          <a href="#contact" className="hover:text-yellow-600 transition">Contact</a>
        </nav>
      </header>

      {/* HERO MACHINE À CONVERTIR */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          {/* Badge urgence */}
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4">
            Offre lancement : 1 image gratuite
          </p>

          {/* Titre agressif */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Transformez votre bien en coup de cœur en 15 secondes
          </h1>

          {/* Sous-texte stratégique */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Importez une photo → obtenez un rendu ultra réaliste → déclenchez la projection
          </p>

          {/* Preuve sociale forte */}
          <div className="flex justify-center gap-8 mb-8 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">+50</span>
              <span>biens transformés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">80%</span>
              <span>trouvent le rendu plus attractif</span>
            </div>
          </div>

          {/* CTA agressif */}
          <a
            href="#projection"
            onClick={() => trackEvent("cta_click", { button: "hero_conversion" })}
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl text-lg transition"
          >
            Tester votre photo maintenant
          </a>

          {/* Micro copy stratégique */}
          <p className="text-sm text-gray-500 mt-3">
            Aucun engagement – résultat en quelques secondes
          </p>
        </div>

        {/* PREUVE IMMÉDIATE - Slider avant/après au-dessus du fold */}
        <div className="max-w-4xl mx-auto mt-12">
          <BeforeAfterSlider
            title="Salle de bain transformée en 15 secondes"
            beforeSrc="/chambre avant.png"
            afterSrc="/cuisine 2 avant apres.png"
            beforeText="Salle de bain datée qui freine les acheteurs"
            afterText="Espace moderne qui déclenche immédiatement le coup de cœur"
            badge="+85% d'attractivité perçue"
          />
        </div>

        {/* Générateur DIRECT dans le hero */}
        <div id="projection" className="max-w-4xl mx-auto mt-8">
          <HomeStagingGenerator />
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

      {/* SECTION PROJECTION PERSONNALISÉE */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
                Projection personnalisée
              </p>

              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Projetez vos propres meubles dans votre futur bien
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Importez la photo d'un bien et vos propres meubles pour visualiser un
                intérieur réaliste, rassurer les acheteurs et accélérer la décision.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Acheteurs et locataires se projettent vraiment
                    </h3>
                    <p className="text-gray-600">
                      Ils visualisent le bien avec leur propre univers, pas avec une
                      mise en scène générique.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Les agences rassurent plus vite leurs prospects
                    </h3>
                    <p className="text-gray-600">
                      Une projection personnalisée rend la visite plus concrète et
                      plus mémorable.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      La décision devient plus simple
                    </h3>
                    <p className="text-gray-600">
                      Quand le futur occupant se projette mieux, le bien gagne
                      immédiatement en valeur perçue.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#projection"
                onClick={() => trackEvent("cta_click", { button: "projection_cta" })}
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
              >
                Tester avec mes meubles
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Photo du bien
                  </p>
                  <div className="aspect-[4/3] rounded-2xl bg-gray-200 overflow-hidden">
                    <img
                      src="/chambre avant.png"
                      alt="Photo du bien"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Projection avec vos meubles
                  </p>
                  <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden">
                    <img
                      src="/cuisine 2 avant apres.png"
                      alt="Projection personnalisée"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-2">Cas d'usage</p>
                <p className="text-gray-800 font-medium leading-relaxed">
                  Idéal pour un acheteur qui souhaite voir son canapé, sa table ou son
                  style de décoration directement dans le bien avant de prendre sa
                  décision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="projection" className="max-w-4xl mx-auto mt-10 px-4">
        <HomeStagingGenerator />
      </div>

      {/* 4. TARIFS */}
      <section id="pricing" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Des offres simples et adaptées à vos besoins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* PACK VENTE RAPIDE - NOUVEAU */}
            <div className="border-2 border-red-500 rounded-3xl p-6 text-center shadow-lg bg-red-50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                LE PLUS VENDU
              </div>
              <h3 className="text-lg font-bold mb-2">Vente Rapide</h3>
              <p className="text-3xl font-bold mb-2">29€</p>
              <p className="text-gray-600 text-sm mb-4">5 visuels optimisés</p>

              <ul className="text-xs text-gray-600 mb-6 space-y-1">
                <li>✓ 5 transformations premium</li>
                <li>✓ Optimisés pour annonce</li>
                <li>✓ Support prioritaire</li>
                <li>✓ Livraison 24h</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_vente_rapide" })}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
              >
                Choisir Vente Rapide
              </button>
            </div>

            {/* STARTER */}
            <div className="border rounded-3xl p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Starter</h3>
              <p className="text-2xl font-bold mb-2">9€</p>
              <p className="text-gray-600 text-sm mb-4">10 crédits</p>

              <ul className="text-xs text-gray-600 mb-6 space-y-1">
                <li>✓ 10 transformations</li>
                <li>✓ Idéal pour débuter</li>
                <li>✓ Sans engagement</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_starter" })}
                className="w-full bg-black text-white py-2 rounded-lg text-sm"
              >
                Choisir Starter
              </button>
            </div>

            {/* PRO */}
            <div className="border-2 border-yellow-500 rounded-3xl p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                POPULAIRE
              </div>
              <h3 className="text-lg font-bold mb-2">Pro</h3>
              <p className="text-2xl font-bold mb-2">19€</p>
              <p className="text-gray-600 text-sm mb-4">30 crédits</p>

              <ul className="text-xs text-gray-600 mb-6 space-y-1">
                <li>✓ 30 transformations</li>
                <li>✓ Meilleur rapport qualité/prix</li>
                <li>✓ Mode projection inclus</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_pro" })}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg text-sm font-semibold"
              >
                Choisir Pro
              </button>
            </div>

            {/* BUSINESS */}
            <div className="border rounded-3xl p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Business</h3>
              <p className="text-2xl font-bold mb-2">49€</p>
              <p className="text-gray-600 text-sm mb-4">100 crédits</p>

              <ul className="text-xs text-gray-600 mb-6 space-y-1">
                <li>✓ 100 transformations</li>
                <li>✓ Idéal gros volumes</li>
                <li>✓ Utilisation intensive</li>
              </ul>

              <button 
                onClick={() => trackEvent("cta_click", { button: "pricing_business" })}
                className="w-full bg-black text-white py-2 rounded-lg text-sm"
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
