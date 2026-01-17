"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const tabs = [
    { id: "background", label: "Professionel Baggrund" },
    { id: "crystalball", label: "Min AI Krystalkugle" },
    { id: "manifesto", label: "Mit AI Manifest" },
    { id: "media", label: "Presse & Medier" },
];

const getContent = (tabId: string) => {
    switch (tabId) {
        case "background":
            return {
                title: "Min Rejse",
                content: (
                    <div className="text-zinc-400 leading-relaxed text-lg space-y-4">
                        <p>Jeg har arbejdet med AI (Machine Learning) siden 2017 - ikke på data scientist måden, men med fokus på praktisk anvendelse og forretningsværdi. I slutningen af 2018 var jeg medstifter af Tabtimize, Danmarks første AI-drevne marketingsværktøj.</p>
                        <p>I 2019 blev vi en del af OpenAIs research-brugere og fik adgang til GPT-2. Det betød at jeg har promptet med LLM'er siden 2019 (selvom vi dengang kaldte det NLG). Da GPT-3 blev lanceret i 2020, var jeg blandt de første i verden til at få adgang - og jeg kan tydeligt huske mit "ChatGPT moment" i starten af 2021, da instruct-modellerne kom: "Holy moly, dette kommer til at ændre ALT".</p>
                        <p>Siden 2021 har jeg brugt AI til både indholdsproduktion, kodning og beslutningstagning. I november 2021 stiftede jeg SoMe Captions, Danmarks første AI marketing agency. Da ChatGPT blev lanceret i december 2022, mistede vi 91% af omsætningen på 2 måneder - men det blev også vendepunktet.</p>
                        <p>I 2024 kastede jeg mig over at uddanne andre via LinkedIn, og gik fra 300 til over 2.000 følgere på få måneder. Det førte til AI Growth Minds, som jeg lancerede med min partner Rasmus i marts 2025. Siden da har vi undervist over 2.800 professionelle i brugen af generativ AI.</p>
                    </div>
                )
            };
        case "crystalball":
            return {
                title: "Min Vision for AI",
                content: (
                    <div className="text-zinc-400 leading-relaxed text-lg space-y-4">
                        <p>Med 8 års erfaring inden for AI har jeg set teknologien udvikle sig fra komplekse ML-modeller til tilgængelige værktøjer, der kan ændre enhver virksomhed og karriere.</p>
                        <p>Jeg tror på, at vi står ved begyndelsen af den største transformation i arbejdslivet nogensinde. AI handler ikke om at erstatte mennesker - det handler om at frigøre os til at fokusere på det, vi er bedst til: kreativitet, strategi og menneskelige relationer.</p>
                        <p>De virksomheder og medarbejdere, der lærer at samarbejde med AI nu, vil være dem, der leder an i fremtiden. Det kræver ikke en tech-baggrund - det kræver nysgerrighed, vilje til at eksperimentere og den rette vejledning.</p>
                        <p>Min mission er at gøre AI tilgængeligt for alle danske virksomheder og professionelle, så vi sammen kan bruge teknologien til at gøre Danmark til et foregangsland inden for AI-adoption og skabe værdi for vores samfund.</p>
                    </div>
                )
            };
        case "manifesto":
            return {
                title: "Mine Principper",
                content: (
                    <div className="text-zinc-400 leading-relaxed text-lg space-y-4">
                        <p>Efter 8 år med AI har jeg lært, at succesfuld AI-implementering handler om meget mere end teknologi:</p>
                        <div className="space-y-3">
                            <p><strong className="text-yellow-400">Praktisk over teoretisk</strong> - AI skal skabe konkrete resultater, ikke bare lyde imponerende. Jeg fokuserer på løsninger, der virker i praksis.</p>
                            <p><strong className="text-yellow-400">Uddannelse over automation</strong> - Min tilgang handler om at give mennesker superkræfter gennem AI, ikke om at erstatte dem. Når folk forstår værktøjerne, kan de selv innovere.</p>
                            <p><strong className="text-yellow-400">Etik og gennemsigtighed</strong> - AI skal bruges ansvarligt. Det betyder at være åben om, hvornår AI bruges, sikre dataprivacy og altid have mennesker i kontrolsædet.</p>
                            <p><strong className="text-yellow-400">Tilgængelighed for alle</strong> - AI er ikke kun for tech-folk. Mine kurser og workshops er designet, så alle kan være med - uanset baggrund.</p>
                            <p><strong className="text-yellow-400">Kontinuerlig læring</strong> - AI-landskabet ændrer sig konstant. Jeg holder mig opdateret, så mine klienter altid får den nyeste viden og de bedste værktøjer.</p>
                        </div>
                    </div>
                )
            };
        case "media":
            return {
                title: "I Medierne",
                content: (
                    <div className="text-zinc-400 leading-relaxed text-lg space-y-4">
                        <p>Gennem min rejse er jeg blevet en eftertragtet stemme inden for AI i Danmark. Jeg deler min viden og erfaring gennem:</p>
                        <div className="space-y-3">
                            <p><strong className="text-yellow-400">Keynotes & Konferencer</strong> - Jeg holder inspirerende talks om AI's praktiske anvendelse og fremtid for virksomheder i hele Danmark.</p>
                            <p><strong className="text-yellow-400">Podcasts</strong> - Jeg deler min historie og indsigter i danske tech- og business-podcasts, hvor vi dykker ned i AI's muligheder.</p>
                            <p><strong className="text-yellow-400">LinkedIn</strong> - Min primære platform hvor jeg dagligt deler tips, cases og tankegange om AI til over 2.000+ følgere.</p>
                            <p><strong className="text-yellow-400">AI Growth Minds</strong> - Mit omfattende online kursusforløb, hvor jeg har undervist 2.800+ professionelle i praktisk AI-anvendelse.</p>
                        </div>
                        <p>Vil du have mig til at tale ved dit næste event eller i din virksomhed? Kontakt mig for at høre mere om, hvordan vi kan skabe værdi sammen.</p>
                    </div>
                )
            };
        default:
            return { title: "", content: null };
    }
};

export default function About() {
    const [activeTab, setActiveTab] = useState("background");

    return (
        <section id="about" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Image Side */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 aspect-[3/4] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-zinc-900 relative">
                            <Image
                                src="/Julian-bent-singh-AI-keynote-speak.jpg"
                                alt="Julian Bent Singh - AI Keynote Speaker"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-7">
                        <h2 className="text-4xl font-bold mb-8">Om <span className="text-yellow-400">Julian</span></h2>

                        {/* Tab Nav */}
                        <div className="flex flex-wrap gap-4 mb-8 border-b border-zinc-800 pb-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-lg font-medium transition-colors ${activeTab === tab.id ? "text-yellow-400" : "text-zinc-500 hover:text-white"}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[300px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl font-bold mb-4">
                                        {getContent(activeTab).title}
                                    </h3>
                                    {getContent(activeTab).content}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 pt-8 border-t border-zinc-800">
                            <Link
                                href="/om"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105"
                            >
                                Læs mere om Julian
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
