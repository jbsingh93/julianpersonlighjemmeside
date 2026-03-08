# 06 - ZERO REGRESSION GUIDE

> **Formål**: Detaljeret guide til at sikre at INGEN eksisterende funktionalitet går i stykker under blog/CMS implementeringen. Hver ændring i eksisterende filer er dokumenteret med før/efter og test procedure.

---

## 1. PRINCIPPERNE

### 1.1 Additive Only
**Regel**: Vi TILFØJER kode — vi ÆNDRER IKKE og SLETTER IKKE eksisterende kode (med undtagelse af route group refaktorering som kun er filflytning).

### 1.2 Test After Every Change
**Regel**: Efter HVER ændring i en eksisterende fil, test den berørte funktionalitet INDEN du fortsætter.

### 1.3 Commit Before & After
**Regel**: Git commit INDEN en risikofyldt ændring, og EFTER den er verificeret. Giver rollback mulighed.

### 1.4 One Change At A Time
**Regel**: Lav IKKE flere ændringer i eksisterende filer samtidig. Én fil ad gangen, test, commit, næste fil.

---

## 2. KOMPLET REGRESSIONS-TESTPLAN

### 2.1 Alle Eksisterende Routes

Tjek ALLE disse routes efter HVER fase af implementeringen:

| # | URL | Side | Tjek |
|---|-----|------|------|
| 1 | `/` | Forside | Hero, LogoCarousel, AIServices, Invest, References, About, TrustBadges, Contact |
| 2 | `/ai-ydelser` | AI Ydelser oversigt | Alle service cards vises |
| 3 | `/ai-ydelser/ai-konsulent` | AI Konsulent | Hele sideindhold |
| 4 | `/ai-ydelser/foredrag` | Foredrag | Hero, FAQ, events |
| 5 | `/ai-ydelser/fysisk-ai-workshop` | Workshop | Hele sideindhold |
| 6 | `/ai-ydelser/fysiske-ai-kurser` | Kurser | Hele sideindhold |
| 7 | `/ai-ydelser/online-ai-kurser` | Online Kurser | Hele sideindhold |
| 8 | `/ai-ydelser/online-ai-workshop` | Online Workshop | Hele sideindhold |
| 9 | `/ai-ydelser/ai-mentor` | AI Mentor | Hele sideindhold |
| 10 | `/invester` | Invester oversigt | Alle invester cards |
| 11 | `/invester/portefoelje` | Portefølje | Hele sideindhold |
| 12 | `/invester/pitch` | Pitch | Hele sideindhold |
| 13 | `/invester/ai-raadgivning-til-investorer` | AI Rådgivning | Hele sideindhold |
| 14 | `/referencer` | Referencer | Omtaler, videoer, artikler |
| 15 | `/om` | Om (WIKI STYLE) | ⚠️ HVIDT TEMA — Navbar er hvid her |
| 16 | `/kontakt` | Kontakt | Kontaktformular fungerer |

### 2.2 UI Komponenter

| Komponent | Tjek |
|-----------|------|
| Navbar (desktop) | Alle links fungerer, dropdown submenus, Kontakt knap |
| Navbar (mobil) | Hamburger menu, alle links, submenu accordion |
| Navbar (scroll) | Transparent → glass effect on scroll |
| Navbar (/om) | HVID variant med sort tekst |
| Footer | Vises, årstal korrekt |
| Kontaktformular | Validering, submit, fejlhåndtering |
| Animationer | Framer Motion animationer kører smooth |
| Trust Badges | Vises korrekt |
| Logo Carousel | Autoplay, logos visible |

### 2.3 SEO Elementer

| Element | Tjek |
|---------|------|
| `/sitemap.xml` | Alle eksisterende URLs present |
| `/robots.txt` | Korrekte regler |
| JSON-LD | Tjek view source på 3-4 sider |
| Meta tags | Tjek title, description på 3-4 sider |
| Canonical URLs | Trailing slashes konsistent |

### 2.4 Funktionalitet

| Funktion | Tjek |
|----------|------|
| Kontaktformular submit | Validering + send email via Resend |
| Smooth scroll | `scroll-smooth` class fungerer |
| Mobile menu open/close | Toggle fungerer korrekt |
| Dropdown submenus | Hover trigger (desktop), click trigger (mobil) |
| Image optimization | next/image loader virker |

---

## 3. ÆNDRING 1: ROOT LAYOUT REFAKTORERING

### Hvad ændres
Fil: `app/layout.tsx`
Ændring: Fjern Navbar og Footer wrapper, flyt til `app/(main)/layout.tsx`

### Før (nuværende `app/layout.tsx`):
```typescript
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="da" className="scroll-smooth">
      <body className="... antialiased bg-black text-white">
        <Navbar />
        {children}
        <footer>...</footer>
      </body>
    </html>
  );
}
```

### Efter (ny `app/layout.tsx` — root):
```typescript
import "./globals.css";  // ← BEHOLD

export default function RootLayout({ children }) {
  return (
    <html lang="da" className="scroll-smooth">  // ← BEHOLD
      <body className="... antialiased bg-black text-white">  // ← BEHOLD
        {children}  // ← Navbar og Footer FJERNET herfra
      </body>
    </html>
  );
}
```

### Ny `app/(main)/layout.tsx`:
```typescript
import Navbar from "@/components/Navbar";  // ← FLYTTET hertil

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <footer className="py-8 bg-zinc-950 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>© {new Date().getFullYear()} Julian Bent Singh. All rights reserved.</p>
      </footer>
    </>
  );
}
```

### Risikovurdering: HØJ
- Alle eksisterende sider SKAL stadig vise Navbar + Footer
- Font loading SKAL stadig virke (Geist Sans/Mono)
- Metadata template SKAL stadig virke (`%s | Julian Bent Singh`)

### Test efter ændring:
1. `npm run dev`
2. Besøg ALLE 16 routes fra testplanen
3. Verificér Navbar vises på alle sider
4. Verificér Footer vises på alle sider
5. Verificér fonts loader korrekt (Geist Sans)
6. Verificér browser title format: "[Side Titel] | Julian Bent Singh"
7. Verificér `/om` har hvid Navbar variant
8. Verificér mobil menu fungerer

### Rollback:
```bash
git checkout -- app/layout.tsx
rm -rf app/\(main\)/
```

---

## 4. ÆNDRING 2: FLYTTE EKSISTERENDE SIDER TIL (MAIN)

### Hvad ændres
Alle `app/*/page.tsx` filer flyttes til `app/(main)/*/page.tsx`

### Procedure:
```bash
# VIGTIGT: Route groups ændrer IKKE URLs
# (main) er invisible i URL-strukturen

# 1. Flyt forside
mv app/page.tsx app/(main)/page.tsx

# 2. Flyt alle route mapper
mv app/ai-ydelser app/(main)/ai-ydelser
mv app/invester app/(main)/invester
mv app/kontakt app/(main)/kontakt
mv app/om app/(main)/om
mv app/referencer app/(main)/referencer

# 3. actions kan flyttes eller forblive
mv app/actions app/(main)/actions
```

### Risikovurdering: MEDIUM
- Filstier ændrer sig, men imports bruger `@/*` alias → INGEN import-ændringer
- Route groups er invisible i URLs → INGEN URL-ændringer
- Eneste risiko: Noget fil refererer med relativ sti i stedet for `@/`

### Import-check:
Alle eksisterende imports bruger `@/components/...`, `@/lib/...` format.
Disse er ABSOLUTTE stier baseret på project root og påvirkes IKKE af route groups.

### Test efter ændring:
1. `npm run dev` — ingen kompileringsfejl
2. Besøg ALLE 16 routes
3. `npm run build` — ingen build fejl

### Rollback:
```bash
# Flyt alt tilbage
mv app/(main)/* app/
rmdir app/(main)
```

---

## 5. ÆNDRING 3: NAVBAR (TILFØJ BLOG LINK)

### Hvad ændres
Fil: `components/Navbar.tsx`
Ændring: Tilføj `{ name: "Blog", href: "/blog" }` til `navLinks` array

### Før:
```typescript
const navLinks = [
    { name: "AI Ydelser", href: "/ai-ydelser", submenu: [...] },
    { name: "Invester", href: "/invester", submenu: [...] },
    { name: "Referencer", href: "/referencer" },
    { name: "Om Mig", href: "/om" },
];
```

### Efter:
```typescript
const navLinks = [
    { name: "AI Ydelser", href: "/ai-ydelser", submenu: [...] },
    { name: "Invester", href: "/invester", submenu: [...] },
    { name: "Referencer", href: "/referencer" },
    { name: "Om Mig", href: "/om" },
    { name: "Blog", href: "/blog" },  // ← NY LINJE
];
```

### Risikovurdering: LAV
- Additive ændring (ny entry i array)
- Eksisterende links UÆNDREDE
- Navbar rendering er dynamisk baseret på array

### Test efter ændring:
1. Desktop: "Blog" link vises mellem "Om Mig" og "Kontakt" knap
2. Desktop: Klik på "Blog" navigerer til `/blog`
3. Mobil: "Blog" link vises i mobil menu
4. Alle eksisterende links fungerer stadig

---

## 6. ÆNDRING 4: SITEMAP (GØR ASYNKRON + BLOG URLs)

### Hvad ændres
Fil: `app/sitemap.ts`
Ændring: `export default function` → `export default async function` + tilføj blog entries

### Før:
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [/* eksisterende routes */];
  // ... ai-services, invester ...
  return routes;
}
```

### Efter:
```typescript
import { createServerClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [/* UÆNDREDE eksisterende routes */];

  // UÆNDRET: ai-services loop
  // UÆNDRET: invester loop

  // NYT: Blog routes
  try {
    const supabase = createServerClient();
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .eq('status', 'published');

    const { data: categories } = await supabase
      .from('categories')
      .select('slug');

    // Blog hub
    routes.push({
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    });

    // Individual posts
    (posts || []).forEach(post => {
      routes.push({
        url: `${SITE_URL}/blog/${post.slug}/`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    });

    // Categories
    (categories || []).forEach(cat => {
      routes.push({
        url: `${SITE_URL}/blog/kategori/${cat.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error('Sitemap blog fetch error:', error);
    // Fejl i blog fetch skal IKKE bryde hele sitemap
    // Eksisterende routes returneres stadig
  }

  return routes;
}
```

### Risikovurdering: MEDIUM
- `function` → `async function` er bagudkompatibelt i Next.js
- Try/catch sikrer at Supabase fejl IKKE bryder eksisterende entries
- Eksisterende routes array er UÆNDRET

### Test efter ændring:
1. `http://localhost:3000/sitemap.xml`
2. Verificér ALLE eksisterende URLs er til stede (sammenlign med gammel output)
3. Verificér `/blog/` er tilføjet
4. Verificér blog post URLs er tilføjet (hvis seed data eksisterer)
5. Test med Supabase env vars FJERNET (graceful degradation)

---

## 7. ÆNDRING 5: ROBOTS.TXT (TILFØJ /CMS/)

### Hvad ændres
Fil: `app/robots.ts`
Ændring: Tilføj `/cms/` til disallow listen

### Før:
```typescript
disallow: [
    '/api/',
    '/_next/',
    '/private/',
],
```

### Efter:
```typescript
disallow: [
    '/api/',
    '/_next/',
    '/private/',
    '/cms/',    // ← NY LINJE
],
```

### Risikovurdering: LAV
- Additive ændring
- Eksisterende regler UÆNDREDE

### Test: Besøg `/robots.txt` og verificér `/cms/` er inkluderet.

---

## 8. ÆNDRING 6: SCHEMA BUILDERS (NYE FUNKTIONER)

### Hvad ændres
Filer: `lib/schema/builders.ts`, `lib/schema/constants.ts`, `lib/schema/index.ts`
Ændring: TILFØJ nye funktioner — INTET ændres i eksisterende

### `lib/schema/constants.ts` — Tilføjelse:
```typescript
export const SCHEMA_IDS = {
  // ... ALLE eksisterende IDs UÆNDRET ...

  // Blog (NYT)
  blogPage: `${SITE_URL}/blog/#page`,
} as const;
```

### `lib/schema/builders.ts` — Tilføjelse (i bunden af filen):
```typescript
// ============================================
// Article/Blog Builders (NYT)
// ============================================

interface ArticleOptions {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function buildArticleSchema(options: ArticleOptions) {
  return {
    "@type": "Article",
    headline: options.title,
    description: options.description,
    author: personRef(),
    publisher: orgRef(),
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    ...(options.image && { image: options.image }),
    url: `${SITE_URL}/blog/${options.slug}/`,
    mainEntityOfPage: `${SITE_URL}/blog/${options.slug}/`,
    inLanguage: "da-DK",
  };
}

export function buildBlogCollectionSchema() {
  return {
    "@type": "CollectionPage",
    "@id": SCHEMA_IDS.blogPage,
    name: "Blog – Julian Bent Singh",
    description: "Artikler om AI, teknologi og forretning af Julian Bent Singh.",
    url: `${SITE_URL}/blog/`,
    about: personRef(),
    inLanguage: "da-DK",
  };
}
```

### `lib/schema/index.ts` — Tilføjelse:
```typescript
// Tilføj til eksisterende exports:
export { buildArticleSchema, buildBlogCollectionSchema } from "./builders";
```

### Risikovurdering: LAV
- KUN additive ændringer
- Eksisterende funktioner og exports er UÆNDREDE
- Nye funktioner kan ikke påvirke eksisterende sider

### Test:
1. `npm run validate-schema` — alle eksisterende sider skal stadig passe
2. Import nye funktioner i en test-fil og verificér output
3. Ingen eksisterende sider importerer de nye funktioner endnu

---

## 9. ÆNDRING 7: NEXT.CONFIG.TS (IMAGE DOMAIN)

### Hvad ændres
Fil: `next.config.ts`
Ændring: Tilføj `images.remotePatterns`

### Før:
```typescript
const nextConfig: NextConfig = {};
```

### Efter:
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};
```

### Risikovurdering: LAV
- Additive konfiguration
- Eksisterende image loading påvirkes IKKE
- `remotePatterns` er additive — tillader nye domæner uden at blokere eksisterende

### Test:
1. `npm run dev` — ingen fejl
2. Eksisterende billeder (i `/public/`) loader stadig korrekt
3. Test med Supabase Storage URL (efter upload implementering)

---

## 10. ÆNDRING 8: MIDDLEWARE (NY FIL)

### Hvad tilføjes
Fil: `middleware.ts` (project root — NY FIL)

### Risikovurdering: MEDIUM
- Ny middleware kan potentielt intercepte ALLE requests
- KRITISK: `matcher` config SKAL være strikt begranset til `/cms/:path*`

### Sikkerhedscheck:
```typescript
export const config = {
  matcher: ['/cms/:path*'],
  // ↑ DETTE er det eneste der bestemmer hvilke routes middleware kører på
  // ALLE andre routes (/, /blog, /ai-ydelser, etc.) er IKKE påvirket
};
```

### Test:
1. Besøg `/` — ingen redirect, side loader normalt
2. Besøg `/ai-ydelser` — ingen redirect
3. Besøg `/blog` — ingen redirect
4. Besøg `/kontakt` — ingen redirect
5. Besøg `/cms` — redirectes til `/cms/login` ✓
6. Besøg `/cms/login` — viser login form (IKKE redirected)

---

## 11. MASTER REGRESSION TEST CHECKLIST

Kør denne FULDE checkliste efter ALLE ændringer er implementeret:

```
NAVIGATION
[ ] Navbar vises på alle public sider
[ ] Navbar VISES IKKE på /cms sider
[ ] Desktop dropdown submenus fungerer
[ ] Mobil hamburger menu åbner/lukker
[ ] Mobil submenu accordion fungerer
[ ] "Blog" link i nav navigerer til /blog
[ ] "Kontakt" CTA knap navigerer korrekt
[ ] Navbar transparent → glass on scroll
[ ] Navbar HVID variant på /om

FORSIDEN (/)
[ ] Hero sektion vises
[ ] LogoCarousel kører
[ ] AIServices section vises
[ ] Invest section vises
[ ] References section vises
[ ] About section vises
[ ] TrustBadges vises
[ ] Contact formular vises
[ ] JSON-LD script tag i page source

ALLE UNDERSIDER
[ ] /ai-ydelser og 7 undersider loader
[ ] /invester og 3 undersider loader
[ ] /referencer loader
[ ] /om loader (HVIDT tema!)
[ ] /kontakt loader
[ ] Alle sider har korrekt <title>
[ ] Alle sider har JSON-LD

KONTAKTFORMULAR
[ ] Validering fungerer (tomme felter)
[ ] Email validering
[ ] Submit sender email via Resend
[ ] Succesbesked vises
[ ] Fejlbesked ved server error

FOOTER
[ ] Footer vises på alle public sider
[ ] Årstal er korrekt
[ ] Footer VISES IKKE på /cms sider

SEO
[ ] /sitemap.xml returnerer XML
[ ] Alle eksisterende URLs i sitemap
[ ] /robots.txt returnerer regler
[ ] /cms/ er disallowed i robots
[ ] npm run validate-schema passerer

BUILD
[ ] npm run build kompilerer uden fejl
[ ] npm run lint har ingen nye warnings
[ ] Ingen TypeScript fejl

PERFORMANCE
[ ] Forsiden loader inden 3 sekunder
[ ] Ingen console errors i browser
[ ] Ingen netværksfejl i DevTools
```

---

## 12. ROLLBACK STRATEGIER

### Hvis Fase 2 (Route Groups) Fejler:
```bash
git stash  # eller git checkout -- .
# Fjern (main) og (cms) mapper
# Gendan originale filplaceringer
```

### Hvis Middleware Blokerer Normale Routes:
```bash
# Slet middleware filen — Next.js kører uden middleware
rm middleware.ts
```

### Hvis Sitemap er Brudt:
```bash
# Gendan original sitemap
git checkout -- app/sitemap.ts
```

### Fuld Rollback:
```bash
# Gå tilbage til sidste kendte gode commit
git log --oneline  # Find commit hash
git reset --hard <commit-hash>
```
