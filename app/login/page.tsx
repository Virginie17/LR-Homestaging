"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";
  const priceId = searchParams.get("priceId") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    if (priceId) {
      router.push(`${redirect}?checkout=1&priceId=${encodeURIComponent(priceId)}`);
    } else {
      router.push(redirect);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
          Connexion
        </p>

        <h1 className="mt-3 text-3xl font-bold text-stone-900">
          Connectez-vous pour continuer
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-600">
          Connectez-vous pour acheter vos crédits et accéder au paiement Stripe.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
              required
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-stone-800"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Vous n'avez pas encore de compte ?{" "}
          <a
            href={`/signup?redirect=${encodeURIComponent(redirect)}&priceId=${encodeURIComponent(priceId)}`}
            className="font-medium text-stone-900 underline"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </main>
  );
}