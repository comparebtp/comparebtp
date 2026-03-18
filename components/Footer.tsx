import Link from "next/link";
import { ArrowsRightLeftIcon } from "@/app/icons";

export function Footer() {
  return (
    <footer className="bg-navy-light border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-orange rounded flex items-center justify-center">
                <ArrowsRightLeftIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-[var(--font-display)] text-white text-base font-bold">
                Compare<span className="text-orange">BTP</span>
              </span>
            </Link>
            <p className="text-steel text-sm leading-relaxed max-w-sm">
              Le premier comparateur de prix dédié aux matériaux de
              construction et à l&apos;outillage professionnel sur la Côte
              d&apos;Azur. Comparez, économisez, optimisez vos trajets.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/" className="hover:text-orange transition-colors">Accueil</Link></li>
              <li><Link href="/recherche" className="hover:text-orange transition-colors">Rechercher</Link></li>
              <li><Link href="/categories" className="hover:text-orange transition-colors">Catégories</Link></li>
              <li><Link href="/magasins" className="hover:text-orange transition-colors">Magasins</Link></li>
              <li><Link href="/panier" className="hover:text-orange transition-colors">Panier</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-steel">
              <li><a href="#" className="hover:text-orange transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">CGU</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-steel/60">
            &copy; {new Date().getFullYear()} CompareBTP. Tous droits réservés.
            Les prix affichés sont donnés à titre indicatif.
          </p>
          <p className="text-xs text-steel/40">
            Comparateur indépendant &bull; Non affilié aux enseignes mentionnées
          </p>
        </div>
      </div>
    </footer>
  );
}
