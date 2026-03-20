import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "BatiPrix — Comparez les prix matériaux & outillage BTP sur la Côte d'Azur",
  description:
    "Comparez les prix des matériaux de construction, outillage et fournitures BTP entre Leroy Merlin, Castorama, Brico Dépôt, Würth et plus. Côte d'Azur & PACA.",
  keywords: "comparateur prix BTP, matériaux construction, outillage, Côte d'Azur, Leroy Merlin, Castorama, Brico Dépôt",
  metadataBase: new URL("https://batiprix.pro"),
  openGraph: {
    title: "BatiPrix — Comparateur de prix BTP Côte d'Azur",
    description: "Comparez les prix des matériaux de construction entre Leroy Merlin, Castorama, Brico Dépôt, Würth et plus. 3 000+ produits, 244 magasins.",
    url: "https://batiprix.pro",
    siteName: "BatiPrix",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://batiprix.pro/og-image.png", width: 1200, height: 630, alt: "BatiPrix — Comparateur de prix BTP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BatiPrix — Comparateur de prix BTP",
    description: "Comparez les prix des matériaux de construction sur la Côte d'Azur",
  },
  verification: {
    google: "J17mXRcWkdQPf9e3V3PUMA_nHG1GU0-qpqKTlbrt6Do",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://batiprix.pro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <CartProvider>
          {children}
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
