"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@/app/icons";

interface Suggestion {
  name: string;
  slug: string;
  brand: string | null;
  min_price: number | null;
  category_name: string | null;
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useDebouncedCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } catch {
      setSuggestions([]);
    }
  }, 200);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/produit/${suggestions[selectedIndex].slug}`);
        setShowSuggestions(false);
      } else {
        handleSubmit();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  const formatPrice = (price: number | null) =>
    price != null ? `${price.toFixed(2).replace(".", ",")} €` : "";

  if (compact) {
    return (
      <div ref={wrapperRef} className="relative">
        <form onSubmit={handleSubmit} className="flex items-center bg-white/10 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 flex-1 px-3 py-2">
            <MagnifyingGlassIcon className="w-4 h-4 text-steel flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher un produit..."
              className="w-full bg-transparent text-white placeholder:text-steel/60 outline-none text-sm"
            />
          </div>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <SuggestionDropdown
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            formatPrice={formatPrice}
            onSelect={(s) => {
              router.push(`/produit/${s.slug}`);
              setShowSuggestions(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="search-glow flex items-center bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/20 transition-shadow">
          <div className="flex items-center gap-3 flex-1 px-5 py-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-concrete flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher un produit, une marque, une référence..."
              className="w-full bg-transparent text-navy placeholder:text-concrete outline-none text-base"
            />
          </div>
          <button
            type="submit"
            className="bg-orange hover:bg-orange-hot text-white px-8 py-4 font-semibold text-base transition-colors flex-shrink-0"
          >
            Comparer
          </button>
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          formatPrice={formatPrice}
          onSelect={(s) => {
            router.push(`/produit/${s.slug}`);
            setShowSuggestions(false);
          }}
        />
      )}
    </div>
  );
}

function SuggestionDropdown({
  suggestions,
  selectedIndex,
  formatPrice,
  onSelect,
}: {
  suggestions: Suggestion[];
  selectedIndex: number;
  formatPrice: (p: number | null) => string;
  onSelect: (s: Suggestion) => void;
}) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl shadow-navy/10 border border-cream-dark/30 overflow-hidden z-50">
      {suggestions.map((s, i) => (
        <button
          key={s.slug}
          className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-cream/50 transition-colors ${
            i === selectedIndex ? "bg-cream/50" : ""
          } ${i < suggestions.length - 1 ? "border-b border-cream-dark/15" : ""}`}
          onMouseDown={() => onSelect(s)}
        >
          <div className="min-w-0">
            <div className="text-sm text-navy font-medium truncate">{s.name}</div>
            <div className="text-xs text-steel mt-0.5">
              {s.brand && <span className="text-orange">{s.brand}</span>}
              {s.brand && s.category_name && " · "}
              {s.category_name}
            </div>
          </div>
          {s.min_price && (
            <span className="text-sm font-[var(--font-display)] text-navy font-bold flex-shrink-0 ml-3">
              {formatPrice(s.min_price)}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
