"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Pagination } from "@/components/Pagination";
import { MagnifyingGlassIcon } from "@/app/icons";
import { SearchBar } from "@/components/SearchBar";

interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string | null;
  image_url: string | null;
  min_price: number | null;
  max_price: number | null;
  listing_count: number;
  category_name: string | null;
  category_slug: string | null;
}

interface ApiResponse {
  products: Product[];
  total: number;
  page?: number;
  totalPages?: number;
  query?: string;
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const store = searchParams.get("store") || "";
  const brand = searchParams.get("brand") || "";
  const minPrice = searchParams.get("min_price") || "";
  const maxPrice = searchParams.get("max_price") || "";
  const sort = searchParams.get("sort") || "popular";
  const page = parseInt(searchParams.get("page") || "1");

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ slug: string; name: string; product_count: number }[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [stores, setStores] = useState<{ chain: string; name: string }[]>([]);

  // Fetch filters data
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        const cats: { slug: string; name: string; product_count: number }[] = [];
        for (const root of d.categories || []) {
          cats.push({ slug: root.slug, name: root.name, product_count: root.product_count });
          for (const child of root.children || []) {
            cats.push({ slug: child.slug, name: `  ${child.name}`, product_count: child.product_count });
          }
        }
        setCategories(cats);
      })
      .catch(() => {});
    fetch("/api/stores")
      .then((r) => r.json())
      .then((d) => {
        const chainSet = new Map<string, string>();
        for (const s of d.stores || []) {
          if (!chainSet.has(s.chain)) chainSet.set(s.chain, s.name);
        }
        setStores(Array.from(chainSet.entries()).map(([chain, name]) => ({ chain, name })));
      })
      .catch(() => {});
  }, []);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) {
      // Use search endpoint
      params.set("q", q);
      params.set("limit", "24");
      params.set("offset", ((page - 1) * 24).toString());
      fetch(`/api/search?${params}`)
        .then((r) => r.json())
        .then((d) => {
          setData({
            products: d.products || [],
            total: d.total || 0,
            page,
            totalPages: Math.ceil((d.total || 0) / 24),
          });
          // Extract brands from results
          const b = new Set<string>();
          for (const p of d.products || []) {
            if (p.brand) b.add(p.brand);
          }
          setBrands(Array.from(b).sort());
        })
        .catch(() => setData({ products: [], total: 0 }))
        .finally(() => setLoading(false));
    } else {
      // Use products endpoint with filters
      if (category) params.set("category", category);
      if (store) params.set("store", store);
      if (brand) params.set("brand", brand);
      if (minPrice) params.set("min_price", minPrice);
      if (maxPrice) params.set("max_price", maxPrice);
      if (sort) params.set("sort", sort);
      params.set("page", page.toString());
      fetch(`/api/products?${params}`)
        .then((r) => r.json())
        .then((d) => {
          setData(d);
          const b = new Set<string>();
          for (const p of d.products || []) {
            if (p.brand) b.add(p.brand);
          }
          setBrands(Array.from(b).sort());
        })
        .catch(() => setData({ products: [], total: 0 }))
        .finally(() => setLoading(false));
    }
  }, [q, category, store, brand, minPrice, maxPrice, sort, page]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Search header */}
      {q && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MagnifyingGlassIcon className="w-6 h-6 text-orange" />
            <h1 className="text-2xl font-bold text-navy">
              Résultats pour &laquo; {q} &raquo;
            </h1>
          </div>
          {data && (
            <p className="text-steel text-sm">
              {data.total} produit{data.total !== 1 ? "s" : ""} trouvé{data.total !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {!q && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy mb-4">Tous les produits</h1>
          <div className="max-w-xl">
            <SearchBar />
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar categories={categories} brands={brands} stores={stores} />
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-steel">Trier par :</label>
              <select
                value={sort}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("sort", e.target.value);
                  params.delete("page");
                  window.history.pushState(null, "", `?${params.toString()}`);
                  window.location.reload();
                }}
                className="text-sm border border-cream-dark/40 rounded-lg px-2 py-1 text-navy outline-none"
              >
                <option value="popular">Populaire</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>
            {data && (
              <span className="text-sm text-steel">
                {data.total} produit{data.total !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-cream-dark/30 h-64 animate-pulse" />
              ))}
            </div>
          ) : data && data.products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {data.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    slug={product.slug}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    minPrice={product.min_price}
                    maxPrice={product.max_price}
                    listingCount={product.listing_count}
                    categoryName={product.category_name}
                  />
                ))}
              </div>
              <Pagination
                currentPage={data.page || page}
                totalPages={data.totalPages || 1}
              />
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-cream-dark/20 px-6">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-steel/30" />
              </div>
              <h2 className="text-lg font-semibold text-navy mb-2">Aucun résultat</h2>
              <p className="text-steel text-sm mb-6 max-w-sm mx-auto">
                Aucun produit ne correspond à votre recherche. Essayez avec d&apos;autres mots-clés ou modifiez les filtres.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Perceuse", "Ciment", "Peinture", "Tournevis", "Vis", "Parquet"].map((s) => (
                  <a
                    key={s}
                    href={`/recherche?q=${encodeURIComponent(s)}`}
                    className="text-xs bg-cream hover:bg-orange/10 text-navy hover:text-orange px-3 py-1.5 rounded-full transition-colors border border-cream-dark/30"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
