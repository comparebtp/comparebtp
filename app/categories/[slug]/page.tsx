"use client";

import { use } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { CategoryProducts } from "./CategoryProducts";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-20 pb-12">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-12 text-center text-steel">
              Chargement...
            </div>
          }
        >
          <CategoryProducts slug={slug} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
