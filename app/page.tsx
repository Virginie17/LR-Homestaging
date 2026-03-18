"use client";
import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { trackEvent } from "../lib/analytics";

export default function LRHomeStaging() {
  const [form, setForm] = useState({ name: "", phone: "", type: "" });
  const [loading, setLoading] = useState(false);
  const whatsappNumber = process.env.WHATSAPP_NUMBER || '33613574898';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const phoneRegex = /^(0[1-9]\d{8})$/;
    return form.name.trim() !== "" && 
           form.phone.trim() !== "" && 
           form.type.trim() !== "" &&
           phoneRegex.test(form.phone.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Veuillez remplir tous les champs correctement");
      return;
    }
    
    setLoading(true);

    const { error } = await supabase.from("leads").insert([form]);

    if (error) {
      alert("Erreur, réessayez");
      trackEvent('form_error', { error_type: 'supabase_insert' });
    } else {
      alert("Demande envoyée !");
      trackEvent('form_submit', { 
        event_category: 'lead_generation',
        property_type: form.type 
      });
      setForm({ name: "", phone: "", type: "" });
    }
    setLoading(false);
  };

  return (
    <div className="font-sans text-gray-900">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/logo/logo noir.png" alt="LR HomeStaging" width={140} height={50} />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#offres" className="hover:text-yellow-500">Offres</a>
          <a href="#form" className="hover:text-yellow-500">Diagnostic</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center justify-center text-center text-white">
        <div className="bg-black/50 p-8 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Le coup de cœur dès la première visite
          </h1>
          <p className="mb-6 text-lg">
            Vendez votre bien plus vite grâce au home staging
          </p>
          <a href="#form" onClick={() => trackEvent('cta_click', { button: 'hero_diagnostic' })}>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
              Demander un diagnostic
            </button>
          </a>
        </div>
      </section>

      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Pourquoi faire du home staging ?
        </h2>

        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-xl font-bold">⏱️ Vente plus rapide</p>
          </div>
          <div>
            <p className="text-xl font-bold">💰 Meilleur prix</p>
          </div>
          <div>
            <p className="text-xl font-bold">❤️ Coup de cœur immédiat</p>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Ils ont vendu grâce au home staging</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Marie L.", result: "Vendu en 10 jours", property: "T3 La Rochelle", image: "🏠" },
            { name: "Thomas B.", result: "Visites x3", property: "Appartement 85m²", image: "🏢" },
            { name: "Sophie M.", result: "+15% sur le prix", property: "Maison 4 pièces", image: "🏡" }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">
              <div className="text-4xl mb-4">{testimonial.image}</div>
              <h3 className="font-bold text-lg mb-2">{testimonial.name}</h3>
              <p className="text-2xl font-bold text-yellow-600 mb-1">{testimonial.result}</p>
              <p className="text-gray-600">{testimonial.property}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVANT APRES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Avant / Après</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" className="rounded-xl shadow" />
          <img src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc" className="rounded-xl shadow" />
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" className="py-16 bg-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
            🔥 OFFRE LANCEMENT -50% pour les 3 premiers biens
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10">Nos Offres</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            { title: "Audit Express", price: "99€", original: "199€", badge: "PLUS POPULAIRE" },
            { title: "Transformation", price: "690€", original: "1390€", badge: "RECOMMANDÉ" },
            { title: "Premium", price: "1490€", original: "2990€", badge: "MEILLEUR VALEUR" }
          ].map((offer, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow text-center relative">
              {offer.badge && (
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                  {offer.badge}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4">{offer.title}</h3>
              <div className="mb-4">
                <span className="text-gray-400 line-through text-sm">{offer.original}</span>
                <p className="text-3xl font-bold text-red-600">{offer.price}</p>
              </div>
              <a href="#form" onClick={() => trackEvent('offer_click', { offer: offer.title })}>
                <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Choisir</button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">90% des acheteurs décident en 90 secondes</h2>
      </section>

      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">
          Vous vous posez peut-être ces questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">

          <div>
            <p className="font-semibold">
              ❓ "Le home staging, ça coûte cher ?"
            </p>
            <p>
              Non. C'est un investissement rentable. Un bien valorisé se vend plus vite
              et évite des baisses de prix souvent bien plus importantes.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              ❓ "Est-ce vraiment utile ?"
            </p>
            <p>
              Oui. 90% des acheteurs prennent leur décision dans les premières secondes.
              Le home staging permet de déclencher ce coup de cœur.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              ❓ "Mon bien est déjà bien, pourquoi changer ?"
            </p>
            <p>
              Votre bien vous plaît… mais il doit plaire au plus grand nombre.
              L'objectif est de séduire un maximum d'acheteurs potentiels.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              ❓ "Et si je vends sans home staging ?"
            </p>
            <p>
              C'est possible. Mais souvent plus long… avec négociation à la baisse.
              Le home staging accélère la vente et sécurise votre prix.
            </p>
          </div>

        </div>
      </section>

      <section className="text-center py-10 bg-gray-100">
        <p className="text-xl font-semibold">
          Pendant que vous hésitez, d'autres biens mieux présentés se vendent.
        </p>

        <p className="mt-2">
          Ne laissez pas passer votre acheteur.
        </p>
      </section>

      {/* FORMULAIRE */}
      <section id="form" className="py-16 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-bold mb-4">
            ✅ Recevez votre diagnostic gratuit en 24h
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Plus de 200 biens vendus à La Rochelle grâce à notre expertise<br/>
            <span className="font-bold text-yellow-600">Dites-nous votre projet et recevez un plan d'action personnalisé</span>
          </p>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">Demander un diagnostic</h2>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl shadow space-y-4">
          <input type="text" name="name" placeholder="Votre nom" value={form.name} onChange={handleChange} className="w-full p-3 rounded-lg" required />

          <input type="tel" name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} className="w-full p-3 rounded-lg" required />

          <select name="type" value={form.type} onChange={handleChange} className="w-full p-3 rounded-lg" required>
            <option value="">Type de bien</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="investissement">Investissement locatif</option>
          </select>

          <button className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold" disabled={loading}>
            {loading ? "Envoi..." : "Envoyer ma demande"}
          </button>
        </form>

        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="block text-center mt-4 underline" onClick={() => trackEvent('whatsapp_click', { source: 'form_section' })}>
          Ou contactez-moi sur WhatsApp
        </a>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 text-center bg-yellow-500">
        <h2 className="text-3xl font-bold mb-6">Recevez votre plan d'action en 24h</h2>
        <a href="#form" onClick={() => trackEvent('cta_click', { button: 'final_appointment' })}>
          <button className="bg-black text-white px-6 py-3 rounded-xl">Prendre rendez-vous</button>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6">
        <div className="flex justify-center mb-4">
          <Image src="/logo/logo blanc.jpg" alt="LR HomeStaging" width={120} height={40} />
        </div>
        <p>© {new Date().getFullYear()} LR HomeStaging - Tous droits réservés</p>
      </footer>
    </div>
  );
}
