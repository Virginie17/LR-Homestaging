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
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert("Connectez-vous pour acheter des crédits.");
        return;
      }

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
        throw new Error(data?.error || "Erreur checkout Stripe");
      }

      if (!data?.url) {
        throw new Error("URL Stripe absente.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Impossible de démarrer le paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirection..." : label}
    </button>
  );
}