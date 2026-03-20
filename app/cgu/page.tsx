import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Conditions Générales d'Utilisation — BatiPrix",
};

export default function CGU() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-2">Conditions Générales d&apos;Utilisation</h1>
        <p className="text-steel mb-8">Dernière mise à jour : 19 mars 2026</p>

        <div className="prose prose-sm text-navy/80 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-navy">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et
              l&apos;utilisation du site web BatiPrix, accessible à l&apos;adresse comparebtp.vercel.app.
              En accédant au Site, l&apos;utilisateur accepte sans réserve les présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">2. Description du service</h2>
            <p>
              BatiPrix est un service gratuit de comparaison de prix de matériaux de construction,
              outillage et fournitures BTP. Le Site permet de :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Rechercher et comparer les prix de produits BTP entre différentes enseignes</li>
              <li>Consulter les fiches produits avec les prix pratiqués par chaque enseigne</li>
              <li>Localiser les magasins BTP sur la Côte d&apos;Azur (06 et 83)</li>
              <li>Constituer un panier multi-enseignes et optimiser son trajet d&apos;achat</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Accès au service</h2>
            <p>
              L&apos;accès au Site est gratuit et ne nécessite pas de création de compte.
              BatiPrix se réserve le droit de modifier, suspendre ou interrompre
              tout ou partie du service à tout moment, sans préavis ni indemnité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Exactitude des informations</h2>
            <p>
              Les prix et informations produits affichés sur le Site proviennent de sources
              publiques (sites web des enseignes) et/ou de flux de données partenaires.
              Ils sont fournis <strong>à titre indicatif uniquement</strong>.
            </p>
            <p>
              BatiPrix s&apos;efforce de maintenir les informations à jour mais ne garantit pas
              l&apos;exactitude, la complétude ou l&apos;actualité des prix affichés. Les prix en
              magasin peuvent différer des prix affichés sur le Site.
            </p>
            <p>
              <strong>Avant tout achat, nous recommandons de vérifier le prix directement
              auprès de l&apos;enseigne concernée.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">5. Liens d&apos;affiliation</h2>
            <p>
              Le Site peut contenir des liens d&apos;affiliation vers les sites web des enseignes
              partenaires. En cliquant sur ces liens et en effectuant un achat, BatiPrix
              peut percevoir une commission, sans aucun surcoût pour l&apos;utilisateur.
            </p>
            <p>
              Ces liens d&apos;affiliation n&apos;influencent en aucun cas le classement des prix
              ou la présentation des produits sur le Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">6. Propriété intellectuelle</h2>
            <p>
              Les contenus du Site (textes, design, code, logo BatiPrix) sont protégés
              par le droit d&apos;auteur. Toute reproduction sans autorisation est interdite.
              Les marques des enseignes référencées appartiennent à leurs propriétaires respectifs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">7. Responsabilité</h2>
            <p>
              BatiPrix ne saurait être tenu responsable :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Des différences entre les prix affichés et les prix réels en magasin</li>
              <li>De l&apos;indisponibilité temporaire du Site</li>
              <li>Du contenu des sites tiers vers lesquels le Site redirige</li>
              <li>Des décisions d&apos;achat prises sur la base des informations du Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">8. Utilisation du panier</h2>
            <p>
              Le panier multi-enseignes est un outil d&apos;aide à la planification des achats.
              Les données du panier sont stockées localement sur votre appareil (localStorage)
              et ne sont pas transmises à nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">9. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est décrit dans notre
              <a href="/confidentialite" className="text-orange hover:underline ml-1">Politique de confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">10. Modification des CGU</h2>
            <p>
              BatiPrix se réserve le droit de modifier les présentes CGU à tout moment.
              Les modifications prennent effet dès leur publication sur le Site.
              L&apos;utilisation continue du Site vaut acceptation des CGU modifiées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">11. Droit applicable</h2>
            <p>
              Les présentes CGU sont régies par le droit français.
              Tout litige sera soumis aux tribunaux compétents de Nice, France.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
