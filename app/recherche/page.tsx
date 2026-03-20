import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchResults } from "./SearchResults";

export const metadata = {
  title: "Recherche — BatiPrix",
  description: "Recherchez et comparez les prix des matériaux BTP",
};

export default function RecherchePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-20 pb-12">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-12 text-center text-steel">
              Chargement...
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
