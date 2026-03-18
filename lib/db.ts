import { neon } from "@neondatabase/serverless";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query<T = Record<string, any>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const sql = getDb();
  // sql.query() returns rows directly as an array
  const result = await sql.query(text, params);
  return result as T[];
}
