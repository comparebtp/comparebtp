import Link from "next/link";
import Image from "next/image";
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
    excerpt: "Guide complet pour choisir entre perceuse filaire, sans fil, à percussion. Comparatif Bosch, Makita, DeWalt, Milwaukee.",
    category: "Outillage",
    readTime: "8 min",
    date: "15 mars 2026",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=500&fit=crop",
    icon: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085",
    featured: true,
  },
  {
    slug: "prix-materiaux-construction-cote-azur",
    title: "Prix des matériaux de construction sur la Côte d'Azur en 2026",
    excerpt: "Tour d'horizon des prix du ciment, parpaings, béton, bois de charpente dans les enseignes BTP du 06 et 83.",
    category: "Gros Oeuvre",
    readTime: "12 min",
    date: "14 mars 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0-.75 3.75m0 0-.75 3.75M17.25 7.5l-.75 3.75m0 0-.75 3.75",
    featured: true,
  },
  {
    slug: "guide-peinture-interieure",
    title: "Quelle peinture intérieure choisir ? Guide comparatif",
    excerpt: "Mat, satin, brillant ? Acrylique ou glycéro ? Tollens, Zolpan, V33 ? On compare les marques et les prix.",
    category: "Peinture",
    readTime: "10 min",
    date: "12 mars 2026",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=500&fit=crop",
    icon: "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
  },
  {
    slug: "renovation-salle-de-bain-budget",
    title: "Rénover sa salle de bain : budget et matériaux",
    excerpt: "Estimation du budget pour une rénovation complète. Comparaison des prix carrelage, robinetterie, sanitaire.",
    category: "Plomberie",
    readTime: "15 min",
    date: "10 mars 2026",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=500&fit=crop",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    slug: "meilleurs-magasins-btp-nice",
    title: "Les meilleurs magasins BTP à Nice et environs",
    excerpt: "Leroy Merlin, Castorama, Brico Dépôt, Point P... Où acheter vos matériaux à Nice ? Comparatif par spécialité.",
    category: "Guide local",
    readTime: "7 min",
    date: "8 mars 2026",
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&h=500&fit=crop",
    icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  },
  {
    slug: "isoler-maison-cote-azur",
    title: "Isoler sa maison sur la Côte d'Azur : matériaux et prix",
    excerpt: "Laine de verre, laine de roche, polystyrène, isolants biosourcés. Quel isolant choisir en région PACA ?",
    category: "Isolation",
    readTime: "11 min",
    date: "6 mars 2026",
    image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800&h=500&fit=crop",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
  {
    slug: "comparatif-visserie-fixation",
    title: "Visserie et fixation : comparatif des enseignes",
    excerpt: "Vis, chevilles, boulons, rivets. Où acheter sa visserie au meilleur prix ? Würth, Brico Dépôt, Leroy Merlin.",
    category: "Quincaillerie",
    readTime: "6 min",
    date: "4 mars 2026",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=500&fit=crop",
    icon: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z",
  },
  {
    slug: "outillage-electroportatif-pro",
    title: "Outillage électroportatif : guide d'achat pro",
    excerpt: "Meuleuse, scie circulaire, perforateur, ponceuse. Les gammes pro vs grand public, et les meilleurs prix.",
    category: "Outillage",
    readTime: "9 min",
    date: "2 mars 2026",
    image: "https://images.unsplash.com/photo-1530124566582-a45a7c0be13a?w=800&h=500&fit=crop",
    icon: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  },
  {
    slug: "carrelage-sol-mur-guide",
    title: "Choisir son carrelage sol et mur : guide complet",
    excerpt: "Grès cérame, faïence, travertin, imitation bois. Comparaison des prix entre Leroy Merlin, Castorama et spécialistes.",
    category: "Carrelage",
    readTime: "10 min",
    date: "28 février 2026",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop",
    icon: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Z",
  },
  {
    slug: "electricite-maison-normes-prix",
    title: "Installation électrique : normes NF C 15-100 et prix",
    excerpt: "Tableau électrique, disjoncteurs, câbles, prises. Tour d'horizon des prix chez Rexel, Legrand, Leroy Merlin.",
    category: "Électricité",
    readTime: "13 min",
    date: "25 février 2026",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=500&fit=crop",
    icon: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  },
  {
    slug: "acheter-materiaux-italie-frontiere",
    title: "Acheter ses matériaux en Italie depuis Nice : ça vaut le coup ?",
    excerpt: "Ventimiglia, Sanremo, Imperia. Quels magasins, quels prix, quelles économies en traversant la frontière ?",
    category: "Guide local",
    readTime: "8 min",
    date: "22 février 2026",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=500&fit=crop",
    icon: "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z",
  },
  {
    slug: "economiser-travaux-renovation",
    title: "10 astuces pour économiser sur vos travaux de rénovation",
    excerpt: "Comparer les prix, acheter au bon moment, profiter des promos, optimiser ses trajets entre magasins.",
    category: "Conseils",
    readTime: "5 min",
    date: "20 février 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    icon: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z",
  },
];

const featured = GUIDES.filter((g) => g.featured);
const regular = GUIDES.filter((g) => !g.featured);
const categories = [...new Set(GUIDES.map((g) => g.category))];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-20 pb-16">
        {/* Hero */}
        <div className="relative overflow-hidden bg-navy py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <span className="font-[var(--font-display)] text-xs tracking-[0.2em] text-orange uppercase">
                Guides & Conseils
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Tout savoir pour bien acheter<br className="hidden md:block" /> vos matériaux
            </h1>
            <p className="text-steel text-lg max-w-xl">
              Guides pratiques, comparatifs et conseils pour vos projets de construction
              et rénovation sur la Côte d&apos;Azur.
            </p>
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-default"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured articles - large cards */}
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-navy/10 hover:shadow-xl hover:shadow-navy/15 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange text-white shadow-lg">
                      {guide.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-snug drop-shadow-lg">
                      {guide.title}
                    </h2>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <p className="text-steel text-sm leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-steel/60">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {guide.readTime}
                      </span>
                      <span>{guide.date}</span>
                    </div>
                    <span className="text-orange font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All guides grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-cream-dark/30" />
            <h2 className="text-lg font-bold text-navy px-4">Tous les guides</h2>
            <div className="h-px flex-1 bg-cream-dark/30" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-cream-dark/20 hover:shadow-lg hover:shadow-navy/5 hover:border-orange/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-navy backdrop-blur-sm">
                      {guide.category}
                    </span>
                  </div>
                  {/* Icon overlay */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={guide.icon} />
                    </svg>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h2 className="text-base font-bold text-navy mb-2 group-hover:text-orange transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-steel line-clamp-2 mb-4 leading-relaxed">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-cream-dark/15">
                    <div className="flex items-center gap-3 text-[11px] text-steel/50">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {guide.readTime}
                      </span>
                      <span>{guide.date}</span>
                    </div>
                    <span className="text-orange text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="relative bg-navy rounded-3xl overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E\")",
              }} />
            </div>
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Comparez les prix maintenant
                </h2>
                <p className="text-steel max-w-lg">
                  Trouvez le meilleur prix pour vos matériaux parmi 3 000+ produits
                  et 244 magasins sur la Côte d&apos;Azur.
                </p>
              </div>
              <Link
                href="/recherche"
                className="flex-shrink-0 bg-orange hover:bg-orange/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/30"
              >
                Rechercher un produit
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
