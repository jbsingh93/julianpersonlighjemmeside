"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Bot,
    Presentation,
    Lightbulb,
    Mic,
    Globe,
    GraduationCap,
    Users
} from "lucide-react";

const services = [
    {
        title: "Fysiske AI Workshops",
        description: "Intensive workshops skræddersyet til jeres virksomheds behov.",
        icon: Users,
        category: "Workshop",
        href: "/ai-ydelser/fysisk-ai-workshop",
    },
    {
        title: "Fysiske AI Kurser",
        description: "Lær de nyeste AI-værktøjer og metoder hands-on.",
        icon: GraduationCap,
        category: "Kurser",
        href: "/ai-ydelser/fysiske-ai-kurser",
    },
    {
        title: "Strategisk AI Rådgivning",
        description: "Implementering, upskilling og ambidextrøs organisation. I samarbejde med strategerne Rasmus Madsen og Casper Guldager.",
        icon: Lightbulb,
        category: "Konsulent",
        href: "/ai-ydelser/ai-konsulent",
    },
    {
        title: "AI Oplæg & Events",
        description: "Inspirerende oplæg til konferencer og firmaarrangementer.",
        icon: Mic,
        category: "Foredrag",
        href: "/ai-ydelser/foredrag",
    },
    {
        title: "Online AI Workshops",
        description: "Fleksible workshops afholdt virtuelt for distribuerede teams.",
        icon: Globe,
        category: "Online",
        href: "/ai-ydelser/online-ai-workshop",
    },
    {
        title: "Online AI Uddannelse",
        description: "Dybdegående uddannelsesforløb tilgængeligt online.",
        icon: Presentation,
        category: "Online",
        href: "/ai-ydelser/online-ai-kurser",
    },
    {
        title: "AI Mentorskab",
        description: "1-til-1 sparring og karriereudvikling inden for AI.",
        icon: Bot,
        category: "Mentor",
        href: "/ai-ydelser/ai-mentor",
    },
];

export default function AIServices() {
    return (
        <section id="ai-services" className="py-24 bg-zinc-950 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        AI <span className="text-yellow-400">Services</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        Fra strategisk rådgivning til hands-on workshops. Jeg hjælper virksomheder og individer med at navigere i AI-revolutionen.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Link key={index} href={service.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 transition-all hover:bg-zinc-800/50 flex flex-col items-start h-full"
                            >
                                <div className="p-3 bg-yellow-400/10 rounded-lg mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <div className="mt-auto">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-700 px-3 py-1 rounded-full">
                                        {service.category}
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
