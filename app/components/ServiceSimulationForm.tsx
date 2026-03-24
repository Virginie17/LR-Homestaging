"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

export default function ServiceSimulationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Veuillez renseigner votre prénom et votre téléphone.");
      return;
    }

    if (!file) {
      alert("Ajoutez une photo.");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("simulations")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        trackEvent("simulation_error", { step: "upload" });
        alert("Erreur upload de la photo.");
        return;
      }

      const { data } = supabase.storage.from("simulations").getPublicUrl(fileName);
      const imageUrl = data.publicUrl;

      const insertPayload = {
        name: name.trim(),
        phone: phone.trim(),
        image_url: imageUrl,
      };

      const { error: dbError } = await supabase.from("simulations").insert([insertPayload]);

      if (dbError) {
        console.error("DB error:", dbError);
        trackEvent("simulation_error", { step: "db" });
        alert("Erreur envoi.");
        return;
      }

      trackEvent("simulation_submit", { source: "homepage" });
      alert("Demande envoyée ! Je reviens vers vous sous 24h.");
      setName("");
      setPhone("");
      setFile(null);
    } catch (err) {
      console.error("Simulation submit error:", err);
      trackEvent("simulation_error", { step: "unknown" });
      alert("Erreur technique.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Votre prénom"
        className="p-3 border rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Téléphone"
        className="p-3 border rounded-lg"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        className="p-3 border rounded-lg"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />

      <button className="bg-black text-white py-3 rounded-xl font-semibold" disabled={loading}>
        {loading ? "Envoi..." : "Recevoir ma simulation gratuite"}
      </button>
    </form>
  );
}
