import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Guides & Conseils BTP — BatiPrix",
  description: "Guides pratiques pour vos travaux de construction et rénovation sur la Côte d'Azur. Conseils, comparatifs et astuces pour bien choisir vos matériaux.",
  alternates: {
    canonical: "https://batiprix.pro/guides",
  },
};

const GUIDES = [
  {
    slug: "comment-choisir-perceuse",
    title: "Comment choisir sa perceuse-visseuse en 2026",
    excerpt: "Guide complet pour choisir entre perceuse filaire, sans fil, à percussion. Comparatif des marques Bosch, Makita, DeWalt, Milwaukee.",
    category: "Outillage",
    readTime: "8 min",
    date: "15 mars 2026",
  },
  {
    slug: "prix-materiaux-construction-cote-azur",
    title: "Prix des matériaux de construction sur la Côte d'Azur en 2026",
    excerpt: "Tour d'horizon des prix du ciment, parpaings, béton, bois de charpente dans les enseignes BTP du 06 et 83. Comparatif et tendances.",
    category: "Gros Oeuvre",
    readTime: "12 min",
    date: "14 mars 2026",
  },
  {
    slug: "guide-peinture-interieure",
    title: "Quelle peinture intérieure choisir ? Guide comparatif",
    excerpt: "Mat, satin, brillant ? Acrylique ou glycéro ? Tollens, Zolpan, V33 ? On compare les marques et les prix pour vous aider à choisir.",
    category: "Peinture",
    readTime: "10 min",
    date: "12 mars 2026",
  },
  {
    slug: "renovation-salle-de-bain-budget",
    title: "Rénover sa salle de bain : budget et matériaux",
    excerpt: "Estimation du budget pour une rénovation complète de salle de bain. Comparaison des prix carrelage, robinetterie, sanitaire entre enseignes.",
    category: "Plomberie",
    readTime: "15 min",
    date: "10 mars 2026",
  },
  {
    slug: "meilleurs-magasins-btp-nice",
    title: "Les meilleurs magasins BTP à Nice et ses environs",
    excerpt: "Leroy Merlin, Castorama, Brico Dépôt, Point P... Où acheter vos matériaux à Nice ? Comparatif des enseignes par spécialité et gamme de prix.",
    category: "Guide local",
    readTime: "7 min",
    date: "8 mars 2026",
  },
  {
    slug: "isoler-maison-cote-azur",
    title: "Isoler sa maison sur la Côte d'Azur : matériaux et prix",
    excerpt: "Laine de verre, laine de roche, polystyrène, isolants biosourcés. Quel isolant choisir en région PACA et à quel prix ?",
    category: "Isolation",
    readTime: "11 min",
    date: "6 mars 2026",
  },
  {
    slug: "comparatif-visserie-fixation",
    title: "Visserie et fixation : comparatif des enseignes",
    excerpt: "Vis, chevilles, boulons, rivets. Où acheter sa visserie au meilleur prix ? Würth, Brico Dépôt, Leroy Merlin comparés.",
    category: "Quincaillerie",
    readTime: "6 min",
    date: "4 mars 2026",
  },
  {
    slug: "outillage-electroportatif-pro",
    title: "Outillage électroportatif : guide d'achat pro",
    excerpt: "Meuleuse, scie circulaire, perforateur, ponceuse. Les gammes pro vs grand public, et où trouver les meilleurs prix.",
    category: "Outillage",
    readTime: "9 min",
    date: "2 mars 2026",
  },
  {
    slug: "carrelage-sol-mur-guide",
    title: "Choisir son carrelage sol et mur : guide complet",
    excerpt: "Grès cérame, faïence, travertin, imitation bois. Comparaison des prix entre Leroy Merlin, Castorama et les spécialistes.",
    category: "Carrelage",
    readTime: "10 min",
    date: "28 février 2026",
  },
  {
    slug: "electricite-maison-normes-prix",
    title: "Installation électrique : normes NF C 15-100 et prix des composants",
    excerpt: "Tableau électrique, disjoncteurs, câbles, prises. Tour d'horizon des prix chez Rexel, Legrand, Leroy Merlin.",
    category: "Électricité",
    readTime: "13 min",
    date: "25 février 2026",
  },
  {
    slug: "acheter-materiaux-italie-frontiere",
    title: "Acheter ses matériaux en Italie depuis Nice : ça vaut le coup ?",
    excerpt: "Ventimiglia, Sanremo, Imperia. Quels magasins, quels prix, quelles économies possibles en traversant la frontière ?",
    category: "Guide local",
    readTime: "8 min",
    date: "22 février 2026",
  },
  {
    slug: "economiser-travaux-renovation",
    title: "10 astuces pour économiser sur vos travaux de rénovation",
    excerpt: "Comparer les prix, acheter au bon moment, profiter des promos, optimiser ses trajets entre magasins.",
    category: "Conseils",
    readTime: "5 min",
    date: "20 février 2026",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-[var(--font-display)] text-xs tracking-[0.2em] text-orange uppercase mb-2">
            Guides & Conseils
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Tout savoir pour bien acheter vos matériaux
          </h1>
          <p className="text-steel max-w-xl">
            Guides pratiques, comparatifs et conseils pour vos projets de construction
            et rénovation sur la Côte d&apos;Azur.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="bg-white rounded-2xl border border-cream-dark/20 overflow-hidden hover:shadow-lg hover:border-orange/20 transition-all group"
            >
              <div className="h-2 bg-orange/80 group-hover:bg-orange transition-colors" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-[var(--font-display)] text-[10px] tracking-wider text-orange uppercase bg-orange/5 px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                  <span className="text-xs text-steel">{guide.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-navy mb-2 group-hover:text-orange transition-colors line-clamp-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-steel line-clamp-3">{guide.excerpt}</p>
                <p className="text-xs text-steel/50 mt-4">{guide.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
