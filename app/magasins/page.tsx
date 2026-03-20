import { MagasinsClient } from "./MagasinsClient";

export const metadata = {
  title: "244 magasins BTP sur la Côte d'Azur — Carte & adresses | BatiPrix",
  description: "Trouvez les magasins de bricolage et négoces BTP près de chez vous sur la Côte d'Azur : Brico Dépôt, Leroy Merlin, Castorama, Point P, Würth et 39 autres enseignes. Carte interactive, adresses et horaires.",
  alternates: {
    canonical: "https://batiprix.pro/magasins",
  },
};

export default function MagasinsPage() {
  return <MagasinsClient />;
}
