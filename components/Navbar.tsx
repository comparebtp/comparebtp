"use client";

import Link from "next/link";
import { ArrowsRightLeftIcon, MapPinIcon, ShoppingCartIcon } from "@/app/icons";
import { SearchBar } from "./SearchBar";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-orange rounded flex items-center justify-center">
            <ArrowsRightLeftIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-[var(--font-display)] text-white text-lg font-bold tracking-tight">
            Compare<span className="text-orange">BTP</span>
          </span>
        </Link>

        {/* Search bar - centered */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar compact />
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-steel flex-shrink-0">
          <Link href="/categories" className="hover:text-white transition-colors">
            Catégories
          </Link>
          <Link href="/magasins" className="hover:text-white transition-colors">
            Magasins
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-sm">
            <MapPinIcon className="w-4 h-4 text-orange" />
            <span className="text-steel text-xs">Côte d&apos;Azur</span>
          </div>
          <Link
            href="/panier"
            className="relative flex items-center gap-1.5 text-steel hover:text-white transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
