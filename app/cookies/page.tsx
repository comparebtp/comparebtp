import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Politique de cookies — BatiPrix",
  alternates: {
    canonical: "https://batiprix.pro/cookies",
  },
};

export default function Cookies() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-2">Politique de cookies</h1>
        <p className="text-steel mb-8">Dernière mise à jour : 19 mars 2026</p>

        <div className="prose prose-sm text-navy/80 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-navy">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur,
              tablette, smartphone) lors de la visite d&apos;un site web. Il permet au site
              de mémoriser certaines informations pour faciliter votre navigation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">2. Cookies utilisés sur BatiPrix</h2>

            <h3 className="text-lg font-semibold text-navy mt-4">Cookies strictement nécessaires</h3>
            <p>Ces cookies sont indispensables au fonctionnement du Site. Ils ne peuvent pas être désactivés.</p>
            <table className="w-full text-sm border-collapse mt-2">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left py-2 pr-4">Cookie</th>
                  <th className="text-left py-2 pr-4">Finalité</th>
                  <th className="text-left py-2">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-cream-dark/30">
                  <td className="py-2 pr-4 font-mono text-xs">cookie_consent</td>
                  <td className="py-2 pr-4">Mémorise votre choix de consentement aux cookies</td>
                  <td className="py-2">12 mois</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-semibold text-navy mt-6">Cookies analytiques (soumis à consentement)</h3>
            <p>Ces cookies nous permettent de comprendre comment les visiteurs utilisent le Site.</p>
            <table className="w-full text-sm border-collapse mt-2">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left py-2 pr-4">Cookie</th>
                  <th className="text-left py-2 pr-4">Fournisseur</th>
                  <th className="text-left py-2 pr-4">Finalité</th>
                  <th className="text-left py-2">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-cream-dark/30">
                  <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                  <td className="py-2 pr-4">Google Analytics</td>
                  <td className="py-2 pr-4">Distinguer les utilisateurs uniques</td>
                  <td className="py-2">13 mois</td>
                </tr>
                <tr className="border-b border-cream-dark/30">
                  <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                  <td className="py-2 pr-4">Google Analytics</td>
                  <td className="py-2 pr-4">Conserver l&apos;état de la session</td>
                  <td className="py-2">13 mois</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-semibold text-navy mt-6">Stockage local (localStorage)</h3>
            <p>
              Le Site utilise le stockage local de votre navigateur (localStorage) pour
              sauvegarder votre panier d&apos;achats. Ces données ne sont <strong>pas des cookies</strong>,
              restent sur votre appareil et ne sont jamais envoyées à nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Gestion des cookies</h2>
            <p>
              Lors de votre première visite, un bandeau vous permet d&apos;accepter ou de refuser
              les cookies non essentiels. Vous pouvez modifier votre choix à tout moment
              en cliquant sur le lien « Gérer les cookies » dans le pied de page du Site.
            </p>
            <p>
              Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-orange hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" className="text-orange hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471" className="text-orange hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-orange hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Plus d&apos;informations</h2>
            <p>
              Pour en savoir plus sur les cookies, consultez le site de la CNIL :
              <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" className="text-orange hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                www.cnil.fr/fr/cookies-et-autres-traceurs
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
