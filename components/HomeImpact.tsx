import React, { useState } from "react";
import Header from "./Header";

export default function HomeImpact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulation envoi (à connecter ensuite)
    console.log(form);

    alert("Demande envoyée ! On vous recontacte rapidement.");
  };
  return (
    <div>
      <Header />
      <div className="font-sans text-gray-900">
      {/* HERO */}
      <section className="h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')] bg-cover bg-center flex items-center justify-center text-center text-white">
        <div className="bg-black/50 p-8 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Le coup de cœur dès la première visite
          </h1>
          <p className="mb-6 text-lg">
            Vendez votre bien plus vite grâce au home staging
          </p>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
            Demander un diagnostic
          </button>
        </div>
      </section>

      {/* AVANT / APRES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Avant / Après
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            className="rounded-xl shadow"
            alt="Avant"
          />
          <img
            src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc"
            className="rounded-xl shadow"
            alt="Après"
          />
        </div>
      </section>

      {/* OFFRES */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          Nos Offres
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            { title: "Audit Express", price: "99€" },
            { title: "Transformation", price: "690€" },
            { title: "Premium", price: "1490€" },
          ].map((offer, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow text-center"
            >
              <h3 className="text-xl font-semibold mb-4">
                {offer.title}
              </h3>
              <p className="text-3xl font-bold mb-4">{offer.price}</p>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Choisir
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">
          90% des acheteurs décident en 90 secondes
        </h2>
      </section>

      {/* TEMOIGNAGES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Témoignages
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Visites multipliées par 3", "Vendu en 10 jours", "Coup de cœur immédiat"].map(
            (text, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-xl shadow">
                <p>{text}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 text-center bg-yellow-500">
        <h2 className="text-3xl font-bold mb-6">
          Recevez votre plan d'action en 24h
        </h2>
        <button className="bg-black text-white px-6 py-3 rounded-xl">
          Prendre rendez-vous
        </button>
      </section>

      {/* FORMULAIRE */}
      <section id="form" className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Demander un diagnostic
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-2xl shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg"
            required
          >
            <option value="">Type de bien</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="investissement">Investissement locatif</option>
          </select>

          <button className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold">
            Envoyer ma demande
          </button>
        </form>

        <a
          href="https://wa.me/33TONNUMERO"
          target="_blank"
          className="block text-center mt-4 underline"
        >
          Ou contactez-moi directement sur WhatsApp
        </a>
      </section>
      </div>
    </div>
  );
}
