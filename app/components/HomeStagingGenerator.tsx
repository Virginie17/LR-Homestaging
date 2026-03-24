"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const FREE_TRY_KEY = "lr_homestaging_free_try_used";

export default function HomeStagingGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const formData = new FormData();
      formData.append("file", file);

      // Utilisateur connecté -> route normale avec crédits
      if (session?.access_token) {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Erreur lors de la génération.");
        }

        if (!data?.imageUrl) {
          throw new Error("Aucune image générée n'a été retournée.");
        }

        setResult(data.imageUrl);
        return;
      }

      // Utilisateur non connecté -> 1 essai gratuit
      const freeTryUsed =
        typeof window !== "undefined" &&
        localStorage.getItem(FREE_TRY_KEY) === "true";

      if (freeTryUsed) {
        throw new Error(
          "Votre essai gratuit a déjà été utilisé. Créez un compte pour continuer."
        );
      }

      const res = await fetch("/api/generate-free", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de la génération.");
      }

      if (!data?.imageUrl) {
        throw new Error("Aucune image générée n'a été retournée.");
      }

      localStorage.setItem(FREE_TRY_KEY, "true");
      setResult(data.imageUrl);
    } catch (err: any) {
      setError(err?.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <div className="mb-4">
        <strong className="block text-gray-900">
          Qualité Premium — rendu photo professionnel
        </strong>
        <div className="text-sm text-gray-600 mt-1">
          1 essai gratuit sans connexion, puis accès par compte et crédits
        </div>
      </div>

      <label htmlFor="home-file" className="block text-sm mb-2 text-gray-700">
        Photo à transformer
      </label>

      <input
        id="home-file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full border border-gray-300 rounded-xl p-3"
      />

      <button
        type="button"
        onClick={handleUpload}
        className="mt-4 w-full px-4 py-3 bg-black text-white rounded-xl font-semibold disabled:opacity-50"
        disabled={loading || !file}
      >
        {loading ? "Génération..." : "Tester votre photo maintenant"}
      </button>

      {loading && (
        <div className="mt-4 rounded-2xl border border-gray-200 p-4 bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Analyse de la pièce...</p>
          <p className="text-sm text-gray-600 mb-2">Optimisation de la lumière...</p>
          <p className="text-sm text-gray-600 mb-2">Ajout du mobilier...</p>
          <p className="text-sm text-gray-600">Rendu final en cours...</p>
          <div className="animate-pulse h-64 bg-gray-200 rounded-xl mt-4" />
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {!loading && result && previewUrl && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">Avant</p>
              <img
                src={previewUrl}
                alt="Avant"
                className="rounded-xl w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">Après</p>
              <img
                src={result}
                alt="Après"
                className="rounded-xl w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-black text-white p-6 md:p-8 text-center">
            <p className="text-sm uppercase tracking-wider text-yellow-400 font-semibold mb-3">
              Résultat généré
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Votre transformation est prête
            </h3>

            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Vous avez vu le potentiel de votre bien. Créez votre compte pour
              continuer vos transformations et accéder à tous vos rendus premium.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#account"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition"
              >
                Créer mon compte
              </a>

              <a
                href="#pricing"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Voir les offres
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              1 image offerte • Sans engagement • Résultat premium
            </p>
          </div>
        </>
      )}

      {!loading && !result && !previewUrl && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">Avant</p>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <img
                src="/demo/demo-avant.jpg"
                alt="Exemple avant"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">Après</p>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <img
                src="/demo/demo-apres.jpg"
                alt="Exemple après"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}