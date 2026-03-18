"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterSidebarProps {
  categories: { slug: string; name: string; product_count: number }[];
  brands: string[];
  stores: { chain: string; name: string }[];
}

export function FilterSidebar({ categories, brands, stores }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentStore = searchParams.get("store") || "";
  const currentMinPrice = searchParams.get("min_price") || "";
  const currentMaxPrice = searchParams.get("max_price") || "";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // Reset pagination
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const chainLabels: Record<string, string> = {
    leroy_merlin: "Leroy Merlin",
    castorama: "Castorama",
    brico_depot: "Brico Dépôt",
    bricorama: "Bricorama",
    bricomarche: "Bricomarché",
    wurth: "Würth",
    tollens: "Tollens",
    point_p: "Point P",
    loxam: "Loxam",
    kiloutou: "Kiloutou",
  };

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-4">
        <h3 className="font-semibold text-navy text-sm mb-3">Catégorie</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter("category", "")}
            className={`block w-full text-left text-sm px-2 py-1 rounded ${
              !currentCategory ? "text-orange font-medium bg-orange/5" : "text-steel hover:text-navy"
            }`}
          >
            Toutes les catégories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                currentCategory === cat.slug
                  ? "text-orange font-medium bg-orange/5"
                  : "text-steel hover:text-navy"
              }`}
            >
              {cat.name}
              {cat.product_count > 0 && (
                <span className="text-xs text-steel/50 ml-1">({cat.product_count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-4">
        <h3 className="font-semibold text-navy text-sm mb-3">Prix</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentMinPrice}
            onChange={(e) => updateFilter("min_price", e.target.value)}
            className="w-full border border-cream-dark/40 rounded-lg px-2 py-1.5 text-sm text-navy outline-none focus:border-orange/50"
          />
          <span className="text-steel self-center">-</span>
          <input
            type="number"
            placeholder="Max"
            value={currentMaxPrice}
            onChange={(e) => updateFilter("max_price", e.target.value)}
            className="w-full border border-cream-dark/40 rounded-lg px-2 py-1.5 text-sm text-navy outline-none focus:border-orange/50"
          />
        </div>
      </div>

      {/* Stores */}
      {stores.length > 0 && (
        <div className="bg-white rounded-xl border border-cream-dark/30 p-4">
          <h3 className="font-semibold text-navy text-sm mb-3">Enseigne</h3>
          <div className="space-y-1.5">
            <button
              onClick={() => updateFilter("store", "")}
              className={`block w-full text-left text-sm px-2 py-1 rounded ${
                !currentStore ? "text-orange font-medium bg-orange/5" : "text-steel hover:text-navy"
              }`}
            >
              Toutes
            </button>
            {stores.map((s) => (
              <button
                key={s.chain}
                onClick={() => updateFilter("store", s.chain)}
                className={`block w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                  currentStore === s.chain
                    ? "text-orange font-medium bg-orange/5"
                    : "text-steel hover:text-navy"
                }`}
              >
                {chainLabels[s.chain] || s.chain}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div className="bg-white rounded-xl border border-cream-dark/30 p-4">
          <h3 className="font-semibold text-navy text-sm mb-3">Marque</h3>
          <div className="space-y-1.5">
            <button
              onClick={() => updateFilter("brand", "")}
              className={`block w-full text-left text-sm px-2 py-1 rounded ${
                !currentBrand ? "text-orange font-medium bg-orange/5" : "text-steel hover:text-navy"
              }`}
            >
              Toutes
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => updateFilter("brand", brand)}
                className={`block w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                  currentBrand === brand
                    ? "text-orange font-medium bg-orange/5"
                    : "text-steel hover:text-navy"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
