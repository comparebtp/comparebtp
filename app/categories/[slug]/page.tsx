import type { Metadata } from "next";
import { query } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { CategoryProducts } from "./CategoryProducts";

interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  product_count: string;
}

async function getCategoryMeta(slug: string) {
  try {
    const cats = await query<CategoryRow>(
      `SELECT c.id, c.name, c.slug,
              (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.listing_count > 0) as product_count
       FROM categories c WHERE c.slug = $1`,
      [slug]
    );
    return cats[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryMeta(slug);

  if (!cat) {
    return {
      title: "Catégorie introuvable — BatiPrix",
      description: "Cette catégorie n'existe pas sur BatiPrix.",
    };
  }

  const count = parseInt(cat.product_count);
  return {
    title: `${cat.name} — ${count} produits à comparer | BatiPrix`,
    description: `Comparez les prix de ${count} produits ${cat.name} entre Brico Dépôt, Tollens, Würth et plus. Trouvez le meilleur prix sur la Côte d'Azur.`,
    openGraph: {
      title: `${cat.name} — Comparer ${count} produits BTP`,
      description: `${count} produits ${cat.name} à comparer sur BatiPrix.`,
      url: `https://batiprix.pro/categories/${cat.slug}`,
    },
    alternates: {
      canonical: `https://batiprix.pro/categories/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
