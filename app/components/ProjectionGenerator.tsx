"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectionGenerator() {
  const [roomFile, setRoomFile] = useState<File | null>(null);
  const [furnitureFiles, setFurnitureFiles] = useState<File[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roomPreview = useMemo(() => {
    if (!roomFile) return null;
    return URL.createObjectURL(roomFile);
  }, [roomFile]);

  const furniturePreviews = useMemo(() => {
    return furnitureFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [furnitureFiles]);

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setRoomFile(selected);
    setResult(null);
    setError(null);
  };

  const handleFurnitureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFurnitureFiles(files);
    setResult(null);
    setError(null);
  };

  const removeFurniture = (index: number) => {
    setFurnitureFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setError(null);
    setResult(null);

    if (!roomFile) {
      setError("Veuillez ajouter la photo du bien.");
      return;
    }

    if (furnitureFiles.length === 0) {
      setError("Veuillez ajouter au moins un meuble.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error(
          "Connectez-vous pour utiliser la projection personnalisée avec vos crédits."
        );
      }

      const formData = new FormData();
      formData.append("room", roomFile);

      furnitureFiles.forEach((file) => {
        formData.append("furniture", file);
      });

      const res = await fetch("/api/projection", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de la projection.");
      }

      if (!data?.imageUrl) {
        throw new Error("Aucune image projetée n’a été retournée.");
      }

      setResult(data.imageUrl);
    } catch (err: any) {
      setError(err?.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-wide text-yellow-600 font-semibold mb-2">
          Mode avancé
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Projection avec vos meubles
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Visualisez votre futur intérieur avec vos propres meubles avant
          d’acheter ou de louer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            1. Photo du bien
          </p>
          <p className="text-sm text-gray-600">
            Ajoutez une photo claire de la pièce à projeter.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            2. Vos meubles
          </p>
          <p className="text-sm text-gray-600">
            Importez un ou plusieurs meubles à intégrer.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            3. Résultat
          </p>
          <p className="text-sm text-gray-600">
            Obtenez une projection réaliste de votre futur intérieur.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Photo du bien
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleRoomChange}
            className="block w-full border border-gray-300 rounded-xl p-3"
          />

          <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            {roomPreview ? (
              <img
                src={roomPreview}
                alt="Prévisualisation bien"
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-sm text-gray-500 px-6 text-center">
                Ajoutez la photo d’une chambre, cuisine, salle de bain ou autre
                pièce.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Vos meubles
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFurnitureChange}
            className="block w-full border border-gray-300 rounded-xl p-3"
          />

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {furniturePreviews.length > 0 ? (
              furniturePreviews.map((item, index) => (
                <div
                  key={`${item.file.name}-${index}`}
                  className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <img
                    src={item.url}
                    alt={`Meuble ${index + 1}`}
                    className="w-full h-28 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFurniture(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    Retirer
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full h-64 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500 px-6 text-center">
                Ajoutez votre canapé, votre table, votre lit ou d’autres meubles
                à projeter.
              </div>
            )}
          </div>
        </div>
      </div>

      {!loading && !result && roomPreview && furniturePreviews.length > 0 && (
        <div className="mb-6 rounded-3xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-sm uppercase tracking-wide text-yellow-700 font-semibold mb-2">
            Projection attendue
          </p>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Vous allez voir vos meubles intégrés dans cette pièce
          </h4>
          <p className="text-gray-700">
            L’IA va respecter la structure de la pièce, les volumes, la lumière
            et l’échelle des meubles pour créer une projection réaliste.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        className="w-full bg-black hover:bg-gray-800 text-white font-semibold px-6 py-4 rounded-2xl transition disabled:opacity-50"
        disabled={loading || !roomFile || furnitureFiles.length === 0}
      >
        {loading ? "Création de votre projection..." : "Tester avec mes meubles"}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Résultat premium • Perspective respectée • Idéal avant achat ou location
      </p>

      {loading && (
        <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-600 mb-2">Analyse de la pièce...</p>
          <p className="text-sm text-gray-600 mb-2">Étude de la perspective...</p>
          <p className="text-sm text-gray-600 mb-2">Placement des meubles...</p>
          <p className="text-sm text-gray-600 mb-2">
            Ajustement lumière et ombres...
          </p>
          <p className="text-sm text-gray-600">Finalisation du rendu...</p>

          <div className="mt-4 h-72 rounded-2xl bg-gray-200 animate-pulse" />
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {!loading && result && (
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm uppercase tracking-wide text-green-700 font-semibold mb-2">
              Projection terminée
            </p>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              Votre futur intérieur prend vie
            </h4>
            <p className="text-gray-700">
              Voici une projection réaliste de la pièce avec vos meubles
              intégrés.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">
                  Avant
                </p>
                <h5 className="text-lg font-bold text-gray-900">
                  Photo originale du bien
                </h5>
              </div>
              {roomPreview && (
                <img
                  src={roomPreview}
                  alt="Photo originale"
                  className="w-full h-80 object-cover"
                />
              )}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm uppercase tracking-wide text-yellow-600 font-semibold">
                  Après
                </p>
                <h5 className="text-lg font-bold text-gray-900">
                  Projection avec vos meubles
                </h5>
              </div>
              <img
                src={result}
                alt="Projection finale"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-black text-white p-6 md:p-8 text-center">
            <p className="text-sm uppercase tracking-wider text-yellow-400 font-semibold mb-3">
              Résultat premium
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Continuez vos projections avec vos crédits
            </h3>

            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Utilisez cette fonctionnalité pour aider vos clients à se projeter
              réellement ou pour visualiser votre futur intérieur avant de
              décider.
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
                Gérer mes crédits
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}