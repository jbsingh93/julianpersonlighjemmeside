import type { Metadata } from "next";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  JULIAN_DATA,
  buildBreadcrumbSchema,
  personRef,
  orgRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kontakt Julian Bent Singh | Book AI Foredrag & Rådgivning",
  description: "Kontakt Julian Bent Singh for booking af AI foredrag, workshops eller strategisk rådgivning. Få svar inden for 24 timer.",
  keywords: ["Kontakt Julian Bent Singh", "Book AI Foredrag", "AI Rådgivning Kontakt"],
  alternates: {
    canonical: `${SITE_URL}/kontakt/`,
  },
  openGraph: {
    title: "Kontakt Julian Bent Singh",
    description: "Book AI foredrag, workshops eller strategisk rådgivning. Få svar inden for 24 timer.",
    url: `${SITE_URL}/kontakt/`,
    type: "website",
  },
};

export default function ContactPage() {
  // ContactPage schema med ContactPoint
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/kontakt/#page`,
        name: "Kontakt Julian Bent Singh",
        description: "Kontakt for booking af AI foredrag, workshops eller strategisk rådgivning.",
        url: `${SITE_URL}/kontakt/`,
        mainEntity: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: JULIAN_DATA.email,
          availableLanguage: ["Danish", "English"],
          areaServed: {
            "@type": "Country",
            name: "Denmark",
          },
        },
        about: personRef(),
      },
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Kontakt", url: "/kontakt/" },
        ]),
        "@id": `${SITE_URL}/kontakt/#breadcrumb`,
      },
    ],
  };

  return (
    <div className="pt-20 bg-black min-h-screen">
      <JsonLd schema={schema} />
      <Contact />
    </div>
  );
}
