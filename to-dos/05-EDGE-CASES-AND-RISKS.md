# 05 - EDGE CASES, RISICI & MITIGERING

> **Formål**: Identificér og dokumentér alle potentielle edge cases, risici og fejlscenarier, med klare mitigeringsstrategier for hver.

---

## 1. AUTHENTICATION & SIKKERHED

### 1.1 Brute Force Password Angreb
**Risiko**: Nogen forsøger at gætte CMS password via automatiserede requests.
**Mitigering**:
- Rate limiting på `/api/cms/auth` POST endpoint (max 5 forsøg per IP per minut)
- Progressiv delay efter fejlede forsøg (1s, 2s, 4s, 8s...)
- Log alle mislykkede login forsøg til console
- Stærkt password krav i dokumentation (min 16 tegn)

### 1.2 Session Hijacking
**Risiko**: Nogen stjæler CMS session cookie.
**Mitigering**:
- `httpOnly: true` — JavaScript kan ikke læse cookien
- `secure: true` i produktion — kun HTTPS
- `sameSite: 'lax'` — beskytter mod CSRF
- 24-timers expiry — begrænset vindue
- HMAC-signeret token — kan ikke forfalskes uden at kende passwordet

### 1.3 CSRF på CMS Operationer
**Risiko**: Ondsindet side trigger CMS operationer via brugerens session.
**Mitigering**:
- Server Actions i Next.js har CSRF protection indbygget
- `sameSite: 'lax'` cookie forhindrer cross-origin POST requests
- API routes verificerer `Origin` header

### 1.4 Service Role Key Eksponering
**Risiko**: Supabase service role key lækker til browser.
**Mitigering**:
- Key er i `SUPABASE_SERVICE_ROLE_KEY` (UDEN `NEXT_PUBLIC_` prefix)
- Next.js bundler inkluderer ALDRIG non-NEXT_PUBLIC env vars i client bundles
- Eksplicit check i server files: `if (typeof window !== 'undefined') throw new Error()`
- Code review fokus på at `lib/supabase/server.ts` aldrig importeres i client components

### 1.5 Middleware Edge Runtime Begrænsninger
**Risiko**: `crypto.createHmac()` virker ikke i Edge Runtime (middleware).
**Mitigering**:
- Brug Web Crypto API (`crypto.subtle.importKey` + `crypto.subtle.sign`) i middleware
- Separat `verifyTokenEdge()` funktion til middleware
- Alternativt: Brug en simpel signeret token-approach der virker i Edge Runtime
- Test middleware i production-like environment (ikke kun dev)

---

## 2. DATA & DATABASE

### 2.1 Tom Blog (Ingen Posts)
**Risiko**: Blog hub side viser tomt indhold når der ingen posts er.
**Mitigering**:
- "Ingen indlæg endnu" placeholder UI
- Skjul "Seneste indlæg" og "Mest læste" sektioner hvis 0 posts
- Kategorier sektion vises altid (også med 0 posts per kategori)
- Søgeside viser venlig besked ved 0 resultater

### 2.2 Slettet Kategori med Posts
**Risiko**: Admin sletter en kategori der har posts tilknyttet.
**Mitigering**:
- `ON DELETE SET NULL` i database constraint — posts beholder null category
- UI viser "Uden kategori" for posts uden category
- Bekræftelsesdialog: "Denne kategori har X indlæg. Indlæggene vil beholdes men miste deres kategori."
- Alternativt: Forhindre sletning hvis kategorien har posts (med fejlbesked)

### 2.3 Duplikeret Slug
**Risiko**: To posts eller kategorier med samme slug.
**Mitigering**:
- Database UNIQUE constraint på `slug` kolonne
- Client-side slug validering i PostEditor
- Server-side slug check før insert (give brugervenlig fejlbesked)
- Auto-append nummer ved duplikat: "min-post" → "min-post-2"

### 2.4 Meget Langt Markdown Content
**Risiko**: Ydeevne-problemer ved rendering af meget lange blog posts.
**Mitigering**:
- react-markdown renderer er efficient (React virtual DOM)
- Lazy loading af billeder i markdown via next/image
- Ingen max grænse på content længde (Supabase TEXT type)
- Table of contents giver navigation i lange posts

### 2.5 Supabase Connection Fejl
**Risiko**: Supabase er nede eller langsomt.
**Mitigering**:
- ISR caching (revalidate) sikrer at sider stadig vises med cached data
- Error boundaries i React for graceful degradation
- Try/catch i alle Supabase queries med brugervenlige fejlbeskeder
- Blog hub og posts er server-rendered og cached — downtime påvirker kun nye reads

### 2.6 Database Migration Fejl
**Risiko**: SQL migration fejler i Supabase.
**Mitigering**:
- Alle migrationer har `IF NOT EXISTS` clause
- Migrationer er idempotente (kan køres flere gange)
- Verifikations-SQL til at tjekke efter migration
- Rollback SQL dokumenteret for hver migration

### 2.7 Orphaned Post-Tag Relationer
**Risiko**: post_tags entries der refererer til slettede posts/tags.
**Mitigering**:
- `ON DELETE CASCADE` på begge foreign keys
- Database håndterer automatisk cleanup

---

## 3. UI/UX EDGE CASES

### 3.1 Markdown Preview vs. Rendered Output Forskel
**Risiko**: Preview i editor ser anderledes ud end den publicerede post.
**Mitigering**:
- Begge bruger PRÆCIS samme `MarkdownRenderer` component
- Same CSS styling i editor preview og blog post side
- Live preview opdateres ved hvert keystroke (debounced)

### 3.2 Billede Upload Fejl
**Risiko**: Upload fejler halvvejs, eller bruger mister forbindelse.
**Mitigering**:
- Loading state under upload
- Fejlbesked ved upload failure
- Retry-knap
- Max filstørrelse check INDEN upload starter (client-side)
- Filtype validering INDEN upload (client-side + server-side)

### 3.3 Concurrent Edits (To Faner)
**Risiko**: Admin redigerer samme post i to browserfaner → data loss.
**Mitigering**:
- `updated_at` timestamp check: Hvis posten er ændret siden den blev loaded, vis advarsel
- "Denne post er ændret af en anden session. Vil du overskrive?"
- Alternativt (simpel): Acceptér at det sker sjældent (single user system)

### 3.4 Browser Back Button i Editor
**Risiko**: Bruger navigerer væk fra editor med ugemte ændringer.
**Mitigering**:
- `beforeunload` event listener: "Du har ugemte ændringer. Vil du forlade siden?"
- Draft auto-save til localStorage (gendan ved genbesøg)

### 3.5 Mobilresponsivitet
**Risiko**: CMS editor er svær at bruge på mobil.
**Mitigering**:
- Split-pane editor → stacked layout på mobil (editor over, preview under)
- Toggle mellem editor og preview på mobil
- Touch-venlige toolbar buttons
- Note: CMS er primært designet til desktop-brug

### 3.6 Slug med Specialtegn
**Risiko**: Dansk titel med æ, ø, å genererer forkert slug.
**Mitigering**:
```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

### 3.7 XSS via Markdown Content
**Risiko**: Ondsindet HTML/JavaScript i markdown content.
**Mitigering**:
- react-markdown saniterer HTML by default
- Tillad KUN safe markdown (ingen raw HTML)
- `rehype-sanitize` kan tilføjes som ekstra sikkerhedslag
- Next.js' `dangerouslySetInnerHTML` bruges IKKE til markdown

---

## 4. SEO EDGE CASES

### 4.1 Draft Posts i Sitemap
**Risiko**: Draft posts inkluderes i sitemap → Google prøver at crawle dem → 404.
**Mitigering**:
- Sitemap query filtrerer: `WHERE status = 'published'`
- RLS policy sikrer at anon key KUN kan læse published posts
- `generateStaticParams` kun returnerer published post slugs

### 4.2 Slettet Post → Broken Links
**Risiko**: Publiceret post slettes → eksisterende links/Google index → 404.
**Mitigering**:
- Advarsel ved sletning: "Denne post er publiceret og kan have indgående links"
- Overvej "archive" status i stedet for hard delete (fremtidig feature)
- For nu: Accept 404 — Google opdaterer index over tid
- Alternativt: Tilføj redirect middleware for kendte slettede slugs

### 4.3 Ændret Slug → Broken Links
**Risiko**: Admin ændrer slug på publiceret post → eksisterende links → 404.
**Mitigering**:
- Advarsel i editor: "Ændring af slug på publiceret post kan bryde eksisterende links"
- Overvej "slug_history" tabel for automatiske redirects (fremtidig feature)
- For nu: Stærk advarsel + bekræftelsesdialog

### 4.4 Missing Cover Image
**Risiko**: Blog post uden cover image ser ufuldstændig ud.
**Mitigering**:
- Fallback gradient/pattern i PostCard (f.eks. `bg-gradient-to-br from-zinc-800 to-zinc-900`)
- OpenGraph image fallback: Brug site-wide default OG image
- Article schema: Undlad `image` field hvis ingen cover image

### 4.5 Canonical URL Konsistens
**Risiko**: Inconsistent trailing slashes eller URL format.
**Mitigering**:
- Alle blog URLs bruger trailing slash: `/blog/slug-here/`
- Konsistent med eksisterende site mønster
- `SITE_URL` constant bruges overalt (aldrig hardcoded URL)

### 4.6 "use client" + Metadata Conflict
**Risiko**: Blog page bruger Framer Motion animationer → `"use client"` → kan IKKE eksportere `metadata` eller `generateMetadata`.
**Mitigering**:
- Blog post page (`/blog/[slug]/page.tsx`) SKAL være Server Component for `generateMetadata`
- Brug client component WRAPPERS for interaktive dele:
  - `ViewCounter` → client component, importeret i server page
  - `ShareButtons` → client component, importeret i server page
  - `TableOfContents` → client component, importeret i server page
  - `BlogSearch` → client component, importeret i server page
- Framer Motion animationer i blog: Brug IKKE `"use client"` på page niveau
- Alternativt: Brug `layout.tsx` pattern (som `fysisk-ai-workshop/`) for metadata, men dette er unødvendigt da vi ikke behøver Framer Motion på hele page'en
- **Eksisterende pattern-reference**: `app/ai-ydelser/fysisk-ai-workshop/layout.tsx` + `page.tsx`

### 4.7 Schema-dts Type Compatibility
**Risiko**: Nye schema builders returnerer objekter der ikke matcher `schema-dts` types i `JsonLd` component.
**Mitigering**:
- `JsonLd` component accepterer `Record<string, unknown>` som fallback type
- Vores custom schema objekter (Article, Blog, CollectionPage) behøver ikke at matche schema-dts 100%
- `dangerouslySetInnerHTML` med `JSON.stringify` accepterer ethvert objekt
- Vigtigst: Schema skal være valid JSON-LD, ikke TypeScript-valid schema-dts

---

## 5. PERFORMANCE

### 5.1 N+1 Query Problem
**Risiko**: Henter posts + kategorier separat for hver post → mange queries.
**Mitigering**:
- Supabase `select('*, category:categories(*)')` — JOIN i én query
- Tags: `select('*, tags:post_tags(tag:tags(*))'))` — nested JOIN
- Aldrig loop-baserede queries

### 5.2 Stor Mængde Posts
**Risiko**: Hundredevis af posts → langsom listing.
**Mitigering**:
- Pagination: max 12 posts per side (offset/limit)
- Indexes på `published_at DESC`, `views DESC`, `slug`, `status`
- ISR caching (revalidate: 60) — pages genberegnes maks hvert minut
- Supabase håndterer efficient med PostgreSQL

### 5.3 Billede Ydeevne
**Risiko**: Store billeder gør sider langsomme.
**Mitigering**:
- next/image for automatisk optimering + WebP konvertering
- lazy loading for billeder under fold
- Max upload størrelse: 5 MB
- Supabase Storage CDN for hurtig delivery

### 5.4 Bundle Size
**Risiko**: Nye dependencies gør bundlen for stor.
**Mitigering**:
- react-markdown er allerede tree-shakeable
- Markdown rendering sker server-side (SSR) — ikke i client bundle
- CMS pages er separat route group — kun loaded ved admin adgang
- next/dynamic for lazy loading af tunge components

---

## 6. REGRESSION RISICI

### 6.1 Route Group Refaktorering Bryder URLs
**Risiko**: Flytning af filer til `(main)/` ændrer URL routing.
**Mitigering**:
- Route groups (`(main)`, `(cms)`) er per design INVISIBLE i URLs
- `app/(main)/kontakt/page.tsx` → URL er stadig `/kontakt`
- Komplet regression test efter flytning (alle 15+ routes)
- Git commit INDEN refaktorering for rollback mulighed

### 6.2 Root Layout Ændring Bryder Styling
**Risiko**: Flytning af Navbar/Footer til (main)/layout.tsx fejler.
**Mitigering**:
- Trin-for-trin: 1) Opret (main)/layout.tsx med Navbar+Footer, 2) Fjern fra root, 3) Test
- Root layout beholder: `<html>`, `<body>`, fonts, `globals.css`
- Visuelt tjek af ALLE sider efter ændring

### 6.3 Sitemap Ændring Bryder Eksisterende URLs
**Risiko**: Gøre sitemap async fjerner/ændrer eksisterende entries.
**Mitigering**:
- Eksisterende routes array forbliver UÆNDRET
- Blog entries TILFØJES — intet slettes
- Test: Sammenlign ny sitemap.xml med gammel for at sikre ingen mangler

### 6.4 Ny Middleware Blokerer Eksisterende Routes
**Risiko**: Middleware matcher for bredt og blokerer normale sider.
**Mitigering**:
- Matcher er STRIKT: `['/cms/:path*']` — kun `/cms/` prefixed routes
- `/blog`, `/kontakt`, etc. matches IKKE
- Test alle eksisterende routes med middleware aktiveret

### 6.5 Schema Builders Ændring Bryder Eksisterende Schema
**Risiko**: Ændringer i builders.ts / constants.ts påvirker eksisterende sider.
**Mitigering**:
- Nye funktioner TILFØJES — eksisterende ændres IKKE
- `buildArticleSchema()` er NY funktion
- Eksisterende `buildServiceSchema()`, `buildBreadcrumbSchema()` etc. er UÆNDREDE
- `npm run validate-schema` efter ændringer

---

## 7. DEPLOYMENT OVERVEJELSER

### 7.1 Env Variables i Produktion
**Risiko**: Manglende env vars i production deployment.
**Mitigering**:
- Dokumenteret liste over ALLE krævede env vars
- Server starter op med check for required env vars
- Tydeligt fejlbesked hvis env var mangler

### 7.2 Supabase URL i Image Optimization
**Risiko**: next/image afviser Supabase Storage billeder.
**Mitigering**:
- `next.config.ts` → `images.remotePatterns` med `*.supabase.co`
- Wildcard for hostname dækker alle Supabase projekter
- Vercel auto-detekterer og optimerer

### 7.3 Edge Runtime vs Node Runtime
**Risiko**: Middleware (Edge) har andre API'er end Server Components (Node).
**Mitigering**:
- Middleware: `verifyTokenEdge()` med Web Crypto API
- Server Components/API Routes: `verifyToken()` med Node.js crypto
- To separate implementationer, testet separat

---

## 8. FREMTIDSSIKRING

### Overvejelser for fremtidige features (IKKE implementeret nu):
1. **Kommentarer**: Kan tilføjes med ny Supabase tabel + moderation UI
2. **Multi-author**: Kan tilføjes med `author_id` kolonne + authors tabel
3. **Billedgalleri**: Supabase Storage allerede sat op — kan udvides
4. **Newsletter integration**: Kan tilføjes med Resend API (allerede i projektet)
5. **Analytics dashboard**: View counts allerede tracked — kan aggregeres
6. **Scheduled publishing**: Tilføj `scheduled_at` kolonne + cron job
7. **Version history**: Tilføj `post_versions` tabel for undo/redo
8. **Markdown shortcuts**: Tilføj keyboard shortcuts i editor (Ctrl+B, etc.)

Ingen af disse features påvirker den nuværende implementering — de kan alle tilføjes additively.
