"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified Nav Structure for easier rendering
const navLinks = [
    {
        name: "AI Ydelser",
        href: "/ai-ydelser",
        submenu: [
            { name: "Fysisk AI Workshop", href: "/ai-ydelser/fysisk-ai-workshop" },
            { name: "Fysiske AI Kurser", href: "/ai-ydelser/fysiske-ai-kurser" },
            { name: "AI Konsulent", href: "/ai-ydelser/ai-konsulent" },
            { name: "Foredrag", href: "/ai-ydelser/foredrag" },
            { name: "Online AI Workshop", href: "/ai-ydelser/online-ai-workshop" },
            { name: "Online AI Kurser", href: "/ai-ydelser/online-ai-kurser" },
            { name: "AI Mentor", href: "/ai-ydelser/ai-mentor" },
        ]
    },
    {
        name: "Invester",
        href: "/invester",
        submenu: [
            { name: "Min Portefølje", href: "/invester/portefoelje" },
            { name: "Pitch Din Idé", href: "/invester/pitch" },
            { name: "AI Rådgivning til Investorer", href: "/invester/ai-raadgivning-til-investorer" },
        ]
    },
    { name: "Referencer", href: "/referencer" },
    { name: "Om Mig", href: "/om" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const pathname = usePathname();

    // Handle transparent/solid background based on page and scroll
    const isHomePage = pathname === "/";
    const isWikiPage = pathname === "/om";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine navbar styling based on context
    const getNavClasses = () => {
        if (isWikiPage) return "bg-white border-b border-zinc-200 text-black py-4";
        if (scrolled) return "glass py-4 text-white";
        return "bg-transparent py-6 text-white";
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavClasses()}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className={`text-2xl font-bold tracking-tighter ${isWikiPage ? "text-black" : "text-white"}`}>
                    Julian Bent <span className={isWikiPage ? "text-yellow-600" : "highlight"}>Singh</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((item) => (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.href}
                                className={`text-sm font-medium transition-colors flex items-center gap-1 ${isWikiPage ? 'text-zinc-700 hover:text-blue-600' : 'text-zinc-300 hover:text-white'}`}
                            >
                                {item.name}
                                {item.submenu && <ChevronDown size={14} />}
                            </Link>

                            {item.submenu && (
                                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                                    <div className="bg-white rounded-lg shadow-xl overflow-hidden py-2 border border-zinc-100">
                                        {item.submenu.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-black hover:pl-5 transition-all"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/kontakt"
                        className={`px-5 py-2.5 font-bold rounded-full transition-colors text-sm ${isWikiPage ? 'bg-black text-white hover:bg-zinc-800' : 'bg-yellow-400 text-black hover:bg-yellow-300'}`}
                    >
                        Kontakt
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={isWikiPage ? "text-black md:hidden" : "text-white md:hidden"}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black fixed inset-0 z-40 pt-24 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((item) => (
                                <div key={item.name}>
                                    <div className="flex justify-between items-center" onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}>
                                        <Link
                                            href={item.href}
                                            className="text-2xl font-medium text-white"
                                            onClick={() => !item.submenu && setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.submenu && <ChevronDown className={`text-white transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />}
                                    </div>

                                    {item.submenu && activeSubmenu === item.name && (
                                        <div className="mt-4 pl-4 space-y-4 border-l border-zinc-800">
                                            {item.submenu.map(sub => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="block text-lg text-zinc-400"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/kontakt"
                                onClick={() => setIsOpen(false)}
                                className="inline-block text-center mt-8 px-5 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors w-full"
                            >
                                Kontakt
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
