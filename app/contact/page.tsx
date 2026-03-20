import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Contact — BatiPrix",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy mb-4">Contactez-nous</h1>
        <p className="text-steel mb-10 max-w-lg">
          Une question, une suggestion, un partenariat ? N&apos;hésitez pas à nous contacter.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-lg font-bold text-navy mb-4">Par email</h2>
            <a
              href="mailto:batiprix@outlook.fr"
              className="text-orange hover:underline text-lg font-medium"
            >
              batiprix@outlook.fr
            </a>
            <p className="text-steel text-sm mt-2">
              Nous répondons généralement sous 24-48h.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark/30 p-8">
            <h2 className="text-lg font-bold text-navy mb-4">Adresse</h2>
            <p className="text-navy/80">
              PLAMODEALO Vladislav (BatiPrix)<br />
              4 Avenue Emilia<br />
              06000 Nice, France
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-cream-dark/30 p-8">
          <h2 className="text-lg font-bold text-navy mb-4">Vous êtes une enseigne BTP ?</h2>
          <p className="text-navy/80 mb-4">
            Vous souhaitez référencer vos produits et magasins sur BatiPrix ?
            Nous travaillons avec les enseignes de bricolage, négoces de matériaux
            et distributeurs spécialisés de la Côte d&apos;Azur.
          </p>
          <p className="text-navy/80">
            Contactez-nous à{" "}
            <a href="mailto:batiprix@outlook.fr" className="text-orange hover:underline">
              batiprix@outlook.fr
            </a>{" "}
            pour discuter d&apos;un partenariat.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-cream-dark/30 p-8">
          <h2 className="text-lg font-bold text-navy mb-4">Signaler une erreur de prix</h2>
          <p className="text-navy/80">
            Vous avez constaté un prix incorrect sur notre site ? Merci de nous le signaler
            à <a href="mailto:batiprix@outlook.fr" className="text-orange hover:underline">batiprix@outlook.fr</a> en
            précisant le produit, l&apos;enseigne concernée et le prix réel constaté. Nous
            corrigerons dans les plus brefs délais.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
