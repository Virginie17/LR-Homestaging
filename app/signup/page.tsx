"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";
  const priceId = searchParams.get("priceId") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("Compte créé avec succès. Vous pouvez maintenant vous connecter.");

    setTimeout(() => {
      const query = new URLSearchParams();
      if (redirect) query.set("redirect", redirect);
      if (priceId) query.set("priceId", priceId);

      router.push(`/login?${query.toString()}`);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
          Inscription
        </p>

        <h1 className="mt-3 text-3xl font-bold text-stone-900">
          Créez votre compte
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-600">
          Créez un compte pour acheter vos crédits et accéder au paiement Stripe.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
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

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
              required
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-stone-800"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Vous avez déjà un compte ?{" "}
          <a
            href={`/login?redirect=${encodeURIComponent(redirect)}&priceId=${encodeURIComponent(priceId)}`}
            className="font-medium text-stone-900 underline"
          >
            Se connecter
          </a>
        </p>
      </div>
    </main>
  );
}
