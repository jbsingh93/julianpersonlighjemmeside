import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Globe, Users, Video, Calendar } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SCHEMA_IDS,
  buildServiceSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Online AI Workshop | Interaktiv Læring & Vibe Coding | Julian Bent Singh",
  description: "Deltag i engagerende online AI workshops. Fra 'Vibe Coding' til 'AI Agenter'. Samme høje udbytte som fysisk fremmøde, men med fuld fleksibilitet.",
  keywords: ["Online AI Workshop", "Virtuel AI Træning", "Vibe Coding Kursus", "AI Webinar", "AI Agenter Workshop"],
  alternates: {
    canonical: `${SITE_URL}/ai-ydelser/online-ai-workshop/`,
  },
  openGraph: {
    title: "Online AI Workshops – Lær AI Hjemmefra",
    description: "Hands-on online workshops med over 2000+ tidligere deltagere.",
    url: `${SITE_URL}/ai-ydelser/online-ai-workshop/`,
    type: "website",
  },
};

export default function OnlineWorkshopsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceSchema({
        id: SCHEMA_IDS.onlineWorkshop,
        name: "Online AI Workshops",
        description: "Fleksible online AI workshops for distribuerede teams. Virtuel undervisning med samme høje engagement som fysisk fremmøde.",
        url: `${SITE_URL}/ai-ydelser/online-ai-workshop/`,
        serviceType: "Online Workshop",
        priceDescription: "Kontakt for tilbud",
      }),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "AI Ydelser", url: "/ai-ydelser/" },
          { name: "Online AI Workshop", url: "/ai-ydelser/online-ai-workshop/" },
        ]),
        "@id": `${SITE_URL}/ai-ydelser/online-ai-workshop/#breadcrumb`,
      },
      // Schema for previous events mentioned on the page
      {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Event",
              "name": "AI-Genereret Indhold – Skab bedre tekster med kunstig intelligens",
              "url": "https://www.merkdanmark.dk/arrangementer/ai-genereret-indhold-skab-bedre-tekster-med-kunstig-intelligens",
              "organizer": { "@type": "Organization", "name": "MERK Danmark" },
              "performer": { "@id": SCHEMA_IDS.person }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Event",
              "name": "AI & Kundeforståelse",
              "url": "https://merkd-v12-fm.euwest01.umbraco.io/arrangementer/ai-kundeforstaaelse-brug-ai-til-at-analysere-og-forbedre-kunderejsen/",
              "organizer": { "@type": "Organization", "name": "MERK Danmark" },
              "performer": { "@id": SCHEMA_IDS.person }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Event",
              "name": "Vibe Coding på 2 dage",
              "url": "https://event.ai-growth-minds.dk/",
              "organizer": { "@type": "Organization", "name": "AI Growth Minds" },
              "attendeeCount": 900,
              "performer": { "@id": SCHEMA_IDS.person }
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Event",
              "name": "AI Agenter på 3 dage",
              "url": "https://www.linkedin.com/posts/julianbentsingh_1111-tilmeldte-til-mit-3-dages-webinar-om-activity-7371145885835100162-rcbF/",
              "attendeeCount": 1200,
              "performer": { "@id": SCHEMA_IDS.person }
            }
          }
        ]
      }
    ],
  };

  const benefits = [
    {
      title: "Fuld Fleksibilitet",
      description: "Deltag uanset hvor i verden I befinder jer. Perfekt til distribuerede teams.",
      icon: Globe,
    },
    {
      title: "Optagelse Inkluderet",
      description: "Alle sessioner optages, så deltagere kan gense materialet i deres eget tempo.",
      icon: Video,
    },
    {
      title: "Interaktiv Undervisning",
      description: "Brug af breakout rooms, live polls og hands-on øvelser sikrer højt engagement.",
      icon: Users,
    },
  ];

  const pastEvents = [
    {
      title: "Vibe Coding på 2 dage",
      organizer: "AI Growth Minds",
      description: "Lær at bygge websites og automatiseringer uden kode. En intensiv 2-dages online event.",
      stats: "Over 900 tilmeldte",
      link: "https://event.ai-growth-minds.dk/",
      imageColor: "bg-blue-900/20", // Placeholder color
    },
    {
      title: "AI Agenter på 3 dage",
      organizer: "LinkedIn Event",
      description: "Dybdegående webinar om hvordan man automatiserer arbejdsopgaver med AI Agenter.",
      stats: "Over 1.200 tilmeldte",
      link: "https://www.linkedin.com/posts/julianbentsingh_1111-tilmeldte-til-mit-3-dages-webinar-om-activity-7371145885835100162-rcbF/",
      imageColor: "bg-indigo-900/20",
    },
    {
      title: "AI-Genereret Indhold",
      organizer: "MERK Danmark",
      description: "Skab bedre tekster med kunstig intelligens. Fokus på ChatGPT og Claude til marketing.",
      stats: "Webinar",
      link: "https://www.merkdanmark.dk/arrangementer/ai-genereret-indhold-skab-bedre-tekster-med-kunstig-intelligens",
      imageColor: "bg-emerald-900/20",
    },
    {
      title: "AI & Kundeforståelse",
      organizer: "MERK Danmark",
      description: "Brug AI til at analysere og forbedre kunderejsen gennem dataanalyse.",
      stats: "Webinar",
      link: "https://merkd-v12-fm.euwest01.umbraco.io/arrangementer/ai-kundeforstaaelse-brug-ai-til-at-analysere-og-forbedre-kunderejsen/",
      imageColor: "bg-purple-900/20",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <JsonLd schema={schema} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-400/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Online <span className="text-yellow-400">Workshops</span>
                <br />
                <span className="text-3xl md:text-5xl text-zinc-400 font-medium block mt-4">
                  Lær AI uanset hvor du er
                </span>
              </h1>
              <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl">
                Virtuelle workshops behøver ikke at være kedelige. Jeg leverer engagerende,
                hands-on online undervisning, der har samlet tusindvis af deltagere.
                Fra "Vibe Coding" til strategisk AI-implementering.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center gap-2"
                >
                  Book en workshop <ArrowRight size={20} />
                </Link>
                <Link
                  href="#events"
                  className="bg-zinc-900 text-white border border-zinc-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors"
                >
                  Se eksempler
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video lg:aspect-[4/3]">
              <Image
                src="/ai-ydelser-online-ai-workshop/Online-AI-workshop-Julian-bent-singh.jpg"
                alt="Julian Bent Singh faciliterer online AI workshop med interaktiv undervisning og hands-on øvelser"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                <div className="w-14 h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400 mb-6">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section id="events" className="py-24 px-6 bg-black relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Udvalgte <span className="text-yellow-400">Online Events</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl">
              Jeg har afholdt online workshops og webinarer for tusindvis af deltagere.
              Her er nogle af de mest populære sessioner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <a 
                key={index}
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300"
              >
                {/* Placeholder Image Area */}
                <div className={`h-48 w-full ${event.imageColor} relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="text-center z-10 px-6">
                    <span className="inline-block p-3 bg-black/50 backdrop-blur-md rounded-full text-white mb-2">
                      <Calendar size={24} />
                    </span>
                    <h4 className="text-xl font-bold text-white drop-shadow-lg">{event.organizer}</h4>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">
                      {event.title}
                    </h3>
                    {event.stats && (
                      <span className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                        {event.stats}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 mb-6 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-yellow-400 font-medium">
                    Læs mere om eventet <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Hvad kan vi <span className="text-yellow-400">arbejde med?</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Mine online workshops skræddersyes altid til målgruppen, men tager ofte udgangspunkt i aktuelle og efterspurgte emner:
              </p>
              
              <ul className="space-y-6">
                {[
                  "Vibe Coding: Byg apps og websites uden kode",
                  "AI Agenter: Automatiser manuelle processer",
                  "Prompt Engineering: Få bedre svar fra ChatGPT & Claude",
                  "AI i Marketing: Skab bedre content hurtigere",
                  "AI Strategi: Fra idé til implementering"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-yellow-400/10 p-1 rounded-full text-yellow-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-lg text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Workshop Setup Image */}
            <div className="relative aspect-square md:aspect-auto md:h-[600px]">
              <Image
                src="/ai-ydelser-online-ai-workshop/online-AI-workshop-med-resultater.jpg"
                alt="Online AI workshop setup med Julian Bent Singh der underviser med flere skærme og viser konkrete resultater"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Klar til at løfte teamet <span className="text-yellow-400">online?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Lad os tage en uforpligtende snak om, hvordan vi kan skrue en online workshop sammen, der passer præcis til jeres behov.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-yellow-400 text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-300 transition-colors"
          >
            Kontakt mig nu
          </Link>
        </div>
      </section>
    </div>
  );
}
