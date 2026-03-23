export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Politique de confidentialité</h1>
      <p className="mb-2">Dernière mise à jour: {new Date().getFullYear()}</p>

      <section className="mb-4">
        <h2 className="font-semibold">Responsable du traitement</h2>
        <p>LR HomeStaging SASU — contact@lr-homestaging.fr</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Données collectées</h2>
        <p>Nous collectons les informations nécessaires à la fourniture du service: email, fichiers image que vous envoyez, journaux de connexion.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Base légale et finalités</h2>
        <p>Les données sont traitées pour fournir le service de génération d'images et la facturation si applicable.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Durée de conservation</h2>
        <p>Les fichiers et données sont conservés pendant la durée nécessaire au service ou selon obligations légales.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Vos droits</h2>
        <p>Vous pouvez exercer vos droits d'accès, rectification, effacement, opposition et portabilité en contactant contact@lr-homestaging.fr.</p>
      </section>
    </main>
  )
}
