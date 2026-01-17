import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Target, Rocket, TrendingUp, CheckCircle2, Mail, FileText, Users, Code, HandshakeIcon, Briefcase, Network } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema, buildFAQSchema, personRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pitch Din AI Startup | Julian Bent Singh - Angel Investor",
  description: "Søger du funding til din AI startup? Send dit pitch deck til Julian Bent Singh. Angel investor med fokus på early-stage AI virksomheder i Danmark og Europa.",
  keywords: ["Pitch AI Startup", "Angel Investor Danmark", "AI Funding", "Startup Investment", "Pre-seed Funding"],
  alternates: {
    canonical: `${SITE_URL}/invester/pitch/`,
  },
  openGraph: {
    title: "Pitch Din AI Startup til Julian Bent Singh",
    description: "Angel investor søger ambitiøse AI founders. Send dit pitch deck i dag.",
    url: `${SITE_URL}/invester/pitch/`,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Investerer du kun med cash?",
    answer: "Nej, jeg tilbyder fleksible investment strukturer. Udover traditionel kapital kan jeg også investere med sweat equity (hands-on produktudvikling), netværk og introduktioner, eller indtræde i bestyrelse/advisory board. Vi finder den kombination der giver mest værdi for jeres startup.",
  },
  {
    question: "Hvor meget investerer du typisk?",
    answer: "Jeg investerer primært i pre-seed og seed runder. Checkstørrelsen varierer afhængigt af projektet, men typisk mellem 50.000 - 500.000 DKK som angel investor. Derudover kan jeg tilbyde sweat equity og advisory support.",
  },
  {
    question: "Skal jeg have traction før jeg pitcher?",
    answer: "Ikke nødvendigvis. Jeg investerer i potentiale og team, ikke kun traction. Men jeg vil gerne se at I har valideret problemet og har en plan for go-to-market.",
  },
  {
    question: "Hvor lang tid tager det at få svar?",
    answer: "Jeg stræber efter at give initial feedback inden for 1 uge. Hvis jeg er interesseret, kan vi typisk have et første møde inden for 2 uger.",
  },
];

export default function PitchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/invester/pitch/#page`,
        name: "Pitch Din Idé til Julian Bent Singh",
        description: "Send dit pitch deck og søg funding til din AI startup.",
        url: `${SITE_URL}/invester/pitch/`,
        about: personRef(),
      },
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Invester", url: "/invester/" },
          { name: "Pitch", url: "/invester/pitch/" },
        ]),
        "@id": `${SITE_URL}/invester/pitch/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <JsonLd schema={schema} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-400/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-900/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium mb-6 border border-yellow-400/20">
              <Rocket className="w-4 h-4" />
              <span>Angel Investment</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Pitch Din <span className="text-yellow-400">AI Startup</span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Jeg investerer i ambitiøse founders der bygger fremtidens AI-virksomheder. Har du det næste store? Send dit pitch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:jbs@ai-growth-minds.dk"
                className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 group"
              >
                <Mail className="w-5 h-5" />
                Send Dit Pitch
              </a>
              <Link
                href="/invester/portefoelje"
                className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-lg hover:border-yellow-400 transition-colors"
              >
                Se Min Portefølje
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HVAD JEG LEDER EFTER */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Hvad Jeg Leder Efter</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Jeg fokuserer på early-stage AI startups med klart potentiale for skalering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <div className="w-14 h-14 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-400/30 transition-colors">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Skalérbar Model</h3>
              <p className="text-zinc-400 text-sm">
                En forretningsmodel der kan skalere uden lineær omkostningsvækst. SaaS, marketplace eller platform-modeller.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Code className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stærk Tech</h3>
              <p className="text-zinc-400 text-sm">
                Solid teknisk arkitektur og kompetent tech-team. AI skal være en reel differentiator, ikke bare buzzwords.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Eksekverende Team</h3>
              <p className="text-zinc-400 text-sm">
                Founders der kan eksekvere. Gerne komplementære kompetencer og erfaring med at bygge produkter.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Klar Vision</h3>
              <p className="text-zinc-400 text-sm">
                En tydelig vision for hvordan I vil dominere jeres marked og skabe langsigtet værdi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HVAD JEG TILBYDER */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Mere End Bare Kapital</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Jeg investerer ikke kun med penge - jeg går aktivt ind i jeres virksomhed med hands-on support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors">
              <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cash Investment</h3>
              <p className="text-zinc-400 text-sm">
                Traditionel kapitalinvestering i pre-seed og seed runder for at finansiere jeres vækst.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors">
              <div className="w-14 h-14 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center mb-4">
                <Code className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sweat Equity</h3>
              <p className="text-zinc-400 text-sm">
                Jeg kan investere min tid og kompetencer direkte i produktudvikling, tech-arkitektur eller AI-implementering.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors">
              <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                <Network className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Netværk & Influence</h3>
              <p className="text-zinc-400 text-sm">
                Adgang til Danmarks største AI-community for iværksættere samt netværk af investorer, kunder og partnere.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors">
              <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bestyrelse & Advisory</h3>
              <p className="text-zinc-400 text-sm">
                Jeg kan indtræde i bestyrelse eller advisory board og bidrage med strategisk sparring og teknisk vejledning.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-xl max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <HandshakeIcon className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-yellow-400 mb-2">Fleksible Investment Strukturer</p>
                <p className="text-zinc-300">
                  Jeg tilpasser mit engagement efter jeres behov. Det kan være en kombination af cash, sweat equity og advisory - lad os finde den struktur der giver mest værdi for jeres startup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PITCH PROCESS */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pitch Processen</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Fra første kontakt til investering - sådan ser forløbet ud.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Send Pitch Deck</h3>
                <p className="text-zinc-400">
                  Brug "Send Dit Pitch" knappen på siden for at sende dit pitch deck. Inkludér gerne en kort intro om dig selv og teamet.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Initial Review (1 uge)</h3>
                <p className="text-zinc-400">
                  Jeg gennemgår dit pitch deck og vurderer om det er et match. Du får svar inden for en uge.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Første Møde</h3>
                <p className="text-zinc-400">
                  Hvis jeg er interesseret, booker vi et møde hvor du pitcher og vi dykker dybere ned i forretningen og teknologien.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Due Diligence & Term Sheet</h3>
                <p className="text-zinc-400">
                  Teknisk validering, team-vurdering og forretningscase. Hvis alt ser godt ud, kommer vi med et term sheet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HVAD SKAL INKLUDERES */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hvad Skal Dit Pitch Deck Inkludere?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Et godt pitch deck er tydeligt, konkret og fortæller en overbevisende historie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Problem & Løsning",
              "Markedsstørrelse & Mulighed",
              "Produkt & Teknologi",
              "Traction & Metrics",
              "Forretningsmodel",
              "Go-to-Market Strategi",
              "Team & Kompetencer",
              "Konkurrence & Differentiering",
              "Finansielle Projekter",
              "Funding Ask & Use of Funds"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-yellow-400 mb-2">Pro tip</p>
                <p className="text-zinc-300">
                  Hold dit deck på 10-15 slides. Vær konkret og databaseret. Vis ikke bare hvad I laver, men hvorfor det betyder noget og hvordan I vil vinde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Ofte Stillede Spørgsmål</h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="font-bold text-lg mb-3 flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">?</span>
                  {item.question}
                </h3>
                <p className="text-zinc-400 pl-6 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-yellow-400 text-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Klar til at pitche?</h2>
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Send dit pitch deck i dag. Jeg ser frem til at høre om dit projekt.
          </p>
          <a
            href="mailto:jbs@ai-growth-minds.dk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors text-lg"
          >
            <Mail className="w-5 h-5" />
            jbs@ai-growth-minds.dk
          </a>
        </div>
      </section>
    </div>
  );
}
