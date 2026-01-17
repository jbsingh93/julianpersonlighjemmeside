"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Newspaper, Trophy, Mic, ArrowRight } from "lucide-react";

const TOP_MENTIONS = [
  {
    title: "Top 10 AI-Influencer",
    source: "Via Ritzau",
    year: "2024",
    icon: Newspaper,
    description: "Udnævnt som en af de mest indflydelsesrige stemmer inden for AI i Danmark.",
  },
  {
    title: "Top 15 AI-Ekspert",
    source: "Seniorfolk",
    year: "2025",
    icon: Trophy,
    description: "Anerkendt for evnen til at formidle kompleks teknologi til øjenhøjde.",
  },
  {
    title: "Ekspertdebattør",
    source: "Computerworld",
    year: "2025",
    icon: Mic,
    description: "Jævnlig bidragsyder til debatten om kunstig intelligens og teknologiens rolle.",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900 relative active">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Media & <span className="text-yellow-400">Anerkendelse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            Det er en ære at bidrage til den offentlige samtale om fremtidens teknologi.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TOP_MENTIONS.map((mention, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="group relative p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-yellow-400/50 transition-all duration-300 hover:bg-zinc-800/50 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <mention.icon size={80} className="text-yellow-400 rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <mention.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {mention.title}
                </h3>

                <div className="flex items-center text-sm font-medium text-zinc-500 mb-4">
                  <span className="uppercase tracking-wider">{mention.source}</span>
                  <span className="mx-2">•</span>
                  <span>{mention.year}</span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {mention.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/referencer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors border-b border-transparent hover:border-yellow-400 pb-0.5"
          >
            Se alle referencer og medieomtaler
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
