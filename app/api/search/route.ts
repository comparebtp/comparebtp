import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [], total: 0 });
  }

  // Use PostgreSQL full-text search with ts_rank
  const searchTerms = q
    .trim()
    .split(/\s+/)
    .map((t) => t + ":*")
    .join(" & ");

  const products = await query(
    `SELECT p.id, p.name, p.slug, p.brand, p.image_url, p.min_price, p.max_price, p.listing_count,
            c.name as category_name, c.slug as category_slug,
            ts_rank(to_tsvector('french', p.name), to_tsquery('french', $1)) as rank
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE to_tsvector('french', p.name) @@ to_tsquery('french', $1)
        OR p.name ILIKE $2
     ORDER BY rank DESC, p.listing_count DESC
     LIMIT $3 OFFSET $4`,
    [searchTerms, `%${q}%`, limit, offset]
  );

  const countResult = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM products p
     WHERE to_tsvector('french', p.name) @@ to_tsquery('french', $1)
        OR p.name ILIKE $2`,
    [searchTerms, `%${q}%`]
  );

  return NextResponse.json({
    products,
    total: parseInt(countResult[0]?.count || "0"),
    query: q,
  });
}
