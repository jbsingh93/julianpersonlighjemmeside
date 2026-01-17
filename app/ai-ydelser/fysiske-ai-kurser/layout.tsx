import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fysiske AI Kurser | AI Agenter, Vibe Coding & Prompting | Julian Bent Singh",
  description: "Fysiske AI kurser der løfter jeres niveau: AI Agenter, Vibe Coding og Advanced Prompting. Skræddersyet undervisning tilpasset jeres branche og vidensniveau.",
  keywords: [
    "AI Kurser",
    "Fysiske AI Kurser",
    "AI Uddannelse",
    "AI Agent Kursus",
    "Vibe Coding Kursus",
    "Prompt Engineering Kursus",
    "Context Engineering",
    "ChatGPT Kursus",
    "On-premise AI Kursus",
    "AI Opkvalificering",
  ],
  openGraph: {
    title: "Fysiske AI Kurser – AI Agenter, Vibe Coding & Prompting",
    description: "Lær at bygge AI Agenter, Vibe Code værktøjer og mestre advanced prompting. Dybdegående kurser afholdt hos jer eller i inspirerende omgivelser.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
