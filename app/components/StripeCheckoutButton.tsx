"use client";

type StripeCheckoutButtonProps = {
  priceId: string;
  label: string;
};

export default function StripeCheckoutButton({
  priceId,
  label,
}: StripeCheckoutButtonProps) {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur checkout Stripe");
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de démarrer le paiement.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
    >
      {label}
    </button>
  );
}