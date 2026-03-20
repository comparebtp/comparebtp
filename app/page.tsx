import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ArrowsRightLeftIcon,
  ShoppingCartIcon,
  MapIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "./icons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { query } from "@/lib/db";
import { LogoCarousel } from "@/components/LogoCarousel";

// ─── ICON COMPONENTS (inline SVGs for product images) ────
function DrillIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <rect x="8" y="20" width="32" height="24" rx="3" fill="#0B1D3A" opacity="0.9" />
      <rect x="40" y="28" width="18" height="8" rx="1" fill="#FF6B1A" />
      <circle cx="20" cy="32" r="6" fill="#FF6B1A" opacity="0.3" />
      <rect x="12" y="26" width="4" height="12" rx="1" fill="#FF8F4F" />
      <rect x="55" y="30" width="6" height="4" rx="0.5" fill="#8B9DAF" />
    </svg>
  );
}
function CementIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M14 18h36l-4 40H18L14 18z" fill="#8B9DAF" opacity="0.8" />
      <rect x="18" y="10" width="28" height="12" rx="2" fill="#0B1D3A" opacity="0.7" />
      <text x="32" y="42" textAnchor="middle" fill="#0B1D3A" fontSize="7" fontWeight="700" fontFamily="monospace">35 KG</text>
      <rect x="22" y="26" width="20" height="2" rx="1" fill="#0B1D3A" opacity="0.2" />
    </svg>
  );
}
function ScrewsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${14 + i * 14}, ${20 + i * 4})`}>
          <circle cx="4" cy="4" r="4" fill="#8B9DAF" />
          <rect x="8" y="2" width="20" height="4" rx="1" fill="#0B1D3A" opacity="0.6" />
          <line x1="2" y1="4" x2="6" y2="4" stroke="#0B1D3A" strokeWidth="0.8" opacity="0.4" />
          <line x1="4" y1="2" x2="4" y2="6" stroke="#0B1D3A" strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

const productIcons: Record<string, () => React.ReactElement> = {
  drill: DrillIcon,
  cement: CementIcon,
  screws: ScrewsIcon,
};

// Mock comparisons for the landing page (will show real data later when we have multi-store products)
const COMPARISONS = [
  {
    name: "Perceuse-visseuse sans fil 18V BOSCH Professional GSR 18V-55",
    category: "Outillage électroportatif",
    image: "drill",
    prices: [
      { store: "Brico Dépôt", price: 129.0, best: true },
      { store: "Leroy Merlin", price: 149.0, best: false },
      { store: "Castorama", price: 154.9, best: false },
      { store: "ManoMano", price: 139.5, best: false },
    ],
  },
  {
    name: "Sac ciment gris CEM II 32.5 — 35 kg",
    category: "Gros Oeuvre",
    image: "cement",
    prices: [
      { store: "Point P", price: 6.9, best: true },
      { store: "Brico Dépôt", price: 7.5, best: false },
      { store: "Leroy Merlin", price: 8.2, best: false },
      { store: "Castorama", price: 8.9, best: false },
    ],
  },
  {
    name: "Lot 200 vis à bois TX 4×40 mm inox A2",
    category: "Visserie & Fixation",
    image: "screws",
    prices: [
      { store: "Würth", price: 18.9, best: true },
      { store: "Leroy Merlin", price: 24.5, best: false },
      { store: "Brico Dépôt", price: 21.0, best: false },
      { store: "ManoMano", price: 22.3, best: false },
    ],
  },
];

const STORES = [
  { name: "Leroy Merlin", short: "LM" },
  { name: "Castorama", short: "CASTO" },
  { name: "Brico Dépôt", short: "BD" },
  { name: "Würth", short: "WÜRTH" },
  { name: "Bricorama", short: "BRICO" },
  { name: "Point P", short: "PP" },
];

// Force revalidation every hour
export const revalidate = 3600;

interface RealComparison {
  name: string;
  slug: string;
  category: string;
  image_url: string | null;
  prices: { store: string; price: number; best: boolean }[];
  saving: number;
}

async function getStats() {
  try {
    const [productCount, storeCount, listingCount] = await Promise.all([
      query<{ count: string }>("SELECT COUNT(*) as count FROM products WHERE listing_count > 0"),
      query<{ count: string }>("SELECT COUNT(DISTINCT chain) as count FROM stores"),
      query<{ count: string }>("SELECT COUNT(*) as count FROM store_listings"),
    ]);
    return {
      products: parseInt(productCount[0]?.count || "0"),
      stores: parseInt(storeCount[0]?.count || "0"),
      listings: parseInt(listingCount[0]?.count || "0"),
    };
  } catch {
    return { products: 0, stores: 0, listings: 0 };
  }
}

async function getRealComparisons(): Promise<RealComparison[]> {
  try {
    // Get products that are in multiple stores with the biggest price difference
    const products = await query<{
      id: number; name: string; slug: string; image_url: string | null;
      min_price: number; max_price: number; listing_count: number;
      category_name: string;
    }>(`
      SELECT p.id, p.name, p.slug, p.image_url, p.min_price, p.max_price, p.listing_count,
             COALESCE(c.name, 'Divers') as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.listing_count >= 2
        AND p.min_price IS NOT NULL
        AND p.max_price IS NOT NULL
        AND p.max_price > p.min_price
        AND p.image_url IS NOT NULL
      ORDER BY (p.max_price - p.min_price) / p.max_price DESC
      LIMIT 6
    `);

    const comparisons: RealComparison[] = [];
    for (const product of products.slice(0, 3)) {
      const listings = await query<{
        current_price: number; store_name: string; store_chain: string;
      }>(`
        SELECT sl.current_price, s.name as store_name, s.chain as store_chain
        FROM store_listings sl
        JOIN stores s ON sl.store_id = s.id
        WHERE sl.product_id = $1
        ORDER BY sl.current_price ASC
        LIMIT 4
      `, [product.id]);

      if (listings.length >= 2) {
        const minPrice = Math.min(...listings.map(l => Number(l.current_price)));
        const maxPrice = Math.max(...listings.map(l => Number(l.current_price)));
        const saving = Math.round(((maxPrice - minPrice) / maxPrice) * 100);

        comparisons.push({
          name: product.name,
          slug: product.slug,
          category: product.category_name,
          image_url: product.image_url,
          prices: listings.map(l => ({
            store: l.store_chain.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            price: Number(l.current_price),
            best: Number(l.current_price) === minPrice,
          })),
          saving,
        });
      }
    }
    return comparisons;
  } catch {
    return [];
  }
}

export default async function Home() {
  const [stats, realComparisons] = await Promise.all([getStats(), getRealComparisons()]);

  const STATS = [
    { value: stats.products > 0 ? `${stats.products.toLocaleString("fr-FR")}` : "2 500+", label: "Produits comparés" },
    { value: stats.stores > 0 ? `${stats.stores}` : "6", label: "Enseignes partenaires" },
    { value: "25%", label: "D'économie moyenne" },
    { value: "06 / 83", label: "Départements couverts" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="absolute inset-0 noise-overlay" />
        <div
          className="absolute -right-20 top-0 w-96 h-full bg-orange/5 -skew-x-12"
          style={{ zIndex: 1 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-40">
          <div className="max-w-3xl">
            <div
              className="animate-fade-up inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-8"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="text-orange text-sm font-medium font-[var(--font-display)]">
                CÔTE D&apos;AZUR &bull; PACA
              </span>
            </div>

            <h1
              className="animate-fade-up text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ animationDelay: "0.2s" }}
            >
              Comparez les prix
              <br />
              <span className="text-orange">matériaux &amp; outillage</span>
              <br />
              de toutes les enseignes
            </h1>

            <p
              className="animate-fade-up text-steel text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              style={{ animationDelay: "0.35s" }}
            >
              Trouvez le meilleur prix pour vos matériaux de construction entre
              Leroy Merlin, Castorama, Brico Dépôt, Würth et plus.
              Optimisez votre trajet entre les magasins.
            </p>

            {/* SEARCH BAR */}
            <div
              className="animate-fade-up animate-pulse-glow"
              style={{ animationDelay: "0.5s" }}
            >
              <SearchBar />
              <div className="flex gap-3 mt-4 flex-wrap">
                {["Perceuse Bosch", "Ciment 35kg", "Tournevis", "Parquet"].map(
                  (tag) => (
                    <Link
                      key={tag}
                      href={`/recherche?q=${encodeURIComponent(tag)}`}
                      className="text-xs text-steel/60 bg-white/5 border border-white/10 rounded-full px-3 py-1 cursor-pointer hover:border-orange/30 hover:text-orange/80 transition-colors"
                    >
                      {tag}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent z-10" />
      </section>

      {/* STATS BAR */}
      <section className="relative z-20 -mt-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-navy/5 border border-cream-dark/50 p-1">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center py-6 px-4 ${
                    i < STATS.length - 1 ? "border-r border-cream-dark/40" : ""
                  }`}
                >
                  <div className="font-[var(--font-display)] text-2xl md:text-3xl font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-sm text-steel mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER STORES */}
      <section id="enseignes" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-[var(--font-display)] text-xs tracking-[0.2em] text-orange uppercase mb-3">
              Enseignes comparées
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Tous les prix, un seul endroit
            </h2>
          </div>
          <LogoCarousel />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="fonctionnement" className="py-20 bg-white relative">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-[var(--font-display)] text-xs tracking-[0.2em] text-orange uppercase mb-3">
              Comment ça marche
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Simple comme 1, 2, 3
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: <MagnifyingGlassIcon className="w-7 h-7" />,
                title: "Recherchez",
                desc: "Tapez le nom du produit, la marque ou la référence. Notre moteur compare instantanément les prix de toutes les enseignes.",
              },
              {
                step: "02",
                icon: <ArrowsRightLeftIcon className="w-7 h-7" />,
                title: "Comparez",
                desc: "Visualisez les prix côte à côte. Ajoutez au panier les produits au meilleur prix, même de différents magasins.",
              },
              {
                step: "03",
                icon: <MapIcon className="w-7 h-7" />,
                title: "Optimisez",
                desc: "Obtenez l'itinéraire optimisé pour récupérer vos achats dans chaque magasin. On vous dit par où commencer.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative group">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 z-20">
                    <ChevronRightIcon className="w-8 h-8 text-cream-dark" />
                  </div>
                )}
                <div className="bg-cream/50 hover:bg-cream rounded-2xl p-8 border border-cream-dark/20 hover:border-orange/20 transition-all hover:shadow-lg hover:shadow-orange/5 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center text-orange">
                      {item.icon}
                    </div>
                    <span className="font-[var(--font-display)] text-4xl font-bold text-cream-dark group-hover:text-orange/20 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-steel leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT COMPARISONS */}
      <section id="comparer" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-[var(--font-display)] text-xs tracking-[0.2em] text-orange uppercase mb-3">
              Exemples de comparaisons
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Voyez la différence
            </h2>
            <p className="text-steel max-w-lg mx-auto">
              Les prix varient considérablement d&apos;une enseigne à l&apos;autre.
              Ne payez plus jamais trop cher.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(realComparisons.length > 0 ? realComparisons : COMPARISONS).map((product) => {
              const isReal = 'slug' in product;
              const prices = product.prices;
              const bestPrice = Math.min(...prices.map((p) => p.price));
              const worstPrice = Math.max(...prices.map((p) => p.price));
              const saving = isReal ? (product as RealComparison).saving : Math.round(((worstPrice - bestPrice) / worstPrice) * 100);
              const imageUrl = isReal ? (product as RealComparison).image_url : null;

              return (
                <Link
                  key={product.name}
                  href={isReal ? `/produit/${(product as RealComparison).slug}` : '/recherche'}
                  className="bg-white rounded-2xl border border-cream-dark/30 overflow-hidden hover:shadow-xl hover:shadow-navy/5 transition-all group block"
                >
                  <div className="bg-navy/[0.03] p-6 border-b border-cream-dark/20">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-cream flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                        {imageUrl ? (
                          <img src={imageUrl} alt={product.name} className="w-14 h-14 object-contain" />
                        ) : !isReal && productIcons[(product as (typeof COMPARISONS)[0]).image] ? (
                          <div className="w-12 h-12">{productIcons[(product as (typeof COMPARISONS)[0]).image]()}</div>
                        ) : (
                          <svg viewBox="0 0 24 24" className="w-8 h-8 text-steel/30" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-[var(--font-display)] text-[10px] tracking-[0.15em] text-orange uppercase">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-semibold text-navy leading-snug mt-0.5 line-clamp-2 group-hover:text-orange transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {prices.map((p, i) => (
                      <div
                        key={p.store}
                        className={`flex items-center justify-between py-3 px-3 rounded-lg ${
                          p.best
                            ? "bg-green-deal/5 border border-green-deal/15"
                            : i < prices.length - 1
                              ? "border-b border-cream-dark/15"
                              : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {p.best && <CheckCircleIcon className="w-4 h-4 text-green-deal flex-shrink-0" />}
                          <span className={`text-sm ${p.best ? "font-semibold text-navy" : "text-steel"}`}>
                            {p.store}
                          </span>
                        </div>
                        <span
                          className={`font-[var(--font-display)] text-base font-bold ${
                            p.best ? "text-green-deal" : "text-navy/60"
                          }`}
                        >
                          {p.price.toFixed(2).replace(".", ",")} €
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 pb-5">
                    <div className="flex items-center justify-between bg-orange/5 rounded-lg px-4 py-2.5">
                      <span className="text-xs text-navy/60">Économie possible</span>
                      <span className="font-[var(--font-display)] text-sm font-bold text-orange">
                        jusqu&apos;à -{saving}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/recherche"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hot text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Comparer tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="absolute inset-0 noise-overlay" />
        <div
          className="absolute -left-20 top-0 w-96 h-full bg-orange/5 skew-x-12"
          style={{ zIndex: 1 }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Arrêtez de payer trop cher
            <br />
            <span className="text-orange">vos matériaux</span>
          </h2>
          <p className="text-steel text-lg mb-10 max-w-xl mx-auto">
            Rejoignez des milliers de professionnels et particuliers qui
            économisent sur leurs achats BTP grâce à BatiPrix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recherche"
              className="bg-orange hover:bg-orange-hot text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors shadow-lg shadow-orange/20 flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Commencer à comparer
            </Link>
            <Link
              href="/categories"
              className="bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors border border-white/10"
            >
              Parcourir les catégories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
