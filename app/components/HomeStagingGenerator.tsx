"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const FREE_TRY_KEY = "lr_homestaging_free_try_used";

export default function HomeStagingGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"homeStaging" | "projection">("projection");
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [progress, setProgress] = useState(0);

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

    // Vérifier si l'essai gratuit a déjà été utilisé
    const hasUsedFree = localStorage.getItem(FREE_TRY_KEY);
    
    setLoading(true);
    setError(null);
    setProgress(0);

    // Simulation des étapes de loading selon le mode
    const homeStagingSteps = [
      "🔍 Analyse intelligente de la pièce...",
      "💡 Optimisation de la lumière naturelle...",
      "🪑 Ajout du mobilier design tendance...",
      "✨ Rendu ultra réaliste en cours...",
      "🎯 Finalisation du coup de cœur..."
    ];

    const projectionSteps = [
      "🏗️ Analyse précise des murs et fenêtres...",
      "📐 Détection de l'espace disponible...",
      "🛋️ Intégration parfaite de vos meubles...",
      "🌟 Finalisation de la projection immersive...",
      "🎉 Votre futur intérieur est prêt..."
    ];

    const steps = mode === "homeStaging" ? homeStagingSteps : projectionSteps;
    
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(steps[i]);
      setProgress(20 + (i * 20));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
      // Si essai gratuit déjà utilisé, rediriger vers tarifs
      if (hasUsedFree) {
        setError("Votre essai gratuit a été utilisé. Choisissez un pack pour continuer.");
        setTimeout(() => {
          window.location.href = "#pricing";
        }, 2000);
        return;
      }

      // ZERO FRICTION : Utiliser la route gratuite pour le premier essai
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", mode);

      const res = await fetch("/api/generate-free", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        // Si crédits insuffisants, rediriger vers tarifs
        if (data?.needsUpgrade) {
          setError("Crédits insuffisants. Choisissez un pack pour continuer.");
          // Redirection automatique vers les tarifs après 2 secondes
          setTimeout(() => {
            window.location.href = "#pricing";
          }, 2000);
          return;
        }
        throw new Error(data?.error || "Erreur lors de la génération.");
      }

      if (!data?.imageUrl) {
        throw new Error("Aucune image générée n'a été retournée.");
      }

      // Marquer l'essai gratuit comme utilisé
      localStorage.setItem(FREE_TRY_KEY, "true");
      
      setProgress(100);
      setResult(data.imageUrl);
    } catch (err: any) {
      setError(err?.message || "Erreur serveur.");
    } finally {
      setLoading(false);
      setLoadingStep("");
      setProgress(0);
    }
  };

  return (
    <div className="text-black">
      {/* DOUBLE MODE PRODUIT */}
      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("homeStaging")}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === "homeStaging"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Home staging rapide
          </button>
          <button
            onClick={() => setMode("projection")}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === "projection"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Projection avec mes meubles
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {mode === "homeStaging" 
            ? "Transformez votre pièce avec mobilier design et moderne" 
            : "Projetez vos propres meubles dans votre futur bien"
          }
        </p>
      </div>

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
        <div className="mt-4 rounded-2xl border border-gray-200 p-6 bg-gray-50 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></div>
            <p className="text-base font-semibold text-gray-900">{loadingStep}</p>
          </div>
          
          {/* Barre de progression améliorée */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Progression</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm" 
                style={{width: `${progress}%`}}
              />
            </div>
          </div>

          {/* Étapes dynamiques avec emojis */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-700 mb-3">Étapes en cours :</p>
            <div className="space-y-2">
              {mode === "homeStaging" ? (
                <>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("Analyse") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("Analyse") ? "🔍" : "⭕"}</span>
                    <span>Analyse intelligente de la pièce</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("Optimisation") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("Optimisation") ? "💡" : "⭕"}</span>
                    <span>Optimisation de la lumière naturelle</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("mobilier") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("mobilier") ? "🪑" : "⭕"}</span>
                    <span>Ajout du mobilier design tendance</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("Rendu") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("Rendu") ? "✨" : "⭕"}</span>
                    <span>Rendu ultra réaliste</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("Finalisation") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("Finalisation") ? "🎯" : "⭕"}</span>
                    <span>Finalisation du coup de cœur</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("murs") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("murs") ? "🏗️" : "⭕"}</span>
                    <span>Analyse précise des murs et fenêtres</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("espace") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("espace") ? "📐" : "⭕"}</span>
                    <span>Détection de l'espace disponible</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("Intégration") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("Intégration") ? "🛋️" : "⭕"}</span>
                    <span>Intégration parfaite de vos meubles</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("projection") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("projection") ? "🌟" : "⭕"}</span>
                    <span>Finalisation de la projection immersive</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${loadingStep.includes("prêt") ? "text-black font-bold" : "text-gray-400"}`}>
                    <span>{loadingStep.includes("prêt") ? "🎉" : "⭕"}</span>
                    <span>Votre futur intérieur est prêt</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Skeleton loading amélioré */}
          <div className="mt-4">
            <div className="animate-pulse h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl" />
            <p className="text-center text-xs text-gray-500 mt-2">Génération en cours...</p>
          </div>
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