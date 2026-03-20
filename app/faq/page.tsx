import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "FAQ — BatiPrix",
  description: "Questions fréquentes sur BatiPrix : comment fonctionnent les comparaisons de prix, la fréquence de mise à jour, nos sources de données.",
  alternates: {
    canonical: "https://batiprix.pro/faq",
  },
};

const FAQS = [
  {
    q: "Comment BatiPrix collecte-t-il les prix ?",
    a: "Nous collectons les prix à partir des sites web publics des enseignes de bricolage et de négoce de matériaux. Nos robots d'extraction visitent régulièrement les pages produits pour relever les prix affichés. Nous utilisons également les flux de données de nos partenaires affiliés lorsqu'ils sont disponibles.",
  },
  {
    q: "À quelle fréquence les prix sont-ils mis à jour ?",
    a: "Les prix sont mis à jour quotidiennement pour les enseignes principales (Brico Dépôt, Tollens, Würth). Pour les enseignes partenaires via l'affiliation, les prix sont mis à jour selon la fréquence du flux fourni par l'enseigne (généralement quotidien). Nous affichons toujours la date de dernière vérification.",
  },
  {
    q: "Les prix affichés sont-ils fiables ?",
    a: "Les prix sont donnés à titre indicatif et reflètent les prix constatés sur les sites web des enseignes au moment de la dernière collecte. Les prix en magasin peuvent différer (promotions locales, stocks, erreurs de saisie). Nous recommandons toujours de vérifier le prix sur le site de l'enseigne ou en magasin avant d'acheter.",
  },
  {
    q: "Quelles enseignes sont comparées ?",
    a: "Nous comparons actuellement les prix de Brico Dépôt, Tollens et Würth, avec plus de 3 000 produits référencés. Nous travaillons à ajouter Leroy Merlin, Castorama, ManoMano, Bricomarché et d'autres enseignes prochainement.",
  },
  {
    q: "La comparaison est-elle gratuite ?",
    a: "Oui, BatiPrix est 100% gratuit pour les utilisateurs. Nous nous finançons grâce à l'affiliation : lorsque vous cliquez sur un lien vers le site d'une enseigne et effectuez un achat, nous pouvons percevoir une commission sans aucun surcoût pour vous.",
  },
  {
    q: "L'affiliation influence-t-elle le classement des prix ?",
    a: "Non, jamais. Les produits sont toujours classés par prix croissant, du moins cher au plus cher, indépendamment de nos partenariats d'affiliation. Le produit le moins cher est toujours affiché en premier.",
  },
  {
    q: "Quelle zone géographique couvrez-vous ?",
    a: "BatiPrix se concentre sur la Côte d'Azur (départements 06 Alpes-Maritimes et 83 Var). Nous référençons 244 magasins BTP dans cette zone, incluant les grandes enseignes, les négoces spécialisés et même quelques magasins italiens proches de la frontière (Ventimiglia, Sanremo).",
  },
  {
    q: "Comment fonctionne le panier multi-enseignes ?",
    a: "Vous pouvez ajouter des produits de différentes enseignes dans un même panier. BatiPrix calcule le total par enseigne et vous propose un itinéraire optimisé pour récupérer vos achats en minimisant les déplacements entre les magasins.",
  },
  {
    q: "Je suis une enseigne BTP, comment référencer mes produits ?",
    a: "Contactez-nous à batiprix@outlook.fr. Nous pouvons intégrer vos produits via un flux de données (CSV/XML) ou via un partenariat d'affiliation. Le référencement est gratuit pour les enseignes.",
  },
  {
    q: "Comment signaler une erreur de prix ?",
    a: "Si vous constatez un prix incorrect, envoyez-nous un email à batiprix@outlook.fr en précisant le produit, l'enseigne et le prix réel constaté. Nous corrigerons dans les plus brefs délais.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-2">Questions fréquentes</h1>
        <p className="text-steel mb-10">
          Tout ce que vous devez savoir sur BatiPrix et la comparaison de prix BTP.
        </p>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="bg-white rounded-xl border border-cream-dark/20 overflow-hidden group"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-cream/30 transition-colors">
                <h2 className="text-sm font-semibold text-navy pr-4">{faq.q}</h2>
                <svg
                  className="w-5 h-5 text-steel flex-shrink-0 transition-transform group-open:rotate-180"
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-navy/70 leading-relaxed border-t border-cream-dark/10 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
