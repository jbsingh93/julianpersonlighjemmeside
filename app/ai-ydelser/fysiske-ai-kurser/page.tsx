"use client";

import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Brain, Code, MessageSquare, Terminal, Users, Clock, MapPin } from "lucide-react";
import {
  SITE_URL,
  SCHEMA_IDS,
  buildBreadcrumbSchema,
  orgRef,
  personRef,
} from "@/lib/schema";

// Specific course data
const courses = [
  {
    title: "Kom i gang med AI Agenter",
    description: "Lær at bygge og orkestrere autonome AI agenter der kan udføre opgaver for dig. Jeg kommer til at arbejde med alt fra en agents atonomi, promting til agenter, og træning af værktæjer som n8n, og du går hjem med din første fungerende agent.",
    image: "/ai-ydelser-ai-kurser/fysisk-ai-agent-kursus.jpg",
    icon: Brain,
    tags: ["AI Agenter", "n8n", "Automation"],
    gradient: "from-blue-500/20 to-purple-500/20",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Lær at Vibe Code AI værktøjer",
    description: "Vibe Coding er fremtiden. Lær at udvikle dine egne softwareværktøjer, hjemmesider og dashboards udelukkende ved hjælp af prompts. Ingen tunge kodekompetencer påkrævet.",
    image: "/ai-ydelser-ai-kurser/fysisk-vibe-coding-kursus.jpg",
    icon: Terminal,
    tags: ["Vibe Coding", "Claude Code", "Lovable"],
    gradient: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50",
  },
  {
    title: "Lær Prompt og Context Engineering som en prof",
    description: "Gå fra simple spørgsmål til avancerede system prompts. Lær at styre modellens kontekst vindue, reducere hallucinationer og strukturere komplekse outputs præcist som du vil have dem.",
    image: "/ai-ydelser-ai-kurser/fysisk-prompt-engineering-kursus.jpg",
    icon: MessageSquare,
    tags: ["Prompt Engineering", "Context Engineering", "LLM forståelse"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50",
  }
];

export default function CoursesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/ai-ydelser/fysiske-ai-kurser/#service`,
        "name": "Skræddersyede AI Kurser",
        "description": "Fysiske AI kurser der løfter jeres niveau: AI Agenter, Vibe Coding og Advanced Prompting.",
        "provider": orgRef(),
        "serviceType": "AI Uddannelse",
        "areaServed": "DK",
        "offers": {
          "@type": "Offer",
          "url": `${SITE_URL}/ai-ydelser/fysiske-ai-kurser/`,
          "priceCurrency": "DKK",
          "price": "25000",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "25000",
            "priceCurrency": "DKK",
            "minPrice": "25000",
            "description": "Startpris for kurser"
          }
        }
      },
      {
        "@type": "ItemList",
        "name": "AI Kurser",
        "description": "Oversigt over tilgængelige AI kurser",
        "itemListElement": courses.map((course, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Course",
            "name": course.title,
            "description": course.description,
            "provider": orgRef(),
            "courseCode": `AI-KURSUS-${index + 1}`,
            "hasCourseInstance": [
              {
                "@type": "CourseInstance",
                "courseMode": "https://schema.org/OnlineEventAttendanceMode",
                "courseWorkload": "PT6H",
                "instructor": personRef(),
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "DKK",
                  "price": "25000",
                  "url": `${SITE_URL}/ai-ydelser/fysiske-ai-kurser/`,
                  "availability": "https://schema.org/InStock"
                }
              }
            ]
          }
        }))
      },
      buildBreadcrumbSchema([
        { name: "Forside", url: "/" },
        { name: "AI Ydelser", url: "/ai-ydelser/" },
        { name: "AI Kurser", url: "/ai-ydelser/fysiske-ai-kurser/" },
      ])
    ]
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-blue-500/30">
      <JsonLd schema={schema} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/ai-ydelser/fysiske-ai-kurser/ai-course-hero.png"
            alt="AI Kurser Hero"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80" />
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
              Skræddersyet Undervisning
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Jeg løfter jeres <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient">
                AI niveau
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
              Fysiske kurser afholdt hos jer eller i inspirerende omgivelser.
              Fra avancerede agenter til vibe coding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses List - "The slightly different style" (Big horizontal cards) */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative bg-zinc-900 overflow-hidden rounded-3xl border border-zinc-800 ${course.border} transition-colors duration-500`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 grid md:grid-cols-5 gap-8">
                  {/* Image/Visual Side */}
                  <div className="md:col-span-2 h-64 md:h-auto relative overflow-hidden">
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-zinc-800/50`}>
                        <course.icon className="w-24 h-24 text-zinc-700 group-hover:text-white/20 transition-colors duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
                  </div>

                  {/* Content Side */}
                  <div className="md:col-span-3 p-8 md:py-12 md:pr-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded text-zinc-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-3xl font-bold mb-4">{course.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                      {course.description}
                    </p>

                    <Link
                      href="/kontakt"
                      className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Bestil forløb <ArrowRight className="ml-2 w-5 h-5 text-blue-400" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailored Section */}
      <section className="py-24 px-6 bg-zinc-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Skræddersyet til <br />
                <span className="text-blue-400">jeres mål og ønsker</span>
              </h2>
              <div className="space-y-6 text-lg text-zinc-400">
                <p>
                  Ingen virksomheder er ens, og derfor tror jeg ikke på standardløsninger. Jeg skræddersyr hvert enkelt kursus, så det matcher præcis jeres branche, jeres nuværende vidensniveau og de konkrete mål, I har.
                </p>
                <p>
                  Inden kurset tager jeg en grundig dialog, hvor jeg identificerer jeres "skill gaps" og designer en roadmap for undervisningen.
                </p>
                <ul className="space-y-4 mt-8">
                  {[
                    "Fuld tilpasning til jeres branche og data",
                    "Fokus på jeres konkrete use-cases",
                    "Fleksibel afholdelse (hos jer eller ude)",
                    "Opfølgning og implementeringsstøtte"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 p-0.5 rounded-full bg-blue-500/10">
                        <Check className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-20" />
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/ai-ydelser-ai-kurser/Julian-fysisk-ai-kurser.png"
                  alt="Julian Bent Singh underviser fysisk på et skræddersyet AI kursus for en virksomhed"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white font-medium text-lg">Pædagogisk og engagerende undervisning i øjenhøjde</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-24 px-6 border-t border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Tidligere <span className="text-purple-400">afholdte kurser</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Se eksempler på tidligere forløb og hvad deltagerne har fået med hjem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="https://www.linkedin.com/posts/julianbentsingh_tilbage-til-skoleb%C3%A6nken-denne-gang-p%C3%A5-den-activity-7269682038834679809-Ka2I"
              target="_blank"
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-300 h-full"
              >
                <div className="relative aspect-video bg-zinc-800 overflow-hidden">
                  <Image
                    src="/ai-ydelser-ai-kurser/fysisk-ai-i-salg-kursus.jpg"
                    alt="AI i salg kursus - Erhvervsakademi Sydvest"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-md uppercase tracking-wider border border-purple-500/20">LinkedIn Case</span>
                    <span className="text-zinc-500 text-sm">Erhvervsakademi Sydvest</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    AI i salg kursus
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    "Tilbage til skolebænken - denne gang på den anden side som underviser." Et kursus fokuseret på salg og AI.
                  </p>
                  <div className="flex items-center text-sm text-purple-400 font-medium">
                    Læs hele opslaget <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link
              href="https://www.linkedin.com/posts/julianbentsingh_der-er-fuldt-booket-og-4-p%C3%A5-venteliste-activity-7237527410089332737-xVMk"
              target="_blank"
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-300 h-full"
              >
                <div className="relative aspect-video bg-zinc-800 overflow-hidden">
                  <Image
                    src="/ai-ydelser-ai-kurser/fysisk-kursus-i-prompting.jpg"
                    alt="Kursus i Prompting - Business Lolland-Falster"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-md uppercase tracking-wider border border-purple-500/20">LinkedIn Case</span>
                    <span className="text-zinc-500 text-sm">Business Lolland-Falster</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    Kursus i Prompting
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    "Der er fuldt booket og 4 på venteliste." Stor interesse og højt engagement omkring konkret prompting.
                  </p>
                  <div className="flex items-center text-sm text-purple-400 font-medium">
                    Læs hele opslaget <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Practical Details Grid */}
      <section className="py-20 px-6 bg-zinc-950/50 border-t border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Varighed</h4>
              <p className="text-zinc-400">Min. 6 timer</p>
              <p className="text-zinc-500 text-sm mt-1">Intensive dagsforløb</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Users className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Deltagere</h4>
              <p className="text-zinc-400">Max 25 personer</p>
              <p className="text-zinc-500 text-sm mt-1">For optimal læring</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <MapPin className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Lokation</h4>
              <p className="text-zinc-400">Hos jer eller ude</p>
              <p className="text-zinc-500 text-sm mt-1">Jeg finder passende lokaler</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400 font-bold mb-4">Kr</div>
              <h4 className="text-lg font-bold mb-2">Pris</h4>
              <p className="text-zinc-400">Fra 25.000 kr.</p>
              <p className="text-zinc-500 text-sm mt-1">Ekskl. moms</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/kontakt"
              className="inline-block px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              Start dialog om kursus
            </Link>
            <p className="mt-4 text-zinc-500 text-sm">
              Helt uforpligtende snak om jeres behov
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
