"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type StripeCheckoutButtonProps = {
  priceId: string;
  label: string;
  className?: string;
};

export default function StripeCheckoutButton({
  priceId,
  label,
  className = "w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition",
}: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!priceId) {
      alert("Offre temporairement indisponible.");
      return;
    }

    setLoading(true);

    try {
      // 🔐 Vérifie session utilisateur
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert("Connectez-vous pour débloquer vos crédits.");
        setLoading(false);
        return;
      }

      // 🔥 Appel API checkout
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Stripe checkout error:", data);
        throw new Error(data?.error || "Erreur checkout Stripe");
      }

      if (!data?.url) {
        throw new Error("URL Stripe absente.");
      }

      // 🚀 redirection Stripe
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Impossible de lancer le paiement. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {loading ? "Redirection vers Stripe..." : label}
    </button>
  );
}
