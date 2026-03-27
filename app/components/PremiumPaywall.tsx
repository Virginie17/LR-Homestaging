import StripeCheckoutButton from "./StripeCheckoutButton";

type PremiumPaywallProps = {
  title?: string;
  text?: string;
  imageUrl?: string | null;
};

export default function PremiumPaywall({
  title = "Débloquez vos prochaines transformations",
  text = "Vous avez vu le potentiel. Continuez avec un pack de crédits pour générer d’autres visuels premium.",
  imageUrl,
}: PremiumPaywallProps) {
  return (
    <div className="mt-8 rounded-3xl bg-black text-white p-6 md:p-8 text-center relative overflow-hidden">
      {imageUrl && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center blur-sm scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      <div className="relative z-10">
        <p className="text-sm uppercase tracking-wider text-yellow-400 font-semibold mb-3">
          Offre premium
        </p>

        <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8">{text}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <h4 className="font-bold text-xl mb-2">Starter</h4>
            <p className="text-gray-300 mb-1">10 crédits</p>
            <p className="text-yellow-400 font-semibold mb-4">9€</p>
            <StripeCheckoutButton
              priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID || ""}
              label="Acheter Starter"
              className="w-full bg-white text-black hover:bg-gray-100 py-3 rounded-xl font-semibold transition"
            />
          </div>

          <div className="rounded-2xl bg-yellow-500/10 p-5 border border-yellow-400/30">
            <h4 className="font-bold text-xl mb-2">Pro</h4>
            <p className="text-gray-300 mb-1">30 crédits</p>
            <p className="text-yellow-400 font-semibold mb-4">19€</p>
            <StripeCheckoutButton
              priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID || ""}
              label="Acheter Pro"
              className="w-full bg-yellow-500 text-black hover:bg-yellow-400 py-3 rounded-xl font-semibold transition"
            />
          </div>

          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <h4 className="font-bold text-xl mb-2">Business</h4>
            <p className="text-gray-300 mb-1">100 crédits</p>
            <p className="text-yellow-400 font-semibold mb-4">49€</p>
            <StripeCheckoutButton
              priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID || ""}
              label="Acheter Business"
              className="w-full bg-white text-black hover:bg-gray-100 py-3 rounded-xl font-semibold transition"
            />
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-5">
          Paiement sécurisé Stripe • Crédits ajoutés automatiquement
        </p>
      </div>
    </div>
  );
}
