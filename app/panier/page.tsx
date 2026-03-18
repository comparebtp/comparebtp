"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { ShoppingCartIcon, MapPinIcon } from "@/app/icons";

const CHAIN_LABELS: Record<string, string> = {
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

const CHAIN_COLORS: Record<string, string> = {
  leroy_merlin: "#78BE20",
  castorama: "#0066CC",
  brico_depot: "#E30613",
  bricorama: "#FF6600",
  bricomarche: "#009639",
  wurth: "#003D7A",
  tollens: "#1B365D",
  point_p: "#E4002B",
};

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart, totalByStore } = useCart();

  const formatPrice = (p: number) => p.toFixed(2).replace(".", ",");
  const grandTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const storeCount = Object.keys(totalByStore).length;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy flex items-center gap-3">
                <ShoppingCartIcon className="w-7 h-7 text-orange" />
                Mon panier
              </h1>
              {items.length > 0 && (
                <p className="text-steel text-sm mt-1">
                  {items.length} article{items.length > 1 ? "s" : ""} dans{" "}
                  {storeCount} magasin{storeCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-expensive hover:underline"
              >
                Vider le panier
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-cream-dark/30">
              <ShoppingCartIcon className="w-16 h-16 text-cream-dark mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-navy mb-2">Panier vide</h2>
              <p className="text-steel mb-6">
                Ajoutez des produits depuis les pages de comparaison.
              </p>
              <Link
                href="/recherche"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hot text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Parcourir les produits
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Group by store */}
              {Object.entries(totalByStore).map(([chain, storeData]) => (
                <div
                  key={chain}
                  className="bg-white rounded-xl border border-cream-dark/30 overflow-hidden"
                >
                  <div
                    className="px-5 py-3 flex items-center justify-between"
                    style={{ borderLeft: `4px solid ${CHAIN_COLORS[chain] || "#8B9DAF"}` }}
                  >
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-4 h-4 text-steel" />
                      <span className="font-semibold text-navy">
                        {CHAIN_LABELS[chain] || chain}
                      </span>
                    </div>
                    <span className="font-[var(--font-display)] font-bold text-navy">
                      {formatPrice(storeData.total)} €
                    </span>
                  </div>

                  <div className="divide-y divide-cream-dark/15">
                    {storeData.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.storeId}`}
                        className="px-5 py-3 flex items-center gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/produit/${item.productSlug}`}
                            className="text-sm font-medium text-navy hover:text-orange transition-colors line-clamp-1"
                          >
                            {item.productName}
                          </Link>
                          <span className="text-xs text-steel">{item.storeName}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.storeId, item.quantity - 1)}
                            className="w-7 h-7 rounded bg-cream text-navy text-sm font-bold hover:bg-cream-dark transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-navy">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.storeId, item.quantity + 1)}
                            className="w-7 h-7 rounded bg-cream text-navy text-sm font-bold hover:bg-cream-dark transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="w-24 text-right">
                          <span className="font-[var(--font-display)] text-sm font-bold text-navy">
                            {formatPrice(item.price * item.quantity)} €
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-steel block">
                              {formatPrice(item.price)} €/u
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.productId, item.storeId)}
                          className="text-steel hover:text-red-expensive transition-colors p-1"
                          title="Retirer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Grand total */}
              <div className="bg-navy rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total estimé</span>
                  <span className="font-[var(--font-display)] text-2xl font-bold text-orange">
                    {formatPrice(grandTotal)} €
                  </span>
                </div>
                <div className="flex items-center gap-2 text-steel text-xs">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>
                    {storeCount} magasin{storeCount > 1 ? "s" : ""} à visiter
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
