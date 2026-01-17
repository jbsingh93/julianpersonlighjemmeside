import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SCHEMA_IDS,
  buildBreadcrumbSchema,
  buildFAQSchema,
  orgRef,
} from "@/lib/schema";
import {
  Users,
  GraduationCap,
  Lightbulb,
  Mic,
  Laptop,
  Video,
  Compass,
  ArrowRight,
  Trophy,
  Target,
  Handshake,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Ydelser | AI Kurser, Workshops, Foredrag & Rådgivning | Julian Bent Singh",
  description: "Udforsk Julians AI ydelser: AI kurser, workshops, foredrag, konsulentbistand og mentorordninger. Skræddersyede løsninger til virksomheder der vil mestre AI.",
  keywords: [
    "AI Ydelser",
    "AI Kurser",
    "AI Workshop",
    "AI Foredrag",
    "AI Konsulent",
    "AI Rådgivning",
    "AI Opkvalificering",
    "AI Mentor",
    "ChatGPT Kursus",
    "AI Uddannelse Virksomhed",
  ],
  alternates: {
    canonical: `${SITE_URL}/ai-ydelser/`,
  },
  openGraph: {
    title: "AI Ydelser – Kurser, Workshops, Foredrag & Rådgivning",
    description: "Skræddersyede AI-løsninger til virksomheder. Fra hands-on workshops til strategisk rådgivning.",
    url: `${SITE_URL}/ai-ydelser/`,
    type: "website",
  },
};

// Alle AI ydelser
const services = [
  {
    name: "AI Workshop",
    slug: "fysisk-ai-workshop",
    description: "Hands-on workshop hvor dit team arbejder med konkrete AI use-cases. Praktisk læring med øjeblikkelig værdi.",
    duration: "Halv til hel dag",
    icon: Users,
    highlights: ["Praktiske øvelser", "Jeres egne cases", "Konkrete resultater"],
  },
  {
    name: "AI Kurser",
    slug: "fysiske-ai-kurser",
    description: "Strukturerede læringsforløb der løfter hele organisationens AI-kompetencer. Fra begynder til avanceret niveau.",
    duration: "1 dag til 6 uger",
    icon: GraduationCap,
    highlights: ["Niveauopdelt", "Certificering", "Fleksibelt format"],
  },
  {
    name: "AI Konsulent",
    slug: "ai-konsulent",
    description: "Strategisk AI-rådgivning til virksomheder. Få hjælp til at identificere use-cases og implementere AI korrekt.",
    duration: "Løbende samarbejde",
    icon: Lightbulb,
    highlights: ["Strategi & roadmap", "Use-case identificering", "Governance"],
  },
  {
    name: "AI Foredrag",
    slug: "foredrag",
    description: "Inspirerende keynotes om AI til konferencer, ledermøder og virksomhedsevents. Tilpasset jeres publikum.",
    duration: "30-90 minutter",
    icon: Mic,
    highlights: ["Keynotes", "Paneldebatter", "Firmaarrangementer"],
  },
  {
    name: "Online AI Workshop",
    slug: "online-ai-workshop",
    description: "Virtuelle workshops der bringer AI-læring direkte til jeres skærm. Samme kvalitet, mere fleksibilitet.",
    duration: "2-4 timer",
    icon: Laptop,
    highlights: ["Live undervisning", "Interaktive øvelser", "Geografisk fleksibelt"],
  },
  {
    name: "Online AI Kurser",
    slug: "online-ai-kurser",
    description: "Selvstyrende onlinekurser med video, øvelser og certificering. Lær i dit eget tempo.",
    duration: "Selvstyrende",
    icon: Video,
    highlights: ["On-demand", "Video-moduler", "Certificering"],
  },
  {
    name: "AI Mentor",
    slug: "ai-mentor",
    description: "Personlig 1:1 mentorordning for ledere og specialister der vil accelerere deres AI-rejse.",
    duration: "3-6 måneder",
    icon: Compass,
    highlights: ["1:1 sparring", "Personlig roadmap", "Løbende support"],
  },
];

const faqItems = [
  {
    question: "Hvilken AI ydelse passer bedst til min virksomhed?",
    answer: "Det afhænger af jeres nuværende AI-modenhed og mål. Workshops er ideelle til at kickstarte AI-rejsen, kurser til systematisk opkvalificering, og konsulentbistand til strategisk implementering. Kontakt mig for en uforpligtende snak om jeres behov.",
  },
  {
    question: "Kan ydelserne kombineres?",
    answer: "Ja, mange virksomheder starter med en workshop for at skabe momentum, efterfulgt af kurser for bredere opkvalificering, og konsulentbistand til at sikre korrekt implementering.",
  },
  {
    question: "Hvad koster det?",
    answer: "Prisen afhænger af ydelsens type, varighed og antal deltagere. Kontakt mig for et skræddersyet tilbud baseret på jeres specifikke behov.",
  },
  {
    question: "Hvor lang tid i forvejen skal jeg booke?",
    answer: "Jeg anbefaler at booke 2-4 uger i forvejen for workshops og foredrag, og 1-2 uger for online ydelser. Ved større arrangementer eller specifikke datoer anbefaler jeg endnu tidligere henvendelse.",
  },
];

export default function AIServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ItemList over alle services
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/ai-ydelser/#servicelist`,
        name: "AI Ydelser",
        description: "Oversigt over AI-relaterede ydelser fra Julian Bent Singh",
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": SCHEMA_IDS[service.slug.replace(/-/g, "") as keyof typeof SCHEMA_IDS] || `${SITE_URL}/ai-ydelser/${service.slug}/#service`,
            name: service.name,
            description: service.description,
            url: `${SITE_URL}/ai-ydelser/${service.slug}/`,
            provider: orgRef(),
          },
        })),
      },
      // WebPage for this overview
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/ai-ydelser/#page`,
        name: "AI Ydelser – Kurser, Workshops, Foredrag & Rådgivning",
        description: "Oversigt over AI-ydelser fra Julian Bent Singh",
        url: `${SITE_URL}/ai-ydelser/`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "AI Ydelser", url: "/ai-ydelser/" },
        ]),
        "@id": `${SITE_URL}/ai-ydelser/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <JsonLd schema={schema} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-yellow-400/10 to-transparent opacity-30 pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            AI <span className="text-yellow-400">Ydelser</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Fra hands-on workshops til strategisk rådgivning.
            <br className="hidden md:block" />
            Find den ydelse der accelererer jeres AI-rejse.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 pb-24">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/ai-ydelser/${service.slug}/`}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(250,204,21,0.15)] flex flex-col"
            >
              <div className="mb-6 inline-flex p-3 rounded-xl bg-zinc-800/50 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
                <service.icon size={32} />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                {service.name}
              </h2>
              
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed flex-grow">
                {service.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {service.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded-md border border-zinc-700/50"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <span className="text-yellow-400/90 text-sm font-medium">
                    {service.duration}
                  </span>
                  <span className="flex items-center gap-2 text-zinc-500 text-sm group-hover:text-yellow-400 transition-colors font-medium">
                    Læs mere <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Choose Section - Redesigned */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hvorfor vælge Julian?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Jeg kombinerer dyb teknisk indsigt med forretningsforståelse.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl">
              <div className="bg-yellow-400/10 w-12 h-12 rounded-full flex items-center justify-center text-yellow-400 mb-6">
                <Trophy size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Anerkendt ekspert</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Udnævnt som en af Danmarks 10 største AI-influencers af Ritzau. 8+ års erfaring med implementering af AI i danske virksomheder.
              </p>
            </div>
            
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl">
              <div className="bg-yellow-400/10 w-12 h-12 rounded-full flex items-center justify-center text-yellow-400 mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Praktisk fokus</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Ingen fluff eller buzzwords – kun hands-on læring og konkrete værktøjer, der skaber reel værdi for din virksomhed fra dag ét.
              </p>
            </div>
            
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl">
              <div className="bg-yellow-400/10 w-12 h-12 rounded-full flex items-center justify-center text-yellow-400 mb-6">
                <Handshake size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Skræddersyet</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Alle forløb tilpasses jeres branche, kompetenceniveau og specifikke mål. Jeg sætter mig ind i jeres virkelighed.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section - Redesigned */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Ofte stillede spørgsmål</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
                <h3 className="font-bold text-lg mb-3 flex items-start gap-3">
                  <span className="text-yellow-400 mt-1"><CheckCircle2 size={18} /></span>
                  {item.question}
                </h3>
                <p className="text-zinc-400 pl-8 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klar til at komme i gang med AI?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto text-lg">
            Book en uforpligtende snak, hvor vi kan drøfte jeres behov og finde den rette løsning for jer.
          </p>
          <Link
            href="/kontakt/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg shadow-yellow-400/20"
          >
            Book en samtale <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
