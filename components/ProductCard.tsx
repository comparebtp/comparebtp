import Link from "next/link";
import Image from "next/image";

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
  imageUrl,
  minPrice,
  maxPrice,
  listingCount = 0,
  categoryName,
}: ProductCardProps) {
  const formatPrice = (p: number | string) => Number(p).toFixed(2).replace(".", ",");
  const hasPriceRange = minPrice != null && maxPrice != null && Number(minPrice) !== Number(maxPrice);
  const saving = hasPriceRange
    ? Math.round(((Number(maxPrice) - Number(minPrice)) / Number(maxPrice)) * 100)
    : 0;

  return (
    <Link
      href={`/produit/${slug}`}
      className="bg-white rounded-xl border border-cream-dark/30 overflow-hidden hover:shadow-lg hover:shadow-navy/5 hover:border-orange/20 transition-all group block"
    >
      {/* Product image */}
      <div className="bg-cream/30 h-40 flex items-center justify-center border-b border-cream-dark/20 relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-navy/5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-steel/30" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
        )}

        {/* Saving badge */}
        {saving >= 5 && (
          <div className="absolute top-2 right-2 bg-green-deal text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            -{saving}%
          </div>
        )}

        {/* Store count badge */}
        {listingCount > 1 && (
          <div className="absolute top-2 left-2 bg-navy/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {listingCount} enseignes
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Category */}
        {categoryName && (
          <span className="text-[10px] font-[var(--font-display)] tracking-wider text-orange uppercase block mb-1">
            {categoryName}
          </span>
        )}

        {/* Name */}
        <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-orange transition-colors mb-1.5 min-h-[2.5rem]">
          {name}
        </h3>

        {/* Brand */}
        {brand && (
          <span className="text-xs text-steel">{brand}</span>
        )}

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-cream-dark/20 flex items-end justify-between">
          {minPrice != null ? (
            <div>
              <span className="text-xs text-steel block mb-0.5">
                {hasPriceRange ? "À partir de" : "Prix"}
              </span>
              <span className="font-[var(--font-display)] text-lg font-bold text-navy">
                {formatPrice(minPrice)} €
              </span>
              {hasPriceRange && (
                <span className="text-xs text-steel ml-1">
                  → {formatPrice(maxPrice!)} €
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-steel italic">Prix non disponible</span>
          )}

          {listingCount > 0 && (
            <span className="text-orange text-xs font-medium">
              Comparer →
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
