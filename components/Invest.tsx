"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Rocket, Handshake } from "lucide-react";

export default function Invest() {
    return (
        <section id="invest" className="py-24 bg-black text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Invest</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Investeringer, startups og fremtidens teknologier.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <TrendingUp size={100} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <TrendingUp className="text-yellow-400" />
                            Mine Investeringer
                        </h3>
                        <p className="text-zinc-400 mb-6">
                            Et indblik i min portefølje og de projekter jeg tror på. Fokus på AI, SaaS og fremtidsteknologi.
                        </p>
                        <Link href="/invester/portefoelje" className="text-yellow-400 font-medium hover:underline">Se Portefølje &rarr;</Link>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 rounded-3xl bg-yellow-400 text-black border border-yellow-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Rocket size={100} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Rocket className="text-black" />
                            Pitch Din Idé
                        </h3>
                        <p className="text-black/80 mb-6 font-medium">
                            Har du den næste store AI-idé? Jeg leder altid efter visionære stiftere at samarbejde med.
                        </p>
                        <Link href="/invester/pitch" className="block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors w-full text-center">
                            Send Pitch
                        </Link>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Handshake size={100} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Handshake className="text-yellow-400" />
                            AI Rådgivning til Investorer
                        </h3>
                        <ul className="text-zinc-400 space-y-3 mb-6 list-disc list-inside">
                            <li>Screening af AI cases</li>
                            <li>Due Diligence support</li>
                            <li>Teknisk vurdering</li>
                        </ul>
                        <Link href="/invester/ai-raadgivning-til-investorer" className="text-yellow-400 font-medium hover:underline">Læs Mere &rarr;</Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
