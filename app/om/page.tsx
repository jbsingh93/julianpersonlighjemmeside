import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SCHEMA_IDS,
  JULIAN_DATA,
  AI_GROWTH_MINDS,
  VALLORA_AI,
  HIGH_AUTHORITY_MENTIONS,
  buildPersonSchema,
  buildBreadcrumbSchema,
  personRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Om Julian Bent Singh | Danmarks Førende AI Ekspert",
  description:
    "Læs om Julian Bent Singhs professionelle baggrund som AI ekspert med over 8 års erfaring. Stifter af AI Growth Minds og AI Direktør hos Vallora AI.",
  keywords: [
    "Julian Bent Singh",
    "AI Ekspert",
    "AI Konsulent Danmark",
    "AI Foredragsholder",
    "AI Strategi",
    "AI Growth Minds",
    "Vallora AI",
  ],
  alternates: {
    canonical: `${SITE_URL}/om/`,
  },
  openGraph: {
    title: "Om Julian Bent Singh – AI Ekspert & Foredragsholder",
    description:
      "Specialist i AI-implementering, AI-strategi og opkvalificering. Anerkendt af Ritzau som en af Danmarks førende AI-influencers.",
    url: `${SITE_URL}/om/`,
    type: "profile",
  },
};

export default function AboutPage() {
  // Build extended schema for about page
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": SCHEMA_IDS.aboutPage,
        name: "Om Julian Bent Singh",
        description:
          "Professionel baggrund, AI-erfaring og visioner for fremtiden.",
        url: `${SITE_URL}/om/`,
        mainEntity: personRef(),
        breadcrumb: { "@id": `${SITE_URL}/om/#breadcrumb` },
      },
      {
        ...buildPersonSchema(true),
        // Notable achievements / awards
        award: [
          "#1 på Danmarks 15 førende AI-eksperter 2025 (Seniorfolk.dk)",
          "#1 på Danmarks 10 største AI-influencers (Ritzau/24Victoria)",
          "2.800+ professionelle opkvalificeret i AI i 2025",
          "25.000+ AI-genererede tekster produceret siden 2019",
          "Stifter af 4 AI-virksomheder siden 2018",
          "50+ nordiske virksomheder coachet siden 2019",
          "Bogbidragyder til Agentbogen (2025)",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "award",
            name: "#1 AI Ekspert i Danmark 2025",
            recognizedBy: {
              "@type": "Organization",
              name: "Seniorfolk.dk",
              url: "https://seniorfolk.dk/",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "award",
            name: "#1 AI Influencer i Danmark",
            recognizedBy: {
              "@type": "Organization",
              name: "Ritzau/24Victoria",
              url: "https://via.ritzau.dk/",
            },
          },
        ],
        // Extended with additional roles
        affiliation: [
          {
            "@type": "Organization",
            name: AI_GROWTH_MINDS.name,
            url: AI_GROWTH_MINDS.url,
            description: AI_GROWTH_MINDS.description,
          },
          {
            "@type": "Organization",
            name: VALLORA_AI.name,
            url: VALLORA_AI.url,
            description: VALLORA_AI.description,
          },
        ],
        // Subject of press mentions and authored articles
        subjectOf: [
          ...HIGH_AUTHORITY_MENTIONS.slice(0, 10).map((mention) => {
            if (mention.type === "VideoObject" && "description" in mention) {
              return {
                "@type": mention.type,
                name: mention.name,
                url: mention.url,
                description: mention.description,
                thumbnailUrl: mention.thumbnailUrl,
                uploadDate: mention.uploadDate,
                embedUrl: mention.embedUrl,
              };
            }
            if (mention.type === "SoftwareApplication" && "applicationCategory" in mention) {
              return {
                "@type": mention.type,
                name: mention.name,
                url: mention.url,
                applicationCategory: mention.applicationCategory,
                operatingSystem: mention.operatingSystem,
              };
            }
            return {
              "@type": mention.type,
              name: mention.name,
              url: mention.url,
            };
          }),
          {
            "@type": "Book",
            name: "Agentbogen",
            url: "https://www.linkedin.com/posts/jloew_aiagenter-activity-7325383838711345152-Kvbk",
            datePublished: "2025-09-16",
            author: {
              "@type": "Person",
              name: "Jonathan Løw",
            },
            contributor: personRef(),
            publisher: {
              "@type": "Organization",
              name: "Hakon Holm",
            },
            description: "Praktisk guide om AI agents med bidrag fra 40 danske AI-eksperter",
          },
          {
            "@type": "Article",
            name: "Subscription Trends 2026: Insights from leading experts",
            url: "https://subscrybe.com/da/subscription-trends-2026-insights-from-leading-experts/",
            datePublished: "2026-01-15",
            author: personRef(),
          },
          {
            "@type": "Article",
            name: "Brand Governance Agents – Konceptet bag succesfuld brug af AI-genereret indhold",
            url: "https://www.linkedin.com/pulse/brand-governance-agents-konceptet-bag-succesfuld-brug-singh-tlqgf/",
            datePublished: "2024-08-05",
            author: personRef(),
          },
          {
            "@type": "Article",
            name: "Sådan bygger du on-brand indhold at scale med Brand Governance Agents (BGA)",
            url: "https://www.linkedin.com/pulse/s%C3%A5dan-bygger-du-on-brand-indhold-scale-med-brand-governance-singh-qzyff/",
            datePublished: "2024-11-21",
            author: personRef(),
          },
        ],
      },
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Om Julian", url: "/om/" },
        ]),
        "@id": `${SITE_URL}/om/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-serif">
      <JsonLd schema={schema} />

      {/* Wiki-style Header */}
      <div className="border-b border-zinc-200 bg-zinc-50 pt-32 pb-6 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-5xl font-serif font-medium border-b border-zinc-300 pb-2">
            Julian Bent Singh
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className="md:col-span-8 lg:col-span-9">
          {/* Introduction */}
          <div className="mb-10">
            <p className="mb-6 leading-relaxed text-lg">
              <b>Julian Bent Singh</b> er en af {" "}
              <a
                href="https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-blue-600 hover:underline"
              >
                Danmarks 10 største AI eksperter og influencers
              </a>{" "}
              med over 8 års erfaring med AI, AI kurser, AI
              konsulentarbejde, implementering af AI, strategisk arbejde med AI og
              udvikling af virksomheder med AI.
            </p>
            <p className="mb-6 leading-relaxed text-lg">
              Hans nuværende roller inkluderer
              stifter og direktør af{" "}
              <a
                href="https://ai-growth-minds.dk/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-blue-600 hover:underline"
              >
                AI Growth Minds
              </a>{" "}
              og AI Direktør for{" "}
              <a
                href="https://www.vallora.dk/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-blue-600 hover:underline"
              >
                Vallora AI
              </a>
              .
            </p>
          </div>

          {/* Betydelige Bedrifter - Notable Achievements */}
          <section id="bedrifter" className="mb-10">
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-sm">
              <h2 className="text-xl font-bold mb-4 border-b border-amber-300 pb-2">
                Betydelige bedrifter
              </h2>
              <ul className="space-y-2 text-zinc-800">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong className="text-zinc-900">2.800+ professionelle</strong>{" "}
                    opkvalificeret i AI i 2025 –{" "}
                    <a
                      href="https://ai-growth-minds.dk/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      AI Growth Minds
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong className="text-zinc-900">#1 AI-ekspert</strong> i Danmark – Kåret af{" "}
                    <a
                      href="https://seniorfolk.dk/danmarks-forende-15-eksperter-i-ai-2025/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      Seniorfolk.dk
                    </a>{" "}
                    og{" "}
                    <a
                      href="https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      Ritzau
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong className="text-zinc-900">25.000+ AI-tekster</strong>{" "}
                    produceret siden 2019 – Genereret millioner af klik for klienter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong className="text-zinc-900">4 AI-virksomheder</strong> stiftet siden 2018 – Inkl.{" "}
                    <a
                      href="https://www.vallora.dk/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      Vallora AI
                    </a>{" "}
                    (25+ mio. kr. værdiansættelse)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong className="text-zinc-900">50+ virksomheder</strong> coachet i Norden siden 2019 –{" "}
                    <a
                      href="https://dataforeningen.no/profiler/julian-bent-singh"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      Dataforeningen Norge
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    <strong className="text-zinc-900">Bogbidragyder</strong> til{" "}
                    <a
                      href="https://www.linkedin.com/posts/jloew_aiagenter-activity-7325383838711345152-Kvbk"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      Agentbogen
                    </a>{" "}
                    (2025) – Blandt 40 af &quot;landets skarpeste AI-hjerner&quot;
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Table of Contents */}
          <div className="bg-zinc-50 border border-zinc-200 p-4 mb-8 w-fit min-w-[300px] rounded-sm">
            <h2 className="text-xl font-bold mb-2">Indholdsfortegnelse</h2>
            <ul className="list-decimal list-inside text-blue-600 space-y-1 text-sm">
              <li>
                <a href="#bedrifter" className="hover:underline">
                  Betydelige bedrifter
                </a>
              </li>
              <li>
                <a href="#roller" className="hover:underline">
                  Nuværende Roller
                </a>
              </li>
              <li>
                <a href="#presse" className="hover:underline">
                  Presse & Medier
                </a>
              </li>
              <li>
                <a href="#foredrag" className="hover:underline">
                  Foredrag & Events
                </a>
              </li>
              <li>
                <a href="#artikler" className="hover:underline">
                  Artikler & Publikationer
                </a>
              </li>
              <li>
                <a href="#podcasts" className="hover:underline">
                  Podcasts
                </a>
              </li>
              <li>
                <a href="#videoer" className="hover:underline">
                  Videoer
                </a>
              </li>
              <li>
                <a href="#vaerktoejer" className="hover:underline">
                  Værktøjer & Ressourcer
                </a>
              </li>
              <li>
                <a href="#anerkendelser" className="hover:underline">
                  Anerkendelser
                </a>
              </li>
              <li>
                <a href="#trustpilot" className="hover:underline">
                  Trustpilot Reviews
                </a>
              </li>
              <li>
                <a href="#facebook-reviews" className="hover:underline">
                  Facebook Reviews
                </a>
              </li>
              <li>
                <a href="#netvaerk" className="hover:underline">
                  Hvad siger netværket
                </a>
              </li>
              <li>
                <a href="#eksterne" className="hover:underline">
                  Eksterne links
                </a>
              </li>
            </ul>
          </div>

          {/* Nuværende Roller */}
          <section id="roller" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Nuværende Roller
            </h2>
            <div className="space-y-4 text-zinc-800 leading-7">
              <p>
                Julian Bent Singh besidder i dag to centrale roller inden for
                AI-branchen i Danmark:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <b>Stifter & Direktør</b> hos{" "}
                  <a
                    href="https://ai-growth-minds.dk/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-blue-600 hover:underline"
                  >
                    AI Growth Minds – dansk AI-kursusplatform
                  </a>{" "}
                  – specialiseret i automation, AI agents og vibe coding.
                </li>
                <li>
                  <b>AI Direktør</b> hos{" "}
                  <a
                    href="https://www.vallora.dk/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-blue-600 hover:underline"
                  >
                    Vallora AI – AI-automatisering til ejendomsbranchen
                  </a>{" "}
                  – strategisk AI-ledelse og implementering.
                </li>
              </ul>
            </div>
          </section>

          {/* Presse & Medier */}
          <section id="presse" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Presse & Medier
            </h2>
            <p className="mb-4">
              Julian er blevet anerkendt som en af Danmarks førende AI-eksperter
              og optræder jævnligt i danske medier:
            </p>

            {/* Media Appearance Image */}
            <div className="my-8 aspect-video w-full md:w-2/3 bg-white rounded-lg overflow-hidden relative">
              <Image
                src="/om/collage-af-Julian-AI-ekspert-i-medierne.png"
                alt="Collage af Julian Bent Singh i medierne - AI Ekspert i danske medier"
                fill
                className="object-cover"
              />
            </div>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julian udnævnt som en af Danmarks 10 største AI-influencers
                </a>{" "}
                – I en publikation fra Ritzau blev Julian nævnt først i en række af 10 prominente AI-personligheder.
              </li>
              <li>
                <a
                  href="https://www.computerworld.dk/art/290123/noergaard-skal-vi-satse-paa-open-source-eller-amerikansk-big-tech-i-denne-urolige-tid"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Ekspertdebat i Computerworld
                </a>{" "}
                – Julian deltager i diskussion om open source vs. amerikansk big tech i urolige tider.
              </li>
              <li>
                <a
                  href="https://seniorfolk.dk/danmarks-forende-15-eksperter-i-ai-2025/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Danmarks 15 førende AI-eksperter i 2025
                </a>{" "}
                – Seniorfolk kårer Julian blandt landets førende eksperter inden for kunstig intelligens.
              </li>
              <li>
                <a
                  href="https://it-kanalen.dk/dem-boer-du-foelge-de-10-stoerste-ai-influencers/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  IT-Kanalens liste over AI-influencers
                </a>{" "}
                – Julian featured blandt Danmarks 10 største AI-influencers.
              </li>
              <li>
                <a
                  href="https://24victoria.dk/artificial-and-intelligence-deep-tech/de-10-stoerste-ai-influencers"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  24Victoria: De 10 største AI-influencers
                </a>{" "}
                – Omtale af Julian som en af Danmarks mest indflydelsesrige AI-personligheder.
              </li>
              <li>
                <a
                  href="https://www.copenhagen-review-of-communication.com/ai-modellerne-er-ikke-problemet-problemet-er-bias-i-skonhedsidealer/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI og bias i skønhedsidealer
                </a>{" "}
                – Julians analyse i Copenhagen Review of Communication om AI-modeller og kulturelle fordomme.
              </li>
            </ul>
          </section>

          {/* Foredrag & Events */}
          <section id="foredrag" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Foredrag & Events
            </h2>
            <p className="mb-4">
              Julian holder keynotes og foredrag om AI ved konferencer i
              Skandinavien. Hans oplæg er kendt for at være engagerende, praktiske og blottet for buzzwords.
            </p>

            {/* Action Shot Image */}
            <div className="my-8 aspect-video w-full bg-zinc-100 border border-zinc-200 rounded-lg overflow-hidden relative">
              <Image
                src="/om/Julian-på-scenen.png"
                alt="Julian Bent Singh på scenen til foredrag om AI"
                fill
                className="object-cover"
              />
            </div>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.sylvester-co.dk/julian-bent-singh-stifter-af-ai-growth-minds-paa-hr-ai-konferencen-drop-cvet-og-ansaet-paa-mindset/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  HR & AI Konferencen: Drop CV&apos;et
                </a>{" "}
                – Julians foredrag om at ansætte på mindset frem for traditionelle CV&apos;er.
              </li>
              <li>
                <a
                  href="https://www.ai-marketingconference.dk/speakers/julian-bentsingh"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI Marketing Conference speaker
                </a>{" "}
                – Julian som keynote speaker om AI i marketing og automation.
              </li>
              <li>
                <a
                  href="https://dataforeningen.no/profiler/julian-bent-singh"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Make Data Smart Oslo konferencen
                </a>{" "}
                – Julians speaker-profil hos den norske dataforenings, Make Data Smart Oslo konferencen.
              </li>
              <li>
                <a
                  href="https://www.merkdanmark.dk/arrangementer/ai-genereret-indhold-skab-bedre-tekster-med-kunstig-intelligens"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Merk Danmark: AI-genereret indhold
                </a>{" "}
                – Hands-on workshop om at skabe bedre tekster med kunstig intelligens.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/halfdantimm_social-ads-conference-2024-opl%C3%A6gsholdere-activity-7234076631890309120-2wRD"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Social Ads Conference 2024
                </a>{" "}
                – Julian som oplægsholder ved konferencen i Bella Center.
              </li>
              <li>
                <a
                  href="https://dandybusinesspark.dk/event/ai-jam-session-i/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI Jam Session hos Dandy Business Park
                </a>{" "}
                – Interaktiv AI-session med Julian Bent Singh.
              </li>
            </ul>
            <p className="mt-4">
              <Link
                href="/ai-ydelser/foredrag/"
                className="text-blue-600 hover:underline font-medium"
              >
                → Book et foredrag med Julian
              </Link>
            </p>
          </section>

          {/* Artikler & Publikationer */}
          <section id="artikler" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Artikler & Publikationer
            </h2>
            <p className="mb-4">
              Julian deler sin viden gennem artikler, bogbidrag og publikationer om AI-implementering, AI agents og strategisk brug af AI:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.linkedin.com/posts/jloew_aiagenter-activity-7325383838711345152-Kvbk"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Agentbogen (2025)
                </a>{" "}
                – Julian som faglig redaktør og bidragyder til praktisk guide om AI agents, skrevet af Jonathan Løw med 40 danske AI-eksperter. Udgives 16. september 2025.
              </li>
              <li>
                <a
                  href="https://subscrybe.com/da/subscription-trends-2026-insights-from-leading-experts/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Subscription Trends 2026: Insights from leading experts
                </a>{" "}
                – Julian featured som AI-ekspert blandt 17 førende stemmer om fremtidens subscription-marked, AI-adoption og vibe coding.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/pulse/brand-governance-agents-konceptet-bag-succesfuld-brug-singh-tlqgf/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Brand Governance Agents
                </a>{" "}
                – Julians artikel om konceptet bag succesfuld brug af AI-genereret indhold (5. august 2024).
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/pulse/s%C3%A5dan-bygger-du-on-brand-indhold-scale-med-brand-governance-singh-qzyff/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  On-brand indhold med AI i stor skala
                </a>{" "}
                – Guide til at bygge skalerbart brand-konsistent indhold med BGA-metoden (21. november 2024).
              </li>
            </ul>
          </section>

          {/* Podcasts */}
          <section id="podcasts" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Podcasts
            </h2>
            <p className="mb-4">
              Lyt til Julian dele sin viden om AI, SEO og digital strategi:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://open.spotify.com/episode/1mOBMWyNImTrWOqjrlmRWj"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Podcast med David Guldager: Vibe Coding
                </a>{" "}
                – Julian taler for første gang om vibe coding og hvordan det kommer til at ændre alt sammen med den kendte danske tech TV-vært og personlighed David Guldager.
              </li>
              <li>
                <a
                  href="https://podcasts.apple.com/dk/podcast/julian-singh-how-to-identify-implement-ai-use-cases/id1804979257?i=1000702973223"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Leapfrog Podcast: AI use cases
                </a>{" "}
                – Julian diskuterer hvordan man identificerer og implementerer AI i marketing.
              </li>
              <li>
                <a
                  href="https://open.spotify.com/episode/6uIgxa0EDSaDIWwuaJfWDL"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI vinder frem: Hvad sker der med SEO?
                </a>{" "}
                – Julian fortæller om sin tidlige brug af machine learning til SEO siden 2017.
              </li>
              <li>
                <a
                  href="https://www.become.dk/podcast/episode-2-han-brugte-ai-til-seo/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Become.dk: Han brugte AI til SEO
                </a>{" "}
                – Podcast om Julians pionerarbejde med AI-drevet SEO-automatisering.
              </li>
              <li>
                <a
                  href="https://open.spotify.com/episode/7Bfh91fxgnTiOQLTQPHuZU"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Leapfrog på Spotify
                </a>{" "}
                – Julian deler erfaringer med at gå fra SEO-specialist til AI-first virksomheder.
              </li>
              <li>
                <a
                  href="https://marketers.dk/blog/mm1490/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Marketers.dk podcast
                </a>{" "}
                – Julian sammenligner Claude og ChatGPT til content writing og AI-tekstproduktion.
              </li>
              <li>
                <a
                  href="https://poddtoppen.se/podcast/1849710214/ai-vinder-frem-hvad-sker-der-med-seo/02-han-brugte-ai-til-seo-lang-tid-for-chatgpt-var-en-ting-med-julian-bent-singh"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI til SEO før ChatGPT
                </a>{" "}
                – Julian om sin tidlige brug af AI til søgemaskineoptimering længe før ChatGPT.
              </li>
              <li>
                <a
                  href="https://podimo.com/dk/shows/ai-vinder-frem-hvad-sker-der-med-seo"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI vinder frem på Podimo
                </a>{" "}
                – Podcast-serie om AI&apos;s indflydelse på SEO-branchen.
              </li>
              <li>
                <a
                  href="https://open.spotify.com/episode/2rHPsveFgTY9aumVfhy3BQ"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI eller dø: E-commerce 2026
                </a>{" "}
                – Julian om hvorfor e-commerce virksomheder skal adoptere AI for at overleve.
              </li>
            </ul>
            <p className="mt-4">
              <Link
                href="/kontakt/"
                className="text-blue-600 hover:underline font-medium"
              >
                → Book Julian til podcast
              </Link>
            </p>
          </section>

          {/* Videoer */}
          <section id="videoer" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Videoer
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.youtube.com/watch?v=UN0eHK82NyA"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI vinder frem på YouTube
                </a>{" "}
                – Video-podcast om AI og SEO med Julian som gæst.
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=EcbXYMa3Neo"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Podcast optræden på YouTube
                </a>{" "}
                – Julian deler AI-ekspertise i videoformat.
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=M1ULNblE9Yg"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI og kreativt indhold
                </a>{" "}
                – Julian demonstrerer praktisk brug af AI til content creation.
              </li>
              <li>
                <a
                  href="https://www.instagram.com/reels/DSAgzI2ErBQ/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI-tips på Instagram Reels
                </a>{" "}
                – Korte, praktiske AI-tips fra Julian.
              </li>
              <li>
                <a
                  href="https://www.facebook.com/watch/?v=884393010819556"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Podcast på Facebook Watch
                </a>{" "}
                – Video-podcast om AI og digital strategi.
              </li>
            </ul>
          </section>

          {/* Værktøjer & Ressourcer */}
          <section id="vaerktoejer" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Værktøjer & Ressourcer
            </h2>
            <p className="mb-4">
              Julian har udviklet og bidraget til flere AI-værktøjer og
              ressourcer:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://ai-advisory-board.ai-growth-minds.dk/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI Advisory Board
                </a>{" "}
                – Gratis AI-drevet advisory board app til strategisk sparring og beslutningsstøtte.
              </li>
              <li>
                <a
                  href="https://chatgpt.com/g/g-I2LQ7UWw4-korrekturlaeser"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julians GPT korrekturlæser
                </a>{" "}
                – En custom GPT til at korrekturlæse dansk tekst med høj præcision.
              </li>
              <li>
                <a
                  href="https://morningscore.io/chatgpt-seo-content-prompts/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  ChatGPT SEO-prompts hos Morningscore
                </a>{" "}
                – Julians samling af effektive prompts til SEO-indhold.
              </li>
              <li>
                <a
                  href="https://gptpromptsleaderboard.com/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  GPT Prompts Leaderboard
                </a>{" "}
                – Platform til at finde og dele de bedste AI-prompts.
              </li>
            </ul>
          </section>

          {/* Anerkendelser */}
          <section id="anerkendelser" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Anerkendelser
            </h2>
            <p className="mb-4">
              Tredjepartsanerkendelser og reviews af Julians arbejde:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.findaikursus.dk/bedste-ai-kurser"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julian rangeret blandt Danmarks bedste AI-kurser
                </a>{" "}
                – FindAIKursus.dk har listet Julians kurser blandt de førende i Danmark.
              </li>
              <li>
                <a
                  href="https://chatgpt-kursus.dk/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  ChatGPT-kursus.dk
                </a>{" "}
                – Gratis online ressourcer til ChatGPT og AI-læring.
              </li>
              <li>
                <a
                  href="https://www.dendanskereklameskole.dk/cm/undervisere/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julian som AI-underviser på Den Danske Reklameskole
                </a>{" "}
                – Underviser i AI til kreative brancher.
              </li>
              <li>
                <a
                  href="https://seo.somecaptions.dk/om-os/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  SEO SomeCaptions
                </a>{" "}
                – Julians SEO-bureau med over 10 års erfaring i digital markedsføring.
              </li>
              <li>
                <a
                  href="https://somecaptions.dk/om-os/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  SomeCaptions
                </a>{" "}
                – Dansk AI content bureau grundlagt af Julian.
              </li>
              <li>
                <a
                  href="https://www.vallora.dk/om-os"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Vallora AI
                </a>{" "}
                – AI-automatiseringsværktøj til ejendomsbranchen, medstiftet af Julian.
              </li>
              <li>
                <a
                  href="https://fabrosagency.com/academy"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julian som underviser hos Fabros Academy
                </a>{" "}
                – Undervisning i AI og digital marketing.
              </li>
              <li>
                <a
                  href="https://merkd-v12-fm.euwest01.umbraco.io/arrangementer/ai-kundeforstaaelse-brug-ai-til-at-analysere-og-forbedre-kunderejsen/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julian som foredragsholder om AI og kundeforståelse
                </a>{" "}
                – Foredrag om brug af AI til at analysere og forbedre kunderejsen.
              </li>
            </ul>
          </section>

          {/* Trustpilot Reviews */}
          <section id="trustpilot" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Trustpilot Reviews
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.trustpilot.com/reviews/68f09e3202d3ec0b16c6a248"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  5-stjernet Trustpilot-anmeldelse
                </a>{" "}
                – Deltager roser AI Growth Minds kursets praktiske tilgang.
              </li>
              <li>
                <a
                  href="https://www.trustpilot.com/reviews/68063e4daca09ea151fc4dec"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  &quot;Danmarks bedste AI-kursus&quot;
                </a>{" "}
                – Entusiastisk anmeldelse på Trustpilot.
              </li>
              <li>
                <a
                  href="https://www.trustpilot.com/reviews/6804ba1fd2bdb7a9220074a1"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Trustpilot-anmeldelse for ikke-tekniske
                </a>{" "}
                – Kurset roses for at være tilgængeligt uden teknisk baggrund.
              </li>
              <li>
                <a
                  href="https://www.trustpilot.com/reviews/67f3b4c088ab9bdfe8241953"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Anmeldelse af AI-automation kursus
                </a>{" "}
                – Deltager fremhæver værdien af automationsundervisningen.
              </li>
              <li>
                <a
                  href="https://www.trustpilot.com/reviews/67ee397b8541dc31efad2770"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI Entrepreneur kursus-anmeldelse
                </a>{" "}
                – Positiv feedback fra iværksætter-deltager.
              </li>
              <li>
                <a
                  href="https://www.trustpilot.com/reviews/67ea65c7a7c485818343906b"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Professionelt AI-kursus
                </a>{" "}
                – Anmeldelse der fremhæver praktisk anvendelse i arbejdet.
              </li>
            </ul>
          </section>

          {/* Facebook Reviews */}
          <section id="facebook-reviews" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Facebook Reviews
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.facebook.com/100057536015585/posts/seneste-session-med-julian-bent-singh-founder-chief-ai-storyteller-fra-some-capt/1030114335583091/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI-session med Julian Bent Singh
                </a>{" "}
                – Facebook-opslag om en engagerende AI-session med Julian.
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/44076347394/posts/10159621106992395/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI-kursus anbefaling
                </a>{" "}
                – Positiv anbefaling i en Facebook-gruppe.
              </li>
            </ul>
          </section>

          {/* Hvad siger netværket */}
          <section id="netvaerk" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Hvad siger netværket
            </h2>
            <p className="mb-4">LinkedIn mentions og anbefalinger:</p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.linkedin.com/posts/johnnyspeiermann_ai-growth-minds-ai-online-kursus-i-automation-activity-7308867638464593920-9rtr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Johnny Speiermann om AI Growth Minds workshop
                </a>{" "}
                – &quot;The agenda is mind-blowing, and I can&apos;t wait to jump into the deep end.&quot;
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/susanne-nielsen-79225b56_552-mennesker-har-allerede-sagt-ja-til-at-activity-7394658339126685696-zO0i"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Susanne Nielsen om AI-event
                </a>{" "}
                – 552 mennesker tilmeldt AI-event med Julian.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/niels-hermansen_jeg-har-opkvalificeret-over-2800-professionelle-activity-7415021941532696576-jKXw"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Niels Hermansen om AI-opkvalificering
                </a>{" "}
                – Over 2800 professionelle opkvalificeret i AI.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/hannibalherforth_ai-isnt-replacing-you-its-amplifying-activity-7316371384719355904-WwNX"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Hannibal Herforth om AI
                </a>{" "}
                – AI forstærker dig, erstatter dig ikke.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/larsskjoldby_hold-k%C3%A6ft-hvor-er-det-her-ai-smart-men-activity-7392849580146728960-nqrb"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Lars Skjoldby om AI
                </a>{" "}
                – Imponeret over smart AI-anvendelse.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/kim-sonne-hansen-48b901a5_partnerincrime-welcometotheaijungle-activity-7411692621577900032-AlyF"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Kim Sonne Hansen om partnerskab
                </a>{" "}
                – AI-partnerskab og samarbejde.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/christiansylvester_julian-bent-singh-stifter-af-ai-growth-minds-activity-7354063167792021504-ND3p/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Christian Sylvester om Julian
                </a>{" "}
                – Omtale af Julian Bent Singh og AI Growth Minds.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/matti-ljungberg_seo-digitalmarketing-contentstrategy-activity-7218910331568328705-Qw-k"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Matti Ljungberg om SEO
                </a>{" "}
                – Indsigter om SEO og digital marketing-strategi.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/thomastomthomas_her-er-min-plan-for-at-bruge-ai-i-2026-activity-7400816889305784320-4fIr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Thomas&apos; AI-plan
                </a>{" "}
                – Plan for AI-brug i 2026.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/pulse/how-identify-implement-ai-use-cases-your-marketing-hannibal-herforth-p1nae/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Hannibal Herforth om AI use cases
                </a>{" "}
                – Guide til at finde og implementere AI i marketing.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/kim-sonne-hansen-48b901a5_openai-turndrawingintophoto-activity-7310595285393584128-l_m7"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Kim Sonne Hansen om OpenAI
                </a>{" "}
                – OpenAIs tegning-til-foto funktion.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/mathiaschrhansen_ai-eller-d%C3%B8-det-er-titlen-p%C3%A5-vores-nye-activity-7404454719894712320-xIPA"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Mathias Chr. Hansen om AI-strategi
                </a>{" "}
                – &quot;AI eller dø&quot; strategien.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/jimmy-thomsen_ai-softwareengineering-programming-activity-7291030789251588096-pLYV"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Jimmy Thomsen om AI
                </a>{" "}
                – AI inden for softwareudvikling.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/jeanettefabros_september-2025-a-milestone-a-moment-for-activity-7368885538939998208-ijVp"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Jeanette Fabros om AI-milepæl
                </a>{" "}
                – En milepæl i AI-rejsen.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/hannibalherforth_the-question-is-not-whether-you-should-use-activity-7317800092717973507-asCh"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Hannibal Herforth om AI-adoption
                </a>{" "}
                – Hvorfor AI-adoption er uundgåeligt.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/thomastomthomas_yes-blandet-med-en-passende-m%C3%A6ngde-suk-activity-7406691295513153536-9Nn9"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Thomas&apos; AI-refleksioner
                </a>{" "}
                – Refleksioner over AI-udviklingen.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/katrinebach_ai-diversityintech-competitiveness-activity-7366059145134751744-V1Mm"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Katrine Bach om AI og diversitet
                </a>{" "}
                – AI, diversitet og konkurrenceevne.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/clausnygaard_recraft-flux-midjourney-activity-7284811505043181569-vpbZ"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Claus Nygaard om AI-billeder
                </a>{" "}
                – Sammenligning af AI-billedgenereringsværktøjer.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/emil-olsen-dk_jeg-har-f%C3%A5et-en-ny-hobby-i-stedet-for-doom-activity-7285635152221786112-9LDn"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Emil Olsen om AI-hobby
                </a>{" "}
                – Produktiv brug af AI som ny hobby.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/dandy-business-park_ai-jam-session-mjulian-singhkarrusellinkedin-activity-7402247814191316992-4W_5"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI Jam Session med Julian
                </a>{" "}
                – Event hos Dandy Business Park.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/rosenfeldt_zapier-er-blevet-for-dyrt-min-mission-activity-7298416488959377408-FpUZ"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Rosenfeldt om automation
                </a>{" "}
                – Alternativer til dyre automationsværktøjer.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/frederik-berthelsen-0307013_tavlemaeoder-samarbejde-ledelse-activity-7323988064282783744-9-tu"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Frederik Berthelsen om ledelse
                </a>{" "}
                – Tavlemøder, samarbejde og ledelse.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/nikolajfskarbye_imorgen-har-jeg-ansvaret-for-et-lille-indl%C3%A6g-activity-7394067975647076352-pCS9"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Nikolaj F. Skarbye om indlæg
                </a>{" "}
                – At holde indlæg om AI.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/martinarvidsen_hrai-hrai2026-hrtech-activity-7415109306796150785-gaFo"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Martin Arvidsen om HR AI
                </a>{" "}
                – HR AI og HR Tech 2026.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/lyko_f-for-frode-f%C3%A5r-eller-n%C3%A5h-nej-activity-7374751508472557568-Yonx"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Lyko om kommunikation
                </a>{" "}
                – Kreativ kommunikation.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/mettewill_hvad-er-s%C3%A5-dit-bedste-tip-til-et-godt-webinar-activity-7366734906552471553-4Tk8"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Mette Will om webinarer
                </a>{" "}
                – Tips til gode webinarer.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/michael-f-johansen_ai-vibecoding-nysgerrighed-activity-7397195614561755138-bHXq"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Michael F. Johansen om vibe coding
                </a>{" "}
                – AI og vibe coding.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/niels-hermansen_hvor-er-det-vildt-ai-har-skabt-den-vildeste-activity-7370766848121929728-YGh2"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Niels Hermansen om AI
                </a>{" "}
                – AIs vilde muligheder.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/andreas-torp-n%C3%B8rgaard-8a32371b9_automatisk-linkedin-opslag-og-analyse-hj%C3%A6lp-activity-7290315268243775488-5BDS"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Andreas Torp Nørgaard om LinkedIn-AI
                </a>{" "}
                – Automatisk LinkedIn-analyse.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/krissejer_vibecoding-loveable-ai-activity-7398306883431825409-IGGT"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Kris Sejer om vibe coding
                </a>{" "}
                – Vibe coding og Loveable AI.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/torbjoernflensted_der-er-kommet-helt-ny-podcast-der-hedder-activity-7392571737227296768-73ZI"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Torbjørn Flensted om podcast
                </a>{" "}
                – Ny podcast om AI.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/christopherhofmanlaursen_s%C3%A5-har-openai-lanceret-sora-i-danmark-hvis-activity-7301165381002444800-k-qW"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Christopher Hofman Laursen om Sora
                </a>{" "}
                – OpenAI Sora lanceret i Danmark.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/larsnielsenorg_livestream-techtalk-vibecoding-activity-7401885459485855744-RJwA"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Lars Nielsen livestream
                </a>{" "}
                – Vibe coding og tech talk.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/morten-kvellestad_%C3%A5-bygge-ai-agenter-er-som-%C3%A5-l%C3%A6re-excel-i-activity-7370831543180689410-HZdr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Morten Kvellestad om AI-agenter
                </a>{" "}
                – At bygge AI-agenter.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/matti-ljungberg_seo-ai-marketing-activity-7323245486121865216-Of9m"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Matti Ljungberg om SEO og AI
                </a>{" "}
                – SEO og AI i marketing.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/niels-hermansen_til-alle-danske-virksomheder-efter-sommeren-activity-7340271919893479425-Nxp2"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Niels Hermansen til virksomheder
                </a>{" "}
                – Budskab til danske virksomheder om AI.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/nikolai-klausen-8149b17_hvorfor-har-klausen-taget-slips-p%C3%A5-i-dag-activity-7323000727944028160-DcBa"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Nikolai Klausen om anledning
                </a>{" "}
                – Speciel anledning.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/nikolai-klausen-8149b17_vil-du-gerne-l%C3%A6re-at-bruge-ai-redskaber-activity-7307294735767953410-DUg7"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Nikolai Klausen om AI-læring
                </a>{" "}
                – At lære AI-redskaber.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/jacob-skou-lopez-goetterup-09928543_chatgpt-activity-7325766377372356608-eQtG"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Jacob Skou Lopez Goetterup om ChatGPT
                </a>{" "}
                – Indsigter om ChatGPT.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/mogens-kramtoft-a6b1b91a8_seniorivaewrksaewtter-entrepreneurship-ai-activity-7290334117206855680-5YA_"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Mogens Kramtoft om senioriværksættere
                </a>{" "}
                – Senioriværksættere og AI.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/mogens-kramtoft-a6b1b91a8_s%C3%B8ger-testbrugere-til-ny-medieplatform-er-activity-7315625354365173760-KZiO"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Mogens Kramtoft søger testbrugere
                </a>{" "}
                – Ny medieplatform søger testbrugere.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/brigitta-christensen-b14247150_er-vi-rystet-eller-rustet-til-fremtiden-activity-7323283866155139072-U1xk"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Brigitta Christensen om fremtiden
                </a>{" "}
                – At være rustet til fremtiden.
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/posts/morten-cortzen_danmark-har-en-unik-chance-men-t%C3%B8r-vi-tage-activity-7297483726446292993-WTzy"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Morten Cortzen om Danmarks AI-chance
                </a>{" "}
                – Danmarks unikke chance inden for AI.
              </li>
            </ul>
          </section>

          {/* Eksterne links */}
          <section id="eksterne" className="mb-10">
            <h2 className="text-2xl font-serif border-b border-zinc-300 pb-2 mb-4">
              Eksterne links
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <a
                  href="https://www.linkedin.com/in/julianbentsingh/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julians LinkedIn-profil
                </a>{" "}
                – Følg Julian Bent Singh på LinkedIn.
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Julianbentsingh"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julians YouTube-kanal
                </a>{" "}
                – AI-videoer og tutorials.
              </li>
              <li>
                <a
                  href="https://www.instagram.com/julianbentsingh/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julians Instagram
                </a>{" "}
                – AI-tips og behind-the-scenes.
              </li>
              <li>
                <a
                  href="https://www.facebook.com/julian.b.singh"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Julians Facebook
                </a>{" "}
                – Opdateringer og AI-nyheder.
              </li>
              <li>
                <a
                  href="https://ai-growth-minds.dk/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  AI Growth Minds
                </a>{" "}
                – Dansk AI-kursusplatform stiftet af Julian.
              </li>
              <li>
                <a
                  href="https://www.vallora.dk/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:underline"
                >
                  Vallora AI
                </a>{" "}
                – AI-automatisering til ejendomsbranchen.
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="mb-10 p-6 bg-blue-50 border border-blue-200 rounded">
            <h2 className="text-xl font-bold mb-3">Klar til at samarbejde?</h2>
            <p className="mb-4 text-zinc-700">
              Uanset om du har brug for AI rådgivning, et foredrag eller kurser
              til dit team, så er jeg klar til at hjælpe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kontakt/"
                className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Kontakt mig
              </Link>
              <Link
                href="/ai-ydelser/"
                className="inline-block px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-50 transition-colors"
              >
                Se ydelser
              </Link>
            </div>
          </section>
        </div>

        {/* Info Box Column (Wikipedia Style) */}
        <div className="md:col-span-4 lg:col-span-3 order-first md:order-last">
          <div className="border border-zinc-300 bg-zinc-50 p-4 text-sm md:sticky md:top-24">
            <div className="mb-4 relative aspect-square bg-zinc-200 border border-zinc-300 overflow-hidden">
              <Image
                src="/om/Førende-AI-ekspert-Julian-Bent-Singh.png"
                alt="Julian Bent Singh - Førende AI Ekspert i Danmark"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-center font-bold text-lg mb-2 border-b border-zinc-200 pb-2">
              Julian Bent Singh
            </h3>

            <table className="w-full text-left">
              <tbody>
                <tr className="border-b border-zinc-200">
                  <th className="py-2 pr-2 align-top font-bold text-zinc-700 w-24">
                    Født
                  </th>
                  <td className="py-2 align-top">Danmark</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <th className="py-2 pr-2 align-top font-bold text-zinc-700">
                    Beskæftigelse
                  </th>
                  <td className="py-2 align-top">
                    AI Ekspert
                    <br />
                    Iværksætter
                    <br />
                    Investor
                    <br />
                    Keynote Speaker
                  </td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <th className="py-2 pr-2 align-top font-bold text-zinc-700">
                    Nuværende roller
                  </th>
                  <td className="py-2 align-top">
                    <a
                      href="https://ai-growth-minds.dk/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      AI Growth Minds
                    </a>{" "}
                    (Stifter)
                    <br />
                    <a
                      href="https://www.vallora.dk/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:underline"
                    >
                      Vallora AI
                    </a>{" "}
                    (AI Direktør)
                  </td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <th className="py-2 pr-2 align-top font-bold text-zinc-700">
                    Kendt for
                  </th>
                  <td className="py-2 align-top">
                    AI Implementering
                    <br />
                    AI Kurser
                    <br />
                    AI Strategi
                    <br />
                    Foredrag
                  </td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <th className="py-2 pr-2 align-top font-bold text-zinc-700">
                    Erfaring
                  </th>
                  <td className="py-2 align-top">8+ år med AI</td>
                </tr>
                <tr>
                  <th className="py-2 pr-2 align-top font-bold text-zinc-700">
                    Websted
                  </th>
                  <td className="py-2 align-top">
                    <a
                      href="https://julianbentsingh.dk"
                      className="text-blue-600 hover:underline"
                    >
                      julianbentsingh.dk
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Ekspertise tags */}
            <div className="mt-4 pt-4 border-t border-zinc-200">
              <h4 className="font-bold text-zinc-700 mb-2">Ekspertise</h4>
              <div className="flex flex-wrap gap-1">
                {JULIAN_DATA.knowsAbout.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-zinc-200 text-zinc-700 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
