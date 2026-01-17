"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-end pt-20 overflow-hidden bg-zinc-950">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 h-full flex-grow">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="self-center py-20"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-yellow-400/30 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium">
                        AI Service • Investering • Strategi
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Danmarks Førende <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                            AI Ekspert
                        </span>{" "}
                        & Keynote Speaker
                    </h1>
                    <p className="text-xl text-zinc-400 mb-8 max-w-lg">
                        Strategisk AI-implementering, kurser og foredrag der skaber konkrete resultater for danske virksomheder.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#ai-services"
                            className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105"
                        >
                            Se Services
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 border border-zinc-700 bg-zinc-900/50 text-white font-medium rounded-full hover:bg-zinc-800 transition-all hover:scale-105"
                        >
                            Kontakt Mig
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-full min-h-[500px] md:min-h-[800px] hidden md:flex items-end justify-center"
                >
                    {/* Julian's Image */}
                    <div className="w-full h-full relative z-10">
                        <Image
                            src="/Julian-Bent-Singh-Danmarks-førende-AI-ekspert.png"
                            alt="Julian Bent Singh - Danmarks førende AI ekspert"
                            fill
                            className="object-contain object-bottom scale-125 origin-bottom"
                            priority
                        />
                        {/* Decorative glow behind image */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-gradient-to-t from-yellow-400/10 to-transparent blur-3xl -z-10" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
