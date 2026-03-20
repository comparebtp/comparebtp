import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

const ARTICLES: Record<string, { title: string; category: string; date: string; content: string }> = {
  "comment-choisir-perceuse": {
    title: "Comment choisir sa perceuse-visseuse en 2026",
    category: "Outillage",
    date: "15 mars 2026",
    content: `
## Perceuse filaire ou sans fil ?

La **perceuse sans fil** (18V ou 20V) est aujourd'hui le standard pour 90% des utilisations. Elle offre une mobilité totale et les batteries lithium-ion modernes tiennent facilement une journée de travail.

La **perceuse filaire** reste pertinente pour les travaux intensifs en continu (béton armé, gros perçages) où la puissance constante est un atout.

## Les marques professionnelles

### Bosch Professional (gamme bleue)
- **GSR 18V-55** : la référence polyvalente (~130-155€)
- Excellente ergonomie, bonne puissance
- Disponible chez Brico Dépôt, Leroy Merlin, Castorama, ManoMano

### Makita
- **DDF484** : la perceuse pro haut de gamme (~180-220€)
- Moteur brushless, très durable
- Disponible principalement chez Würth et les négoces pro

### DeWalt
- **DCD791** : bon rapport qualité-prix pro (~150-180€)
- Compatible avec tout l'écosystème 18V XR
- Disponible chez Brico Dépôt, ManoMano

### Milwaukee
- **M18 FDD2** : la puissance maximale (~200-250€)
- Le choix des artisans exigeants
- Principalement chez les distributeurs spécialisés

## Critères de choix

1. **Couple de serrage** : 50-60 Nm pour du vissage courant, 80+ Nm pour du professionnel
2. **Vitesse** : 2 vitesses minimum (lente pour visser, rapide pour percer)
3. **Mandrin** : 13mm pour la polyvalence, 10mm suffit pour du vissage
4. **Batterie** : 2.0 Ah pour le bricolage, 4.0-5.0 Ah pour un usage pro
5. **Poids** : important pour le travail en hauteur ou prolongé

## Où acheter au meilleur prix sur la Côte d'Azur ?

D'après nos comparaisons, les prix varient de **15 à 25%** entre les enseignes pour un même modèle :

- **Brico Dépôt** : souvent les prix les plus bas sur les marques grand public
- **ManoMano** : bons prix en ligne, large choix de modèles
- **Würth** : le meilleur choix pour l'outillage pro, tarifs négociables
- **Leroy Merlin / Castorama** : prix standard mais bon SAV et disponibilité immédiate

**Notre conseil** : utilisez BatiPrix pour vérifier les prix avant d'acheter. Un même modèle peut coûter 130€ dans une enseigne et 155€ dans une autre.
    `,
  },
  "prix-materiaux-construction-cote-azur": {
    title: "Prix des matériaux de construction sur la Côte d'Azur en 2026",
    category: "Gros Oeuvre",
    date: "14 mars 2026",
    content: `
## État du marché en 2026

Après les hausses significatives de 2022-2024 (+20 à +40% sur certains matériaux), les prix se stabilisent en 2026. Voici les prix moyens constatés dans les enseignes de la Côte d'Azur.

## Ciment et béton

| Produit | Prix moyen | Fourchette |
|---------|-----------|------------|
| Ciment gris CEM II 35kg | 7,50€ | 6,90€ - 8,90€ |
| Béton prêt à l'emploi 35kg | 5,20€ | 4,50€ - 6,00€ |
| Mortier colle carrelage 25kg | 8,90€ | 7,50€ - 12,00€ |
| Enduit de façade 25kg | 12,50€ | 10,00€ - 15,00€ |

**Où acheter ?** Point P et Brico Dépôt sont généralement les moins chers sur le gros oeuvre. Leroy Merlin et Castorama sont 10-15% plus chers mais offrent plus de services.

## Parpaings et briques

| Produit | Prix moyen | Fourchette |
|---------|-----------|------------|
| Parpaing creux 20x20x50 | 1,50€ | 1,20€ - 1,90€ |
| Brique plâtrière 5x20x40 | 1,10€ | 0,90€ - 1,40€ |
| Linteau béton 20x20x100 | 5,50€ | 4,50€ - 7,00€ |

## Bois de construction

| Produit | Prix moyen | Fourchette |
|---------|-----------|------------|
| Tasseau sapin 27x27 2.4m | 3,50€ | 2,80€ - 4,50€ |
| Chevron 63x75 3m | 8,90€ | 7,00€ - 11,00€ |
| OSB 3 18mm 2500x1250 | 28,00€ | 22,00€ - 35,00€ |
| Contreplaqué peuplier 15mm | 32,00€ | 25,00€ - 40,00€ |

## Isolation

| Produit | Prix moyen | Fourchette |
|---------|-----------|------------|
| Laine de verre GR32 100mm (rouleau) | 12,50€/m² | 9,00€ - 16,00€/m² |
| Laine de roche 100mm | 14,00€/m² | 11,00€ - 18,00€/m² |
| Polystyrène expansé 100mm | 8,50€/m² | 6,00€ - 12,00€/m² |
| Plaque de plâtre BA13 standard | 5,50€ | 4,00€ - 7,50€ |

## Spécificité Côte d'Azur

Les prix sur la Côte d'Azur sont en moyenne **5 à 10% plus élevés** que la moyenne nationale, en raison du coût de transport et de la forte demande liée aux rénovations dans l'ancien.

**Astuce** : certains matériaux sont moins chers en Italie (Ventimiglia, à 30 min de Nice). Le ciment et les briques notamment peuvent être 15-20% moins chers.

## Économisez avec BatiPrix

Utilisez notre comparateur pour vérifier les prix en temps réel. Sur un chantier moyen, la différence entre l'enseigne la plus chère et la moins chère peut représenter **500 à 2 000€ d'économies**.
    `,
  },
  "guide-peinture-interieure": {
    title: "Quelle peinture intérieure choisir ? Guide comparatif",
    category: "Peinture",
    date: "12 mars 2026",
    content: `
## Les types de finition

### Mat
- Masque les imperfections du mur
- Idéal pour les plafonds et chambres
- Plus difficile à nettoyer
- **Prix moyen** : 25-45€ le pot de 10L

### Satin
- Le meilleur compromis : esthétique et lessivable
- Idéal pour les pièces de vie, couloirs, chambres d'enfants
- **Prix moyen** : 30-55€ le pot de 10L

### Brillant
- Très lessivable, réfléchit la lumière
- Idéal pour les pièces d'eau (cuisine, SDB)
- Met en valeur les imperfections
- **Prix moyen** : 35-60€ le pot de 10L

## Comparatif des marques

### Tollens
- Gamme professionnelle, excellente qualité
- **Flat Hydro Mat** : la référence en mat (~23€ en promo, ~40€ prix normal)
- **Captéo Satin** : le satin pro (~29€ en promo, ~43€ prix normal)
- Disponible dans les magasins Tollens et en ligne

### Dulux Valentine
- La marque grand public la plus connue
- Bonne couverture, large choix de teintes
- **Prix** : 25-50€ le pot selon la gamme
- Disponible chez Leroy Merlin, Castorama, Brico Dépôt

### V33
- Bon rapport qualité-prix
- Gammes spécialisées (cuisine & bain, bois, sol)
- **Prix** : 20-40€ le pot
- Large distribution

### Zolpan
- Marque professionnelle française
- Qualité équivalente à Tollens
- Disponible uniquement en magasins Zolpan

## Où acheter au meilleur prix ?

1. **Tollens** (magasins propres) : les meilleures promos sur leur gamme (-30 à -40% en période de soldes)
2. **Brico Dépôt** : prix bas sur les marques distributeur
3. **Leroy Merlin** : large choix, prix moyens, bon service de teintage
4. **Castorama** : similaire à Leroy Merlin

**Attention** : le prix au litre est plus pertinent que le prix au pot. Un pot "pas cher" avec un faible pouvoir couvrant reviendra plus cher au m² qu'une peinture pro.

## Calculer la quantité nécessaire

**Formule** : Surface à peindre (m²) × nombre de couches ÷ rendement (m²/L)

Exemple : pièce de 20m² de murs, 2 couches, rendement 12m²/L
→ 20 × 2 ÷ 12 = **3,3L nécessaires** (prendre un pot de 4L)
    `,
  },
  "meilleurs-magasins-btp-nice": {
    title: "Les meilleurs magasins BTP à Nice et ses environs",
    category: "Guide local",
    date: "8 mars 2026",
    content: `
## Les grandes enseignes généralistes

### Leroy Merlin Nice Lingostière
- **Adresse** : 230 Boulevard du Mercantour, 06200 Nice
- **Spécialité** : tout pour la maison et le BTP
- **Avantages** : très large choix, service de découpe bois, location d'outils
- **Inconvénients** : prix moyens, souvent bondé le week-end

### Castorama Nice
- **Adresse** : 179 Boulevard du Mercantour, 06200 Nice (juste à côté de Leroy Merlin)
- **Spécialité** : bricolage, décoration, jardin
- **Avantages** : bon service client, Click & Collect rapide
- **Inconvénients** : choix moins large que Leroy Merlin sur le gros oeuvre

### Brico Dépôt Cagnes-sur-Mer
- **Adresse** : ZI La Tourre, 06800 Cagnes-sur-Mer
- **Spécialité** : matériaux à prix discount
- **Avantages** : les prix les plus bas sur la plupart des matériaux de base
- **Inconvénients** : conseil limité, ambiance "entrepôt"

## Les spécialistes

### Würth Nice (Proxishop)
- **Adresse** : ZI de l'Ariane, 06300 Nice
- **Pour qui** : artisans et professionnels du bâtiment
- **Spécialité** : visserie, fixation, outillage pro, EPI
- **Avantages** : qualité irréprochable, gamme immense (100 000+ références)

### Tollens Nice
- **Adresse** : Rue de Turin, 06300 Nice
- **Spécialité** : peinture professionnelle
- **Avantages** : conseil expert, colorimétrie sur place, promos régulières

### Point P Nice
- **Adresse** : Boulevard de l'Ariane, 06300 Nice
- **Pour qui** : professionnels (compte pro nécessaire pour les meilleurs prix)
- **Spécialité** : gros oeuvre, matériaux lourds
- **Avantages** : livraison sur chantier, prix pro très compétitifs

## Conseil d'itinéraire

Si vous devez acheter dans plusieurs enseignes, la **zone Lingostière/Mercantour** concentre Leroy Merlin, Castorama et plusieurs autres enseignes à quelques minutes les uns des autres. La **zone de l'Ariane** regroupe Würth, Point P, Cedeo et Rexel pour les achats pro.

**Utilisez BatiPrix** pour identifier les meilleurs prix avant de vous déplacer, et notre outil d'optimisation de trajet pour minimiser vos déplacements.
    `,
  },
  "acheter-materiaux-italie-frontiere": {
    title: "Acheter ses matériaux en Italie depuis Nice : ça vaut le coup ?",
    category: "Guide local",
    date: "22 février 2026",
    content: `
## La frontière italienne, un bon plan matériaux ?

Ventimiglia n'est qu'à 40 minutes de Nice par l'autoroute. Beaucoup de Niçois y font déjà leurs courses alimentaires au marché du vendredi. Mais qu'en est-il des matériaux de construction ?

## Les magasins côté italien

### Brico io Camporosso (13km de la frontière)
- **Adresse** : Via Turistica 3, 18033 Camporosso
- **Horaires** : 7j/7, 9h-19h30
- **Avantages** : chaîne italienne type Brico Dépôt, prix compétitifs sur l'outillage et la quincaillerie
- **Site web** : bricoio.it (prix en ligne)

### Trucchi Efisio - Ventimiglia (le plus gros)
- **Adresse** : Via Carabiniere Antonio Fois 4/R, Bevera
- **Surface** : 12 000 m² (!), le plus grand négoce de la zone
- **Spécialité** : matériaux construction, carrelage, salle de bain, peinture
- **Avantages** : immense choix, surtout en carrelage et salle de bain

### C.M.E. Tasselli - Vallecrosia
- **Adresse** : Via Roma 68, 18019 Vallecrosia
- **Spécialité** : ciment, briques, isolation, plomberie
- **Avantages** : bon pour le gros oeuvre

## Les prix sont-ils vraiment moins chers ?

**Oui, sur certains produits :**
- **Carrelage** : 15-30% moins cher qu'en France (l'Italie est le premier producteur européen)
- **Robinetterie et sanitaire** : 10-20% moins cher (marques italiennes comme Grohe fabriqué en Italie)
- **Ciment et matériaux de base** : 10-15% moins cher

**Non, sur d'autres :**
- **Outillage de marque** (Bosch, Makita) : prix similaires voire plus cher
- **Peinture** : pas d'avantage significatif
- **Bois** : prix similaires

## Points à considérer

1. **TVA** : l'IVA italienne est de 22% (vs 20% de TVA française) — l'écart est faible
2. **Péage** : l'A8 Nice-Ventimiglia coûte ~5€ aller-retour
3. **Temps** : comptez 1h30 aller-retour minimum
4. **Garantie** : en cas de problème, le SAV sera en Italie
5. **Taille du véhicule** : pour du gros oeuvre, il faut un utilitaire

## Notre verdict

Ça vaut le coup pour :
- Le **carrelage** et la **salle de bain** (gros écarts de prix, large choix)
- Les **gros volumes** de matériaux de base (ciment, briques) si vous avez un utilitaire

Ça ne vaut pas le coup pour :
- Les **petits achats** (le péage + le temps de trajet annulent l'économie)
- L'**outillage de marque** (même prix qu'en France)
- Les **produits lourds en petite quantité** (le transport coûte plus que l'économie)
    `,
  },
  "economiser-travaux-renovation": {
    title: "10 astuces pour économiser sur vos travaux de rénovation",
    category: "Conseils",
    date: "20 février 2026",
    content: `
## 1. Comparez TOUJOURS les prix

C'est la base. Un même produit peut coûter **15 à 30% de moins** dans une enseigne que dans une autre. Utilisez un comparateur comme BatiPrix avant chaque achat important.

## 2. Achetez au bon moment

- **Janvier-février** : soldes d'hiver, déstockage des gammes précédentes
- **Juin-juillet** : promotions d'été dans les enseignes de bricolage
- **Novembre** : Black Friday — certaines enseignes font de vraies réductions
- **Évitez** : le printemps (mars-mai) quand tout le monde rénove et les prix sont au plus haut

## 3. Optimisez vos trajets

Achetez tout au même endroit quand c'est possible. Si vous devez aller dans plusieurs magasins, planifiez votre itinéraire pour minimiser les kilomètres (BatiPrix fait ça automatiquement).

## 4. Profitez des cartes de fidélité pro

- **Brico Dépôt Pro** : -5% sur tout pour les professionnels
- **Point P** : tarifs pro significativement inférieurs aux prix publics
- **Würth** : remises sur volume pour les artisans

Même si vous n'êtes pas artisan, un statut auto-entrepreneur suffit pour accéder aux prix pro.

## 5. Achetez en gros

Les prix unitaires baissent fortement sur les achats en volume :
- Palettes de parpaings : -20% vs achat à l'unité
- Lots de peinture : souvent en "3 pour le prix de 2"
- Visserie en boîte de 500/1000 : bien moins cher qu'en blister

## 6. Considérez les marques distributeur

Les marques propres des enseignes (Magnusson chez Casto, Dexter chez LM) offrent un rapport qualité-prix souvent supérieur aux marques "premium" pour un usage occasionnel.

## 7. Louez au lieu d'acheter

Pour les outils que vous n'utiliserez qu'une fois (bétonnière, ponceuse à parquet, échafaudage), la location chez Kiloutou ou Loxam revient bien moins cher que l'achat.

## 8. Récupérez la TVA si possible

Si vous avez un statut professionnel (auto-entrepreneur, société), vous pouvez récupérer la TVA à 20% sur vos achats de matériaux. Sur un chantier à 10 000€, c'est **2 000€ d'économie**.

## 9. Négociez sur les gros montants

Au-delà de 500€ d'achat, n'hésitez pas à demander une remise, surtout chez les négoces (Point P, Cedeo, Tout Faire). Les marges sont souvent suffisantes pour accorder 5-10% de réduction.

## 10. Vérifiez les aides et subventions

- **MaPrimeRénov'** : jusqu'à 90% du coût des travaux d'isolation et de chauffage
- **CEE** (Certificats d'Économie d'Énergie) : primes complémentaires
- **TVA réduite à 5,5%** sur les travaux de rénovation énergétique
- **Éco-PTZ** : prêt à taux zéro pour les travaux d'économie d'énergie
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-cream-dark">
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="text-left py-2 pr-4 font-semibold text-navy">{cell.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i} className="border-b border-cream-dark/30">
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 pr-4">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("|")) {
        inTable = true;
        tableRows.push(line.split("|").filter(Boolean));
        continue;
      } else if (inTable) {
        inTable = false;
        flushTable();
      }

      if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-xl font-bold text-navy mt-8 mb-3">{line.replace("## ", "")}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={i} className="text-lg font-semibold text-navy mt-6 mb-2">{line.replace("### ", "")}</h3>);
      } else if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*\s*:?\s*(.*)/);
        if (match) {
          elements.push(
            <li key={i} className="ml-6 mb-1">
              <strong className="text-navy">{match[1]}</strong>{match[2] ? ` : ${match[2]}` : ""}
            </li>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(<li key={i} className="ml-6 mb-1">{line.replace("- ", "")}</li>);
      } else if (line.match(/^\d+\. /)) {
        elements.push(<li key={i} className="ml-6 mb-1 list-decimal">{line.replace(/^\d+\.\s/, "")}</li>);
      } else if (line.trim() === "") {
        continue;
      } else {
        // Bold text
        const rendered = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        elements.push(<p key={i} className="mb-3" dangerouslySetInnerHTML={{ __html: rendered }} />);
      }
    }
    flushTable();
    return elements;
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <Link href="/guides" className="text-sm text-orange hover:underline mb-4 inline-block">
          &larr; Retour aux guides
        </Link>

        <div className="mb-6">
          <span className="font-[var(--font-display)] text-xs tracking-wider text-orange uppercase bg-orange/5 px-3 py-1 rounded">
            {article.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
          {article.title}
        </h1>

        <p className="text-steel text-sm mb-8">{article.date}</p>

        <div className="bg-white rounded-2xl border border-cream-dark/20 p-8 md:p-10 text-navy/80 leading-relaxed">
          {renderContent(article.content)}
        </div>

        <div className="mt-12 bg-orange/5 border border-orange/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-navy mb-2">
            Comparez les prix maintenant
          </h2>
          <p className="text-steel mb-4">
            Trouvez le meilleur prix pour vos matériaux sur la Côte d&apos;Azur.
          </p>
          <Link
            href="/recherche"
            className="inline-block bg-orange hover:bg-orange-hot text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Rechercher un produit
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
