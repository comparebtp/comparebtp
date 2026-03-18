import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  // Get categories with product counts
  const categories = await query(
    `SELECT c.id, c.name, c.slug, c.parent_id,
            COUNT(DISTINCT p.id) as product_count
     FROM categories c
     LEFT JOIN products p ON p.category_id = c.id AND p.listing_count > 0
     GROUP BY c.id, c.name, c.slug, c.parent_id
     ORDER BY c.name`
  );

  // Build tree structure
  type Cat = {
    id: number; name: string; slug: string; parent_id: number | null;
    product_count: number; children: Cat[];
  };
  const catMap = new Map<number, Cat>();
  const roots: Cat[] = [];

  for (const c of categories as { id: number; name: string; slug: string; parent_id: number | null; product_count: string }[]) {
    const cat: Cat = {
      id: c.id,
      name: c.name,
      slug: c.slug,
      parent_id: c.parent_id,
      product_count: parseInt(c.product_count || "0"),
      children: [],
    };
    catMap.set(c.id, cat);
  }

  for (const cat of catMap.values()) {
    if (cat.parent_id && catMap.has(cat.parent_id)) {
      catMap.get(cat.parent_id)!.children.push(cat);
    } else if (!cat.parent_id) {
      roots.push(cat);
    }
  }

  // Add total counts to parents
  for (const root of roots) {
    root.product_count += root.children.reduce((s, c) => s + c.product_count, 0);
  }

  return NextResponse.json({ categories: roots });
}
