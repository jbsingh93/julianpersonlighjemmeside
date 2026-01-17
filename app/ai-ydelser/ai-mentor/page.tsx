import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SCHEMA_IDS,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/schema";
import { Check, Users, Target, Zap, BookOpen, Star, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Mentor & Personlig Opkvalificering | Julian Bent Singh",
  description: "Få en personlig AI mentor. Jeg hjælper dig med teknisk opkvalificering, karriereudvikling, adgang til netværk og konference-gigs. Book et forløb nu.",
  keywords: [
    "AI Mentor",
    "AI Mentorskab",
    "AI Opkvalificering",
    "Personlig AI Træning",
    "AI Karriere",
    "AI Netværk",
    "Julian Bent Singh",
  ],
  alternates: {
    canonical: `${SITE_URL}/ai-ydelser/ai-mentor/`,
  },
  openGraph: {
    title: "AI Mentor & Personlig Opkvalificering | Julian Bent Singh",
    description: "Accelerér din AI-karriere med personlig sparring, teknisk dybde og adgang til eksklusivt netværk.",
    url: `${SITE_URL}/ai-ydelser/ai-mentor/`,
    type: "website",
  },
};

export default function MentorshipPage() {
  const faqItems = [
    {
      question: "Hvem er dette mentorforløb henvendt til?",
      answer: "Forløbet er primært for ledere, konsulenter, og specialister, der ønsker at accelerere deres karriere inden for AI. Uanset om du vil være en stærkere beslutningstager, en dygtigere teknisk specialist, eller en thought leader på scenen.",
    },
    {
      question: "Hvad kræver det af tekniske forudsætninger?",
      answer: "Vi tilpasser niveauet til dig. Du behøver ikke være programmør, men du skal have en nysgerrighed og vilje til at lære de nyeste AI-værktøjer at kende i dybden.",
    },
    {
      question: "Hvor ofte mødes vi?",
      answer: "Vi mødes fysisk minimum 2 gange årligt til dybdegående sessions. Derudover har vi løbende online sparring og opfølgning for at sikre fremdrift mod dine mål.",
    },
    {
      question: "Hvordan hjælper du med netværk?",
      answer: "Jeg åbner mit netværk for dig. Det kan betyde introduktioner til relevante interessenter, hjælp til at lande konference-gigs, eller sparring på hvordan du positionerer dig som AI-ekspert.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceSchema({
        id: SCHEMA_IDS.aiMentor,
        name: "AI Mentorskab",
        description: "Personlig sparring og karriereudvikling inden for AI. 1:1 sessioner for ledere og specialister.",
        url: `${SITE_URL}/ai-ydelser/ai-mentor/`,
        serviceType: "AI Mentoring",
        priceDescription: "Kontakt for tilbud",
      }),
      buildFAQSchema(faqItems),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "AI Ydelser", url: "/ai-ydelser/" },
          { name: "AI Mentor", url: "/ai-ydelser/ai-mentor/" },
        ]),
        "@id": `${SITE_URL}/ai-ydelser/ai-mentor/#breadcrumb`,
      },
    ],
  };

  return (
    <main className="bg-black text-white min-h-screen selection:bg-yellow-400 selection:text-black">
      <JsonLd schema={schema} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 border border-yellow-400/30 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium">
                Personligt Forløb • Opkvalificering • Karriere
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Din Personlige <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  AI Mentor
                </span>
              </h1>
              
              <p className="text-xl text-zinc-400 max-w-lg">
                Jeg hjælper dig med væsentlig opkvalificering, personlig teknisk sparring og adgang til et eksklusivt netværk. Lad os nå dine AI-mål sammen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kontakt"
                  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105 text-center flex items-center justify-center gap-2"
                >
                  Ansøg om mentorskab <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#fordele"
                  className="px-8 py-4 border border-zinc-700 bg-zinc-900/50 text-white font-medium rounded-full hover:bg-zinc-800 transition-all hover:scale-105 text-center"
                >
                  Læs mere om forløbet
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
              <Image
                src="/ai-ydelser-ai-mentor/AI-mentor-Julian-bent-singh.jpg"
                alt="Julian Bent Singh - Danmarks førende AI-mentor og ekspert i personlig AI-opkvalificering og karriereudvikling"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION / FORDELE */}
      <section id="fordele" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Hvad får du ud af et <span className="text-yellow-400">mentorskab?</span></h2>
            <p className="text-zinc-400 text-lg">
              Det her er ikke bare et kursus. Det er et partnerskab, hvor jeg personligt investerer i din udvikling og succes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-colors">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Væsentlig Opkvalificering</h3>
              <p className="text-zinc-400">
                Få struktureret læring i de nyeste AI-teknologier. Vi går i dybden med alt fra avanceret prompting til opsætning af AI-agenter og automatiseringer, skræddersyet til dit niveau.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-colors">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Netværk & Muligheder</h3>
              <p className="text-zinc-400">
                Jeg bruger aktivt mit netværk til at hjælpe dig frem. Det kan være introduktioner til nøglepersoner, hjælp til at lande AI-konsulentopgaver eller få dig på scenen som oplægsholder.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-colors">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Teknisk Sparring</h3>
              <p className="text-zinc-400">
                Sidder du fast med en løsning? Har du brug for et par ekstra øjne på en strategi? Du får direkte adgang til min tekniske ekspertise og sparring, når du har brug for det.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-colors">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mål & Ansvarlighed</h3>
              <p className="text-zinc-400">
                Vi sætter konkrete mål for din udvikling, og jeg sørger personligt for, at du når dem. Accountability er nøglen til at rykke sig hurtigt og effektivt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHYSICAL MEETINGS HIGHLIGHT */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900/30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             {/* Image */}
             <div className="relative h-[400px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 order-2 md:order-1">
                <Image
                  src="/ai-ydelser-ai-mentor/få-en-ai-mentor.jpg"
                  alt="Fysisk AI-mentorskab med Julian Bent Singh - personlig sparring og hands-on træning i AI-teknologier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Vi mødes <span className="text-yellow-400">fysisk</span>
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Online møder er effektive, men det personlige møde skaber dybde. I løbet af et år mødes vi minimum 2 gange fysisk.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                  <span className="text-zinc-400">Dybdegående strategisk planlægning face-to-face.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                  <span className="text-zinc-400">Hands-on gennemgang af værktøjer og setups på din laptop.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                  <span className="text-zinc-400">Netværksmuligheder i forbindelse med vores møder.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Hvem er det rigtige match?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-yellow-400">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Lederen</h3>
                <p className="text-zinc-400 text-sm">
                  Der vil drive AI-transformationen i sin organisation og forstå teknologien i dybden.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-yellow-400">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Konsulenten</h3>
                <p className="text-zinc-400 text-sm">
                  Der vil specialisere sig i AI og tilbyde high-end rådgivning til sine kunder.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-yellow-400">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Speakeren</h3>
                <p className="text-zinc-400 text-sm">
                  Der vil udvide sit repertoire med AI-foredrag og have fagligheden helt på plads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Ofte stillede <span className="text-yellow-400">spørgsmål</span></h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-zinc-800 pb-6">
                <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                <p className="text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="kontakt" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Klar til at <span className="text-yellow-400">rykke din karriere?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Lad os tage en uforpligtende snak om dine mål, og om et mentorskab er det rette for dig.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-10 py-5 bg-yellow-400 text-black font-bold rounded-full text-lg hover:bg-yellow-300 transition-all hover:scale-105"
          >
            Kontakt mig nu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
