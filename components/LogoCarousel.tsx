"use client";

import Image from "next/image";

const LOGOS = [
  { name: "Leroy Merlin", file: "/logos/leroy-merlin.png" },
  { name: "Castorama", file: "/logos/castorama.png" },
  { name: "Brico Dépôt", file: "/logos/brico-depot.png" },
  { name: "Würth", file: "/logos/wurth.png" },
  { name: "ManoMano", file: "/logos/manomano.png" },
  { name: "Bricorama", file: "/logos/bricorama.png" },
  { name: "Point P", file: "/logos/point-p.png" },
  { name: "Tollens", file: "/logos/tollens.svg" },
  { name: "Bricomarché", file: "/logos/bricomarche.png" },
  { name: "Mr Bricolage", file: "/logos/mr-bricolage.png" },
  { name: "Cedeo", file: "/logos/cedeo.png" },
  { name: "Rexel", file: "/logos/rexel.png" },
  { name: "Kiloutou", file: "/logos/kiloutou.png" },
  { name: "Loxam", file: "/logos/loxam.svg" },
  { name: "Weldom", file: "/logos/weldom.png" },
];

export function LogoCarousel() {
  // Double the logos for seamless infinite scroll
  const allLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

      {/* Scrolling track */}
      <div className="flex items-center gap-12 animate-scroll">
        {allLogos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            title={logo.name}
          >
            <Image
              src={logo.file}
              alt={logo.name}
              width={120}
              height={48}
              className="object-contain max-h-12"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
