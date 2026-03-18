import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Get product details
  const products = await query(
    `SELECT p.*, c.name as category_name, c.slug as category_slug,
            parent_cat.name as parent_category_name, parent_cat.slug as parent_category_slug
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN categories parent_cat ON c.parent_id = parent_cat.id
     WHERE p.slug = $1`,
    [slug]
  );

  if (products.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const product = products[0] as Record<string, unknown>;

  // Get all store listings for this product
  const listings = await query(
    `SELECT sl.id, sl.current_price, sl.old_price, sl.unit_price, sl.unit_label,
            sl.in_stock, sl.store_product_url, sl.image_url, sl.last_scraped_at,
            s.name as store_name, s.chain as store_chain, s.city as store_city,
            s.lat as store_lat, s.lng as store_lng, s.id as store_id
     FROM store_listings sl
     JOIN stores s ON sl.store_id = s.id
     WHERE sl.product_id = $1
     ORDER BY sl.current_price ASC`,
    [(product as { id: number }).id]
  );

  // Get price history
  const priceHistory = await query(
    `SELECT ph.price, ph.scraped_at, s.chain as store_chain, s.name as store_name
     FROM price_history ph
     JOIN store_listings sl ON ph.listing_id = sl.id
     JOIN stores s ON sl.store_id = s.id
     WHERE sl.product_id = $1
     ORDER BY ph.scraped_at ASC`,
    [(product as { id: number }).id]
  );

  return NextResponse.json({
    product,
    listings,
    priceHistory,
  });
}
