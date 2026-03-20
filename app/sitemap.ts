import { query } from "@/lib/db";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://batiprix.pro";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/recherche`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/magasins`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/a-propos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/cgu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
  ];

  // Guide pages
  const guideSlugs = [
    "comment-choisir-perceuse", "prix-materiaux-construction-cote-azur",
    "guide-peinture-interieure", "renovation-salle-de-bain-budget",
    "meilleurs-magasins-btp-nice", "isoler-maison-cote-azur",
    "comparatif-visserie-fixation", "outillage-electroportatif-pro",
    "carrelage-sol-mur-guide", "electricite-maison-normes-prix",
    "acheter-materiaux-italie-frontiere", "economiser-travaux-renovation",
  ];
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Product pages (top 500 by listing count)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await query<{ slug: string }>(
      "SELECT slug FROM products WHERE listing_count > 0 AND slug IS NOT NULL ORDER BY listing_count DESC LIMIT 500"
    );
    productPages = products.map((p) => ({
      url: `${baseUrl}/produit/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    }));
  } catch {}

  // Category pages
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await query<{ slug: string }>(
      "SELECT slug FROM categories"
    );
    categoryPages = categories.map((c) => ({
      url: `${baseUrl}/categories/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticPages, ...guidePages, ...productPages, ...categoryPages];
}
