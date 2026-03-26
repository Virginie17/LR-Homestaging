"use client";

import Image from "next/image";
import HomeStagingGenerator from "./components/HomeStagingGenerator";
import ProjectionGenerator from "./components/ProjectionGenerator";
import CreditsBalance from "./components/CreditsBalance";
import StripeCheckoutButton from "./components/StripeCheckoutButton";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo/logo noir.png"
              alt="LR Homestaging"
              width={150}
              height={42}
              className="h-auto w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#generate" className="hover:text-yellow-600 transition">
              Tester
            </a>
            <a href="#demo" className="hover:text-yellow-600 transition">
              Avant / Après
            </a>
            <a href="#projection" className="hover:text-yellow-600 transition">
              Vos meubles
            </a>
            <a href="#pricing" className="hover:text-yellow-600 transition">
              Tarifs
            </a>
            <a href="#agences" className="hover:text-yellow-600 transition">
              Agences
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-4 py-2 text-sm font-semibold mb-5">
              Offre de lancement : 1 image offerte
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Transformez n'importe quel bien en coup de cœur instantané grâce à l'IA
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 max-w-2xl">
              Home staging automatique + projection de vos propres meubles dans
              n'importe quel espace pour aider acheteurs, locataires et agences
              à se projeter immédiatement.
            </p>

            <p className="text-sm text-gray-500 mb-8">
              +500 transformations générées • Utilisé par particuliers, investisseurs et professionnels de l'immobilier
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="#generate"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl text-center transition"
              >
                Tester votre photo maintenant
              </a>

              <a
                href="#demo"
                className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl text-center transition"
              >
                Voir les transformations
              </a>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-10">
              <span>✔ 1 image gratuite</span>
              <span>✔ Sans inscription</span>
              <span>✔ Résultat en quelques secondes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="font-semibold mb-1">Rapide</p>
                <p className="text-sm text-gray-600">
                  Importez une photo et obtenez un rendu attractif immédiatement.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="font-semibold mb-1">Réaliste</p>
                <p className="text-sm text-gray-600">
                  Volumes, murs et perspectives respectés pour un rendu crédible.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="font-semibold mb-1">Vendeur</p>
                <p className="text-sm text-gray-600">
                  Des visuels qui aident vraiment à se projeter et à décider.
                </p>
              </div>
            </div>
          </div>

          <div id="generate" className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 md:p-6">
              <div className="mb-4">
                <p className="text-sm uppercase tracking-wide text-yellow-600 font-semibold mb-2">
                  Test immédiat
                </p>
                <h2 className="text-2xl font-bold mb-2">
                  Testez votre photo dès maintenant
                </h2>
                <p className="text-gray-600">
                  Ajoutez une photo de votre bien et laissez l'IA créer un rendu professionnel.
                </p>
              </div>

              <HomeStagingGenerator />

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Avant / Après instantané • Home staging rapide • Projection personnalisée
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm bg-white">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/demo/visuel-signature2.png"
                  alt="Projection avec vos propres meubles"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-2">
                  Visuel signature
                </p>
                <h3 className="text-xl font-bold mb-2">
                  Projetez vos propres meubles dans votre futur bien
                </h3>
                <p className="text-gray-600">
                  Visualisez votre canapé, votre table et votre style directement dans le bien avant d'acheter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPTE */}
      <section className="py-10 px-6 bg-white">
        <div id="account" className="max-w-md mx-auto">
          <CreditsBalance />
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Comment ça fonctionne
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Un parcours simple pour obtenir un rendu premium
            </h2>
            <p className="text-lg text-gray-600">
              Quelques clics suffisent pour valoriser un bien ou aider un prospect à se projeter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-gray-50 p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Importez votre photo</h3>
              <p className="text-gray-600">
                Ajoutez une pièce vide, datée ou peu valorisée.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">L'IA met en scène</h3>
              <p className="text-gray-600">
                Mobilier, ambiance, lumière et harmonie sont générés de façon réaliste.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Le coup de cœur démarre</h3>
              <p className="text-gray-600">
                Un visuel plus vendeur aide à la projection et accélère la décision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISUELS PREMIUM */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Visuels premium
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Des transformations qui renforcent immédiatement l'attractivité du bien
            </h2>
            <p className="text-lg text-gray-600">
              Trois pièces clés pour créer une première impression forte et rassurante.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/demo/chambre-premium.png"
                  alt="Visuel premium chambre"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Chambre</h3>
                <p className="font-semibold text-gray-900 mb-2">
                  Transformez une chambre vide en coup de cœur instantané
                </p>
                <p className="text-gray-600">
                  En quelques secondes, notre IA crée un espace chaleureux qui aide les acheteurs à se projeter immédiatement.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/demo/cuisine-premium.png"
                  alt="Visuel premium cuisine"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Cuisine</h3>
                <p className="font-semibold text-gray-900 mb-2">
                  Révélez le potentiel caché de votre cuisine
                </p>
                <p className="text-gray-600">
                  Modernisez visuellement n'importe quelle cuisine pour séduire dès la première visite.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/demo/sdb-premium.png"
                  alt="Visuel premium salle de bain"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Salle de bain</h3>
                <p className="font-semibold text-gray-900 mb-2">
                  Une salle de bain qui déclenche le coup de cœur
                </p>
                <p className="text-gray-600">
                  Créez une ambiance premium et rassurante sans rénover pour améliorer la perception du bien.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* AVANT / APRES */}
      <section id="demo" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Avant / Après
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Découvrez la transformation en quelques secondes
            </h2>
            <p className="text-lg text-gray-600">
              Une image plus attractive change immédiatement la perception d'un bien.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            <BeforeAfterSlider
              title="Chambre : transformation douce et moderne"
              beforeSrc="/demo/demo-avant.jpg"
              afterSrc="/demo/demo-apres.jpg"
              beforeText="Pièce difficile à projeter et peu valorisée."
              afterText="Une chambre chaleureuse et moderne qui donne immédiatement envie."
              badge="Projection immédiate des acheteurs"
            />

            <BeforeAfterSlider
              title="Cuisine : espace plus lumineux et plus séduisant"
              beforeSrc="/demo/demo-avant.jpg"
              afterSrc="/demo/demo-apres.jpg"
              beforeText="Cuisine ancienne et peu fonctionnelle."
              afterText="Un espace moderne et lumineux pensé pour séduire immédiatement."
              badge="Pièce centrale valorisée"
            />

            <BeforeAfterSlider
              title="Salle de bain : montée en gamme visuelle"
              beforeSrc="/demo/demo-avant.jpg"
              afterSrc="/demo/demo-apres.jpg"
              beforeText="Une salle de bain datée qui freine la perception du bien."
              afterText="Un espace premium qui renforce immédiatement l'attractivité du logement."
              badge="Montée en gamme visuelle"
            />
          </div>
        </div>
      </section>

      {/* PROJECTION AVEC MEUBLES */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Projection personnalisée
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Projetez vos propres meubles dans votre futur bien
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Importez la photo d'un bien et vos meubles pour visualiser un intérieur réaliste, rassurer les acheteurs et accélérer la décision.
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Acheteurs et locataires se projettent vraiment
                  </h3>
                  <p className="text-gray-600">
                    Ils visualisent le bien avec leur propre univers, pas avec une mise en scène générique.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Les agences rassurent plus vite leurs prospects
                  </h3>
                  <p className="text-gray-600">
                    Une projection personnalisée rend la visite plus concrète et plus mémorable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    La décision devient plus simple
                  </h3>
                  <p className="text-gray-600">
                    Quand le futur occupant se projette mieux, le bien gagne immédiatement en valeur perçue.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#projection"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
            >
              Tester avec mes meubles
            </a>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm bg-white">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/demo/visuel-signature2.png"
                  alt="Photo du bien, meubles du client, projection finale"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-2">
                  Visuel signature
                </p>
                <h3 className="text-2xl font-bold mb-3">
                  Avant même d'acheter, voyez déjà votre futur chez vous
                </h3>
                <p className="text-gray-600">
                  Photo du bien + meubles du client + projection finale : la façon la plus concrète de se projeter avant une décision immobilière.
                </p>
              </div>
            </div>

            <div id="projection" className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-sm uppercase tracking-wide text-yellow-600 font-semibold mb-2">
                  Démo projection
                </p>
                <h3 className="text-2xl font-bold mb-2">
                  Visualisez le bien avec vos meubles
                </h3>
                <p className="text-gray-600">
                  Idéal pour les acheteurs, locataires et agences qui veulent une projection plus réaliste.
                </p>
              </div>

              <ProjectionGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="pricing" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Tarifs
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Des offres simples et adaptées à vos besoins
            </h2>
            <p className="text-lg text-gray-600">
              Commencez gratuitement, puis choisissez le pack adapté à votre usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border border-gray-200 rounded-3xl p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-4">9€</p>
              <p className="text-gray-600 mb-6">10 crédits</p>

              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>✔ 10 transformations</li>
                <li>✔ Qualité premium</li>
                <li>✔ Essai idéal</li>
              </ul>

              <StripeCheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ID || ""}
                label="Choisir Starter"
              />
            </div>

            <div className="border-2 border-yellow-500 rounded-3xl p-8 text-center shadow-lg relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-sm px-4 py-1 rounded-full font-semibold">
                Le plus populaire
              </span>

              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">19€</p>
              <p className="text-gray-600 mb-6">30 crédits</p>

              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>✔ 30 transformations</li>
                <li>✔ Meilleur rapport qualité / prix</li>
                <li>✔ Idéal agences et pros</li>
              </ul>

              <StripeCheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ID || ""}
                label="Choisir Pro"
              />
            </div>

            <div className="border border-gray-200 rounded-3xl p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Business</h3>
              <p className="text-4xl font-bold mb-4">49€</p>
              <p className="text-gray-600 mb-6">100 crédits</p>

              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>✔ 100 transformations</li>
                <li>✔ Gros volumes</li>
                <li>✔ Utilisation intensive</li>
              </ul>

              <StripeCheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ID || ""}
                label="Choisir Business"
              />
            </div>

            <div className="border border-black rounded-3xl p-8 text-center shadow-sm bg-black text-white">
              <h3 className="text-xl font-semibold mb-4">Vente Rapide</h3>
              <p className="text-4xl font-bold mb-4">29€</p>
              <p className="text-gray-300 mb-6">5 visuels optimisés</p>

              <ul className="text-sm text-gray-300 mb-8 space-y-2">
                <li>✔ 5 pièces optimisées pour annonce</li>
                <li>✔ Home staging premium</li>
                <li>✔ Idéal pour un bien à relancer</li>
              </ul>

              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition">
                Choisir Vente Rapide
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 text-sm">
              1 image offerte • Payez seulement si vous souhaitez continuer
            </p>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-3">
              Témoignages
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ils voient immédiatement le potentiel du bien
            </h2>
            <p className="text-lg text-gray-600">
              LR Homestaging aide particuliers et professionnels à rendre leurs annonces plus attractives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="text-yellow-500 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Le rendu a permis de mieux visualiser le potentiel du bien dès la première visite."
              </p>
              <p className="font-semibold">Propriétaire vendeur</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="text-yellow-500 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Les visuels avant/après rendent l'annonce beaucoup plus attractive et convaincante."
              </p>
              <p className="font-semibold">Professionnel de l'immobilier</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="text-yellow-500 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "La projection avec les meubles du client apporte une vraie valeur perçue au bien."
              </p>
              <p className="font-semibold">Investisseur immobilier</p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENCES */}
      <section id="agences" className="bg-gray-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-3">
              Solution pour agences immobilières
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              La solution IA qui valorise vos annonces et aide vos acheteurs à se projeter
            </h2>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Créez des visuels attractifs, réalistes et différenciants pour vendre plus vite et renforcer votre image d'agence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-3">Valorisez vos mandats</h3>
              <p className="text-gray-300">
                Donnez plus d'impact à un bien vide, ancien ou difficile à vendre.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-3">Aidez à se projeter</h3>
              <p className="text-gray-300">
                Un visuel immersif rend les visites plus concrètes et plus efficaces.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-3">Renforcez votre image</h3>
              <p className="text-gray-300">
                Proposez une expérience moderne et différenciante face à la concurrence.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-3">Projetez les meubles clients</h3>
              <p className="text-gray-300">
                Permettez à vos acheteurs de visualiser le bien avec leur propre univers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-3">
            Passez à l'action
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Testez votre photo maintenant et déclenchez le coup de cœur
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Un visuel plus attractif peut changer la perception d'un bien en quelques secondes.
            Faites l'essai gratuitement et voyez la différence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="#generate"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
            >
              Tester votre photo maintenant
            </a>

            <a
              href="#pricing"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition"
            >
              Choisir mon pack
            </a>
          </div>

          <p className="text-sm text-gray-400">
            1 image offerte • Idéal pour particuliers, agences et investisseurs
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} LR Homestaging — Tous droits réservés
          </p>

          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#agences" className="hover:text-yellow-600 transition">
              Agences
            </a>
            <a href="#pricing" className="hover:text-yellow-600 transition">
              Tarifs
            </a>
            <a href="#generate" className="hover:text-yellow-600 transition">
              Tester
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
