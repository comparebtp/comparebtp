import Link from "next/link";

interface ProductCardProps {
  name: string;
  slug: string;
  brand?: string | null;
  imageUrl?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  listingCount?: number;
  categoryName?: string | null;
}

export function ProductCard({
  name,
  slug,
  brand,
  minPrice,
  maxPrice,
  listingCount = 0,
  categoryName,
}: ProductCardProps) {
  const formatPrice = (p: number | string) => Number(p).toFixed(2).replace(".", ",");
  const hasPriceRange = minPrice != null && maxPrice != null && Number(minPrice) !== Number(maxPrice);

  return (
    <Link
      href={`/produit/${slug}`}
      className="bg-white rounded-xl border border-cream-dark/30 overflow-hidden hover:shadow-lg hover:shadow-navy/5 hover:border-orange/20 transition-all group block"
    >
      {/* Image placeholder */}
      <div className="bg-cream/50 h-32 flex items-center justify-center border-b border-cream-dark/20">
        <div className="w-16 h-16 rounded-lg bg-navy/5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-steel/40" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
      </div>

      <div className="p-4">
        {/* Category & brand */}
        <div className="flex items-center gap-2 mb-1.5">
          {categoryName && (
            <span className="text-[10px] font-[var(--font-display)] tracking-wider text-steel uppercase">
              {categoryName}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-orange transition-colors mb-2">
          {name}
        </h3>

        {/* Brand */}
        {brand && (
          <span className="text-xs text-orange font-medium">{brand}</span>
        )}

        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          {minPrice != null ? (
            <div>
              <span className="font-[var(--font-display)] text-lg font-bold text-navy">
                {formatPrice(minPrice)} €
              </span>
              {hasPriceRange && (
                <span className="text-xs text-steel ml-1">
                  à {formatPrice(maxPrice!)} €
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-steel">Prix non disponible</span>
          )}

          {listingCount > 0 && (
            <span className="text-[10px] text-steel bg-cream rounded-full px-2 py-0.5">
              {listingCount} magasin{listingCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
