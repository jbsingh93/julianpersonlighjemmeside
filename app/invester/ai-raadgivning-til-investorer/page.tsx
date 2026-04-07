import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Shield, CheckCircle2, TrendingUp, Users, ArrowRight, Target, FileSearch, Lightbulb, MessageSquare, Eye, Compass, Zap, ExternalLink } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SCHEMA_IDS, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema, personRef, orgRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI Rådgivning til Investorer | Julian Bent Singh - Due Diligence, Tech Screening & AI Trend-Rådgivning",
  description: "Få teknisk validering af AI startups og strategisk AI trend-rådgivning. Julian Bent Singh hjælper investorer, bestyrelser og topledelse med at forstå fremtidens AI-udvikling og investere rigtigt.",
  keywords: ["AI rådgivning til investorer", "AI due diligence", "teknisk screening startups", "VC AI advisor", "angel investor rådgivning", "AI startup validering", "AI trends investering", "AI investerings-strategi", "AI fremtidstrends"],
  alternates: {
    canonical: `${SITE_URL}/invester/ai-raadgivning-til-investorer/`,
  },
  openGraph: {
    title: "AI Rådgivning til Investorer - Due Diligence & AI Trend-Rådgivning",
    description: "Validér dit dealflow teknisk og forstå fremtidens AI-trends. Strategisk rådgivning fra Julian Bent Singh til investorer, bestyrelser og topledelse.",
    url: `${SITE_URL}/invester/ai-raadgivning-til-investorer/`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/invester-ai-raadgivning-til-investorer/AI-raadgivning-til-investorer-julian-bent-singh.jpg`,
        width: 1200,
        height: 630,
        alt: "Julian Bent Singh - AI Rådgivning til Investorer",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Hvad koster en due diligence?",
    answer: "Prisen afhænger af omfanget og kompleksiteten af den tekniske validering. Kontakt mig for et præcist tilbud baseret på jeres behov og den specifikke startup I overvejer.",
  },
  {
    question: "Hvor lang tid tager en due diligence?",
    answer: "En screening kan gennemføres på 3-5 arbejdsdage. En fuld due diligence tager typisk 2-3 uger afhængigt af kompleksiteten af tech-stacken og adgang til information.",
  },
  {
    question: "Hvilke informationer skal jeg dele?",
    answer: "For screening: pitch deck, produkt-demo, team-oversigt. For fuld due diligence: kodebase-adgang (read-only), arkitektur-dokumentation, tech-stack beskrivelse, og adgang til at interviewe tech-teamet. Alt behandles fortroligt med NDA.",
  },
  {
    question: "Arbejder du også med internationale deals?",
    answer: "Ja, jeg arbejder med både danske og internationale VC-fonde. Alle rapporter kan leveres på engelsk eller dansk.",
  },
  {
    question: "Hvad dækker AI trend-rådgivningen?",
    answer: "Jeg hjælper investorer, bestyrelser og topledelse med at forstå, hvilke AI-trends der kommer, og hvilke virksomheder der tapper ind i de rigtige muligheder. Det handler om at se forbi hype og forstå den teknologiske retning - fra agentic AI til nye infrastruktur-lag.",
  },
  {
    question: "Hvordan kan du forudsige AI-trends?",
    answer: "Jeg har 9 års hands-on erfaring med at bygge AI-produkter og følger udviklingen på det dybeste tekniske niveau. Jeg forudsagde og byggede allerede i 2020 den agentiske AI-tilgang vi ser i dag, Claudes dominans blandt professionelle, og fremkomsten af AI-organisationer og agentsystemer. Den indsigt kommer af at bygge med teknologien hver dag - ikke bare læse om den.",
  },
];

const services = [
  {
    icon: FileSearch,
    title: "AI Tech Screening",
    description: "Hurtig vurdering af om AI-teknologien er reel eller bare buzzwords.",
    deliverables: [
      "Validering af AI-claims i pitch deck",
      "Vurdering af tech-stack og skalerbarhed",
      "Red flags og dealbreakers",
      "Go/No-go anbefaling",
    ],
    timeframe: "3-5 dage",
    pricing: "Kontakt for pris",
  },
  {
    icon: Shield,
    title: "Fuld Due Diligence",
    description: "Dybdegående teknisk validering af hele tech-fundamentet.",
    deliverables: [
      "Kodebase review (arkitektur, code quality, tech debt)",
      "AI model validering (træningsdata, performance, bias)",
      "Sikkerhedsaudit og data governance",
      "Teknisk interview med founders/CTO",
      "Skalerbarhedsvurdering og omkostningsmodel",
      "Omfattende rapport med risikovurdering",
    ],
    timeframe: "2-3 uger",
    pricing: "Kontakt for pris",
  },
  {
    icon: Users,
    title: "Løbende Tech Advisory",
    description: "Sparring og rådgivning for hele jeres portefølje.",
    deliverables: [
      "Kvartalsvis tech review af portfolio companies",
      "Deltag i board meetings som tech advisor",
      "Screening af nyt dealflow",
      "Teknisk netværk og introduktioner",
    ],
    timeframe: "Løbende samarbejde",
    pricing: "Kontakt for pris",
  },
];

export default function InvestorAdvisoryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/invester/ai-raadgivning-til-investorer/#webpage`,
        url: `${SITE_URL}/invester/ai-raadgivning-til-investorer/`,
        name: "AI Rådgivning til Investorer | Julian Bent Singh",
        description: "Teknisk due diligence, AI trend-rådgivning og strategisk validering for investorer, bestyrelser og topledelse.",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero-intro", ".service-description", ".faq-answer"]
        },
        about: personRef(),
      },
      {
        ...buildServiceSchema({
          id: `${SITE_URL}/invester/ai-raadgivning-til-investorer/#service`,
          name: "AI Rådgivning til Investorer",
          description: "Teknisk due diligence, AI trend-rådgivning og strategisk validering af AI startups. Hjælp investorer, bestyrelser og topledelse med at forstå fremtidens AI-udvikling og investere i de rigtige virksomheder.",
          url: `${SITE_URL}/invester/ai-raadgivning-til-investorer/`,
          serviceType: "Technical Advisory",
          priceDescription: "Kontakt for pris",
        }),
        provider: orgRef(),
        areaServed: [
          {
            "@type": "Country",
            name: "Denmark",
          },
          {
            "@type": "Country",
            name: "Europe",
          }
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Venture Capital Firms, Business Angels, Private Equity, Bestyrelser, Topledelse",
        },
      },
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Invester", url: "/invester/" },
          { name: "AI Rådgivning til Investorer", url: "/invester/ai-raadgivning-til-investorer/" },
        ]),
        "@id": `${SITE_URL}/invester/ai-raadgivning-til-investorer/#breadcrumb`,
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

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium mb-6 border border-yellow-400/20">
                <Shield className="w-4 h-4" />
                <span>For Investorer, Bestyrelser & Topledelse</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                AI Rådgivning til <span className="text-yellow-400">Investorer</span>
              </h1>

              <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-lg hero-intro">
                Undgå at investere i "snake oil" - og forstå hvilke AI-trends der faktisk kommer til at forme markedet. Få teknisk validering og strategisk AI-rådgivning før du skriver checken.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kontakt"
                  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 group"
                >
                  Book Screening
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-zinc-500">
                <div>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p>AI Startups</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative group">
                <Image
                  src="/invester-ai-raadgivning-til-investorer/AI-raadgivning-til-investorer-julian-bent-singh.jpg"
                  alt="Julian Bent Singh - AI Rådgivning til Investorer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">AI Iværksætter & Investor</p>
                      <p className="text-xs text-zinc-400">En af Danmarks mest erfarne AI iværksætterprofiler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Problemet med AI-Startups</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl">
              <div className="text-3xl mb-3">🚩</div>
              <h3 className="font-bold text-lg mb-2 text-red-400">Snake Oil AI</h3>
              <p className="text-zinc-400 text-sm">Mange startups påstår at bruge AI, men bruger i virkeligheden bare simple if/else statements eller third-party APIs.</p>
            </div>

            <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl">
              <div className="text-3xl mb-3">⚠️</div>
              <h3 className="font-bold text-lg mb-2 text-red-400">Overhyped Tech</h3>
              <p className="text-zinc-400 text-sm">Teknologien kan ikke skalere eller er baseret på dataset der ikke kan genbruges eller deles.</p>
            </div>

            <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-bold text-lg mb-2 text-red-400">Skjulte Omkostninger</h3>
              <p className="text-zinc-400 text-sm">AI-modeller kan være ekstremt dyre at køre i produktion. Mange startups undervurderer infrastruktur-omkostninger.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Sådan Hjælper Jeg</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto service-description">
              Jeg tilbyder tre niveauer af teknisk rådgivning - fra hurtig screening til dybdegående due diligence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-yellow-400 transition-colors group">
                <div className="w-16 h-16 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/30 transition-colors">
                  <service.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-zinc-400 mb-6 flex-grow">{service.description}</p>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Deliverables:</p>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500">Tidsramme:</span>
                    <span className="font-medium text-white">{service.timeframe}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500">Pris:</span>
                    <span className="font-bold text-yellow-400">{service.pricing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TREND ADVISORY SECTION */}
      <section className="py-24 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium mb-6 border border-yellow-400/20">
              <Compass className="w-4 h-4" />
              <span>AI Investerings-Strategi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Forstå Hvor AI Er På Vej Hen</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Due diligence validerer nutiden. Men de bedste investeringer kræver, at du forstår <span className="text-yellow-400 font-semibold">fremtiden</span>. Jeg hjælper investorer, bestyrelser og topledelse med at se, hvilke AI-trends der faktisk kommer - og hvilke virksomheder der tapper ind i dem.
            </p>
          </div>

          {/* Track Record */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Mit Track Record: Forudsigelser Der Holdt</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-black border border-green-900/40 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-green-400/10 text-green-400 text-xs font-bold rounded-bl-xl">
                  Forudsagt 2020
                </div>
                <Eye className="w-10 h-10 text-yellow-400 mb-4" />
                <h4 className="text-lg font-bold mb-3">Agentic AI Ville Komme</h4>
                <p className="text-zinc-400 text-sm mb-4">
                  Allerede i 2020 forudsagde jeg, at den agentiske tilgang til AI og byggede produkter på den - hvor AI-systemer selvstændigt udfører komplekse opgaver - ville blive den dominerende paradigme.
                </p>
                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Bekræftet: AI Agents er nu industristandard
                  </p>
                  <a
                    href="https://www.linkedin.com/posts/julianbentsingh_seo-digitalmarketing-ai-activity-6709776781727019008-rJlM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-medium hover:text-yellow-300 transition-colors"
                  >
                    Se det originale opslag fra 2020
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-6 bg-black border border-green-900/40 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-green-400/10 text-green-400 text-xs font-bold rounded-bl-xl">
                  Forudsagt tidligt
                </div>
                <Zap className="w-10 h-10 text-yellow-400 mb-4" />
                <h4 className="text-lg font-bold mb-3">Claude Ville Dominere for Professionelle</h4>
                <p className="text-zinc-400 text-sm mb-4">
                  Jeg forudsagde, at Anthropics Claude ville blive det foretrukne AI-værktøj for professionelle og virksomheder - over ChatGPT og andre konkurrenter.
                </p>
                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Bekræftet: Claude er førstevalg for professionelle
                  </p>
                  <a
                    href="https://marketers.dk/blog/mm1490/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-medium hover:text-yellow-300 transition-colors"
                  >
                    Lyt til podcast fra 2024
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-6 bg-black border border-green-900/40 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-green-400/10 text-green-400 text-xs font-bold rounded-bl-xl">
                  Forudsagt tidligt
                </div>
                <Users className="w-10 h-10 text-yellow-400 mb-4" />
                <h4 className="text-lg font-bold mb-3">AI-Organisationer & Agentsystemer</h4>
                <p className="text-zinc-400 text-sm mb-4">
                  Jeg forudsagde og tegnede fremkomsten af hele AI-organisationer og autonome agentsystemer som OpenClaw og PaperClip - hvor AI ikke bare assisterer, men driver hele organisationer.
                </p>
                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Bekræftet: AI-drevne organisationer er her
                  </p>
                  <a
                    href="https://www.linkedin.com/posts/julianbentsingh_de-5-niveauer-i-ai-automatisering-ai-growth-activity-7295347152346636288-My7G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-medium hover:text-yellow-300 transition-colors"
                  >
                    Se det originale opslag
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* What the advisory covers */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Hvad Får Du Med AI Trend-Rådgivning?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Overblik over kommende AI-trends</p>
                    <p className="text-zinc-400 text-sm">Forstå hvilke teknologiske skift der er på vej, og hvornår de rammer markedet.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Vurdering af investeringsmuligheder</p>
                    <p className="text-zinc-400 text-sm">Hvilke virksomheder tapper ind i de rigtige trends? Og hvilke satser på en blindgyde?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Strategisk sparring for bestyrelser</p>
                    <p className="text-zinc-400 text-sm">Deltag i bestyrelsesmøder og hjælp topledelsen med at forstå AI-landskabet og træffe informerede beslutninger.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Konkurrentanalyse i AI-spacet</p>
                    <p className="text-zinc-400 text-sm">Forstå det teknologiske landskab, og hvem der reelt har en fordel versus hvem der lever af hype.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-black border border-yellow-400/20 rounded-2xl">
              <Compass className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Hvorfor er dette vigtigt?</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                AI-markedet bevæger sig hurtigere end noget andet teknologiområde. De investorer der forstår, hvad der kommer om 1-3 år, investerer i de rigtige virksomheder i dag.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Min fordel er, at jeg ikke bare analyserer AI - jeg <span className="text-yellow-400 font-semibold">bygger på spydspisen hver dag</span>. Det giver en indsigt i teknologiens retning, som ingen desk research kan matche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Min Proces</h2>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Indledende Brief</h3>
                <p className="text-zinc-400">Vi taler om jeres investeringstese, dealets fase, og hvilke røde flag I er bekymrede for. Jeg modtager pitch deck og grundlæggende produktinformation.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Teknisk Analyse</h3>
                <p className="text-zinc-400">Jeg gennemgår tech-stack, tester produktet, analyserer arkitekturen, og vurderer skalerbarhed. Ved fuld due diligence får jeg read-only adgang til kodebasen.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Interview med Tech-Team</h3>
                <p className="text-zinc-400">Jeg interviewer CTO/tech lead for at forstå beslutninger, tech debt, og fremtidsplaner. Dette afslører meget om teknisk modenhed.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Rapport & Anbefaling</h3>
                <p className="text-zinc-400">I modtager en omfattende rapport med findings, røde flag, styrker, og en klar Go/No-go anbefaling. Jeg præsenterer fundet i et opfølgende møde.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS / E-E-A-T SECTION */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Hvorfor Lytte til Mig?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <Lightbulb className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Stiftet og Bygget 5 AI Virksomheder</h3>
              <p className="text-zinc-400">
                Jeg har selv grundlagt og bygget 5 AI virksomheder fra bunden. Jeg kender hele rejsen fra idé til scale-up.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <TrendingUp className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Rejst Flere Investeringsrunder</h3>
              <p className="text-zinc-400">
                Har succesfuldt rejst kapital til AI virksomheder gennem flere runder. Jeg ved præcis hvad investorer leder efter.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <Users className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">8 Års Hands-on Erfaring med AI Startups</h3>
              <p className="text-zinc-400">
                Førende hands-on AI ekspert med 8 års praktisk erfaring i at bygge, skalere og rådgive AI startups. Jeg koder selv og forstår teknologien på dybt niveau.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <Target className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Angel Investor Selv</h3>
              <p className="text-zinc-400">
                Investeret, aktiv og rådgivet i 8 AI start- og scaleups. Jeg forstår balancen mellem potentiale og risiko fra begge sider af bordet.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <MessageSquare className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Danmarks Største AI Community for Iværksættere</h3>
              <p className="text-zinc-400">
                Grundlægger af Danmarks største AI-community for iværksættere. Direkte adgang til et netværk af hundredvis af founders, investorer og AI-eksperter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Ofte Stillede Spørgsmål</h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="font-bold text-lg mb-3 flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">?</span>
                  {item.question}
                </h3>
                <p className="text-zinc-400 pl-6 leading-relaxed faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-yellow-400 text-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Klar til at investere smartere i AI?</h2>
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Lad mig hjælpe dig med at validere AI-startups, forstå fremtidens trends og investere i de virksomheder der tapper ind i de rigtige muligheder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors text-lg"
            >
              Book en Screening
            </Link>
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-black/10 text-black font-bold rounded-lg hover:bg-white/30 transition-colors text-lg"
            >
              Send en Mail
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
