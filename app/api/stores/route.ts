import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const stores = await query(
    `SELECT s.id, s.name, s.chain, s.address, s.city, s.postal_code, s.lat, s.lng, s.website,
            COUNT(DISTINCT sl.id) as listing_count
     FROM stores s
     LEFT JOIN store_listings sl ON sl.store_id = s.id
     GROUP BY s.id, s.name, s.chain, s.address, s.city, s.postal_code, s.lat, s.lng, s.website
     ORDER BY s.chain, s.name`
  );

  return NextResponse.json({ stores });
}
