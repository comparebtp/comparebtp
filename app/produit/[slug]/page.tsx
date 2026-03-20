import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import { ProductClient } from "./ProductClient";

interface ProductRow {
  id: number;
  name: string;
  slug: string;
  brand: string | null;
  ean: string | null;
  image_url: string | null;
  min_price: number | null;
  max_price: number | null;
  listing_count: number;
  description: string | null;
  category_name: string | null;
  category_slug: string | null;
}

interface ListingRow {
  current_price: number;
  store_chain: string;
  store_name: string;
  in_stock: boolean;
}

async function getProduct(slug: string) {
  try {
    const products = await query<ProductRow>(
      `SELECT p.id, p.name, p.slug, p.brand, p.ean, p.image_url, p.min_price, p.max_price,
              p.listing_count, p.description,
              c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = $1`,
      [slug]
    );
    if (products.length === 0) return null;

    const product = products[0];

    const listings = await query<ListingRow>(
      `SELECT sl.current_price, s.chain as store_chain, s.name as store_name, sl.in_stock
       FROM store_listings sl
       JOIN stores s ON sl.store_id = s.id
       WHERE sl.product_id = $1
       ORDER BY sl.current_price ASC`,
      [product.id]
    );

    return { product, listings };
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
  const data = await getProduct(slug);

  if (!data) {
    return {
      title: "Produit introuvable — BatiPrix",
      description: "Ce produit n'existe pas ou a été retiré du catalogue BatiPrix.",
    };
  }

  const { product } = data;
  const priceText = product.min_price
    ? `à partir de ${Number(product.min_price).toFixed(2)}€`
    : "";
  const brandText = product.brand ? ` ${product.brand}` : "";
  const storeText = product.listing_count > 1
    ? `Comparez ${product.listing_count} enseignes`
    : "";

  return {
    title: `${product.name}${brandText} — ${priceText} | BatiPrix`,
    description: `${product.name}${brandText} ${priceText}. ${storeText}. Comparez les prix des matériaux BTP sur la Côte d'Azur entre Brico Dépôt, Tollens, Würth et plus.`,
    openGraph: {
      title: `${product.name} — ${priceText}`,
      description: `Comparez les prix de ${product.name} entre ${product.listing_count} enseigne${product.listing_count > 1 ? "s" : ""} sur la Côte d'Azur.`,
      url: `https://batiprix.pro/produit/${product.slug}`,
      images: product.image_url ? [{ url: product.image_url }] : [],
      type: "website",
    },
    alternates: {
      canonical: `https://batiprix.pro/produit/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProduct(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Schema.org Product structured data for SEO */}
      {data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: data.product.name,
              ...(data.product.image_url && { image: data.product.image_url }),
              ...(data.product.description && { description: data.product.description }),
              ...(data.product.brand && {
                brand: {
                  "@type": "Brand",
                  name: data.product.brand,
                },
              }),
              ...(data.product.ean && { gtin13: data.product.ean }),
              ...(data.product.category_name && { category: data.product.category_name }),
              ...(data.product.min_price && {
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: "EUR",
                  lowPrice: Number(data.product.min_price).toFixed(2),
                  ...(data.product.max_price && {
                    highPrice: Number(data.product.max_price).toFixed(2),
                  }),
                  offerCount: data.listings.length,
                  offers: data.listings.map((l) => ({
                    "@type": "Offer",
                    price: Number(l.current_price).toFixed(2),
                    priceCurrency: "EUR",
                    seller: {
                      "@type": "Organization",
                      name: l.store_chain,
                    },
                    availability: l.in_stock
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                  })),
                },
              }),
            }),
          }}
        />
      )}

      {/* Schema.org BreadcrumbList */}
      {data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://batiprix.pro",
                },
                ...(data.product.category_name
                  ? [
                      {
                        "@type": "ListItem",
                        position: 2,
                        name: data.product.category_name,
                        item: `https://batiprix.pro/categories/${data.product.category_slug}`,
                      },
                    ]
                  : []),
                {
                  "@type": "ListItem",
                  position: data.product.category_name ? 3 : 2,
                  name: data.product.name,
                  item: `https://batiprix.pro/produit/${data.product.slug}`,
                },
              ],
            }),
          }}
        />
      )}

      {/* SSR: hidden product data for crawlers */}
      {data && (
        <div className="sr-only" aria-hidden="true">
          <h1>{data.product.name}{data.product.brand ? ` — ${data.product.brand}` : ""}</h1>
          {data.product.min_price && (
            <p>Prix: {Number(data.product.min_price).toFixed(2)}€
              {data.product.max_price && Number(data.product.max_price) !== Number(data.product.min_price)
                ? ` à ${Number(data.product.max_price).toFixed(2)}€`
                : ""}
            </p>
          )}
          <p>Disponible dans {data.product.listing_count} enseigne{data.product.listing_count > 1 ? "s" : ""}</p>
          {data.listings.length > 0 && (
            <ul>
              {data.listings.map((l, i) => (
                <li key={i}>{l.store_chain} — {Number(l.current_price).toFixed(2)}€</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ProductClient slug={slug} />
    </>
  );
}
