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

### Language

Site content is in Danish. Route names and UI text are in Danish (ai-ydelser, invester, referencer, om, kontakt)
