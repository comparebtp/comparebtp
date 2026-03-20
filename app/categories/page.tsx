import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoriesClient } from "./CategoriesClient";

export const metadata = {
  title: "Catégories matériaux & outillage BTP — BatiPrix",
  description: "Parcourez toutes les catégories de matériaux de construction et outillage BTP : gros oeuvre, peinture, plomberie, électricité, quincaillerie. Comparez les prix sur la Côte d'Azur.",
  alternates: {
    canonical: "https://batiprix.pro/categories",
  },
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-12">
        <CategoriesClient />
      </main>
      <Footer />
    </div>
  );
}
