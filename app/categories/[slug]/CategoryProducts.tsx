"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { ChevronRightIcon } from "@/app/icons";

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
}

export function CategoryProducts({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${slug}&page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        // Get category name from first product or from slug
        if (data.products?.length > 0 && data.products[0].category_name) {
          setCategoryName(data.products[0].category_name);
        } else {
          setCategoryName(slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, page]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-steel py-4">
        <Link href="/" className="hover:text-orange transition-colors">Accueil</Link>
        <ChevronRightIcon className="w-3 h-3" />
        <Link href="/categories" className="hover:text-orange transition-colors">Catégories</Link>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-navy font-medium">{categoryName}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">{categoryName}</h1>
        <p className="text-steel text-sm">
          {total} produit{total !== 1 ? "s" : ""} dans cette catégorie
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-cream-dark/30 h-64 animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
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
            currentPage={page}
            totalPages={totalPages}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-lg font-semibold text-navy mb-2">Aucun produit</h2>
          <p className="text-steel text-sm">
            Cette catégorie ne contient pas encore de produits.
          </p>
        </div>
      )}
    </div>
  );
}
