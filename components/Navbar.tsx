"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowsRightLeftIcon, MapPinIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "@/app/icons";
import { SearchBar } from "./SearchBar";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-orange rounded flex items-center justify-center">
              <ArrowsRightLeftIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-[var(--font-display)] text-white text-lg font-bold tracking-tight">
              Bati<span className="text-orange">Prix</span>
            </span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar compact />
          </div>

          {/* Nav links - desktop */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-steel flex-shrink-0">
            <Link href="/categories" className="hover:text-white transition-colors">
              Catégories
            </Link>
            <Link href="/magasins" className="hover:text-white transition-colors">
              Magasins
            </Link>
            <Link href="/guides" className="hover:text-white transition-colors">
              Guides
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden text-steel hover:text-white transition-colors p-1"
              aria-label="Rechercher"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            <div className="hidden md:flex items-center gap-1.5 text-sm">
              <MapPinIcon className="w-4 h-4 text-orange" />
              <span className="text-steel text-xs">Côte d&apos;Azur</span>
            </div>

            <Link
              href="/panier"
              className="relative flex items-center gap-1.5 text-steel hover:text-white transition-colors"
              aria-label={`Panier${totalItems > 0 ? ` (${totalItems} articles)` : ""}`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-steel hover:text-white transition-colors p-1"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 bg-navy/95">
            <SearchBar compact />
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy/95 border-t border-white/5 px-4 py-3">
            <div className="flex flex-col gap-1">
              <Link
                href="/recherche"
                className="text-steel hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rechercher
              </Link>
              <Link
                href="/categories"
                className="text-steel hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catégories
              </Link>
              <Link
                href="/magasins"
                className="text-steel hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Magasins
              </Link>
              <Link
                href="/guides"
                className="text-steel hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guides
              </Link>
              <Link
                href="/contact"
                className="text-steel hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center gap-1.5 px-3 py-2 text-sm">
                <MapPinIcon className="w-4 h-4 text-orange" />
                <span className="text-steel text-xs">Côte d&apos;Azur (06 / 83)</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Affiliate disclosure banner - visible on all pages */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy/90 text-center py-1 px-4 text-[11px] text-steel/60 border-t border-white/5 hidden sm:block">
        BatiPrix est un comparateur indépendant. Certains liens sont des liens d&apos;affiliation — nous pouvons percevoir une commission sans surcoût pour vous.
      </div>
    </>
  );
}
