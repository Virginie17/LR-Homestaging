"use client";

import Image from "next/image";
import ServiceSimulationForm from "./components/ServiceSimulationForm";
import HeroButton from "./components/HeroButton";
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

      <section className="h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center justify-center text-center text-white">
        <div className="bg-black/50 p-8 rounded-2xl max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Home Staging La Rochelle
          </h1>
          <p className="mb-6 text-lg">
            Vendez votre bien 20% plus vite et jusqu'à 15% plus cher avec notre service de home staging professionnel
          </p>
          <HeroButton />
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