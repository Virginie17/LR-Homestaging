"use client";

import Image from "next/image";
import HomeStagingGenerator from "./components/HomeStagingGenerator";
import ProjectionGenerator from "./components/ProjectionGenerator";
import CreditsBalance from "./components/CreditsBalance";
import StripeCheckoutButton from "./components/StripeCheckoutButton";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import Hero from "./components/Hero";
import BeforeAfterPremium from "@/components/home/BeforeAfterPremium";
import PremiumTransformations from "@/components/home/PremiumTransformations";
import FurnitureProjectionPremium from "@/components/home/FurnitureProjectionPremium";
import PricingPremium from "@/components/home/PricingPremium";
import TestimonialsPremium from "@/components/home/TestimonialsPremium";
import AgenciesPremium from "@/components/home/AgenciesPremium";
import FinalCtaPremium from "@/components/home/FinalCtaPremium";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/images/logo noir.png"
              alt="LR Homestaging"
              width={150}
              height={42}
              className="h-auto w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#tester" className="hover:text-yellow-600 transition">
              Tester
            </a>
            <a href="#avant-apres" className="hover:text-yellow-600 transition">
              Avant / Après
            </a>
            <a href="#projection" className="hover:text-yellow-600 transition">
              Vos meubles
            </a>
            <a href="#pricing" className="hover:text-yellow-600 transition">
              Tarifs
            </a>
            <a href="#agences" className="hover:text-yellow-600 transition">
              Agences
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <Hero />

      {/* VISUELS PREMIUM */}
      <PremiumTransformations />

      {/* AVANT / APRES */}
      <BeforeAfterPremium />

      {/* PROJECTION AVEC MEUBLES */}
      <FurnitureProjectionPremium />

      {/* GÉNÉRATEUR HOME STAGING */}
      <section id="tester" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Home staging IA : instantané et réaliste
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une photo suffit pour transformer un bien vide en un espace de vie attractif
          </p>
        </div>
        <HomeStagingGenerator />
      </section>

      {/* COMPTE */}
      <section className="py-10 px-6 bg-white">
        <div id="account" className="max-w-md mx-auto">
          <CreditsBalance />
        </div>
      </section>

      {/* VISUELS PREMIUM */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pourquoi choisir notre solution ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une technologie de pointe au service de l'immobilier
            </p>
          </div>
          
          {/* IMAGE HERO SALON */}
          <div className="mb-16">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero-salon.jpg"
                alt="Salon transformé par IA"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/lightning.svg" alt="Rapide" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ultra rapide</h3>
              <p className="text-gray-600">
                Obtenez un résultat professionnel en quelques secondes seulement
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/realistic.svg" alt="Réaliste" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hyper réaliste</h3>
              <p className="text-gray-600">
                Des rendus qui respectent volumes, murs et perspectives
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/easy.svg" alt="Simple" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Facile à utiliser</h3>
              <p className="text-gray-600">
                Importez une photo et obtenez un résultat instantanément
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de nos utilisateurs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Image src="/avatars/user1.jpg" alt="Client" width={48} height={48} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold">Marie L.</p>
                  <p className="text-sm text-gray-500">Agence immobilière</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Un outil révolutionnaire ! Nos vendeurs sont conquis par la qualité des visuels générés."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Image src="/avatars/user2.jpg" alt="Client" width={48} height={48} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold">Thomas B.</p>
                  <p className="text-sm text-gray-500">Investisseur</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Je gagne un temps fou sur mes projets. Le rendu est toujours impeccable."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Image src="/avatars/user3.jpg" alt="Client" width={48} height={48} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold">Sophie P.</p>
                  <p className="text-sm text-gray-500">Particulier</p>
                </div>
              </div>
              <p className="text-gray-700">
                "J'ai enfin pu visualiser mes meubles dans mon futur appartement. Génial !"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENCES */}
      <section id="agences" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Une solution pour les professionnels
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Agences immobilières, photographes, décorateurs : optimisez votre production
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Gain de temps</h3>
              <p className="text-gray-600 text-sm">
                Transformez dizaines de biens en quelques heures au lieu de semaines
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Économies</h3>
              <p className="text-gray-600 text-sm">
                Réduisez vos coûts de production de 70% minimum
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Qualité</h3>
              <p className="text-gray-600 text-sm">
                Des visuels professionnels et cohérents pour votre marque
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Différenciation</h3>
              <p className="text-gray-600 text-sm">
                Proposez une innovation unique à vos clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <PricingPremium />

      {/* TEMOIGNAGES */}
      <TestimonialsPremium />

      {/* AGENCES */}
      <AgenciesPremium />

      {/* CTA FINAL */}
      <FinalCtaPremium />

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo blanc.jpg"
                alt="LR Homestaging"
                width={120}
                height={35}
                className="h-auto w-auto"
              />
            </div>
            <h4 className="font-semibold mb-4">LR Homestaging</h4>
            <p className="text-gray-400 text-sm">
              La solution IA pour transformer vos biens immobiliers
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#tester" className="hover:text-white transition">Home staging</a></li>
              <li><a href="#projection" className="hover:text-white transition">Projection meubles</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Tarifs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#privacy" className="hover:text-white transition">Confidentialité</a></li>
              <li><a href="#terms" className="hover:text-white transition">CGU</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2024 LR Homestaging. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
