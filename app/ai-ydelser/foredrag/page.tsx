import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mic, Users, Zap, CheckCircle2, ArrowRight, Calendar, Star } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SCHEMA_IDS,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  personRef,
  orgRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI Foredrag & Keynotes | Julian Bent Singh",
  description: "Inspirerende foredrag om kunstig intelligens til konferencer og firmaevents. Book Julian Bent Singh som keynote speaker. Engagerende AI oplæg der afmystificerer teknologien.",
  keywords: ["AI Foredrag", "AI Keynote", "AI Speaker", "AI Foredragsholder", "AI Oplæg", "Julian Bent Singh Foredrag"],
  alternates: {
    canonical: `${SITE_URL}/ai-ydelser/foredrag/`,
  },
  openGraph: {
    title: "AI Foredrag – Book Julian Bent Singh som Keynote Speaker",
    description: "Engagerende keynotes der afmystificerer AI-teknologien og inspirerer til handling. Fra hype til værdi.",
    url: `${SITE_URL}/ai-ydelser/foredrag/`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/ai-ydelser-foredrag/AI-foredrag-Julian-Bent-Singh.jpg`,
        width: 1200,
        height: 630,
        alt: "Julian Bent Singh holder AI foredrag",
      },
    ],
  },
};

// Foredragsemner
// (Fjernet efter ønske, da foredrag altid skræddersyes)

// Tidligere events (fra /om siden)
const pastEvents = [
  {
    name: "HR & AI Konferencen",
    description: "Keynote: Drop CV'et og ansæt på mindset",
  },
  {
    name: "AI Marketing Conference",
    description: "Keynote: AI i marketing og automation",
  },
  {
    name: "Make Data Smart Oslo",
    description: "Speaker: Fremtidens datadrevne beslutninger",
  },
  {
    name: "Social Ads Conference",
    description: "Oplæg: AI i annoncering og kreativt indhold",
  },
  {
    name: "Merk Danmark",
    description: "Workshop: AI-genereret indhold",
  },
  {
    name: "Dandy Business Park",
    description: "Interaktiv AI jam-session",
  },
];

const faqItems = [
  {
    question: "Hvad koster et AI foredrag?",
    answer: "Prisen afhænger af foredragets længde, lokation og forberedelsestid. Jeg tilbyder både standard keynotes og skræddersyede oplæg. Kontakt mig for et uforpligtende tilbud.",
  },
  {
    question: "Kan foredraget tilpasses vores branche?",
    answer: "Ja, absolut. Jeg bruger altid tid på at sætte mig ind i jeres branche og finder relevante cases, så indholdet rammer plet hos netop jeres publikum.",
  },
  {
    question: "Hvor lang tid varer et foredrag?",
    answer: "Et typisk keynote-foredrag varer 45-60 minutter inklusiv tid til spørgsmål. Jeg kan også køre kortere 'power talks' på 20-30 minutter eller længere sessions.",
  },
  {
    question: "Hvad kræver det af teknik?",
    answer: "Jeg kan medbringe min egen PC (Windows) eller bruge en computer I stiller til rådighed. Jeg sætter pris på en 'klikker' (presenter remote) og eventuelt en prompter. Ved Live Jam Sessions skal der være minimum 2 stole og et bord på scenen. Ved større forsamlinger foretrækkes headset-mikrofon.",
  },
];

export default function SpeakingPage() {
  // Service schema for foredrag + Event eksempel + Speakable for AI Overviews
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/ai-ydelser/foredrag/#webpage`,
        url: `${SITE_URL}/ai-ydelser/foredrag/`,
        name: "AI Foredrag & Keynotes | Julian Bent Singh",
        description: "Inspirerende foredrag om kunstig intelligens til konferencer og firmaevents.",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero-intro", ".value-prop", ".faq-answer"]
        },
        about: personRef(),
      },
      {
        ...buildServiceSchema({
          id: SCHEMA_IDS.aiForedrag,
          name: "AI Foredrag & Keynotes",
          description: "Inspirerende foredrag om kunstig intelligens til konferencer og firmaevents. Engagerende keynotes der afmystificerer teknologien og inspirerer til handling.",
          url: `${SITE_URL}/ai-ydelser/foredrag/`,
          serviceType: "Keynote Speaking",
          priceDescription: "Kontakt for tilbud",
        }),
        performer: personRef(),
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/ai-ydelser/foredrag/`,
          availability: "https://schema.org/InStock",
          description: "Book keynote til jeres event",
        },
      },
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "AI Ydelser", url: "/ai-ydelser/" },
          { name: "AI Foredrag", url: "/ai-ydelser/foredrag/" },
        ]),
        "@id": `${SITE_URL}/ai-ydelser/foredrag/#breadcrumb`,
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
                <Mic className="w-4 h-4" />
                <span>Book en af Danmarks førende AI-eksperter</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                AI Foredrag der forvandler <span className="text-yellow-400">Hype til Handling</span>
              </h1>
              
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-lg hero-intro">
                Få et engagerende, underholdende og praktisk indblik i kunstig intelligens. Ingen buzzwords uden forklaring – kun konkret værdi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/kontakt" 
                  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 group"
                >
                  Book Julian nu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                {/* <Link 
                  href="#emner" 
                  className="px-8 py-4 bg-zinc-900 text-white border border-zinc-800 font-medium rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
                >
                  Se foredragsemner
                </Link> */}
              </div>

              <div className="mt-12 flex items-center gap-4 text-sm text-zinc-500">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden p-1.5">
                    <div className="relative w-full h-full">
                      <Image
                        src="/ai-ydelser-foredrag/obsidian-digital.png"
                        alt="Obsidian Digital"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden p-1.5">
                    <div className="relative w-full h-full">
                      <Image
                        src="/ai-ydelser-foredrag/den-norske-dataforening.png"
                        alt="Den Norske Dataforening"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden p-1.5">
                    <div className="relative w-full h-full">
                      <Image
                        src="/ai-ydelser-foredrag/merk-denmark.png"
                        alt="Merk Denmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <p>Optrådt for Obsidian, Den Norske Dataforening, Merk Danmark m.fl.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative group">
                <Image
                  src="/ai-ydelser-foredrag/AI-foredrag-Julian-Bent-Singh.jpg"
                  alt="Julian Bent Singh holder AI foredrag"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                      <Star className="w-5 h-5 fill-black" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Top Rated Speaker</p>
                      <p className="text-xs text-zinc-400">Baseret på feedback fra deltagere</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Hvorfor vælge Julian som speaker?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Høj Energi</h3>
              <p className="text-zinc-400 value-prop">Ingen kedelige powerpoints. Foredragene er visuelle, dynamiske og fyldt med energi der holder publikum vågne.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Praktisk Fokus</h3>
              <p className="text-zinc-400 value-prop">Teori er fint, men praksis er bedre. Deltagerne går hjem med konkrete værktøjer og idéer de kan bruge i morgen.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">I Øjenhøjde</h3>
              <p className="text-zinc-400 value-prop">AI formidlet så alle kan være med. Fra direktøren til praktikanten - komplekst stof gjort letforståeligt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS SECTION REMOVED AS REQUESTED */}

      {/* SPECIAL FORMATS SECTION (Panel & Jam Session) */}
      <section className="py-24 px-6 bg-zinc-900 border-y border-zinc-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Andre Formater</h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Paneldebat */}
            <div className="flex flex-col h-full">
              <div className="aspect-video bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden relative mb-8 group">
                <Image
                  src="/ai-ydelser-foredrag/Paneldebat-om-AI-Julian-Bent-Singh.jpg"
                  alt="Julian Bent Singh i paneldebat om AI"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
                  <Users className="w-4 h-4" />
                  <span>Ekspertpanel</span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Paneldebat</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Jeg deltager aktivt i paneldebatter om teknologi, fremtidens arbejdsmarked og etik. Med skarpe holdninger og dyb indsigt sikrer jeg, at debatten bliver både nuanceret og underholdende.
                </p>
                
                <div className="bg-black/30 p-6 rounded-xl border border-zinc-800">
                  <p className="text-sm text-zinc-300 italic mb-2">
                    "Julian deltog i paneldebatten på HR & AI Konferencen 2026, hvor han brillerede med konkrete eksempler og udfordrede status quo."
                  </p>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">— HR & AI Konferencen 2026</p>
                </div>
              </div>
            </div>

            {/* Live Jam Session */}
            <div className="flex flex-col h-full">
              <div className="aspect-video bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden relative mb-8 group">
                <Image
                  src="/ai-ydelser-foredrag/Live-jam-session-Ai-oplæg-julian.jpg"
                  alt="Julian Bent Singh Live AI Jam Session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4 border border-purple-500/20">
                  <Zap className="w-4 h-4" />
                  <span>Interaktivt Show</span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Live AI Jam Session</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Et unikt og interaktivt format, hvor jeg inviterer publikum på scenen. Vi tager en konkret udfordring fra salen og bygger en AI-løsning live på storskærmen. Ingen slides, kun ren innovation i realtid.
                </p>
                
                <div className="bg-black/30 p-6 rounded-xl border border-zinc-800">
                  <p className="text-sm text-zinc-300 italic mb-2">
                    "Julian lavede en Live Jam Session hos Dandy Business Park, hvor vi på 20 minutter byggede en fungerende prototype. Det var mind-blowing for deltagerne."
                  </p>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">— Dandy Business Park</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / PAST EVENTS */}
      <section className="py-24 px-6 bg-zinc-900 border-y border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Tidligere Optrædener</h2>
              <p className="text-zinc-400">Et udpluk af konferencer og events hvor jeg har talt.</p>
            </div>
            <Link href="/referencer" className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-2">
              Se alle konferencer og medieomtale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="p-6 bg-black/50 border border-zinc-800/50 rounded-xl hover:bg-black transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <Calendar className="w-5 h-5 text-zinc-500" />
                </div>
                <h3 className="font-bold text-lg mb-1">{event.name}</h3>
                <p className="text-sm text-zinc-400">{event.description}</p>
              </div>
            ))}
          </div>

          {/* Logo cloud with real logos */}
          <div className="mt-16 pt-16 border-t border-zinc-800 text-center">
             <p className="text-sm font-medium text-zinc-500 mb-8 uppercase tracking-wider">Virksomheder der har booket mig</p>
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="relative h-12 w-32">
                 <Image
                   src="/ai-ydelser-foredrag/obsidian-digital.png"
                   alt="Obsidian Digital logo"
                   fill
                   className="object-contain"
                 />
               </div>
               <div className="relative h-12 w-32">
                 <Image
                   src="/ai-ydelser-foredrag/merk-denmark.png"
                   alt="Merk Denmark logo"
                   fill
                   className="object-contain"
                 />
               </div>
               <div className="relative h-12 w-32">
                 <Image
                   src="/ai-ydelser-foredrag/sylvester-og-co.png"
                   alt="Sylvester & Co logo"
                   fill
                   className="object-contain"
                 />
               </div>
               <div className="relative h-12 w-32">
                 <Image
                   src="/ai-ydelser-foredrag/den-norske-dataforening.png"
                   alt="Den Norske Dataforening logo"
                   fill
                   className="object-contain"
                 />
               </div>
               <div className="relative h-12 w-32">
                 <Image
                   src="/ai-ydelser-foredrag/dandy-business-park.png"
                   alt="Dandy Business Park logo"
                   fill
                   className="object-contain"
                 />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
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
                <p className="text-zinc-400 pl-6 leading-relaxed faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Kombiner med andre AI ydelser</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Et foredrag er en fantastisk start. Vil I gå dybere med jeres AI-rejse?
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/ai-ydelser/fysiske-ai-kurser" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-400 transition-colors">AI Kurser</h3>
              <p className="text-zinc-400 mb-4">Opkvalificér jeres team med dybdegående kurser efter foredraget.</p>
              <span className="text-yellow-400 font-medium flex items-center gap-2">
                Se AI kurser <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/ai-ydelser/fysisk-ai-workshop" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-400 transition-colors">AI Workshop</h3>
              <p className="text-zinc-400 mb-4">Hands-on workshop hvor vi implementerer AI i jeres processer.</p>
              <span className="text-yellow-400 font-medium flex items-center gap-2">
                Se AI workshop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/ai-ydelser/ai-konsulent" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-colors group">
              <h3 className="font-bold text-xl mb-3 group-hover:text-yellow-400 transition-colors">AI Konsulent</h3>
              <p className="text-zinc-400 mb-4">Strategisk rådgivning og implementering skræddersyet til jer.</p>
              <span className="text-yellow-400 font-medium flex items-center gap-2">
                Se AI konsulent <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-yellow-400 text-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skal vi gøre jeres næste event uforglemmeligt?</h2>
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Book et AI foredrag der ikke bare underholder, men giver deltagerne konkret viden og værktøjer med hjem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/kontakt" 
              className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors text-lg"
            >
              Få et uforpligtende tilbud
            </Link>
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-black/10 text-black font-bold rounded-lg hover:bg-white/30 transition-colors text-lg"
            >
              Send en mail
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
