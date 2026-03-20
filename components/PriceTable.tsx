"use client";

import { CheckCircleIcon } from "@/app/icons";
import { useCart } from "@/lib/cart-context";

interface Listing {
  id: number;
  current_price: number;
  old_price?: number | null;
  unit_price?: number | null;
  unit_label?: string | null;
  in_stock: boolean;
  store_product_url?: string | null;
  store_product_name?: string | null;
  store_name: string;
  store_chain: string;
  store_city: string;
  store_id: number;
}

interface PriceTableProps {
  listings: Listing[];
  productId: number;
  productName: string;
  productSlug: string;
}

export function PriceTable({ listings, productId, productName, productSlug }: PriceTableProps) {
  const { addItem } = useCart();
  const bestPrice = listings.length > 0 ? Math.min(...listings.map((l) => Number(l.current_price))) : 0;

  const formatPrice = (p: number | string) => Number(p).toFixed(2).replace(".", ",");

  return (
    <div className="bg-white rounded-xl border border-cream-dark/30 overflow-hidden">
      <div className="px-5 py-4 border-b border-cream-dark/20 bg-cream/30">
        <h2 className="font-semibold text-navy text-base">
          Prix par magasin
          <span className="text-steel font-normal text-sm ml-2">
            ({listings.length} résultat{listings.length > 1 ? "s" : ""})
          </span>
        </h2>
      </div>
      <div className="divide-y divide-cream-dark/15">
        {listings.map((listing, i) => {
          const isBest = Number(listing.current_price) === bestPrice;
          const discount =
            listing.old_price && listing.old_price > listing.current_price
              ? Math.round(((listing.old_price - listing.current_price) / listing.old_price) * 100)
              : null;

          return (
            <div
              key={listing.id}
              className={`flex items-center gap-4 px-5 py-4 ${
                isBest && i === 0 ? "bg-green-deal/5" : ""
              }`}
            >
              {/* Rank & best badge */}
              <div className="w-8 text-center flex-shrink-0">
                {isBest && i === 0 ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-deal mx-auto" />
                ) : (
                  <span className="text-sm text-steel/40 font-[var(--font-display)]">
                    #{i + 1}
                  </span>
                )}
              </div>

              {/* Store info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${isBest && i === 0 ? "text-navy" : "text-navy/80"}`}>
                    {listing.store_name}
                  </span>
                  {!listing.in_stock && (
                    <span className="text-[10px] bg-red-expensive/10 text-red-expensive px-1.5 py-0.5 rounded">
                      Rupture
                    </span>
                  )}
                </div>
                <span className="text-xs text-steel">{listing.store_city}</span>
                {listing.store_product_name && listing.store_product_name !== productName && (
                  <p className="text-[11px] text-steel/70 mt-0.5 truncate" title={listing.store_product_name}>
                    {listing.store_product_name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2">
                  {discount && (
                    <span className="text-[10px] font-bold text-green-deal bg-green-deal/10 px-1.5 py-0.5 rounded">
                      -{discount}%
                    </span>
                  )}
                  <span
                    className={`font-[var(--font-display)] text-lg font-bold ${
                      isBest && i === 0 ? "text-green-deal" : "text-navy"
                    }`}
                  >
                    {formatPrice(listing.current_price)} €
                  </span>
                </div>
                {listing.old_price && listing.old_price > listing.current_price && (
                  <span className="text-xs text-steel line-through">
                    {formatPrice(listing.old_price)} €
                  </span>
                )}
                {listing.unit_price && listing.unit_label && (
                  <span className="text-[10px] text-steel block">
                    {formatPrice(listing.unit_price)} {listing.unit_label}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() =>
                    addItem({
                      productId,
                      productName,
                      productSlug,
                      storeId: listing.store_id,
                      storeName: listing.store_name,
                      storeChain: listing.store_chain,
                      price: listing.current_price,
                    })
                  }
                  className="text-xs bg-orange/10 hover:bg-orange/20 text-orange px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                  + Panier
                </button>
                {listing.store_product_url && (
                  <a
                    href={listing.store_product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-navy/5 hover:bg-navy/10 text-navy px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Voir
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
