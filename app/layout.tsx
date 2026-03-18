import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "CompareBTP — Comparez les prix matériaux & outillage BTP sur la Côte d'Azur",
  description:
    "Comparez les prix des matériaux de construction, outillage et fournitures BTP entre Leroy Merlin, Castorama, Brico Dépôt, Würth et plus. Côte d'Azur & PACA.",
  keywords: "comparateur prix BTP, matériaux construction, outillage, Côte d'Azur, Leroy Merlin, Castorama, Brico Dépôt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
