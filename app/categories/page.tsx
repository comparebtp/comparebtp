"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRightIcon } from "@/app/icons";

interface Category {
  id: number;
  name: string;
  slug: string;
  product_count: number;
  children: Category[];
}

const CATEGORY_ICONS: Record<string, string> = {
  "gros-oeuvre": "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0-.75 3.75m0 0-.75 3.75M17.25 7.5l-.75 3.75m0 0-.75 3.75",
  "second-oeuvre": "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  "plomberie": "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  "electricite": "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  "outillage": "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085",
  "peinture": "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
  "quincaillerie": "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-[var(--font-display)] text-xs tracking-[0.2em] text-orange uppercase mb-3">
              Parcourir
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy">
              Toutes les catégories
            </h1>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-xl border border-cream-dark/30 overflow-hidden hover:shadow-lg hover:shadow-navy/5 transition-all"
                >
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-4 p-6 border-b border-cream-dark/15 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={CATEGORY_ICONS[cat.slug] || "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"}
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-navy group-hover:text-orange transition-colors">
                        {cat.name}
                      </h2>
                      <span className="text-sm text-steel">
                        {cat.product_count} produit{cat.product_count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-cream-dark group-hover:text-orange transition-colors" />
                  </Link>

                  {cat.children.length > 0 && (
                    <div className="px-6 py-3 space-y-1">
                      {cat.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/categories/${child.slug}`}
                          className="flex items-center justify-between py-1.5 text-sm text-steel hover:text-orange transition-colors"
                        >
                          <span>{child.name}</span>
                          <span className="text-xs text-steel/50">
                            {child.product_count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
