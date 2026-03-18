import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const suggestions = await query(
    `SELECT DISTINCT p.name, p.slug, p.brand, p.min_price, p.listing_count,
            c.name as category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.name ILIKE $1 AND p.listing_count > 0
     ORDER BY p.listing_count DESC, p.name
     LIMIT 8`,
    [`%${q}%`]
  );

  return NextResponse.json({ suggestions });
}
