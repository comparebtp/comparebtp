import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité — BatiPrix",
};

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-2">Politique de confidentialité</h1>
        <p className="text-steel mb-8">Dernière mise à jour : 19 mars 2026</p>

        <div className="prose prose-sm text-navy/80 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-navy">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est PLAMODEALO Vladislav (BatiPrix),
              4 Avenue Emilia, 06000 Nice, France. SIREN : 913 872 222.
              Contact : <a href="mailto:batiprix@outlook.fr" className="text-orange hover:underline">batiprix@outlook.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">2. Données collectées</h2>
            <p>Dans le cadre de l&apos;utilisation du Site, nous pouvons collecter :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite (via cookies analytiques)</li>
              <li><strong>Données du panier :</strong> produits ajoutés au panier (stockés localement sur votre appareil, non envoyés à nos serveurs)</li>
              <li><strong>Données de contact :</strong> si vous nous contactez par email, nous conservons votre adresse email et le contenu du message</li>
            </ul>
            <p>
              <strong>Nous ne collectons aucune donnée personnelle sensible.</strong> Le Site ne
              nécessite pas de création de compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Finalités du traitement</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Améliorer l&apos;expérience utilisateur et le fonctionnement du Site</li>
              <li>Analyser les statistiques de fréquentation (données agrégées et anonymisées)</li>
              <li>Répondre à vos demandes de contact</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Base légale</h2>
            <p>Le traitement des données repose sur :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Votre consentement</strong> pour les cookies non essentiels (analytiques, publicitaires)</li>
              <li><strong>L&apos;intérêt légitime</strong> de BatiPrix pour les cookies techniques nécessaires au fonctionnement du Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">5. Cookies</h2>
            <p>Le Site utilise des cookies. Voir notre <a href="/cookies" className="text-orange hover:underline">Politique de cookies</a> pour plus de détails.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">6. Partage des données</h2>
            <p>
              Vos données personnelles ne sont <strong>jamais vendues</strong> à des tiers.
              Elles peuvent être partagées avec :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Vercel Inc.</strong> (hébergement du Site)</li>
              <li><strong>Neon Inc.</strong> (hébergement de la base de données)</li>
              <li><strong>Google Analytics</strong> (statistiques de fréquentation, si vous y consentez)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">7. Durée de conservation</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Données de navigation : 13 mois maximum (conformément aux recommandations CNIL)</li>
              <li>Données de contact : 3 ans après le dernier échange</li>
              <li>Données du panier : stockées localement sur votre appareil, supprimées par vous à tout moment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">8. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :
              <a href="mailto:batiprix@outlook.fr" className="text-orange hover:underline ml-1">batiprix@outlook.fr</a>
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la CNIL :
              <a href="https://www.cnil.fr" className="text-orange hover:underline ml-1" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">9. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données personnelles contre tout accès non autorisé, modification,
              divulgation ou destruction. Le Site utilise le protocole HTTPS pour sécuriser
              les communications.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
