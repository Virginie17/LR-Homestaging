"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const FREE_TRY_KEY = "lr_homestaging_free_try_used";

type Mode = "homeStaging" | "projection";

export default function HomeStagingGenerator() {
  const [mode, setMode] = useState<Mode>("projection");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const homeStagingSteps = [
    "Analyse de la pièce...",
    "Optimisation de la lumière...",
    "Ajout du mobilier...",
    "Finalisation du rendu...",
  ];

  const projectionSteps = [
    "Analyse de la pièce...",
    "Préparation de la projection...",
    "Insertion du mobilier...",
    "Ajustement des ombres et proportions...",
    "Finalisation du rendu...",
  ];

  const steps = mode === "projection" ? projectionSteps : homeStagingSteps;

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setStepIndex(0);
      return;
    }

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 7;
      if (currentProgress >= 95) {
        currentProgress = 95;
      }

      setProgress(currentProgress);
      setStepIndex((prev) => {
        const next = Math.floor((currentProgress / 100) * steps.length);
        return Math.min(next, steps.length - 1);
      });
    }, 700);

    return () => clearInterval(timer);
  }, [loading, steps.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!file) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPaywallOpen(false);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", mode);

      if (!user) {
        const freeTryUsed =
          typeof window !== "undefined" &&
          localStorage.getItem(FREE_TRY_KEY) === "true";

        if (freeTryUsed) {
          setPaywallOpen(true);
          throw new Error(
            "Votre image gratuite a déjà été utilisée. Débloquez les crédits pour continuer."
          );
        }

        const freeRes = await fetch("/api/generate-free", {
          method: "POST",
          body: formData,
        });

        const freeData = await freeRes.json();

        if (!freeRes.ok) {
          throw new Error(
            freeData?.error || "Erreur lors de la génération gratuite."
          );
        }

        if (!freeData?.imageUrl) {
          throw new Error("Aucune image générée n’a été retournée.");
        }

        localStorage.setItem(FREE_TRY_KEY, "true");
        setResult(freeData.imageUrl);
        setPaywallOpen(true);
        setProgress(100);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Session introuvable.");
      }

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
        throw new Error("Aucune image générée n’a été retournée.");
      }

      setResult(data.imageUrl);
      setProgress(100);
    } catch (err: any) {
      setError(err?.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <div className="mb-5">
        <div className="inline-flex rounded-2xl border border-gray-200 bg-gray-50 p-1 gap-1">
          <button
            type="button"
            onClick={() => setMode("homeStaging")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              mode === "homeStaging"
                ? "bg-black text-white"
                : "bg-transparent text-gray-600 hover:bg-white"
            }`}
          >
            Home staging rapide
          </button>

          <button
            type="button"
            onClick={() => setMode("projection")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              mode === "projection"
                ? "bg-yellow-500 text-black"
                : "bg-transparent text-gray-600 hover:bg-white"
            }`}
          >
            Projection avec mes meubles
          </button>
        </div>
      </div>

      <div className="mb-4">
        <strong className="block text-gray-900 text-lg">
          {mode === "projection"
            ? "Projection réaliste avec vos meubles"
            : "Qualité premium — rendu photo professionnel"}
        </strong>

        <div className="text-sm text-gray-600 mt-1">
          {mode === "projection"
            ? "Idéal pour visualiser votre futur intérieur avant d’acheter"
            : "Transformez une pièce vide ou datée en visuel vendeur"}
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
        onClick={handleGenerate}
        className="mt-4 w-full px-4 py-3 bg-black text-white rounded-xl font-semibold disabled:opacity-50"
        disabled={loading || !file}
      >
        {loading
          ? "Génération..."
          : mode === "projection"
          ? "Tester avec mes meubles"
          : "Tester votre photo maintenant"}
      </button>

      {!loading && !previewUrl && !result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">Avant</p>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <img
                src="/demo/chambre-avant.jpg"
                alt="Exemple avant"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">Après</p>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <img
                src="/demo/chambre-apres.jpg"
                alt="Exemple après"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-5 rounded-2xl border border-gray-200 p-4 bg-gray-50">
          <p className="text-sm text-gray-600 mb-3">{steps[stepIndex]}</p>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">{progress}%</p>

          <div className="animate-pulse h-64 bg-gray-200 rounded-lg mt-4" />
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
                className="rounded-xl w-full h-64 object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">Après</p>
              <img
                src={result}
                alt="Après"
                className="rounded-xl w-full h-64 object-cover"
              />
            </div>
          </div>

          {paywallOpen && (
            <div className="mt-8 rounded-3xl bg-black text-white p-6 md:p-8 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center blur-sm scale-110"
                style={{ backgroundImage: `url(${result})` }}
              />
              <div className="relative z-10">
                <p className="text-sm uppercase tracking-wider text-yellow-400 font-semibold mb-3">
                  Votre image gratuite est prête
                </p>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Débloquez vos prochaines transformations
                </h3>

                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                  Vous avez vu le potentiel. Continuez avec 10 crédits, 30 crédits
                  ou un pack optimisé pour vendre plus vite.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#pricing"
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Voir les offres
                  </a>

                  <a
                    href="#account"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Créer mon compte
                  </a>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  1 image offerte • Sans engagement • Résultat premium
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}