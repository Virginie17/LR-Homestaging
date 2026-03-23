"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SimulationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    file: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!form.file) {
      alert("Ajoutez une image");
      setLoading(false);
      return;
    }

    try {
      // 1. Upload image
      const fileName = `${Date.now()}-${form.file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("simulations")
        .upload(fileName, form.file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert("Erreur upload");
        setLoading(false);
        return;
      }

      // 2. Get public URL
      const { data } = supabase.storage
        .from("simulations")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      // 3. Insert into database
      console.log("Inserting data:", {
        name: form.name,
        phone: form.phone,
        image_url: imageUrl,
      });

      const { error } = await supabase
        .from("simulations")
        .insert([
          {
            name: form.name,
            phone: form.phone,
            image_url: imageUrl,
          },
        ]);

      if (error) {
        console.error("DB error details:", error);
        alert(`Erreur: ${error.message}`);
      } else {
        alert("Demande envoyée !");
        setForm({ name: "", phone: "", file: null });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur technique");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="p-3 border rounded-lg"
        required
      />

      <input
        type="tel"
        placeholder="Téléphone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="p-3 border rounded-lg"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
        className="p-3 border rounded-lg"
      />

      <button className="bg-black text-white py-3 rounded-xl font-semibold" disabled={loading}>
        {loading ? "Envoi..." : "Recevoir ma simulation"}
      </button>
    </form>
  );
}
