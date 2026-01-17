import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Sparkles, Users, GraduationCap } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema, personRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Mine Investeringer | Julian Bent Singh Portfolio",
  description: "Oversigt over Julian Bent Singhs investeringer i AI, SaaS og tech startups. Angel investor med fokus på early-stage AI virksomheder.",
  keywords: ["Julian Bent Singh Investeringer", "AI Angel Investor", "Tech Startup Investor Danmark"],
  alternates: {
    canonical: `${SITE_URL}/invester/portefoelje/`,
  },
};

const portfolioCompanies = [
  {
    name: "Vallora AI",
    url: "https://www.vallora.dk/",
    category: "PropTech / AI",
    icon: Sparkles,
    description: "AI-drevet platform til automatisering af servitut-søgning for ejendomsmæglere. Sparer 2-3 timer pr. ejendomshandel ved at scanne dokumenter automatisk og identificere relevante servitutter på sekunder.",
    highlights: ["AI-dokumentscanning", "Ejendomsbranchen", "Automatisering"],
  },
  {
    name: "Rebel by Heart",
    url: "https://rebelbyheart.dk/",
    category: "Community / Lifestyle",
    icon: Users,
    description: "Community-platform der skaber engagement gennem visuelt indhold og kultur. Fokus på at differentiere sig gennem kreativitet og en ung, dynamisk tilgang til community-building.",
    highlights: ["Community", "Kreativt indhold", "Lifestyle"],
  },
  {
    name: "AI AGENT SKOLEN",
    url: null,
    category: "EdTech / AI",
    icon: GraduationCap,
    description: "Danmarks første komplette uddannelses- og træningsforløb til store virksomheder, der gerne vil opkvalificere deres arbejdsstyrke i at bygge, iværksætte og udrulle AI Agenter i organisationen.",
    highlights: ["AI-uddannelse", "Enterprise", "AI Agents"],
  },
];

export default function PortfolioPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/invester/portefoelje/#page`,
        name: "Julian Bent Singhs Investeringsportefølje",
        description: "Oversigt over investeringer i AI, SaaS og tech startups.",
        url: `${SITE_URL}/invester/portefoelje/`,
        about: personRef(),
      },
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Invester", url: "/invester/" },
          { name: "Portefølje", url: "/invester/portefoelje/" },
        ]),
        "@id": `${SITE_URL}/invester/portefoelje/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-24 px-6">
      <JsonLd schema={schema} />
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Mine <span className="text-yellow-400">Investeringer</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Jeg investerer aktivt i early-stage startups med fokus på anvendt AI,
            community-building og innovative uddannelsesløsninger.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8">
          {portfolioCompanies.map((company, index) => (
            <div
              key={index}
              className="group relative p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-yellow-400/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-400/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 group-hover:text-black transition-all duration-300">
                    <company.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-yellow-400 font-medium text-sm uppercase tracking-wider">
                        {company.category}
                      </p>
                    </div>

                    {company.url && (
                      <Link
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-yellow-400 hover:text-black border border-zinc-700 hover:border-yellow-400 rounded-lg transition-all text-sm font-medium"
                      >
                        Besøg site
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {company.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {company.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-full text-xs font-medium text-zinc-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Har du et projekt, jeg skal høre om?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Jeg er altid interesseret i at høre om innovative AI-projekter og startups
            der løser reelle problemer.
          </p>
          <Link
            href="/invester/pitch"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Send dit pitch
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
