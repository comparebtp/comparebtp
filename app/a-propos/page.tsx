import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "À propos — BatiPrix",
  description: "Découvrez BatiPrix, le comparateur de prix dédié aux matériaux de construction et outillage BTP sur la Côte d'Azur.",
  alternates: {
    canonical: "https://batiprix.pro/a-propos",
  },
};

export default function APropos() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-8">À propos de BatiPrix</h1>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-xl font-bold text-navy mb-4">Notre mission</h2>
            <p className="text-navy/80 leading-relaxed mb-4">
              BatiPrix est né d&apos;un constat simple : les prix des matériaux de construction
              varient énormément d&apos;une enseigne à l&apos;autre, parfois de <strong>15 à 30%</strong> pour
              un même produit. Pour les professionnels du BTP comme pour les particuliers
              qui rénovent, cette différence représente des centaines voire des milliers d&apos;euros.
            </p>
            <p className="text-navy/80 leading-relaxed">
              Notre objectif est de rendre la comparaison de prix <strong>simple, rapide et gratuite</strong>.
              En quelques clics, trouvez le meilleur prix pour vos matériaux parmi toutes les
              enseignes de la Côte d&apos;Azur.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-xl font-bold text-navy mb-4">Comment ça marche ?</h2>
            <div className="space-y-4 text-navy/80 leading-relaxed">
              <p>
                Nous collectons les prix publics des enseignes de bricolage et de négoce
                de matériaux sur la Côte d&apos;Azur (départements 06 et 83). Les prix sont
                mis à jour régulièrement pour refléter au mieux la réalité du marché.
              </p>
              <p>
                Nos sources de données incluent les sites web publics des enseignes
                ainsi que les flux de données de nos partenaires affiliés. Les prix
                affichés sont donnés à titre indicatif — nous recommandons toujours
                de vérifier le prix en magasin avant achat.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-xl font-bold text-navy mb-4">BatiPrix en chiffres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="font-[var(--font-display)] text-2xl font-bold text-orange">3 000+</div>
                <div className="text-sm text-steel mt-1">Produits comparés</div>
              </div>
              <div>
                <div className="font-[var(--font-display)] text-2xl font-bold text-orange">244</div>
                <div className="text-sm text-steel mt-1">Magasins référencés</div>
              </div>
              <div>
                <div className="font-[var(--font-display)] text-2xl font-bold text-orange">43</div>
                <div className="text-sm text-steel mt-1">Enseignes</div>
              </div>
              <div>
                <div className="font-[var(--font-display)] text-2xl font-bold text-orange">06 / 83</div>
                <div className="text-sm text-steel mt-1">Départements</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-xl font-bold text-navy mb-4">Notre modèle économique</h2>
            <p className="text-navy/80 leading-relaxed mb-4">
              BatiPrix est un service <strong>100% gratuit</strong> pour les utilisateurs.
              Nous nous finançons grâce à l&apos;affiliation : lorsque vous cliquez sur un
              lien vers le site d&apos;une enseigne partenaire et effectuez un achat, nous
              pouvons percevoir une commission, <strong>sans aucun surcoût pour vous</strong>.
            </p>
            <p className="text-navy/80 leading-relaxed">
              Ce modèle nous permet de rester indépendants : les commissions d&apos;affiliation
              n&apos;influencent ni les prix affichés ni le classement des produits.
              Le produit le moins cher est toujours affiché en premier.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-xl font-bold text-navy mb-4">Qui sommes-nous ?</h2>
            <p className="text-navy/80 leading-relaxed mb-4">
              BatiPrix est un projet développé à Nice par un passionné de technologie
              et de construction. Basé sur la Côte d&apos;Azur, nous connaissons les
              spécificités du marché local et les besoins des artisans et bricoleurs de la région.
            </p>
            <div className="flex items-center gap-3 text-sm text-steel">
              <span>SIREN : 913 872 222</span>
              <span>•</span>
              <span>Nice, France</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-steel mb-4">Une question ? Un partenariat ?</p>
            <Link
              href="/contact"
              className="inline-block bg-orange hover:bg-orange-hot text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
