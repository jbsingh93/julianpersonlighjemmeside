"use client";

import Image from "next/image";

// Virksomheder Julian har arbejdet med
const COMPANY_LOGOS = [
  { name: "Aarleff", path: "/logos/Aarleff.png" },
  { name: "Boligportal", path: "/logos/Boligportal.png" },
  { name: "Bunker Holding Group", path: "/logos/Bunker-Holding-Group-logo.png" },
  { name: "Business Lolland-Falster", path: "/logos/Business-Lolland-Falster.png" },
  { name: "Cernel", path: "/logos/Cernel.png" },
  { name: "Dansk Industri", path: "/logos/Dansk-industri.png" },
  { name: "Erhvervshus Hovedstaden", path: "/logos/Erhvervshus-Hovedstaden.png" },
  { name: "Erhvervshus Syd", path: "/logos/Erhvervshus-Syd.png" },
  { name: "KPMG", path: "/logos/kpmg.png" },
  { name: "Out of Home Media", path: "/logos/Out-of-home-media.png" },
  { name: "Pricerunner", path: "/logos/Pricerunner.png" },
  { name: "Shamballa", path: "/logos/shamballa_logo_2_1.png" },
  { name: "Siteimprove", path: "/logos/Siteimprove.png" },
  { name: "Tivoli", path: "/logos/Tivoli.png" },
  { name: "Visma Enterprise", path: "/logos/Visma-Enterprise-logo.png" },
];

export default function LogoCarousel() {
  return (
    <section className="py-16 bg-zinc-950 overflow-hidden border-b border-zinc-900">
      <div className="container mx-auto px-6 mb-8">
        <h2 className="text-center text-zinc-500 text-sm uppercase tracking-wider">
          Virksomheder, jeg har hjulpet
        </h2>
      </div>

      {/* Infinite scrolling container */}
      <div className="relative">
        {/* Gradient overlays for edge fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track - dobbelt række for seamless loop */}
        <div className="flex">
          <div className="flex animate-scroll-infinite whitespace-nowrap">
            {COMPANY_LOGOS.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 opacity-70"
              >
                <div className="relative w-40 h-20">
                  <Image
                    src={logo.path}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-scroll-infinite whitespace-nowrap" aria-hidden="true">
            {COMPANY_LOGOS.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 opacity-70"
              >
                <div className="relative w-40 h-20">
                  <Image
                    src={logo.path}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
