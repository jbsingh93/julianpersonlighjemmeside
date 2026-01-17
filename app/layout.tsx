import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Julian Bent Singh",
    default: "Julian Bent Singh - Førende AI Ekspert & AI Underviser",
  },
  description: "Danmarks førende ekspert i kunstig intelligens, strategisk implementering og investeringer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
        <footer className="py-8 bg-zinc-950 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} Julian Bent Singh. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
