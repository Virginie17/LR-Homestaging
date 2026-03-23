 # Instructions d'utilisation — Stripe Checkout & Webhook (FR)

## But

Permettre à un utilisateur d'acheter des crédits via Stripe Checkout et d'attribuer ces crédits
dans la table `users` de Supabase lorsque le paiement est confirmé (webhook).

## Composants ajoutés

- `app/components/StripeCheckoutButton.tsx` : petit UI client pour lancer la création d'une session Checkout.
- `app/api/stripe/create-checkout/route.ts` : crée la session Checkout (déjà ajoutée précédemment).
- `app/api/stripe/webhook/route.ts` : reçoit et vérifie les webhooks Stripe puis ajoute les crédits.

## Tester localement

- Démarrez votre app Next.js en local :

```bash
npm run dev
```

- Exécutez le script de test webhook (installez `node-fetch` si Node <18) :

```bash
STRIPE_SECRET_KEY=sk_test_... STRIPE_WEBHOOK_SECRET=whsec_... node scripts/stripe_local_webhook_tester.js
```

Le script enverra un événement `checkout.session.completed` simulé à `http://localhost:3000/api/stripe/webhook`.

## Variables d'environnement nécessaires

- `STRIPE_SECRET_KEY` (clé secrète Stripe)
- `STRIPE_WEBHOOK_SECRET` (secret de signature webhook)
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (pour mise à jour sécurisée des crédits)
- Optionnel: `NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID`, `STRIPE_PRICE_PRO_ID`, `STRIPE_PRICE_BUSINESS_ID` et mapping de crédits.

## Flux minimal côté client

1. L'utilisateur renseigne son email et clique sur le bouton d'achat.
1. Le client appelle `/api/stripe/create-checkout` avec `{ priceId, email }`.
1. L'API renvoie `url` (Checkout). Le client redirige l'utilisateur.
1. Stripe appelle `/api/stripe/webhook` après paiement réussi.
1. Le webhook vérifie la signature, lit `session.metadata.email` et incrémente/insère le champ `credits` pour l'utilisateur.

## Remarques de sécurité

- Crédits et modifications sensibles doivent être faits uniquement côté serveur, via la clef service role Supabase.
- Vérifiez toujours la signature du webhook (`stripe-signature`).

## Prochaine étape (facultative)

- Ajouter une page de gestion d'abonnement et un tableau de bord utilisateur montrant le solde de crédits.
