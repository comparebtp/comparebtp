import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const store = searchParams.get("store");
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sort = searchParams.get("sort") || "popular";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const perPage = 24;
  const offset = (page - 1) * perPage;

  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (category) {
    conditions.push(`(c.slug = $${paramIndex} OR parent_cat.slug = $${paramIndex})`);
    params.push(category);
    paramIndex++;
  }
  if (store) {
    conditions.push(
      `EXISTS (SELECT 1 FROM store_listings sl JOIN stores s ON sl.store_id = s.id WHERE sl.product_id = p.id AND s.chain = $${paramIndex})`
    );
    params.push(store);
    paramIndex++;
  }
  if (brand) {
    conditions.push(`p.brand ILIKE $${paramIndex}`);
    params.push(brand);
    paramIndex++;
  }
  if (minPrice) {
    conditions.push(`p.min_price >= $${paramIndex}`);
    params.push(parseFloat(minPrice));
    paramIndex++;
  }
  if (maxPrice) {
    conditions.push(`p.max_price <= $${paramIndex}`);
    params.push(parseFloat(maxPrice));
    paramIndex++;
  }

  // Only show products with at least one listing
  conditions.push("p.listing_count > 0");

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const orderBy =
    sort === "price_asc"
      ? "p.min_price ASC NULLS LAST"
      : sort === "price_desc"
        ? "p.max_price DESC NULLS LAST"
        : sort === "name"
          ? "p.name ASC"
          : "p.listing_count DESC, p.min_price ASC";

  const products = await query(
    `SELECT p.id, p.name, p.slug, p.brand, p.image_url, p.min_price, p.max_price, p.listing_count,
            c.name as category_name, c.slug as category_slug
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN categories parent_cat ON c.parent_id = parent_cat.id
     ${whereClause}
     ORDER BY ${orderBy}
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, perPage, offset]
  );

  const countResult = await query<{ count: string }>(
    `SELECT COUNT(*) as count
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN categories parent_cat ON c.parent_id = parent_cat.id
     ${whereClause}`,
    params
  );

  const total = parseInt(countResult[0]?.count || "0");

  return NextResponse.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / perPage),
  });
}
