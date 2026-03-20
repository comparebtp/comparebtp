"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PriceTable } from "@/components/PriceTable";
import { PriceChart } from "@/components/PriceChart";
import { ChevronRightIcon } from "@/app/icons";

interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  brand: string | null;
  ean: string | null;
  manufacturer: string | null;
  manufacturer_ref: string | null;
  image_url: string | null;
  min_price: number | null;
  max_price: number | null;
  listing_count: number;
  category_name: string | null;
  category_slug: string | null;
  parent_category_name: string | null;
  parent_category_slug: string | null;
  description: string | null;
  volume: string | null;
  color: string | null;
  weight: string | null;
  dimensions: string | null;
  pack_size: string | null;
  finish: string | null;
  specifications: string | null;
}

interface Listing {
  id: number;
  current_price: number;
  old_price: number | null;
  unit_price: number | null;
  unit_label: string | null;
  in_stock: boolean;
  store_product_url: string | null;
  image_url: string | null;
  store_name: string;
  store_chain: string;
  store_city: string;
  store_lat: number;
  store_lng: number;
  store_id: number;
}

interface PriceHistoryEntry {
  price: number;
  scraped_at: string;
  store_chain: string;
  store_name: string;
}

export function ProductClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProduct(data.product);
        setListings(data.listings || []);
        setPriceHistory(data.priceHistory || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-24 pb-12 max-w-7xl mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-cream-dark/40 rounded w-1/3" />
            <div className="bg-white rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 h-64 bg-cream-dark/20 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-cream-dark/30 rounded w-1/4" />
                  <div className="h-8 bg-cream-dark/30 rounded w-3/4" />
                  <div className="h-6 bg-cream-dark/20 rounded w-1/2" />
                  <div className="h-12 bg-cream-dark/20 rounded w-1/3 mt-4" />
                </div>
              </div>
            </div>
            <div className="h-48 bg-white rounded-xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-24 pb-12 max-w-5xl mx-auto px-6 text-center py-32">
          <div className="bg-white rounded-2xl border border-cream-dark/30 p-12 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-steel/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-navy mb-2">Produit introuvable</h1>
            <p className="text-steel mb-6">Ce produit n&apos;existe pas ou a été retiré de notre catalogue.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/recherche" className="bg-orange hover:bg-orange-hot text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm">
                Rechercher
              </Link>
              <Link href="/categories" className="bg-cream hover:bg-cream-dark text-navy px-5 py-2.5 rounded-lg font-medium transition-colors text-sm">
                Catégories
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (p: number | string) => Number(p).toFixed(2).replace(".", ",");
  const minP = Number(product.min_price);
  const maxP = Number(product.max_price);
  const savings = minP && maxP && maxP > minP ? Math.round(((maxP - minP) / maxP) * 100) : null;

  // Get the best image from product or first listing
  const productImage = product.image_url || listings.find((l) => l.image_url)?.image_url;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-steel py-4 flex-wrap" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-orange transition-colors">Accueil</Link>
            <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
            {product.parent_category_name && product.parent_category_slug && (
              <>
                <Link href={`/categories/${product.parent_category_slug}`} className="hover:text-orange transition-colors">
                  {product.parent_category_name}
                </Link>
                <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
              </>
            )}
            {product.category_name && product.category_slug && (
              <>
                <Link href={`/categories/${product.category_slug}`} className="hover:text-orange transition-colors">
                  {product.category_name}
                </Link>
                <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
              </>
            )}
            <span className="text-navy font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* Product header */}
          <div className="bg-white rounded-xl border border-cream-dark/30 overflow-hidden mb-6">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-80 h-64 md:h-auto bg-cream/30 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-cream-dark/20">
                {productImage ? (
                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 320px"
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-navy/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-steel/20" fill="none" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                )}
                {savings && savings >= 5 && (
                  <div className="absolute top-4 right-4 bg-green-deal text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    -{savings}%
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {product.category_name && (
                    <Link
                      href={`/categories/${product.category_slug}`}
                      className="text-[10px] font-[var(--font-display)] tracking-wider text-steel uppercase hover:text-orange transition-colors"
                    >
                      {product.category_name}
                    </Link>
                  )}
                  {product.brand && (
                    <span className="text-xs text-orange font-medium bg-orange/5 px-2 py-0.5 rounded">
                      {product.brand}
                    </span>
                  )}
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-navy mb-4 leading-snug">
                  {product.name}
                </h1>

                {/* Price summary */}
                <div className="flex items-end gap-4 mb-5">
                  {product.min_price != null && (
                    <div>
                      <span className="text-xs text-steel block mb-1">
                        {product.listing_count > 1 ? "Meilleur prix" : "Prix"}
                      </span>
                      <div className="font-[var(--font-display)] text-3xl font-bold text-green-deal">
                        {formatPrice(product.min_price)} €
                      </div>
                    </div>
                  )}
                  {product.max_price != null && minP !== maxP && (
                    <div className="mb-1">
                      <span className="text-xs text-steel block mb-1">Prix max</span>
                      <div className="font-[var(--font-display)] text-lg text-steel line-through">
                        {formatPrice(product.max_price)} €
                      </div>
                    </div>
                  )}
                  {savings && savings > 0 && (
                    <div className="bg-orange/5 border border-orange/10 rounded-lg px-3 py-2 mb-1">
                      <span className="font-[var(--font-display)] text-sm font-bold text-orange">
                        Économisez jusqu&apos;à {savings}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-deal" />
                  <span className="text-sm text-navy">
                    Disponible dans {product.listing_count} enseigne{product.listing_count > 1 ? "s" : ""}
                  </span>
                </div>

                {product.description && (
                  <p className="text-sm text-steel leading-relaxed border-t border-cream-dark/20 pt-4 mt-4">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Specs card */}
          {(product.ean || product.manufacturer_ref || product.brand || product.manufacturer || product.volume || product.color || product.dimensions || product.weight || product.pack_size || product.finish) && (
            <div className="bg-white rounded-xl border border-cream-dark/30 p-6 mb-6">
              <h2 className="text-lg font-bold text-navy mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.brand && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Marque</span>
                    <span className="text-sm font-medium text-navy">{product.brand}</span>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Couleur</span>
                    <span className="text-sm font-medium text-navy capitalize">{product.color}</span>
                  </div>
                )}
                {product.volume && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Contenance</span>
                    <span className="text-sm font-medium text-navy">{product.volume}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Dimensions</span>
                    <span className="text-sm font-medium text-navy">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Poids</span>
                    <span className="text-sm font-medium text-navy">{product.weight}</span>
                  </div>
                )}
                {product.finish && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Finition</span>
                    <span className="text-sm font-medium text-navy capitalize">{product.finish}</span>
                  </div>
                )}
                {product.pack_size && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Conditionnement</span>
                    <span className="text-sm font-medium text-navy">{product.pack_size}</span>
                  </div>
                )}
                {product.manufacturer && product.manufacturer !== product.brand && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Fabricant</span>
                    <span className="text-sm font-medium text-navy">{product.manufacturer}</span>
                  </div>
                )}
                {product.ean && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Code EAN</span>
                    <span className="text-sm font-mono text-navy">{product.ean}</span>
                  </div>
                )}
                {product.manufacturer_ref && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Référence</span>
                    <span className="text-sm font-mono text-navy">{product.manufacturer_ref}</span>
                  </div>
                )}
                {product.category_name && (
                  <div>
                    <span className="text-xs text-steel block mb-0.5">Catégorie</span>
                    <span className="text-sm font-medium text-navy">{product.category_name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price table & chart */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                Comparer les prix
              </h2>
              <PriceTable
                listings={listings}
                productId={product.id}
                productName={product.name}
                productSlug={product.slug}
              />
            </div>

            {priceHistory.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Historique des prix
                </h2>
                <PriceChart data={priceHistory} />
              </div>
            )}
          </div>

          {/* Back to search */}
          <div className="mt-8 flex gap-3">
            <Link
              href="/recherche"
              className="text-sm text-steel hover:text-orange transition-colors flex items-center gap-1"
            >
              ← Retour à la recherche
            </Link>
            {product.category_slug && (
              <Link
                href={`/categories/${product.category_slug}`}
                className="text-sm text-steel hover:text-orange transition-colors flex items-center gap-1"
              >
                Voir {product.category_name}
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
