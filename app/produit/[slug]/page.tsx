"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
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

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
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
            <div className="h-8 bg-cream-dark/40 rounded w-1/3" />
            <div className="h-64 bg-white rounded-xl" />
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
        <main className="pt-24 pb-12 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Produit introuvable</h1>
          <p className="text-steel mb-6">Ce produit n&apos;existe pas ou a été retiré.</p>
          <Link href="/recherche" className="text-orange hover:underline">
            Retour à la recherche
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (p: number | string) => Number(p).toFixed(2).replace(".", ",");
  const minP = Number(product.min_price);
  const maxP = Number(product.max_price);
  const savings =
    minP && maxP && maxP > minP
      ? Math.round(((maxP - minP) / maxP) * 100)
      : null;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-steel py-4 flex-wrap">
            <Link href="/" className="hover:text-orange transition-colors">Accueil</Link>
            <ChevronRightIcon className="w-3 h-3" />
            {product.parent_category_name && product.parent_category_slug && (
              <>
                <Link
                  href={`/categories/${product.parent_category_slug}`}
                  className="hover:text-orange transition-colors"
                >
                  {product.parent_category_name}
                </Link>
                <ChevronRightIcon className="w-3 h-3" />
              </>
            )}
            {product.category_name && product.category_slug && (
              <>
                <Link
                  href={`/categories/${product.category_slug}`}
                  className="hover:text-orange transition-colors"
                >
                  {product.category_name}
                </Link>
                <ChevronRightIcon className="w-3 h-3" />
              </>
            )}
            <span className="text-navy font-medium truncate">{product.name}</span>
          </div>

          {/* Product header */}
          <div className="bg-white rounded-xl border border-cream-dark/30 p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image placeholder */}
              <div className="w-full md:w-48 h-48 bg-cream/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-16 h-16 text-steel/30" fill="none" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {product.category_name && (
                    <span className="text-[10px] font-[var(--font-display)] tracking-wider text-steel uppercase">
                      {product.category_name}
                    </span>
                  )}
                  {product.brand && (
                    <span className="text-xs text-orange font-medium bg-orange/5 px-2 py-0.5 rounded">
                      {product.brand}
                    </span>
                  )}
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-navy mb-4">
                  {product.name}
                </h1>

                {/* Price summary */}
                <div className="flex items-end gap-4 mb-4">
                  {product.min_price != null && (
                    <div>
                      <span className="text-sm text-steel">À partir de</span>
                      <div className="font-[var(--font-display)] text-3xl font-bold text-green-deal">
                        {formatPrice(product.min_price)} €
                      </div>
                    </div>
                  )}
                  {savings && savings > 0 && (
                    <div className="bg-orange/5 rounded-lg px-3 py-1.5 mb-1">
                      <span className="font-[var(--font-display)] text-sm font-bold text-orange">
                        Jusqu&apos;à -{savings}% d&apos;écart
                      </span>
                    </div>
                  )}
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-xs text-steel">
                  {product.ean && (
                    <span>EAN : {product.ean}</span>
                  )}
                  {product.manufacturer_ref && (
                    <span>Réf : {product.manufacturer_ref}</span>
                  )}
                  <span>
                    Comparé dans {product.listing_count} magasin
                    {product.listing_count > 1 ? "s" : ""}
                  </span>
                </div>

                {product.description && (
                  <p className="text-sm text-steel mt-4 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price table & chart */}
          <div className="space-y-6">
            <PriceTable
              listings={listings}
              productId={product.id}
              productName={product.name}
              productSlug={product.slug}
            />
            <PriceChart data={priceHistory} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
