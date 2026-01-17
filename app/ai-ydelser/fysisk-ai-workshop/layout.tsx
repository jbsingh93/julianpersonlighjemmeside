import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fysiske AI Workshops | 5 Niveauer | Julian Bent Singh",
  description: "Skræddersyede AI workshops i 5 niveauer: Chat AI, Workflows, Automatisering, Vibe Coding og AI Agenter. Praktisk fysisk undervisning hos jer eller i inspirerende omgivelser.",
  keywords: [
    "AI Workshop",
    "Fysisk AI Workshop",
    "AI Undervisning",
    "AI Træning",
    "ChatGPT Workshop",
    "AI Agenter Workshop",
    "Vibe Coding Workshop",
    "AI Automatisering Workshop",
    "On-premise AI Workshop",
    "Hands-on AI Workshop",
  ],
  alternates: {
    canonical: "https://julianbentsingh.dk/ai-ydelser/fysisk-ai-workshop/",
  },
  openGraph: {
    title: "Fysiske AI Workshops – 5 Niveauer fra Chat AI til AI Agenter",
    description: "Skræddersyede AI workshops der løfter din virksomhed gennem de 5 niveauer af praktisk AI anvendelse.",
    url: "https://julianbentsingh.dk/ai-ydelser/fysisk-ai-workshop/",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
