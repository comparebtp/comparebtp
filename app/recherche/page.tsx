import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchResults } from "./SearchResults";
import { query } from "@/lib/db";

export const metadata = {
  title: "Recherche — BatiPrix",
  description: "Recherchez et comparez les prix des matériaux de construction, outillage et fournitures BTP entre toutes les enseignes de la Côte d'Azur.",
};

// SSR: pre-fetch initial products for crawlers
async function getInitialProducts(q?: string) {
  try {
    const searchQuery = q
      ? `SELECT p.id, p.name, p.slug, p.brand, p.image_url, p.min_price, p.max_price, p.listing_count,
                c.name as category_name
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.listing_count > 0
           AND (p.name ILIKE $1 OR p.brand ILIKE $1 OR p.canonical_name ILIKE $1)
         ORDER BY p.listing_count DESC, p.min_price ASC
         LIMIT 24`
      : `SELECT p.id, p.name, p.slug, p.brand, p.image_url, p.min_price, p.max_price, p.listing_count,
                c.name as category_name
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.listing_count > 0
         ORDER BY p.listing_count DESC, p.min_price ASC
         LIMIT 24`;

    const params = q ? [`%${q}%`] : [];
    const products = await query(searchQuery, params);

    const countQuery = q
      ? `SELECT COUNT(*) as count FROM products p WHERE p.listing_count > 0 AND (p.name ILIKE $1 OR p.brand ILIKE $1)`
      : `SELECT COUNT(*) as count FROM products WHERE listing_count > 0`;

    const countResult = await query<{ count: string }>(countQuery, params);
    const total = parseInt(countResult[0]?.count || "0");

    return { products, total };
  } catch {
    return { products: [], total: 0 };
  }
}

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q || "";
  const initialData = await getInitialProducts(q || undefined);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-20 pb-12">
        {/* SSR: hidden product data for crawlers */}
        {initialData.total > 0 && (
          <div className="sr-only" aria-hidden="true">
            <h1>
              {q ? `Résultats pour "${q}" — ${initialData.total} produits` : `${initialData.total} produits BTP à comparer`}
            </h1>
            <ul>
              {initialData.products.map((p: Record<string, unknown>) => (
                <li key={String(p.id)}>
                  <a href={`/produit/${p.slug}`}>
                    {p.image_url ? <img src={String(p.image_url)} alt={String(p.name)} width={120} height={120} /> : null}
                    {String(p.name)} — {p.min_price ? `${Number(p.min_price).toFixed(2)}€` : ""}
                    {p.max_price && Number(p.max_price) !== Number(p.min_price) ? ` à ${Number(p.max_price).toFixed(2)}€` : ""}
                    {p.brand ? ` — ${String(p.brand)}` : ""}
                    {p.category_name ? ` — ${String(p.category_name)}` : ""}
                    {p.listing_count ? ` — ${String(p.listing_count)} magasins` : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-cream-dark/30 h-64 animate-pulse" />
                ))}
              </div>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
