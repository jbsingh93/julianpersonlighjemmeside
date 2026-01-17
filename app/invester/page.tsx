import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Lightbulb, Shield, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema, personRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Invester | Julian Bent Singh - Angel Investor i AI & Tech Startups",
  description: "Julian Bent Singh investerer i early-stage AI startups. Se portefølje, pitch din idé, eller få hjælp til due diligence af AI virksomheder.",
  keywords: ["Julian Bent Singh Investor", "AI Angel Investor Danmark", "Tech Startup Investment", "AI Due Diligence"],
  alternates: {
    canonical: `${SITE_URL}/invester/`,
  },
  openGraph: {
    title: "Julian Bent Singh - Angel Investor i AI & Tech",
    description: "Investerer i early-stage AI startups. Teknisk due diligence og rådgivning til investorer.",
    url: `${SITE_URL}/invester/`,
    type: "website",
  },
};

export default function InvesterPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/invester/#page`,
        name: "Julian Bent Singh - Angel Investor",
        description: "Investeringer i early-stage AI startups, pitch muligheder, og due diligence services.",
        url: `${SITE_URL}/invester/`,
        about: personRef(),
      },
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Invester", url: "/invester/" },
        ]),
        "@id": `${SITE_URL}/invester/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <JsonLd schema={schema} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-400/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-900/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium mb-6 border border-yellow-400/20">
              <TrendingUp className="w-4 h-4" />
              <span>Angel Investor</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Investering i <span className="text-yellow-400">AI & Tech Startups</span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Jeg investerer i early-stage startups med fokus på anvendt AI. Samtidig hjælper jeg andre investorer med at validere deres dealflow teknisk.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN NAVIGATION CARDS */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Portefølje Card */}
            <Link
              href="/invester/portefoelje"
              className="group p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
            >
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <TrendingUp className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                Mine Investeringer
              </h2>

              <p className="text-zinc-400 mb-6 leading-relaxed">
                Se min portefølje af AI og tech startups. Oversigt over virksomheder jeg har investeret i og hvorfor.
              </p>

              <span className="text-yellow-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Se portefølje <ArrowRight className="w-5 h-5" />
              </span>
            </Link>

            {/* Pitch Card */}
            <Link
              href="/invester/pitch"
              className="group p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
            >
              <div className="w-16 h-16 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/30 transition-colors">
                <Lightbulb className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                Pitch Din Idé
              </h2>

              <p className="text-zinc-400 mb-6 leading-relaxed">
                Søger du funding til din AI startup? Send dit pitch deck og lad os tage en snak om dit projekt.
              </p>

              <span className="text-yellow-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Send pitch <ArrowRight className="w-5 h-5" />
              </span>
            </Link>

            {/* For Investorer Card */}
            <Link
              href="/invester/ai-raadgivning-til-investorer"
              className="group p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                <Shield className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                For Investorer
              </h2>

              <p className="text-zinc-400 mb-6 leading-relaxed">
                Teknisk due diligence og screening af AI startups. Hjælp til at validere dealflow og undgå "snake oil".
              </p>

              <span className="text-yellow-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Se services <ArrowRight className="w-5 h-5" />
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* INVESTMENT FOCUS SECTION */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Hvad jeg leder efter</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Skalérbar Forretningsmodel</h3>
              <p className="text-zinc-400">
                Virksomheder med en tydelig vej til profitabilitet og skalering. Ikke kun tech for tech's skyld.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Stærkt Teknisk Fundament</h3>
              <p className="text-zinc-400">
                Solid teknisk arkitektur og kompetente founders der forstår deres tech stack.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Tydelig AI Differentiator</h3>
              <p className="text-zinc-400">
                AI skal være en kernedel af value proposition, ikke bare et buzzword.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Early-Stage Focus</h3>
              <p className="text-zinc-400">
                Primært pre-seed og seed stage. Jeg investerer i potentiale og team, ikke kun traction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-yellow-400 text-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Klar til næste skridt?</h2>
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Uanset om du søger funding eller hjælp til at validere dit dealflow, så kontakt mig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/invester/pitch"
              className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors text-lg"
            >
              Send Dit Pitch
            </Link>
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-black/10 text-black font-bold rounded-lg hover:bg-white/30 transition-colors text-lg"
            >
              Kontakt Mig
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
