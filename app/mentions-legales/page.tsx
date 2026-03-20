import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Mentions légales — BatiPrix",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-8">Mentions légales</h1>

        <div className="prose prose-sm text-navy/80 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-navy">1. Éditeur du site</h2>
            <p>
              Le site <strong>BatiPrix</strong> (ci-après « le Site ») est édité par :
            </p>
            <ul className="list-none space-y-1">
              <li><strong>Raison sociale :</strong> BatiPrix</li>
              <li><strong>Forme juridique :</strong> Entreprise individuelle</li>
              <li><strong>Adresse :</strong> 1 Avenue de la Californie, 06200 Nice, France</li>
              <li><strong>Email :</strong> contact@batiprix.pro</li>
              <li><strong>Directeur de la publication :</strong> Vladislav Plamodealo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">2. Hébergement</h2>
            <p>Le Site est hébergé par :</p>
            <ul className="list-none space-y-1">
              <li><strong>Vercel Inc.</strong></li>
              <li>440 N Baxter St, Los Angeles, CA 90012, États-Unis</li>
              <li>Site web : <a href="https://vercel.com" className="text-orange hover:underline">vercel.com</a></li>
            </ul>
            <p>La base de données est hébergée par :</p>
            <ul className="list-none space-y-1">
              <li><strong>Neon Inc.</strong></li>
              <li>Région : AWS Europe Central 1 (Frankfurt, Allemagne)</li>
              <li>Site web : <a href="https://neon.tech" className="text-orange hover:underline">neon.tech</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">3. Objet du site</h2>
            <p>
              BatiPrix est un comparateur de prix indépendant dédié aux matériaux de construction,
              outillage et fournitures BTP sur la Côte d&apos;Azur (départements 06 et 83).
              Le Site permet aux utilisateurs de comparer les prix de produits identiques entre
              différentes enseignes de bricolage et négoces de matériaux.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">4. Prix affichés</h2>
            <p>
              Les prix affichés sur le Site sont collectés à partir des sites web publics des enseignes
              référencées et/ou de flux de données partenaires. Ils sont donnés à <strong>titre indicatif</strong> et
              peuvent ne pas refléter les prix en temps réel pratiqués en magasin.
            </p>
            <p>
              BatiPrix ne peut être tenu responsable des éventuelles différences de prix entre
              les informations affichées sur le Site et les prix pratiqués en magasin ou sur les
              sites des enseignes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">5. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus du Site (textes, graphismes, logo, icônes, images, mise en page)
              est la propriété exclusive de BatiPrix, à l&apos;exception des marques, logos et contenus
              appartenant aux enseignes partenaires et référencées, qui restent la propriété de leurs
              détenteurs respectifs.
            </p>
            <p>
              Les noms de marques et logos des enseignes (Leroy Merlin, Castorama, Brico Dépôt,
              Würth, etc.) sont utilisés à des fins d&apos;information et appartiennent à leurs
              propriétaires respectifs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">6. Liens hypertextes</h2>
            <p>
              Le Site contient des liens vers les sites web des enseignes référencées.
              BatiPrix n&apos;est pas responsable du contenu de ces sites externes.
              Certains liens peuvent être des liens d&apos;affiliation, ce qui signifie que
              BatiPrix peut percevoir une commission en cas d&apos;achat effectué via ces liens,
              sans surcoût pour l&apos;utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">7. Droit applicable</h2>
            <p>
              Le Site est soumis au droit français. Tout litige relatif à l&apos;utilisation du Site
              sera soumis aux tribunaux compétents de Nice, France.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy">8. Contact</h2>
            <p>
              Pour toute question ou demande, vous pouvez nous contacter à l&apos;adresse :
              <a href="mailto:batiprix@outlook.fr" className="text-orange hover:underline ml-1">batiprix@outlook.fr</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
