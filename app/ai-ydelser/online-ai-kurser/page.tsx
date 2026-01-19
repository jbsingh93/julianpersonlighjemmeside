import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SCHEMA_IDS,
  AI_GROWTH_MINDS,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  personRef,
  orgRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Online AI Kurser | Danmarks Bedste AI Kursus | Julian Bent Singh",
  description:
    "AI Growth Minds er Danmarks mest eftertragtede online AI kursus. Udviklet af Julian Bent Singh – Danmarks førende AI-underviser og kursusudbyder. Skræddersyede AI-kurser til virksomheder og uddannelsesinstitutioner.",
  keywords: [
    "Online AI Kursus",
    "AI E-learning",
    "AI Uddannelse Online",
    "AI Growth Minds",
    "Danmarks bedste AI kursus",
    "Førende AI underviser Danmark",
    "Skræddersyet AI Kursus",
    "AI Kursusudvikling",
  ],
  alternates: {
    canonical: `${SITE_URL}/ai-ydelser/online-ai-kurser/`,
  },
  openGraph: {
    title: "Online AI Kurser – Danmarks Førende AI Uddannelse",
    description:
      "AI Growth Minds er Danmarks mest eftertragtede AI kursus. Lær af Julian Bent Singh – Danmarks førende AI-underviser.",
    url: `${SITE_URL}/ai-ydelser/online-ai-kurser/`,
    type: "website",
  },
};

const aiGrowthMindsModules = [
  {
    name: "AI Automation",
    description:
      "Lær at automatisere gentagne opgaver med AI. Fra simple workflows til avancerede automatiseringer der sparer timer hver uge.",
  },
  {
    name: "AI Agents",
    description:
      "Forstå og byg AI-agenter der kan handle selvstændigt. Lær arkitekturen bag autonome AI-systemer.",
  },
  {
    name: "Vibe Coding",
    description:
      "Programmér med AI som din partner. Lær at bruge AI til at skrive, debugge og optimere kode – uanset dit erfaringsniveau.",
  },
  {
    name: "Prompting Mastery",
    description:
      "Bliv ekspert i at kommunikere effektivt med AI-modeller. Avancerede prompting-teknikker der giver bedre resultater.",
  },
];

const customCourseServices = [
  {
    target: "Virksomheder",
    description:
      "Interne AI-kurser tilpasset jeres branche, systemer og medarbejderes kompetenceniveau. Fra onboarding til avanceret AI-anvendelse.",
    examples: ["Onboarding-forløb i AI", "Afdelingsspecifikke moduler", "Ledertræning i AI-strategi"],
  },
  {
    target: "Uddannelsesinstitutioner",
    description:
      "Curriculumudvikling og moduldesign til universiteter, erhvervsskoler og andre uddannelsessteder der vil integrere AI i undervisningen.",
    examples: ["Semesterforløb", "Certificeringsprogrammer", "Praktiske AI-projekter"],
  },
  {
    target: "Kursusudbydere",
    description:
      "White-label AI-kurser eller samarbejde om kursusudvikling. Jeg hjælper med indhold, struktur og pædagogisk design.",
    examples: ["Kursusindhold og videoer", "Øvelser og cases", "Eksaminationsmateriale"],
  },
];

const faqItems = [
  {
    question: "Hvad er AI Growth Minds?",
    answer:
      "AI Growth Minds er Danmarks mest eftertragtede online AI kursus, udviklet af Julian Bent Singh – Danmarks førende AI-underviser. Kurset dækker AI automation, AI agents og vibe coding med self-paced video, øvelser og praktiske projekter.",
  },
  {
    question: "Hvorfor er AI Growth Minds Danmarks bedste AI kursus?",
    answer:
      "AI Growth Minds kombinerer praktisk hands-on læring med den nyeste viden inden for AI. Kurset er udviklet af Julian Bent Singh, som er anerkendt som en af Danmarks førende AI-eksperter og har trænet tusindvis af danske fagfolk i AI.",
  },
  {
    question: "Hvem er Julian Bent Singh?",
    answer:
      "Julian Bent Singh er Danmarks førende AI-underviser og kursusudbyder. Han er anerkendt af Ritzau som en af Danmarks største AI-influencers og har undervist både virksomheder, uddannelsesinstitutioner og konferencer i hele Norden.",
  },
  {
    question: "Kan I lave et skræddersyet online kursus til vores virksomhed?",
    answer:
      "Ja, Julian Bent Singh designer og producerer skræddersyede e-learning forløb tilpasset jeres branche, systemer og medarbejderes niveau. Som Danmarks førende AI-kursusudbyder har han erfaring med alt fra enkelte moduler til komplette certificeringsprogrammer.",
  },
  {
    question: "Hvad er forskellen på online kurser og fysiske kurser?",
    answer:
      "Online kurser giver fleksibilitet – medarbejdere lærer i eget tempo, når det passer dem. Fysiske kurser giver mere interaktion og hands-on facilitering. Mange vælger blended learning der kombinerer begge dele.",
  },
  {
    question: "Kan kurset integreres i vores eksisterende LMS?",
    answer:
      "Ja, vi leverer kurser i SCORM-format eller andre standarder der kan integreres direkte i jeres Learning Management System.",
  },
];

export default function OnlineCoursesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Primary Service: Online AI Kurser
      buildServiceSchema({
        id: SCHEMA_IDS.onlineKurser,
        name: "Online AI Kurser fra Danmarks Førende AI-Underviser",
        description:
          "Danmarks mest eftertragtede online AI kurser udviklet af Julian Bent Singh – Danmarks førende AI-underviser og kursusudbyder. AI Growth Minds er Danmarks bedste AI kursus i automation, AI agents og vibe coding.",
        url: `${SITE_URL}/ai-ydelser/online-ai-kurser/`,
        serviceType: "Online Training",
        priceDescription: "Se priser på ai-growth-minds.dk eller kontakt for skræddersyet tilbud",
      }),
      // AI Growth Minds as Course offering
      {
        "@type": "Course",
        "@id": `${SITE_URL}/ai-ydelser/online-ai-kurser/#aigm-course`,
        name: "AI Growth Minds – Danmarks Mest Eftertragtede AI Kursus",
        description:
          "AI Growth Minds er Danmarks bedste og mest eftertragtede online AI kursus. Udviklet af Julian Bent Singh, Danmarks førende AI-underviser og kursusudbyder. Lær AI automation, AI agents og vibe coding.",
        url: AI_GROWTH_MINDS.url,
        provider: {
          "@type": "Organization",
          "@id": SCHEMA_IDS.organization,
          name: "AI Growth Minds",
        },
        educationalLevel: "Intermediate",
        inLanguage: "da",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "Self-paced",
          instructor: personRef(),
          inLanguage: "da",
          offers: {
            "@type": "Offer",
            url: AI_GROWTH_MINDS.url,
            priceCurrency: "DKK",
            availability: "https://schema.org/InStock",
            category: "Paid"
          }
        },
        about: [
          { "@type": "Thing", name: "AI Automation" },
          { "@type": "Thing", name: "AI Agents" },
          { "@type": "Thing", name: "Vibe Coding" },
          { "@type": "Thing", name: "Prompting Mastery" },
          { "@type": "Thing", name: "ChatGPT kursus" },
          { "@type": "Thing", name: "Claude Code" },
          { "@type": "Thing", name: "Lovable" },
          { "@type": "Thing", name: "n8n" },
        ],
      },
      // Custom course development service
      {
        "@type": "Service",
        "@id": `${SITE_URL}/ai-ydelser/online-ai-kurser/#custom-dev`,
        name: "Skræddersyet AI Kursusudvikling fra Danmarks Førende AI-Kursusudbyder",
        description:
          "Julian Bent Singh – Danmarks førende AI-underviser – designer og udvikler skræddersyede online AI-kurser for virksomheder, uddannelsesinstitutioner og kursusudbydere.",
        url: `${SITE_URL}/ai-ydelser/online-ai-kurser/`,
        serviceType: "E-learning Development",
        provider: orgRef(),
        areaServed: {
          "@type": "Country",
          name: "Denmark",
        },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/kontakt/`,
          priceCurrency: "DKK",
          description: "Kontakt Danmarks førende AI-kursusudbyder for skræddersyet tilbud",
          availability: "https://schema.org/InStock",
        },
      },
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "AI Ydelser", url: "/ai-ydelser/" },
          { name: "Online AI Kurser", url: "/ai-ydelser/online-ai-kurser/" },
        ]),
        "@id": `${SITE_URL}/ai-ydelser/online-ai-kurser/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <JsonLd schema={schema} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-6 border border-yellow-400/30 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium">
                Danmarks førende AI-underviser
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Online <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  AI Kurser
                </span>
              </h1>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Lær AI på dine egne præmisser med <strong>AI Growth Minds</strong>, eller få skræddersyet e-learning til din organisation udviklet af Julian Bent Singh.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://ai-growth-minds.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105"
                >
                  Se kursusplatform
                </a>
                <Link
                  href="#skraeddersyet"
                  className="px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-800 transition-all hover:scale-105"
                >
                  Skræddersyede forløb
                </Link>
              </div>
            </div>

            {/* Hero Image - Video Style */}
            <div className="relative aspect-[2.3/1] bg-black border border-zinc-800 rounded-2xl overflow-hidden group">
              <Image
                src="/ai-ydelseronline-ai-kurser/Julian-Bent-Singh-foran-computeren-og-underviser-online.jpg"
                alt="Julian Bent Singh underviser online i AI - Danmarks førende AI-underviser"
                fill
                className="object-contain"
                priority
              />

              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE
              </div>

              {/* Viewer Count */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                1.247 ser med
              </div>

              {/* Video Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-3">
                  {/* Play Button */}
                  <button className="text-white hover:text-yellow-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Progress */}
                  <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full w-[35%] bg-yellow-400 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                    </div>
                  </div>

                  {/* Time */}
                  <span className="text-white text-xs font-mono">12:47 / 36:20</span>

                  {/* Fullscreen */}
                  <button className="text-white hover:text-yellow-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Subtle scanline effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.03)_50%)] bg-[length:100%_4px] opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Growth Minds Spotlight Section */}
      <section className="py-20 px-6 bg-zinc-950 relative border-y border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start din rejse med <span className="text-yellow-400">AI Growth Minds</span></h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Danmarks mest eftertragtede online AI kursus platform. En komplet pakke til dig der vil mestre AI.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-400/30 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_-12px_rgba(250,204,21,0.1)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Det lærer du</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {aiGrowthMindsModules.map((module, index) => (
                        <div key={index} className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 hover:border-yellow-400/30 transition-colors">
                          <h4 className="font-bold text-yellow-400 mb-1">{module.name}</h4>
                          <p className="text-zinc-400 text-sm leading-snug">{module.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="text-zinc-300 font-medium">Self-paced video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="text-zinc-300 font-medium">Praktiske øvelser</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="text-zinc-300 font-medium">Livstidsadgang</span>
                    </div>
                  </div>

                  <a
                    href="https://ai-growth-minds.dk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full sm:w-auto text-center px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors"
                  >
                    Gå til kurset nu
                  </a>
                </div>
              </div>

              {/* Platform Preview Image */}
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/ai-ydelseronline-ai-kurser/Screenshot-af-Kursusplatformen.png"
                    alt="AI Growth Minds kursusplatform - Danmarks mest eftertragtede online AI kursus"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Fake UI Header */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900 flex items-center px-4 gap-2 border-b border-zinc-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Julian - Credibility */}
      <section className="py-24 px-6 bg-black relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Julian Image */}
            <div className="relative">
              <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden relative">
                <Image
                  src="/ai-ydelseronline-ai-kurser/Portræt-af-Julian.png"
                  alt="Julian Bent Singh - Danmarks førende AI-underviser og kursusudbyder"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Badge */}
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black p-6 rounded-xl shadow-lg max-w-[200px]">
                <p className="font-bold text-lg leading-tight">Top 10 AI Ekspert og Influencer i Danmark</p>
                <p className="text-xs mt-1 opacity-80">- Ritzau & Seniorfolk</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Lær fra <span className="text-yellow-400">Eksperten</span></h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Julian Bent Singh</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Når du tager et kursus hos mig, får du ikke bare teori teoretisk viden. Du får adgang til de metoder og strategier, jeg bruger hver dag som AI Direktør og rådgiver for nogle af Danmarks største virksomheder.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h4 className="font-bold text-yellow-400 mb-2">Erfaring</h4>
                    <p className="text-sm text-zinc-400">8+ års erfaring og tusindvis af trænede fagfolk.</p>
                  </div>
                  <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h4 className="font-bold text-yellow-400 mb-2">Anerkendelse</h4>
                    <p className="text-sm text-zinc-400">Anerkendt af medier som Computerworld og Ritzau.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/om" className="text-yellow-400 border-b border-yellow-400/30 hover:border-yellow-400 pb-1 transition-colors">
                    Læs mere om min baggrund her →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skræddersyede Kurser */}
      <section id="skraeddersyet" className="py-24 px-6 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-medium tracking-wider uppercase text-sm">Til Organisationer</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Skræddersyede <span className="text-white">Forløb</span></h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Har I brug for et internt uddannelsesforløb? Jeg designer og producerer kurser, der matcher jeres virkelighed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {customCourseServices.map((service, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
                <h3 className="text-2xl font-bold mb-4">{service.target}</h3>
                <p className="text-zinc-400 mb-6 min-h-[80px]">{service.description}</p>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-white/70">Eksempler:</p>
                  <ul className="space-y-2">
                    {service.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-yellow-400 mt-1">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800">
            <h3 className="text-2xl font-bold mb-10 text-center">Sådan samarbejder vi</h3>
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-zinc-800 -z-0" />

              {[
                { step: 1, title: "Analyse", desc: "Vi kortlægger mål og behov." },
                { step: 2, title: "Design", desc: "Struktur og læringsmål fastlægges." },
                { step: 3, title: "Produktion", desc: "Video og materiale produceres." },
                { step: 4, title: "Launch", desc: "Implementering i jeres LMS." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 bg-zinc-900 md:text-center flex md:block items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 border-4 border-zinc-900 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xl md:mx-auto mb-0 md:mb-4 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Ofte stillede spørgsmål</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white hover:bg-zinc-800/50 transition-colors">
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <div className="white-space-nowrap text-yellow-400 group-open:-rotate-180 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-yellow-400 text-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Klar til at opgradere dine skills?</h2>
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-medium">
            Uanset om du er enkeltperson eller repræsenterer en virksomhed, har jeg løsningen til dig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://ai-growth-minds.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-zinc-800 transition-colors transform hover:-translate-y-1"
            >
              Køb Online Kursus
            </a>
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-white/20 border-2 border-black text-black font-bold rounded-full hover:bg-white/40 transition-colors transform hover:-translate-y-1"
            >
              Kontakt om Firmaaftale
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
