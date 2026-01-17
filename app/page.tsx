import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import LogoCarousel from "@/components/LogoCarousel";
import AIServices from "@/components/AIServices";
import Invest from "@/components/Invest";
import References from "@/components/References";
import About from "@/components/About";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { buildHomePageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Julian Bent Singh | Danmarks Førende AI Ekspert & Keynote Speaker",
  description: "Julian Bent Singh hjælper organisationer med strategisk implementering af AI. Book foredrag, workshops og rådgivning om kunstig intelligens. AI kurser, AI konsulent, AI foredrag.",
  keywords: [
    "AI Ekspert Danmark",
    "AI Foredrag",
    "AI Strategi",
    "AI Kurser",
    "AI Konsulent",
    "AI Opkvalificering",
    "Julian Bent Singh",
    "AI Implementering",
    "Kunstig Intelligens",
  ],
  openGraph: {
    title: "Julian Bent Singh – AI Kurser, Rådgivning og Foredrag",
    description: "Danmarks førende AI-ekspert. Book foredrag, workshops og strategisk rådgivning om kunstig intelligens.",
    url: "https://julianbentsingh.dk",
    siteName: "Julian Bent Singh",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julian Bent Singh – AI Ekspert",
    description: "AI kurser, rådgivning og foredrag i Danmark",
  },
  alternates: {
    canonical: "https://julianbentsingh.dk",
  },
};

export default function Home() {
  // Fuld @graph schema med WebSite, Organization, Person og Services
  const schema = buildHomePageGraph();

  return (
    <main className="bg-black min-h-screen text-white selection:bg-yellow-400 selection:text-black">
      <JsonLd schema={schema} />
      <Hero />
      <LogoCarousel />
      <AIServices />
      <Invest />
      <References />
      <About />
      <TrustBadges />
      <Contact />
    </main>
  );
}
