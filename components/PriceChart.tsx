"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PriceHistoryEntry {
  price: number;
  scraped_at: string;
  store_chain: string;
  store_name: string;
}

const CHAIN_COLORS: Record<string, string> = {
  leroy_merlin: "#78BE20",
  castorama: "#0066CC",
  brico_depot: "#E30613",
  bricorama: "#FF6600",
  bricomarche: "#009639",
  wurth: "#003D7A",
  tollens: "#1B365D",
  point_p: "#E4002B",
};

export function PriceChart({ data }: { data: PriceHistoryEntry[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-cream-dark/30 p-6">
        <h2 className="font-semibold text-navy text-base mb-4">Historique des prix</h2>
        <p className="text-sm text-steel text-center py-8">
          Pas encore d&apos;historique disponible. Les données seront collectées au fil du temps.
        </p>
      </div>
    );
  }

  // Transform data: group by date, with one price per chain
  const chains = [...new Set(data.map((d) => d.store_chain))];
  const dateMap = new Map<string, Record<string, number>>();

  for (const entry of data) {
    const date = new Date(entry.scraped_at).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    });
    if (!dateMap.has(date)) dateMap.set(date, {});
    dateMap.get(date)![entry.store_chain] = entry.price;
  }

  const chartData = Array.from(dateMap.entries()).map(([date, prices]) => ({
    date,
    ...prices,
  }));

  const chainLabels: Record<string, string> = {
    leroy_merlin: "Leroy Merlin",
    castorama: "Castorama",
    brico_depot: "Brico Dépôt",
    bricorama: "Bricorama",
    bricomarche: "Bricomarché",
    wurth: "Würth",
    tollens: "Tollens",
    point_p: "Point P",
  };

  return (
    <div className="bg-white rounded-xl border border-cream-dark/30 p-6">
      <h2 className="font-semibold text-navy text-base mb-4">Historique des prix</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8B9DAF" />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="#8B9DAF"
            tickFormatter={(v) => `${v}€`}
          />
          <Tooltip
            formatter={(value: unknown, name: unknown) => [
              `${Number(value).toFixed(2)} €`,
              chainLabels[String(name)] || String(name),
            ]}
            contentStyle={{
              background: "#fff",
              border: "1px solid #E8DFD0",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend
            formatter={(value: string) => chainLabels[value] || value}
            wrapperStyle={{ fontSize: 11 }}
          />
          {chains.map((chain) => (
            <Line
              key={chain}
              type="monotone"
              dataKey={chain}
              stroke={CHAIN_COLORS[chain] || "#8B9DAF"}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
