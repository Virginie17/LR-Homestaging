"use client";

import Image from "next/image";
import HomeStagingGenerator from "./components/HomeStagingGenerator";
import CreditsBalance from "./components/CreditsBalance";
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
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/images/logo noir.png"
              alt="LR Homestaging"
              width={150}
              height={42}
              className="h-auto w-auto"
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#tester" className="transition hover:text-yellow-600">
              Tester
            </a>
            <a href="#avant-apres" className="transition hover:text-yellow-600">
              Avant / Après
            </a>
            <a href="#projection" className="transition hover:text-yellow-600">
              Vos meubles
            </a>
            <a href="#tarifs" className="transition hover:text-yellow-600">
              Tarifs
            </a>
            <a href="#agences" className="transition hover:text-yellow-600">
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
      <section id="projection">
        <FurnitureProjectionPremium />
      </section>

      {/* GÉNÉRATEUR HOME STAGING */}
      <section id="tester" className="bg-white px-6 py-20">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Home staging IA : instantané et réaliste
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Une photo suffit pour transformer un bien vide en un espace de vie attractif
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <HomeStagingGenerator />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Votre compte</h3>
              <CreditsBalance />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Pourquoi ça fonctionne</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-700">
                  ✔ Résultat en quelques secondes
                </div>
                <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-700">
                  ✔ Rendu réaliste et vendeur
                </div>
                <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-700">
                  ✔ Meilleure projection des visiteurs
                </div>
              </div>
            </div>
          </aside>
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
      <footer className="bg-gray-900 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
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
            <h4 className="mb-4 font-semibold">LR Homestaging</h4>
            <p className="text-sm text-gray-400">
              La solution IA pour transformer vos biens immobiliers, faciliter la projection
              et créer un véritable effet coup de cœur.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Produit</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#tester" className="transition hover:text-white">
                  Home staging
                </a>
              </li>
              <li>
                <a href="#projection" className="transition hover:text-white">
                  Projection meubles
                </a>
              </li>
              <li>
                <a href="#tarifs" className="transition hover:text-white">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#agences" className="transition hover:text-white">
                  Offre agences
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#avant-apres" className="transition hover:text-white">
                  Avant / Après
                </a>
              </li>
              <li>
                <a href="#tester" className="transition hover:text-white">
                  Tester maintenant
                </a>
              </li>
              <li>
                <a href="#tarifs" className="transition hover:text-white">
                  Voir les offres
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/privacy" className="transition hover:text-white">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="/terms" className="transition hover:text-white">
                  CGU
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 LR Homestaging. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}