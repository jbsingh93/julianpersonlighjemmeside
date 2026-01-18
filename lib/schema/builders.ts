/**
 * Schema.org builders - hjælpefunktioner til at bygge schema objekter
 *
 * Disse funktioner sikrer konsistent brug af @id'er og struktur
 * på tværs af hele sitet.
 */

import {
  SITE_URL,
  SCHEMA_IDS,
  JULIAN_DATA,
  ORG_DATA,
  AI_GROWTH_MINDS,
  HIGH_AUTHORITY_MENTIONS
} from "./constants";

// ============================================
// Reference Builders (til at pege på entiteter)
// ============================================

/** Reference til Julian Person entity */
export const personRef = () => ({ "@id": SCHEMA_IDS.person });

/** Reference til Organization entity */
export const orgRef = () => ({ "@id": SCHEMA_IDS.organization });

/** Reference til WebSite entity */
export const websiteRef = () => ({ "@id": SCHEMA_IDS.website });

/** Reference til Omtale/Referencer page */
export const omtalePageRef = () => ({ "@id": SCHEMA_IDS.omtalePage });

// ============================================
// Full Entity Builders
// ============================================

/** WebSite schema - bruges på forsiden */
export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    url: `${SITE_URL}/`,
    name: "Julian Bent Singh – AI kurser, rådgivning og foredrag",
    description: "Danmarks førende ekspert i kunstig intelligens, strategisk implementering og AI-uddannelse.",
    publisher: orgRef(),
    inLanguage: "da-DK",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Organization/ProfessionalService schema */
export function buildOrganizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": SCHEMA_IDS.organization,
    name: ORG_DATA.name,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: ORG_DATA.logo,
      width: "512",
      height: "512",
    },
    email: ORG_DATA.email,
    telephone: ORG_DATA.telephone,
    founder: personRef(),
    areaServed: ORG_DATA.areaServed,
    sameAs: ORG_DATA.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: ORG_DATA.email,
      availableLanguage: ["Danish", "English"],
    },
  };
}

/** Person schema - Julian Bent Singh */
export function buildPersonSchema(extended = false) {
  const base = {
    "@type": "Person",
    "@id": SCHEMA_IDS.person,
    name: JULIAN_DATA.name,
    givenName: JULIAN_DATA.givenName,
    familyName: JULIAN_DATA.familyName,
    url: `${SITE_URL}/om/`,
    image: {
      "@type": "ImageObject",
      url: JULIAN_DATA.image,
      width: "400",
      height: "400",
    },
    jobTitle: JULIAN_DATA.jobTitle,
    description: JULIAN_DATA.description,
    worksFor: orgRef(),
    owns: {
      "@type": "Organization",
      name: AI_GROWTH_MINDS.name,
      url: AI_GROWTH_MINDS.url,
      description: AI_GROWTH_MINDS.description,
    },
    knowsAbout: JULIAN_DATA.knowsAbout,
    sameAs: JULIAN_DATA.sameAs,
    subjectOf: omtalePageRef(),
  };

  if (extended) {
    return {
      ...base,
      hasOccupation: {
        "@type": "Occupation",
        name: "AI Consultant",
        description: "AI-drevet forretningsudvikling, strategisk rådgivning og opkvalificering",
        occupationLocation: {
          "@type": "Country",
          name: "Denmark",
        },
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Copenhagen Business School",
      },
    };
  }

  return base;
}

// ============================================
// Service Builders
// ============================================

interface ServiceOptions {
  id: string;
  name: string;
  description: string;
  url: string;
  serviceType: string;
  price?: string;
  priceDescription?: string;
}

/** Service schema builder */
export function buildServiceSchema(options: ServiceOptions) {
  const service: Record<string, unknown> = {
    "@type": "Service",
    "@id": options.id,
    name: options.name,
    description: options.description,
    url: options.url,
    serviceType: options.serviceType,
    provider: orgRef(),
    areaServed: {
      "@type": "Country",
      name: "Denmark",
    },
  };

  if (options.price || options.priceDescription) {
    service.offers = {
      "@type": "Offer",
      url: options.url,
      priceCurrency: "DKK",
      ...(options.price && { price: options.price }),
      ...(options.priceDescription && { description: options.priceDescription }),
      availability: "https://schema.org/InStock",
    };
  }

  return service;
}

// ============================================
// Course Builder
// ============================================

interface CourseOptions {
  name: string;
  description: string;
  url: string;
  courseMode?: "online" | "onsite" | "blended";
  price?: string;
  duration?: string;
}

/** Course schema builder */
export function buildCourseSchema(options: CourseOptions) {
  return {
    "@type": "Course",
    name: options.name,
    description: options.description,
    url: options.url,
    provider: orgRef(),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: options.courseMode || "onsite",
      courseWorkload: options.duration,
      instructor: personRef(),
      inLanguage: "da",
      ...(options.price && {
        offers: {
          "@type": "Offer",
          url: options.url,
          priceCurrency: "DKK",
          price: options.price,
          availability: "https://schema.org/InStock",
        },
      }),
    },
  };
}

// ============================================
// Breadcrumb Builder
// ============================================

interface BreadcrumbItem {
  name: string;
  url: string;
}

/** BreadcrumbList schema builder */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ============================================
// FAQ Builder
// ============================================

interface FAQItem {
  question: string;
  answer: string;
}

/** FAQPage schema builder */
export function buildFAQSchema(items: FAQItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ============================================
// Collection/Omtale Page Builder
// ============================================

/** CollectionPage schema for /referencer/ (omtale) siden */
export function buildOmtalePageSchema() {
  return {
    "@type": "CollectionPage",
    "@id": SCHEMA_IDS.omtalePage,
    name: "Omtale, podcasts og profiler – Julian Bent Singh",
    description: "Se hvor Julian Bent Singh er nævnt i pressen, podcasts og på konferencer.",
    url: `${SITE_URL}/referencer/`,
    about: personRef(),
    mainEntity: {
      "@type": "ItemList",
      name: "Udvalgte omtaler",
      numberOfItems: HIGH_AUTHORITY_MENTIONS.length,
      itemListElement: HIGH_AUTHORITY_MENTIONS.map((mention, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": mention.type,
          name: mention.name,
          url: mention.url,
          about: personRef(),
          // VideoObject-specifikke felter (påkrævet af Google)
          ...(mention.type === "VideoObject" && "description" in mention && {
            description: mention.description,
            thumbnailUrl: mention.thumbnailUrl,
            uploadDate: mention.uploadDate,
            embedUrl: mention.embedUrl,
          }),
        },
      })),
    },
  };
}

// ============================================
// Graph Builder (til forsiden)
// ============================================

/** Byg komplet @graph til forsiden */
export function buildHomePageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteSchema(),
      buildOrganizationSchema(),
      buildPersonSchema(false),
      // Services
      buildServiceSchema({
        id: SCHEMA_IDS.aiKonsulent,
        name: "Strategisk AI Rådgivning",
        description: "Strategisk implementering af AI og opbygning af AI-ready organisationer.",
        url: `${SITE_URL}/ai-ydelser/ai-konsulent/`,
        serviceType: "AI Consulting",
      }),
      buildServiceSchema({
        id: SCHEMA_IDS.aiForedrag,
        name: "AI Foredrag & Keynotes",
        description: "Inspirerende foredrag om kunstig intelligens til konferencer og firmaevents.",
        url: `${SITE_URL}/ai-ydelser/foredrag/`,
        serviceType: "Keynote Speaking",
      }),
      buildServiceSchema({
        id: SCHEMA_IDS.aiKurser,
        name: "AI Kurser",
        description: "Dybdegående AI kurser for virksomheder. Opkvalificering af medarbejdere i generative AI tools.",
        url: `${SITE_URL}/ai-ydelser/fysiske-ai-kurser/`,
        serviceType: "Training",
      }),
      buildServiceSchema({
        id: SCHEMA_IDS.aiWorkshop,
        name: "AI Workshop",
        description: "Hands-on AI workshops med praktiske øvelser og implementering.",
        url: `${SITE_URL}/ai-ydelser/fysisk-ai-workshop/`,
        serviceType: "Workshop",
      }),
    ],
  };
}
