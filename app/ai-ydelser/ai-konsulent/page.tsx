import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Shield,
  Brain,
  Rocket,
  ArrowRight,
  Users,
  Target,
  Code,
  Zap,
  Settings,
  Layers
} from "lucide-react";
import {
  SITE_URL,
  SCHEMA_IDS,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  personRef,
} from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AI Konsulent | Strategisk Rådgivning & Teknisk Udvikling",
  description: "Få konkret forretningsværdi med en AI konsulent. Fra strategi og idéudvikling til teknisk implementering af AI-løsninger, automation og custom udvikling.",
  keywords: ["AI Konsulent", "AI Rådgivning", "AI Strategi", "Implementering af AI", "Teknisk AI Udvikling", "AI Automation", "Julian Bent Singh", "Ambidextrøs Organisation"],
  alternates: {
    canonical: `${SITE_URL}/ai-ydelser/ai-konsulent/`,
  },
  openGraph: {
    title: "AI Konsulent – Fra Hype til Bundlinje",
    description: "Strategisk AI rådgivning der sikrer reel værdiskabelse. Få hjælp til implementering, opkvalificering og strategi.",
    url: `${SITE_URL}/ai-ydelser/ai-konsulent/`,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Hvad koster en AI konsulent?",
    answer: "Prisen varierer baseret på opgavens kompleksitet og varighed. Jeg tilbyder både faste projektpriser for strategiudvikling og timebaseret rådgivning. Kontakt mig for et uforpligtende estimat.",
  },
  {
    question: "Hvordan starter vi et AI-samarbejde?",
    answer: "Vi starter typisk med et indledende møde, hvor vi afdækker jeres behov og nuværende modenhed. Herefter udarbejder jeg et forslag til et forløb, der matcher jeres ambitioner.",
  },
  {
    question: "Kan du hjælpe med teknisk udvikling af AI-løsninger?",
    answer: "Ja, ud over strategisk rådgivning tilbyder jeg også hands-on teknisk konsulentarbejde. Det omfatter alt fra idéudvikling og behovsafklaring til konkret udvikling af AI-løsninger, automation workflows, AI Agenter, vibe coding af systemer og integrationer med LLM APIs som OpenAI, Claude og Google Gemini.",
  },
  {
    question: "Hvilke virksomheder hjælper du?",
    answer: "Jeg rådgiver alt fra ambitiøse SMV'er til store C25-virksomheder. Fællesnævneren er ønsket om at bruge AI strategisk til at skabe konkurrencemæssige fordele, frem for blot at 'lege med teknologien'.",
  },
  {
    question: "Hvad er en ambidextrøs tilgang?",
    answer: "Det er evnen til at balancere den daglige drift (optimering) med innovation (udvikling). I AI-sammenhæng betyder det, at vi bruger AI til at effektivisere det I gør i dag, samtidig med at vi udforsker helt nye forretningsmuligheder.",
  }
];

export default function ConsultingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildServiceSchema({
          id: SCHEMA_IDS.aiKonsulent,
          name: "AI Konsulent & Rådgivning",
          description: "Professionel AI rådgivning og teknisk konsulentarbejde. Fra strategiudvikling og idéudvikling til konkret teknisk implementering af AI-løsninger, automation workflows og LLM integrationer. Vi bygger bro mellem teknologi og forretning.",
          url: `${SITE_URL}/ai-ydelser/ai-konsulent/`,
          serviceType: "AI Consulting",
          priceDescription: "Kontakt for tilbud",
        }),
        performer: personRef(),
      },
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "AI Ydelser", url: "/ai-ydelser/" },
          { name: "AI Konsulent", url: "/ai-ydelser/ai-konsulent/" },
        ]),
        "@id": `${SITE_URL}/ai-ydelser/ai-konsulent/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <JsonLd schema={schema} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-zinc-300 text-sm font-medium">Strategisk AI Rådgivning</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
                Jeres <span className="text-gradient">AI Konsulent</span> og Strategiske Partner
              </h1>

              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                Gå fra hype til håndgribelig forretningsværdi. Jeg hjælper visionære virksomheder med at integrere AI i kernen af deres strategi – fra rådgivning og idéudvikling til konkret teknisk implementering.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
                  Book indledende møde
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#ydelser" className="px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center">
                  Se hvordan jeg arbejder
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 relative">
               <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
                  <Image
                    src="/ai-ydelser-ai-konsulent/førende-ai-konsulent-julian-bent-singh.jpg"
                    alt="Julian Bent Singh - Førende AI Konsulent i Danmark"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
               </div>

               {/* Floating Badge */}
               <div className="absolute -bottom-6 -left-6 z-20 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                      <Target size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Fokus</p>
                      <p className="font-bold text-white">Forretningsværdi & ROI</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Grid */}
      <section id="ydelser" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI Strategi",
                  desc: "Vi udvikler en klar roadmap for jeres AI-rejse, der understøtter jeres overordnede forretningsmål."
                },
                {
                  icon: Rocket,
                  title: "Implementering",
                  desc: "Fra pilotprojekt til fuld skalering. Jeg sikrer, at teknologien bliver forankret i organisationen."
                },
                {
                  icon: Shield,
                  title: "Governance & Etik",
                  desc: "Få styr på retningslinjer, sikkerhed og dataetik, så I kan bruge AI ansvarligt og compliant."
                }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-colors group">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/10 transition-colors">
                    <item.icon className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practical & Technical Consulting */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 backdrop-blur-sm mb-6">
                <Code className="text-yellow-400" size={16} />
                <span className="text-yellow-400 text-sm font-bold">Praktisk & Teknisk</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Lej mig til <span className="text-gradient">hands-on</span> konsulentarbejde
              </h2>
              <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                Ud over strategisk rådgivning kan jeg også hyres til konkret, teknisk konsulentarbejde –
                fra idéudvikling til færdige AI-løsninger.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Idéudvikling",
                  desc: "Vi faciliterer workshops og brainstorms, hvor vi identificerer konkrete AI use-cases, der skaber værdi for jeres forretning. Jeg hjælper med at vurdere teknisk feasibility og potentiale.",
                },
                {
                  icon: Layers,
                  title: "Behovsafklaring",
                  desc: "Gennem interviews og procesanalyse afdækker vi præcis, hvad I har brug for. Vi sikrer, at alle interessenter er alignet, inden vi går i gang med udvikling.",
                },
                {
                  icon: Settings,
                  title: "Processafklaring",
                  desc: "Jeg designer workflows og processer, der integrerer AI-løsninger i jeres eksisterende setup. Vi kortlægger dataflows, godkendelsesprocesser og ansvarsfordeling.",
                },
                {
                  icon: Code,
                  title: "Teknisk udvikling",
                  desc: "Fra prototyper til produktionsklare løsninger. Jeg bygger custom AI-løsninger med LLM APIs, automation workflows, agents og integrationer til jeres systemer.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-yellow-400/10 transition-colors">
                      <item.icon className="text-yellow-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Stack Highlight */}
            <div className="mt-12 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-yellow-400" size={20} />
                <h3 className="text-lg font-bold">Udpluk af teknologier jeg arbejder med og kan hjælpe jeres virksomhed med</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  "OpenAI API",
                  "Anthropic Claude",
                  "Google Gemini",
                  "LangChain",
                  "Make.com",
                  "Zapier",
                  "n8n",
                  "Claude Code",
                  "Cursor",
                  "REST APIs",
                  "MCPs",
                  "Claude Skills",
                  "Lovable AI",
                  "Claude Agent SDK",
                  "Supabase suite (Postgres, Edge Functions, osv.)",
                  "Vector Databases/RAG",
                ].map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:border-yellow-400/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ambidextrous Approach (Unique Selling Point) */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                   {/* Method Image */}
                   <div className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
                      <Image
                        src="/ai-ydelser-ai-konsulent/AI-konsulenten-julian-bent-singh.jpg"
                        alt="AI konsulent Julian Bent Singh - Den ambidextrøse tilgang til AI strategi"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                   </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-yellow-400" size={24} />
                    <span className="text-yellow-400 font-bold tracking-wide uppercase text-sm">Metoden</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Den Ambidextrøse Organisation</h2>
                  
                  <div className="space-y-6 text-zinc-400">
                    <p>
                      Succes med AI handler ikke kun om teknologi, men om balance. Jeg arbejder ud fra princippet om den ambidextrøse (tve-håndede) organisation.
                    </p>
                    <p>
                      Det betyder, at vi arbejder i to spor samtidigt:
                    </p>
                    
                    <ul className="space-y-4 mt-6">
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-yellow-400 font-bold">1</div>
                        <div>
                          <strong className="text-white block mb-1">Exploitation (Drift)</strong>
                          Vi bruger AI til at optimere, automatisere og effektivisere det, I allerede gør i dag.
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-yellow-400 font-bold">2</div>
                        <div>
                          <strong className="text-white block mb-1">Exploration (Innovation)</strong>
                          Vi bruger AI til at udforske helt nye forretningsmodeller, produkter og markeder.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-8 border-t border-zinc-800">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Users className="text-yellow-400" size={20} />
                        Ekspert Teamet
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4">
                        Jeg samarbejder med specialister for at dække hele spektret:
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800 text-sm flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700 shrink-0">
                            <Image
                              src="/ai-ydelser-ai-konsulent/Rasmus-madsen.png"
                              alt="Rasmus Madsen - Strategisk Rådgiver"
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <span className="block font-bold text-white">Rasmus Madsen</span>
                            <span className="text-zinc-500">Strategisk Rådgiver</span>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800 text-sm flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700 shrink-0">
                            <Image
                              src="/ai-ydelser-ai-konsulent/Casper-guldager.png"
                              alt="Casper Guldager - Innovationsspecialist"
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <span className="block font-bold text-white">Casper Guldager</span>
                            <span className="text-zinc-500">Innovationsspecialist</span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Sådan arbejder vi</h2>
            <p className="text-zinc-400 text-lg">
              En struktureret proces sikrer, at I ikke farer vild i mulighederne.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { title: "1. Analyse", desc: "Vi kortlægger jeres nuværende setup og data." },
              { title: "2. Strategi", desc: "Vi udvælger de use-cases med højest ROI." },
              { title: "3. Eksekvering", desc: "Vi implementerer løsningerne agilt." },
              { title: "4. Forankring", desc: "Vi sikrer adoption via træning." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-zinc-800 mb-4 opacity-50">{i + 1}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-8 h-[1px] bg-zinc-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services (Internal Linking for SEO) */}
      <section className="py-24 border-t border-zinc-900 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Andre måder vi kan samarbejde på</h2>
            <p className="text-zinc-400">
              Måske har I brug for opkvalificering før I er klar til strategisk implementering?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <Link href="/ai-ydelser/fysiske-ai-kurser" className="group bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">AI Kurser</h3>
                  <ArrowRight className="text-zinc-500 group-hover:text-yellow-400 transition-colors" />
                </div>
                <p className="text-zinc-400">
                  Praktiske kurser i ChatGPT, Copilot og prompting for medarbejdere og ledere.
                </p>
             </Link>

             <Link href="/ai-ydelser/ai-foredrag" className="group bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">AI Foredrag</h3>
                  <ArrowRight className="text-zinc-500 group-hover:text-yellow-400 transition-colors" />
                </div>
                <p className="text-zinc-400">
                  Inspirerende oplæg der klæder hele organisationen på til fremtiden med AI.
                </p>
             </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="bg-yellow-400 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Skal vi løfte jeres forretning med AI?
              </h2>
              <p className="text-black/80 text-xl mb-10 font-medium">
                Vent ikke på at konkurrenterne gør det. Book et uforpligtende møde og hør om mulighederne.
              </p>
              <Link 
                href="/kontakt" 
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all hover:scale-105"
              >
                Book en gratis konsultation
                <ArrowRight size={18} />
              </Link>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Ofte stillede spørgsmål</h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                  <p className="text-zinc-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
