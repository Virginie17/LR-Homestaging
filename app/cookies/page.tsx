export default function CookiesPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Politique des cookies</h1>
      <p className="mb-4">Cette page décrit les cookies que nous utilisons et leur finalité.</p>

      <section className="mb-4">
        <h2 className="font-semibold">Cookies nécessaires</h2>
        <p>Cookies nécessaires au fonctionnement du site et à la sécurité.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Cookies analytiques</h2>
        <p>Cookies utilisés pour analyser l'utilisation du site (ex: Google Analytics). Ces cookies nécessitent votre consentement.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Gérer vos préférences</h2>
        <p>Utilisez la bannière de cookies pour accepter ou gérer vos préférences. Vous pouvez supprimer le consentement en effaçant les cookies ou le stockage local.</p>
      </section>
    </main>
  )
}
