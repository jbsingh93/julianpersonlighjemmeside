# 00 - PROJECT CONTEXT & CODEBASE DEEP DIVE

> **Formål**: Dette dokument giver fuldstændig kontekst om den eksisterende kodebase, så enhver implementering af blog/CMS kan gøres med kirurgisk præcision og nul regression.

---

## 1. TEKNOLOGI-STACK

| Teknologi | Version | Formål |
|-----------|---------|--------|
| Next.js | 16.1.1 | Framework (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | ^5 | Type Safety |
| Tailwind CSS | ^4 | Styling (via PostCSS) |
| Framer Motion | ^12.26.1 | Animationer |
| Lucide React | ^0.562.0 | Icons |
| Resend | ^6.7.0 | Email sending (kontaktformular) |
| schema-dts | ^1.1.5 | TypeScript definitions for Schema.org |
| Zod | ^4.3.5 | Validation |
| clsx | ^2.1.1 | Conditional class names |
| tailwind-merge | ^3.4.0 | Merge Tailwind classes |

### Dev Dependencies
- `@tailwindcss/postcss@^4` - PostCSS plugin for Tailwind v4
- `eslint@^9` med `eslint-config-next@16.1.1` - Linting
- TypeScript typedefinitioner for Node, React, React DOM

---

## 2. MAPPESTRUKTUR (KOMPLET)

```
julianpersonlighjemmeside/
├── app/
│   ├── layout.tsx                    ← Root layout (Navbar + Footer)
│   ├── page.tsx                      ← Forside (/)
│   ├── globals.css                   ← Global styles + custom utilities
│   ├── sitemap.ts                    ← Dynamisk sitemap generator
│   ├── robots.ts                     ← robots.txt generator
│   ├── actions/
│   │   └── contact.ts                ← Server action: kontaktformular
│   ├── ai-ydelser/
│   │   ├── page.tsx                  ← /ai-ydelser (overview)
│   │   ├── ai-konsulent/page.tsx     ← /ai-ydelser/ai-konsulent
│   │   ├── ai-mentor/page.tsx        ← /ai-ydelser/ai-mentor
│   │   ├── foredrag/page.tsx         ← /ai-ydelser/foredrag
│   │   ├── fysisk-ai-workshop/page.tsx
│   │   ├── fysiske-ai-kurser/page.tsx
│   │   ├── online-ai-kurser/page.tsx
│   │   └── online-ai-workshop/page.tsx
│   ├── invester/
│   │   ├── page.tsx                  ← /invester (overview)
│   │   ├── portefoelje/page.tsx
│   │   ├── pitch/page.tsx
│   │   └── ai-raadgivning-til-investorer/page.tsx
│   ├── kontakt/page.tsx              ← /kontakt
│   ├── om/page.tsx                   ← /om (wiki-style, WHITE theme)
│   └── referencer/page.tsx           ← /referencer
├── components/
│   ├── Navbar.tsx                    ← Hovednavigation (client component)
│   ├── Hero.tsx                      ← Forside hero section
│   ├── AIServices.tsx                ← AI ydelser section
│   ├── Invest.tsx                    ← Invester section
│   ├── References.tsx                ← Referencer section
│   ├── About.tsx                     ← Om section
│   ├── Contact.tsx                   ← Kontaktformular
│   ├── TrustBadges.tsx               ← Trust badges
│   ├── LogoCarousel.tsx              ← Logo karrusel
│   └── JsonLd.tsx                    ← Schema.org JSON-LD renderer
├── lib/
│   ├── validation.ts                 ← Zod schemas (kontaktformular)
│   └── schema/
│       ├── index.ts                  ← Central re-export hub
│       ├── constants.ts              ← SITE_URL, SCHEMA_IDS, JULIAN_DATA, ORG_DATA, etc.
│       └── builders.ts               ← Schema builder functions
├── public/                           ← Statiske assets (billeder, favicons, etc.)
├── prd/                              ← PRD & SEO strategi dokumenter
│   └── seo-strategi/
│       ├── sammenfattet-seo-strategi.md
│       ├── seo-snak-1.md
│       └── seo-snak-2.md
├── scripts/
│   ├── validate-schema.mjs           ← Schema validerings script
│   └── README.md
├── .mcp.json                         ← MCP server config (Supabase)
├── CLAUDE.md                         ← Claude Code instruktioner
├── next.config.ts                    ← Minimal Next.js config
├── tsconfig.json                     ← TypeScript config (path alias @/*)
├── postcss.config.mjs                ← PostCSS + Tailwind v4
├── eslint.config.mjs                 ← ESLint v9 flat config
└── package.json                      ← Dependencies & scripts
```

---

## 3. ROOT LAYOUT (`app/layout.tsx`) - KRITISK FIL

```typescript
// VIGTIGT: Denne fil wrapper ALLE sider med Navbar og Footer
// CMS admin sider skal have EGET layout UDEN Navbar/Footer
// Det gøres via route groups: app/(main)/... og app/(cms)/cms/...

export default function RootLayout({ children }) {
  return (
    <html lang="da" className="scroll-smooth">
      <body className="[font-vars] antialiased bg-black text-white">
        <Navbar />           // ← Vises på ALLE sider pt.
        {children}
        <footer>...</footer> // ← Vises på ALLE sider pt.
      </body>
    </html>
  );
}
```

### VIGTIGT ARKITEKTUR-BESLUTNING:
For at CMS'et (`/cms`) kan have sit eget layout (ingen Navbar/Footer, light theme), har vi **to tilgange**:

**Tilgang A: Route Groups (ANBEFALET)**
```
app/
  (main)/          ← Gruppe med Navbar + Footer layout
    layout.tsx     ← Navbar + children + Footer
    page.tsx       ← Forside
    blog/...
    ai-ydelser/...
    ...
  (cms)/           ← Gruppe med admin layout
    cms/
      layout.tsx   ← Admin layout (light theme, sidebar)
      page.tsx
      ...
  layout.tsx       ← Root layout (html, body, fonts ONLY)
```

**Tilgang B: CMS-specifikt layout med conditional rendering**
- Mindre refaktorering men kræver at Navbar/Footer tjekker pathname
- AFVIST fordi det er hacky og potentielt fragilt

**Vi vælger Tilgang A** fordi det er den rene Next.js-måde og kræver kun at flytte eksisterende filer ind i `(main)/` mappen. Filstier ændrer sig IKKE (`(main)` er invisible i URL).

---

## 4. NAVBAR STRUKTUR (`components/Navbar.tsx`)

```typescript
const navLinks = [
    {
        name: "AI Ydelser",
        href: "/ai-ydelser",
        submenu: [/* 7 items */]
    },
    {
        name: "Invester",
        href: "/invester",
        submenu: [/* 3 items */]
    },
    { name: "Referencer", href: "/referencer" },
    { name: "Om Mig", href: "/om" },
    // ← "Blog" skal tilføjes HER
];
// Kontakt knap er SEPARAT (yellow-400 CTA button)
```

### Navbar Varianter
- **Standard (mørk)**: `bg-transparent` → `glass` on scroll (hvid tekst)
- **Wiki/Om side**: `bg-white border-b border-zinc-200` (sort tekst)
- Blog sider bør bruge **standard (mørk)** variant

### Ændring Påkrævet:
Tilføj `{ name: "Blog", href: "/blog" }` mellem "Om Mig" og Kontakt-knappen.

---

## 5. STYLING PATTERNS

### Globale CSS Custom Utilities (`app/globals.css`)
```css
/* Frosted glass navbar */
.glass {
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Gradient text (hvid → grå) */
.text-gradient {
    background: linear-gradient(to right, #ffffff, #a1a1a1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Gul accent */
.highlight { color: #FACC15; }  /* = yellow-400 */
```

### Side-Layout Mønster (alle sider undtagen /om)
```tsx
<div className="bg-black text-white min-h-screen">
  <JsonLd schema={schema} />
  <section className="relative pt-32 pb-20 px-6">
    <div className="container mx-auto max-w-6xl">
      {/* Hero content */}
    </div>
  </section>
  {/* Flere sections med bg-zinc-950, bg-zinc-900, etc. */}
</div>
```

### Farvepalet
| Brug | Farve | Tailwind |
|------|-------|----------|
| Primær baggrund | #000000 | `bg-black` |
| Sekundær baggrund | ~#09090b | `bg-zinc-950` |
| Tertiær baggrund | ~#18181b | `bg-zinc-900` |
| Primær tekst | #ffffff | `text-white` |
| Sekundær tekst | ~#a1a1aa | `text-zinc-400` |
| Dæmpet tekst | ~#71717a | `text-zinc-500` |
| Accent (primær) | #FACC15 | `text-yellow-400` / `bg-yellow-400` |
| Border | ~#27272a | `border-zinc-800` |
| Card bg | - | `bg-zinc-900/50` |

### CTA Knap Stil
```
bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300
```

---

## 6. SEO SYSTEM (KOMPLET)

### Schema.org @id-systemet
Alle entiteter har faste @id'er defineret i `SCHEMA_IDS`:
```
#website     → WebSite entitet
#org         → Organization entitet
#julian      → Person entitet (Julian)
#service     → Service entiteter (per side)
#page        → Page entiteter
#breadcrumb  → BreadcrumbList (per side)
```

### Builder Functions API
| Funktion | Output | Bruges Hvor |
|----------|--------|-------------|
| `personRef()` | `{ "@id": ".../#julian" }` | Alle sider som author/provider ref |
| `orgRef()` | `{ "@id": ".../#org" }` | Alle sider som publisher ref |
| `websiteRef()` | `{ "@id": ".../#website" }` | Forsiden |
| `buildWebSiteSchema()` | WebSite entity | Forsiden |
| `buildOrganizationSchema()` | Organization entity | Forsiden |
| `buildPersonSchema(ext?)` | Person entity | Forsiden, /om |
| `buildServiceSchema(opts)` | Service entity | Service-sider |
| `buildCourseSchema(opts)` | Course entity | Kursus-sider |
| `buildBreadcrumbSchema(items)` | BreadcrumbList | Alle undersider |
| `buildFAQSchema(items)` | FAQPage | Sider med FAQ |
| `buildOmtalePageSchema()` | CollectionPage | /referencer |
| `buildHomePageGraph()` | Komplet @graph | Forsiden |

### Metadata Mønster (SKAL FØLGES FOR BLOG)
```typescript
export const metadata: Metadata = {
  title: "Side Titel | Julian Bent Singh",  // Via template i root layout
  description: "150-160 tegn beskrivelse med primære keywords",
  keywords: ["Keyword1", "Keyword2"],
  alternates: {
    canonical: `${SITE_URL}/sti-til-side/`,  // ALTID trailing slash
  },
  openGraph: {
    title: "OG Titel",
    description: "OG beskrivelse",
    url: `${SITE_URL}/sti-til-side/`,
    type: "website",  // eller "article" for blog posts
  },
};
```

### Sitemap (`app/sitemap.ts`)
- Aktuelt SYNKRON funktion (returnerer array af routes)
- SKAL gøres ASYNKRON for at fetche blog posts fra Supabase
- Format: `{ url, lastModified, changeFrequency, priority }`
- Alle URLs har trailing slash

### Robots.txt (`app/robots.ts`)
- Tillader `/` for alle
- Blokerer `/api/`, `/_next/`, `/private/`
- Eksplicit TILLADER AI crawlers (GPTBot, ChatGPT-User, Google-Extended, CCBot, anthropic-ai)
- **SKAL opdateres**: Tilføj `/cms/` til disallow-listen

---

## 7. SERVER ACTIONS MØNSTER

Den eneste eksisterende server action er `app/actions/contact.ts`:

```typescript
'use server'
// 1. Resend API for email
// 2. Zod validation med serverFormSchema
// 3. Honeypot spam protection (tomt felt)
// 4. Timing-baseret spam protection (< 2 sek = bot)
// 5. Return type: { success: true, message } | { success: false, error }
```

**Pattern vi skal genbruge for blog CMS**:
- `'use server'` directive
- Zod validation af input
- Klare return types med success/error
- Server-side environment variable adgang

---

## 8. EKSISTERENDE SUPABASE KONFIGURATION

Filen `.mcp.json` viser at der ALLEREDE er et Supabase MCP server sat op:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": ["...", "@supabase/mcp-server-supabase@latest", "--access-token", "sbp_..."]
    }
  }
}
```

**VIGTIGT**: Der er allerede et Supabase-projekt. Vi kan genbruge det.

---

## 9. KONFIGURATIONSFILER

### `next.config.ts`
```typescript
const nextConfig: NextConfig = { /* TOMT - defaults */ };
```
**Skal opdateres**: Tilføj `images.remotePatterns` for Supabase Storage domain.

### `tsconfig.json`
- Target: ES2017, Module: esnext, Strict: true
- Path alias: `@/*` → `./*`
- Incremental builds enabled

### `postcss.config.mjs`
- Plugin: `@tailwindcss/postcss` (Tailwind v4)

### `eslint.config.mjs`
- Extends: nextVitals, nextTs
- Ignorer: `.next/`, `out/`, `build/`

---

## 10. COMPONENT PATTERNS

### Server Components (default)
- Alle `page.tsx` filer er Server Components
- Eksporterer `metadata` for SEO
- Importerer og bruger `JsonLd` component

### Client Components (`"use client"`)
- Navbar.tsx - bruger useState, useEffect, usePathname
- Hero.tsx, AIServices.tsx, etc. - bruger Framer Motion animationer
- Contact.tsx - formular med state management

### JsonLd Component
```typescript
// Simpel wrapper der serialiserer schema til <script type="application/ld+json">
export default function JsonLd({ schema }: { schema: SchemaType }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 11. FONT SYSTEM

```typescript
// Geist Sans + Geist Mono fra Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Anvendt via CSS @theme directive:
@theme {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

---

## 12. VALIDATION PATTERNS

### Kontaktformular (`lib/validation.ts`)
```typescript
export const contactFormSchema = z.object({
  navn: z.string().min(2).max(100),
  email: z.string().email().max(100),
  emne: z.string().min(1),
  besked: z.string().min(10).max(1000),
});
```

**Pattern at genbruge**: Zod schemas i `lib/` mappe, delt mellem client og server.

---

## 13. SPROG & KONVENTIONER

- **Al UI-tekst er på DANSK** (route names, labels, fejlbeskeder, metadata)
- **Kode-kommentarer** er blanding af dansk og engelsk
- **Route naming**: Danske navne med bindestreg (ai-ydelser, fysisk-ai-workshop)
- **Trailing slashes**: ALTID i canonical URLs og sitemap
- **Schema.org**: inLanguage: "da-DK" eller "da"

---

## 14. DEPLOY/BUILD INFO

- **Scripts**: `npm run dev` (dev), `npm run build` (prod build), `npm run lint` (linting)
- **Ingen CI/CD pipeline** synlig i repo
- **Ingen Docker** konfiguration
- **Platform**: Sandsynligvis Vercel (Next.js standard)

---

## 15. FILER DER SKAL RØRES (RISIKOVURDERING)

| Fil | Ændring | Risiko | Regression-Test |
|-----|---------|--------|-----------------|
| `app/layout.tsx` | Flyttes til `app/(main)/layout.tsx` + ny root layout | **HØJ** | Alle sider skal stadig vise Navbar+Footer |
| `app/page.tsx` | Flyttes til `app/(main)/page.tsx` | **MEDIUM** | Forside skal være uændret |
| `components/Navbar.tsx` | Tilføj "Blog" link | **LAV** | Nav skal stadig fungere |
| `app/sitemap.ts` | Gør asynkron + tilføj blog URLs | **MEDIUM** | Eksisterende URLs skal bestå |
| `app/robots.ts` | Tilføj `/cms/` til disallow | **LAV** | Ingen regression |
| `lib/schema/builders.ts` | Tilføj `buildArticleSchema()` | **LAV** | Eksisterende builders uændrede |
| `lib/schema/constants.ts` | Tilføj blog SCHEMA_IDS | **LAV** | Eksisterende IDs uændrede |
| `lib/schema/index.ts` | Re-export nye builders | **LAV** | Eksisterende exports uændrede |
| `next.config.ts` | Tilføj Supabase image domain | **LAV** | Ingen regression |
| Alle `app/*/page.tsx` | Flyttes til `app/(main)/*/page.tsx` | **HØJ** | Alle routes skal fortsat virke |
