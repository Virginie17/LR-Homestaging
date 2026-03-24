export default function AgencesPage() {
  return (
    <main className="bg-white text-gray-900">
      <section className="bg-gray-950 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-3">
            Offre agences immobilières
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Valorisez vos annonces et aidez vos acheteurs à se projeter plus vite
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            LR Homestaging permet aux agences de transformer des photos ordinaires
            en visuels premium, et de projeter les meubles des prospects dans les biens.
          </p>

          <a
            href="/#pricing"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl transition"
          >
            Voir les offres
          </a>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-4">Valorisation immédiate</h2>
            <p className="text-gray-600">
              Donnez plus d'impact à vos biens vides, datés ou peu attractifs sans mise en scène physique.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-4">Projection client</h2>
            <p className="text-gray-600">
              Intégrez les propres meubles de vos prospects pour rendre la décision plus concrète.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-4">Image agence renforcée</h2>
            <p className="text-gray-600">
              Proposez une expérience différenciante et moderne qui valorise vos mandats.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Une démonstration vaut mieux qu'un long discours
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Testez LR Homestaging sur un bien réel et découvrez comment vos prospects
            peuvent se projeter plus vite grâce à des visuels premium et personnalisés.
          </p>

          <a
            href="/#generate"
            className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition"
          >
            Tester sur un bien maintenant
          </a>
        </div>
      </section>
    </main>
  );
}
