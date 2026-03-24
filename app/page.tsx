"use client";

import Image from "next/image";
import ServiceSimulationForm from "./components/ServiceSimulationForm";
import FinalButton from "./components/FinalButton";
import { trackEvent } from "../lib/analytics";

export default function LRHomeStaging() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33612345678";

  return (
    <div className="font-sans text-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/logo/logo noir.png" alt="LR HomeStaging" width={140} height={50} />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#pourquoi" className="hover:text-yellow-600 transition">Pourquoi le home staging ?</a>
          <a href="#temoignages" className="hover:text-yellow-600 transition">Témoignages</a>
          <a href="#simulation" className="hover:text-yellow-600 transition">Simulation offerte</a>
          <a href="/studio" className="hover:text-yellow-600 transition font-semibold text-yellow-600">Outil IA</a>
          <a href="#contact" className="hover:text-yellow-600 transition">Contact</a>
        </nav>
      </header>

      <section className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center">
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white max-w-2xl">
              <p className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
                Home staging IA ultra réaliste
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Transformez vos photos immobilières en visuels coup de cœur grâce à l'IA
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Valorisez un bien vide, ancien ou difficile à vendre avec un home
                staging ultra réaliste. Testez gratuitement une première image et
                aidez vos futurs acheteurs à se projeter immédiatement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="/studio"
                  onClick={() => trackEvent("cta_click", { button: "hero_test_free" })}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl text-center transition"
                >
                  Tester gratuitement
                </a>

                <a
                  href="#temoignages"
                  onClick={() => trackEvent("cta_click", { button: "hero_demo" })}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-center transition"
                >
                  Voir un avant / après
                </a>
              </div>

              <p className="text-sm text-gray-300">
                1 image offerte • Sans engagement • Résultat premium
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xl w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Avant</p>
                    <Image src="/avant.jpg" alt="Avant home staging" width={300} height={225} className="aspect-[4/3] rounded-xl object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Après</p>
                    <Image src="/apres.jpg" alt="Après home staging" width={300} height={225} className="aspect-[4/3] rounded-xl object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Pourquoi ça fonctionne
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi LR Homestaging change vraiment la perception d'un bien
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Une photo vide ou peu valorisée freine la projection. Avec LR
              Homestaging, vous transformez une image ordinaire en visuel attractif,
              réaliste et rassurant pour déclencher plus vite l'intérêt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Valorisez un bien sans travaux
              </h3>
              <p className="text-gray-600">
                Donnez immédiatement une meilleure image d'un intérieur sans engager
                de rénovation ni de dépenses lourdes.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Aidez les acheteurs à se projeter
              </h3>
              <p className="text-gray-600">
                Un rendu réaliste permet de visualiser le potentiel du bien et réduit
                les freins à la décision.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Augmentez l'impact visuel de vos annonces
              </h3>
              <p className="text-gray-600">
                Des visuels plus attractifs améliorent la perception globale du bien
                et renforcent l'intérêt dès les premières secondes.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
                Simple et rapide
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comment ça fonctionne
              </h2>
              <p className="text-lg text-gray-600">
                Un parcours simple pour obtenir un rendu premium sans complexité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-gray-50 p-6">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Importez votre photo
                </h3>
                <p className="text-gray-600">
                  Téléchargez une photo d'une pièce vide, ancienne ou peu mise en
                  valeur.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Choisissez votre rendu
                </h3>
                <p className="text-gray-600">
                  L'IA génère un home staging réaliste, élégant et cohérent avec la
                  pièce.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Obtenez votre avant / après
                </h3>
                <p className="text-gray-600">
                  Récupérez un visuel prêt à être montré à vos clients, acheteurs ou
                  locataires.
                </p>
              </div>
            </div>
          </div>

          <section id="demo" className="bg-gray-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
                  Avant / Après
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Découvrez la transformation en quelques secondes
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Passez d'une photo vide ou peu attractive à un visuel premium qui aide
                  immédiatement à se projeter.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="p-3 border-r border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-2">Avant</p>
                      <Image
                        src="/avant.jpg"
                        alt="Avant home staging salon vide"
                        width={300}
                        height={225}
                        className="aspect-[4/3] rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-500 mb-2">Après</p>
                      <Image
                        src="/apres.jpg"
                        alt="Après home staging salon chaleureux"
                        width={300}
                        height={225}
                        className="aspect-[4/3] rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Pièce vide → salon chaleureux
                    </h3>
                    <p className="text-gray-600">
                      Aidez les acheteurs à imaginer le potentiel du bien dès le premier
                      regard.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="p-3 border-r border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-2">Avant</p>
                      <Image
                        src="/avant.jpg"
                        alt="Avant home staging chambre datée"
                        width={300}
                        height={225}
                        className="aspect-[4/3] rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-500 mb-2">Après</p>
                      <Image
                        src="/apres.jpg"
                        alt="Après home staging chambre moderne"
                        width={300}
                        height={225}
                        className="aspect-[4/3] rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Chambre datée → espace moderne
                    </h3>
                    <p className="text-gray-600">
                      Valorisez une pièce sans travaux ni mise en scène physique.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="p-3 border-r border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-2">Avant</p>
                      <Image
                        src="/avant.jpg"
                        alt="Avant projection personnalisée"
                        width={300}
                        height={225}
                        className="aspect-[4/3] rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-500 mb-2">Après</p>
                      <Image
                        src="/apres.jpg"
                        alt="Après projection personnalisée coup de cœur"
                        width={300}
                        height={225}
                        className="aspect-[4/3] rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Projection personnalisée → coup de cœur
                    </h3>
                    <p className="text-gray-600">
                      Intégrez un style ou du mobilier pour rendre la projection encore
                      plus concrète.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <a
                  href="/studio"
                  onClick={() => trackEvent("cta_click", { button: "demo_test_free" })}
                  className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition"
                >
                  Tester gratuitement votre image
                </a>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
                  Tarifs
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Des offres simples pour valoriser vos biens sans contrainte
                </h2>
                <p className="text-lg text-gray-600">
                  Commencez gratuitement, puis choisissez le pack adapté à vos besoins.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* STARTER */}
                <div className="border rounded-3xl p-8 text-center shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Starter</h3>
                  <p className="text-4xl font-bold mb-4">9€</p>
                  <p className="text-gray-600 mb-6">10 crédits</p>

                  <ul className="text-sm text-gray-600 mb-8 space-y-2">
                    <li>✔ 10 transformations</li>
                    <li>✔ Qualité premium</li>
                    <li>✔ Utilisation simple</li>
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
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-sm px-4 py-1 rounded-full">
                    Le plus populaire
                  </span>

                  <h3 className="text-xl font-semibold mb-4">Pro</h3>
                  <p className="text-4xl font-bold mb-4">19€</p>
                  <p className="text-gray-600 mb-6">30 crédits</p>

                  <ul className="text-sm text-gray-600 mb-8 space-y-2">
                    <li>✔ 30 transformations</li>
                    <li>✔ Meilleur rapport qualité/prix</li>
                    <li>✔ Idéal agences et pros</li>
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
                    <li>✔ 100 transformations</li>
                    <li>✔ Idéal gros volumes</li>
                    <li>✔ Utilisation intensive</li>
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
                  1 image gratuite • Sans engagement • Payez seulement si vous aimez
                </p>
              </div>
            </div>
          </section>

          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
                Pour qui
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pensé pour les professionnels comme pour les particuliers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Particuliers
                </h3>
                <p className="text-gray-600">
                  Valorisez votre bien avant mise en vente ou location et créez un
                  effet coup de cœur dès l'annonce.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Agences immobilières
                </h3>
                <p className="text-gray-600">
                  Proposez des annonces plus attractives, plus professionnelles et
                  plus convaincantes pour vos vendeurs.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Investisseurs
                </h3>
                <p className="text-gray-600">
                  Aidez vos prospects à se projeter dans vos projets et améliorez la
                  perception de vos biens à fort potentiel.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-black text-white px-8 py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Testez gratuitement votre première transformation
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Faites l'essai sur une image et découvrez immédiatement le potentiel
              visuel de votre bien.
            </p>

            <a
              href="/studio"
              onClick={() => trackEvent("cta_click", { button: "section_test_now" })}
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
            >
              Tester maintenant
            </a>
          </div>
        </div>
      </section>

      <section id="pourquoi" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pourquoi faire du home staging ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vente 20% plus rapide</h3>
              <p className="text-gray-600">Les biens mis en valeur se vendent en moyenne 20% plus rapidement</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Jusqu'à 15% plus cher</h3>
              <p className="text-gray-600">Un bien bien présenté peut se vendre jusqu'à 15% au-dessus du prix estimé</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plus de visites</h3>
              <p className="text-gray-600">Les annonces avec photos professionnelles génèrent 3x plus de demandes de visite</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Avant / Après</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Avant</h3>
              <Image src="/avant.jpg" alt="Avant home staging" width={500} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Après</h3>
              <Image src="/apres.jpg" alt="Après home staging" width={500} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section id="temoignages" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Témoignages clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Service exceptionnel ! Notre appartement a été vendu en 2 semaines après le home staging."</p>
              <p className="font-semibold">- Marie D., La Rochelle</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Nous avons vendu 12% au-dessus du prix de départ grâce à leur expertise."</p>
              <p className="font-semibold">- Jean-Pierre M., Royan</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Professionnalisme et résultats au rendez-vous. Je recommande vivement !"</p>
              <p className="font-semibold">- Sophie L., Châtelaillon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-yellow-500 text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Offre Spéciale Lancement</h2>
          <p className="text-xl mb-8">
            Forfait Home Staging Complet à partir de <span className="text-3xl font-bold">499€</span> au lieu de 699€
          </p>
          <div className="bg-white/20 backdrop-blur p-6 rounded-lg mb-8">
            <p className="text-lg font-semibold mb-2">⏰ Offre limitée aux 10 premiers clients</p>
            <p className="text-lg font-semibold">📍 Disponible sur La Rochelle et environs (15km)</p>
          </div>
          <FinalButton />
        </div>
      </section>

      <section id="simulation" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Simulation Offerte</h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Envoyez-nous une photo de votre pièce et recevez une simulation numérique gratuite de son potentiel
          </p>
          <ServiceSimulationForm />
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Essayez notre outil IA gratuitement
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Visualisez le potentiel de votre bien avec vos propres meubles
          </p>
          <a
            href="/studio"
            onClick={() => trackEvent("cta_click", { button: "studio_tool" })}
            className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition inline-block"
          >
            Accéder à l'outil IA
          </a>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image src="/logo/logo blanc.jpg" alt="LR HomeStaging" width={140} height={50} className="mb-4" />
              <p className="text-gray-400">Votre expert en home staging à La Rochelle</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="mb-2">📞 06 12 34 56 78</p>
              <p className="mb-2">✉️ contact@lr-homestaging.fr</p>
              <p>📍 La Rochelle, 17000</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>Home Staging complet</li>
                <li>Conseil décoration</li>
                <li>Simulation 3D</li>
                <li>Photo professionnelle</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 LR HomeStaging. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}