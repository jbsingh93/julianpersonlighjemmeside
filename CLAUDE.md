# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture

Next.js 16 personal portfolio/business website using App Router, TypeScript, and Tailwind CSS v4.

### Route Structure

- `/` - Landing page composed of section components (Hero, AIServices, Invest, References, About, Contact)
- `/ai-ydelser/*` - Service subpages (fysisk-ai-workshop, fysiske-ai-kurser, ai-konsulent, foredrag, online-ai-workshop, online-ai-kurser, ai-mentor)
- `/invester/*` - Investment subpages (portefoelje, pitch, ydelser)
- `/referencer`, `/om`, `/kontakt` - Standalone pages

### Component Patterns

**Section Components** (`components/`): Homepage sections like Hero, AIServices that are composed in `app/page.tsx`. Use `"use client"` directive when needing React hooks or Framer Motion animations.

**Page Components** (`app/*/page.tsx`): Each route exports `metadata` for SEO. Subpages follow a consistent layout: dark background, container max-w-4xl, yellow-400 accent.

### Key Libraries

- **Framer Motion** - Animations (AnimatePresence, motion components)
- **lucide-react** - Icons (Menu, X, ChevronDown)
- **schema-dts** - Typed JSON-LD structured data via `JsonLd` component
- **clsx/tailwind-merge** - Conditional class utilities

### Styling

- Dark theme: `bg-black`/`bg-zinc-950` backgrounds
- Yellow-400 primary accent (`.highlight` class)
- Custom utilities in `globals.css`: `.glass` (frosted navbar), `.text-gradient`
- Path alias: `@/*` maps to project root

### SEO

- ALWAYS READ 'prd\seo-strategi\sammenfattet-seo-strategi.md' BEFORE WORKING WITH ANY SEO PARTS OR NEW ROUTES/PAGES!

#### SEO Checklist for Nye Sider/Routes

Når du opretter en ny side eller route, skal du ALTID sikre følgende:

1. **Metadata Export** (i page.tsx eller layout.tsx hvis "use client"):
   ```typescript
   export const metadata: Metadata = {
     title: "Side Titel | Julian Bent Singh",
     description: "150-160 tegn beskrivelse",
     keywords: ["Relevant", "Keywords"],
     alternates: {
       canonical: "https://julianbentsingh.dk/sti-til-side/",
     },
     openGraph: {
       title: "OG Titel",
       description: "OG beskrivelse",
       url: "https://julianbentsingh.dk/sti-til-side/",
       type: "website",
     },
   };
   ```

2. **Canonical URL**:
   - Skal ALTID inkluderes i metadata
   - Format: `https://julianbentsingh.dk/sti/` (med trailing slash)
   - Bruges i `alternates.canonical` og `openGraph.url`

3. **Schema.org JSON-LD**:
   - Brug builders fra `@/lib/schema`
   - Konsistent brug af `personRef()`, `orgRef()`, `websiteRef()`
   - Inkluder BreadcrumbList på alle undersider
   - Validér med `/validate-schema` eller `npm run validate-schema`

4. **Sitemap opdatering** (`app/sitemap.ts`):
   - Tilføj ny route til sitemap
   - Sæt passende `priority` (0.6-1.0)
   - Sæt passende `changeFrequency`
   - Eksempel:
     ```typescript
     {
       url: `${SITE_URL}/ny-side/`,
       lastModified: new Date(),
       changeFrequency: 'monthly' as const,
       priority: 0.8,
     }
     ```

5. **Internal linking**:
   - Sørg for at nye sider linkes fra relevante steder
   - Opdatér navigationsmenu hvis nødvendigt
   - Tilføj til relevante kategori-/oversigts-sider

#### SEO Filer & Validering

- **Sitemap**: `app/sitemap.ts` (auto-genereret til `/sitemap.xml`)
- **Robots.txt**: `app/robots.ts` (auto-genereret til `/robots.txt`)
- **Schema validering**: `npm run validate-schema` eller `/validate-schema`
- **Validation report**: `SCHEMA-VALIDATION-REPORT.md`

### Language

Site content is in Danish. Route names and UI text are in Danish (ai-ydelser, invester, referencer, om, kontakt)
