import Image from "next/image";
import Link from "next/link";

const PRESS_LOGOS = [
  {
    name: "Jyllands-Posten",
    path: "/logos/press/jyllands-posten.png",
    href: "https://jyllands-posten.dk/erhverv/ECE19197351/julian-har-forhandlet-en-millionaftale-med-hjaelp-fra-aijesus-og-elon-musk/",
  },
  {
    name: "Børsen",
    path: "/logos/press/borsen.png",
    href: "https://borsen.dk/nyheder/opinion/mine-ai-agenter-mangler-en-bankkonto-og-det-er-bestyrelsens-problem",
  },
  {
    name: "Via Ritzau",
    path: "/logos/press/via-ritzau.png",
    href: "https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers",
  },
  {
    name: "Computerworld",
    path: "/logos/press/computerworld.png",
    href: "https://www.computerworld.dk/art/290123/noergaard-skal-vi-satse-paa-open-source-eller-amerikansk-big-tech-i-denne-urolige-tid",
  },
];

export default function PressLogoStrip() {
  return (
    <section
      aria-labelledby="omtalt-i-heading"
      className="py-10 bg-zinc-950 border-b border-zinc-900"
    >
      <div className="container mx-auto px-6 mb-6">
        <h2
          id="omtalt-i-heading"
          className="text-center text-zinc-500 text-sm uppercase tracking-wider"
        >
          Omtalt i pressen
        </h2>
      </div>

      <div className="container mx-auto px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 md:gap-x-20">
          {PRESS_LOGOS.map((logo) => (
            <li key={logo.name}>
              <Link
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={`Læs omtale af Julian Bent Singh i ${logo.name}`}
                className="block opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <div className="relative h-8 sm:h-10 md:h-12 w-32 sm:w-36 md:w-44">
                  <Image
                    src={logo.path}
                    alt={`${logo.name} logo`}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 176px"
                    className="object-contain"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
