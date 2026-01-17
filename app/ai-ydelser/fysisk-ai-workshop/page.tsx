"use client";

import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import { Check, ArrowRight, Brain, Workflow, Zap, Code, Bot } from "lucide-react";
import Link from "next/link";
import {
  SITE_URL,
  SCHEMA_IDS,
  orgRef,
} from "@/lib/schema";

const levels = [
  {
    icon: Brain,
    title: "1. Chat AI",
    description: "Prompt Engineering og generel uddannelse i anvendelse af sprogmodeller. Lær at kommunikere effektivt med AI for maksimalt udbytte.",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    icon: Workflow,
    title: "2. AI Workflows",
    description: "Uddannelse i at kunne designe og bygge AI workflows i form af CustomGPT'er og AI-assistenter til specifikke arbejdsprocesser.",
    gradient: "from-cyan-400 to-teal-400"
  },
  {
    icon: Zap,
    title: "3. AI Automatisering",
    description: "Lær at automatisere manuelle processer med AI. Jeg arbejder med værktøjer som n8n til at binde systemer sammen.",
    gradient: "from-teal-400 to-emerald-400"
  },
  {
    icon: Code,
    title: "4. Vibe Coding",
    description: "Bliv i stand til at udvikle egen software bare ved at prompte. Byg SaaS, interne portaler og værktøjer uden at skrive kode selv.",
    gradient: "from-emerald-400 to-green-400"
  },
  {
    icon: Bot,
    title: "5. AI Agenter",
    description: "Få kompetencerne til at bygge AI Agenter der kan arbejde autonomt, tage beslutninger og løse komplekse opgaver på egen hånd.",
    gradient: "from-green-400 to-yellow-400"
  }
];

export default function WorkshopsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/ai-ydelser/fysisk-ai-workshop/#service`,
        "name": "Fysiske AI Workshops",
        "description": "Skræddersyede AI workshops i 5 niveauer: Chat AI, Workflows, Automatisering, Vibe Coding og AI Agenter. Praktisk fysisk undervisning.",
        "provider": orgRef(),
        "serviceType": "AI Undervisning",
        "areaServed": "DK",
        "offers": {
          "@type": "Offer",
          "url": `${SITE_URL}/ai-ydelser/fysisk-ai-workshop/`,
          "priceCurrency": "DKK",
          "description": "Skræddersyet pris baseret på omfang og niveau"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Forside",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Ydelser",
            "item": `${SITE_URL}/ai-ydelser/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Workshop",
            "item": `${SITE_URL}/ai-ydelser/fysisk-ai-workshop/`
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-yellow-500/30">
      <JsonLd schema={schema} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Fysiske <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                AI Workshops
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
              Jeg løfter din virksomhed gennem de 5 niveauer af praktisk AI anvendelse.
              Fra simpel prompting til autonome agenter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The 5 Levels Grid */}
      <section className="py-20 px-6 bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-900 transition-all duration-300 hover:border-zinc-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${level.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                      <level.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{level.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Hands-on i <span className="text-yellow-400">virkeligheden</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Se hvordan jeg arbejder praktisk med AI i danske virksomheder.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="https://www.linkedin.com/posts/julianbentsingh_t%C3%A6nk-sig-at-pokemon-og-paw-patrol-nu-er-blevet-activity-7276872928871223296-fmYH/"
              target="_blank"
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-yellow-400/50 hover:bg-zinc-900 transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative aspect-video bg-zinc-800 overflow-hidden">
                  <Image
                    src="/ai-ydelser-ai-workshop/AI-workshop-for-skybrands-as.png"
                    alt="AI Workshop for Skybrands - Photoshoot besparelser"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md uppercase tracking-wider border border-blue-500/20">LinkedIn Case</span>
                    <span className="text-zinc-500 text-sm">Skybrands A/S</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors leading-tight">
                    3 Dages AI Workshop for Skybrands A/S
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 flex-1">
                    De kan nu spare deres kunder for tusindevis af kroner på photoshoots ved implementering af AI-genereret content.
                  </p>
                  <div className="flex items-center text-sm text-yellow-500 font-medium">
                    Læs hele opslaget <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link
              href="https://www.linkedin.com/posts/thomastomthomas_yes-blandet-med-en-passende-m%C3%A6ngde-suk-activity-7406691295513153536-9Nn9"
              target="_blank"
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-yellow-400/50 hover:bg-zinc-900 transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative aspect-video bg-zinc-800 overflow-hidden">
                  <Image
                    src="/ai-ydelser-ai-workshop/AI-workshop-for-erhvervshus-hovedstaden.png"
                    alt="AI Workshop for Erhvervshus Hovedstaden - Vibe Coding"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md uppercase tracking-wider border border-blue-500/20">LinkedIn Case</span>
                    <span className="text-zinc-500 text-sm">Erhvervshus Hovedstaden</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors leading-tight">
                    2 Dages AI Workshop for Erhvervshus Hovedstaden
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 flex-1">
                    Hele marketing- og salgsteamet kan nu Vibe Code egne værktøjer og AI Agenter til automatisering af arbejdsgange.
                  </p>
                  <div className="flex items-center text-sm text-yellow-500 font-medium">
                    Læs hele opslaget <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customization & Process */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Skræddersyet til <br />
                <span className="text-yellow-400">jeres virkelighed</span>
              </h2>
              <div className="space-y-6 text-lg text-zinc-400">
                <p>
                  Alle workshops bliver skræddersyet specifikt til din virksomhed, branche og industri.
                  Jeg arbejder ikke med teoretiske eksempler, men med jeres egne use-cases.
                </p>
                <p>
                  Jeg arbejder ud fra et ønsket output mål: Hvor skal I stå efter workshoppen?
                </p>
                <ul className="space-y-4 mt-8">
                  {[
                    "Skal I kunne bygge egne AI Agenter?",
                    "Skal I have løftet vidensniveauet i organisationen?",
                    "Skal I have 5 færdige AI-assistenter med hjem?",
                    "Hjælp til implementering af løsninger efterfølgende"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 p-0.5 rounded-full bg-yellow-400/10">
                        <Check className="w-4 h-4 text-yellow-400" />
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
              className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800"
            >
              <h3 className="text-2xl font-bold mb-6">Praktisk Information</h3>
              <div className="space-y-6">
                <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Varighed</h4>
                  <p className="text-lg font-semibold">2 til 6 timer</p>
                  <p className="text-zinc-400 text-sm mt-1">Kan også forløbe over flere sessioner</p>
                </div>
                <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Format</h4>
                  <p className="text-lg font-semibold">Fysisk eller Online</p>
                  <p className="text-zinc-400 text-sm mt-1">Hands-on øvelser og produktion</p>
                </div>
                <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Pris</h4>
                  <p className="text-lg font-semibold">Fra 15.000 kr.</p>
                  <p className="text-zinc-400 text-sm mt-1">Skræddersyet efter omfang og niveau</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/kontakt"
                  className="group flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors duration-300"
                >
                  Book en Workshop
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
