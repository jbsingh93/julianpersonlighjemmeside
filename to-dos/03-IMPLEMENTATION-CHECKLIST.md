# 03 - IMPLEMENTERINGS-CHECKLISTE

> **Formål**: Trin-for-trin checkliste med præcise referencer til filer og dokumenter. Opdatér status (⬜→✅) efterhånden som opgaver fuldføres.

---

## OVERSIGT

| Fase | Beskrivelse | Estimeret Filer | Status |
|------|-------------|-----------------|--------|
| 0 | Forudsætninger & Supabase setup | 0 nye filer | ⬜ |
| 1 | Dependencies & konfiguration | 3 ændrede filer | ⬜ |
| 2 | Route group refaktorering | ~20 flyttede filer | ⬜ |
| 3 | Supabase client & blog lib | 5 nye filer | ⬜ |
| 4 | Authentication system | 4 nye filer | ⬜ |
| 5 | CMS admin UI | 8 nye filer | ⬜ |
| 6 | Blog frontend | 9 nye filer | ⬜ |
| 7 | SEO integration | 3 ændrede filer | ⬜ |
| 8 | Navbar & navigation | 1 ændret fil | ⬜ |
| 9 | Test & validering | 0 nye filer | ⬜ |

---

## FASE 0: FORUDSÆTNINGER (VIA LOVABLE)

> ⚠️ **ALLE opgaver i denne fase SKAL udføres via Lovable/Supabase Dashboard**
> Se `02-SUPABASE-SETUP.md` for detaljerede SQL prompts.

- [ ] **0.1** Opret Supabase projekt (eller verificér eksisterende)
  - Ref: `02-SUPABASE-SETUP.md` → Sektion 1
  - Output: Supabase URL, Anon Key, Service Role Key

- [ ] **0.2** Kør Migration 1: Opret `categories` tabel
  - Ref: `02-SUPABASE-SETUP.md` → Migration 1
  - ⚠️ VIA LOVABLE: Kopiér SQL fra dokumentet ind i Supabase SQL Editor

- [ ] **0.3** Kør Migration 2: Opret `posts` tabel
  - Ref: `02-SUPABASE-SETUP.md` → Migration 2
  - ⚠️ VIA LOVABLE

- [ ] **0.4** Kør Migration 3: Opret `tags` og `post_tags` tabeller
  - Ref: `02-SUPABASE-SETUP.md` → Migration 3
  - ⚠️ VIA LOVABLE

- [ ] **0.5** Kør Migration 4: Opret funktioner og triggers
  - Ref: `02-SUPABASE-SETUP.md` → Migration 4
  - ⚠️ VIA LOVABLE
  - Inkluderer: `update_updated_at()`, `set_published_at()`, `increment_views()`

- [ ] **0.6** Kør Migration 5: Aktivér RLS og opret policies
  - Ref: `02-SUPABASE-SETUP.md` → Migration 5
  - ⚠️ VIA LOVABLE

- [ ] **0.7** Opret `blog-images` storage bucket
  - Ref: `02-SUPABASE-SETUP.md` → Sektion 3
  - ⚠️ VIA LOVABLE: Supabase Dashboard → Storage → New Bucket
  - Indstillinger: Public=true, Max 5MB, MIME: jpeg/png/webp/gif

- [ ] **0.8** Opret storage policies
  - Ref: `02-SUPABASE-SETUP.md` → Sektion 3 (SQL)
  - ⚠️ VIA LOVABLE

- [ ] **0.9** Verificér alt er korrekt
  - Ref: `02-SUPABASE-SETUP.md` → Sektion 4
  - ⚠️ VIA LOVABLE: Kør verifikations-SQL

- [ ] **0.10** (Valgfrit) Indsæt seed data
  - Ref: `02-SUPABASE-SETUP.md` → Sektion 5
  - ⚠️ VIA LOVABLE

---

## FASE 1: DEPENDENCIES & KONFIGURATION

- [ ] **1.1** Installér nye npm packages
  - Kommando: `npm install @supabase/supabase-js @supabase/ssr react-markdown remark-gfm rehype-slug rehype-autolink-headings`
  - Verificér: `package.json` opdateret med nye dependencies

- [ ] **1.2** Opret `.env.local` med Supabase credentials
  - Fil: `.env.local` (project root)
  - Indhold: Se `02-SUPABASE-SETUP.md` → Sektion 1
  - Verificér: `.env.local` er i `.gitignore`

- [ ] **1.3** Opdatér `next.config.ts` med Supabase image domain
  - Fil: `next.config.ts`
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 11
  - Ændring: Tilføj `images.remotePatterns` for `*.supabase.co`
  - ⚠️ REGRESSION CHECK: Eksisterende config skal forblive uændret

- [ ] **1.4** Opret `.env.example` (dokumentation af krævede env vars)
  - Fil: `.env.example` (project root)
  - Indhold: Alle env var names UDEN værdier (template)
  - ⚠️ `.gitignore` ignorerer allerede `.env*` — `.env.example` SKAL IKKE ignoreres
  - Rename til `.env.example` (ikke `.env.local.example`) så den IKKE matches af `.env*` glob
  - Alternativt: Dokumentér env vars i CLAUDE.md eller README i stedet

---

## FASE 2: ROUTE GROUP REFAKTORERING

> ⚠️ **KRITISK FASE** - Her refaktorerer vi app-strukturen. INGEN URLs må ændre sig.
> Se `06-ZERO-REGRESSION-GUIDE.md` for detaljeret guide.

- [ ] **2.1** Opret nye mapper
  - `app/(main)/` - Route group for public site
  - `app/(cms)/cms/` - Route group for admin

- [ ] **2.2** Opret ny root `app/layout.tsx`
  - Indhold: KUN `<html>`, `<body>`, fonts, globals.css import
  - INGEN Navbar eller Footer her
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 3

- [ ] **2.3** Opret `app/(main)/layout.tsx`
  - Indhold: Navbar + `{children}` + Footer
  - Dette er den GAMLE root layout's indhold

- [ ] **2.4** Flyt forside: `app/page.tsx` → `app/(main)/page.tsx`
  - ⚠️ URL skal stadig være `/` (route group er invisible)

- [ ] **2.5** Flyt `app/kontakt/` → `app/(main)/kontakt/`
  - ⚠️ URL skal stadig være `/kontakt`

- [ ] **2.6** Flyt `app/om/` → `app/(main)/om/`
  - ⚠️ URL skal stadig være `/om`

- [ ] **2.7** Flyt `app/referencer/` → `app/(main)/referencer/`
  - ⚠️ URL skal stadig være `/referencer`

- [ ] **2.8** Flyt `app/ai-ydelser/` → `app/(main)/ai-ydelser/`
  - ⚠️ URL skal stadig være `/ai-ydelser/*`
  - ⚠️ VIGTIGT: Inkluderer sub-page `layout.tsx` filer:
    - `fysisk-ai-workshop/layout.tsx` (eksporterer metadata separat fra page)
    - `fysiske-ai-kurser/layout.tsx` (eksporterer metadata separat fra page)
  - Disse layout filer SKAL flyttes med — de indeholder SEO metadata!

- [ ] **2.9** Flyt `app/invester/` → `app/(main)/invester/`
  - ⚠️ URL skal stadig være `/invester/*`

- [ ] **2.10** Flyt `app/actions/` → `app/(main)/actions/` ELLER behold på plads
  - Server actions kan forblive i `app/actions/` da de ikke er route-baserede
  - Alternativt: Flyt til `app/(main)/actions/`

- [ ] **2.11** `app/sitemap.ts` og `app/robots.ts` forbliver i `app/` root
  - Disse er IKKE route-specifikke og skal IKKE flyttes

- [ ] **2.12** REGRESSION TEST: Start dev server og verificér ALLE eksisterende sider
  - `npm run dev`
  - Tjek: `/` (forside)
  - Tjek: `/ai-ydelser` og alle 7 undersider
  - Tjek: `/invester` og alle 3 undersider
  - Tjek: `/referencer`
  - Tjek: `/om`
  - Tjek: `/kontakt`
  - Tjek: Navbar fungerer (desktop + mobil)
  - Tjek: Footer vises
  - Tjek: Kontaktformular sender
  - Ref: `06-ZERO-REGRESSION-GUIDE.md` → Sektion 2

---

## FASE 3: SUPABASE CLIENT & BLOG LIBRARY

- [ ] **3.1** Opret `lib/supabase/client.ts` (browser client)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 6.1
  - Ref: `04-NEW-FILES-INVENTORY.md` → #1

- [ ] **3.2** Opret `lib/supabase/server.ts` (server client)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 6.2
  - Ref: `04-NEW-FILES-INVENTORY.md` → #2

- [ ] **3.3** Opret `lib/blog/types.ts` (TypeScript types)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 5.2
  - Ref: `04-NEW-FILES-INVENTORY.md` → #3

- [ ] **3.4** Opret `lib/blog/queries.ts` (server-side data fetching)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #4
  - Funktioner: getPublishedPosts, getPostBySlug, getCategories, getMostReadPosts, getPostsByCategory, getPostsByTag, getRelatedPosts, searchPosts, getAllPostSlugs, getPostsForSitemap

- [ ] **3.5** Opret `lib/blog/utils.ts` (hjælpefunktioner)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 13 & 14
  - Ref: `04-NEW-FILES-INVENTORY.md` → #5
  - Funktioner: calculateReadingTime, generateTOC, generateSlug, escapeXml

---

## FASE 4: AUTHENTICATION SYSTEM

- [ ] **4.1** Opret `lib/auth.ts` (token functions)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 4.2
  - Ref: `04-NEW-FILES-INVENTORY.md` → #6
  - Funktioner: createToken, verifyToken (HMAC-SHA256)

- [ ] **4.2** Opret `middleware.ts` (project root)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 10
  - Ref: `04-NEW-FILES-INVENTORY.md` → #7
  - Matcher: `/cms/:path*` (undtagen `/cms/login`)

- [ ] **4.3** Opret `app/api/cms/auth/route.ts` (login/logout API)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #8
  - POST: Validér password → sæt cookie
  - DELETE: Slet cookie (logout)

- [ ] **4.4** Opret `app/(cms)/cms/login/page.tsx` (login UI)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #12
  - Simpel formular med password input
  - Redirect til `/cms` efter login

- [ ] **4.5** TEST: Verificér auth flow
  - Test 1: Besøg `/cms` → redirectes til `/cms/login`
  - Test 2: Login med forkert password → fejlbesked
  - Test 3: Login med korrekt password → redirectes til `/cms`
  - Test 4: Besøg `/cms` igen → adgang tilladt
  - Test 5: Logout → redirectes til `/cms/login`

---

## FASE 5: CMS ADMIN UI

- [ ] **5.1** Opret `app/(cms)/cms/layout.tsx` (admin layout)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #11
  - Light theme, sidebar navigation
  - Ingen Navbar/Footer fra hovedsiden

- [ ] **5.2** Opret `components/admin/AdminSidebar.tsx`
  - Ref: `04-NEW-FILES-INVENTORY.md` → #19
  - Links: Dashboard, Indlæg, Kategorier, Tags, Logout, Gå til site

- [ ] **5.3** Opret `app/(cms)/cms/page.tsx` (dashboard)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #13
  - Post oversigt tabel (titel, status, views, dato, actions)
  - Filtre: Alle / Publicerede / Kladder
  - "Nyt indlæg" knap

- [ ] **5.4** Opret `app/api/cms/upload/route.ts` (billede upload)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #9
  - Modtag fil via FormData
  - Validér type + størrelse
  - Upload til Supabase Storage
  - Returnér public URL

- [ ] **5.5** Opret `components/admin/PostEditor.tsx` (post editor)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 7
  - Ref: `04-NEW-FILES-INVENTORY.md` → #20
  - Split-pane: Markdown textarea + live preview
  - Toolbar med markdown shortcuts
  - Auto-slug fra titel
  - Kategori dropdown + tag multi-select
  - Cover image upload
  - SEO felter (collapsible)
  - Gem/Publicér knapper

- [ ] **5.6** Opret `components/admin/ImageUploader.tsx`
  - Ref: `04-NEW-FILES-INVENTORY.md` → #21
  - File picker + drag-and-drop
  - Upload progress indicator
  - Forhåndsvisning af uploadet billede

- [ ] **5.7** Opret `app/(cms)/cms/indlaeg/ny/page.tsx` (nyt indlæg)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #14
  - Wrapper around PostEditor component
  - Server action for at gemme nyt post

- [ ] **5.8** Opret `app/(cms)/cms/indlaeg/[id]/page.tsx` (redigér indlæg)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #15
  - Hent eksisterende post data
  - PostEditor med pre-filled data
  - Server action for at opdatere post

- [ ] **5.9** Opret `app/(cms)/cms/indlaeg/[id]/preview/page.tsx` (preview)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #16
  - Viser draft post som den vil se ud på public blog
  - Bruger blog layout/styling (dark theme)
  - Banner: "Dette er en forhåndsvisning"

- [ ] **5.10** Opret `app/(cms)/cms/kategorier/page.tsx` (kategori admin)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #17
  - Liste af kategorier med edit/delete
  - Inline create form
  - Auto-slug generering

- [ ] **5.11** Opret `app/(cms)/cms/tags/page.tsx` (tag admin)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #18
  - Liste af tags med edit/delete
  - Inline create form
  - Auto-slug generering

- [ ] **5.12** Opret server actions for CMS operationer
  - Fil: `app/actions/blog.ts` (eller `app/(cms)/cms/actions.ts`)
  - Funktioner: createPost, updatePost, deletePost, createCategory, updateCategory, deleteCategory, createTag, updateTag, deleteTag
  - Alle med auth check + revalidatePath

- [ ] **5.13** TEST: Verificér CMS funktionalitet
  - Test: Opret kategori
  - Test: Opret tag
  - Test: Opret nyt post (draft)
  - Test: Upload billede
  - Test: Preview draft
  - Test: Publicér post
  - Test: Redigér post
  - Test: Slet post
  - Test: Slet kategori (posts beholder null category)
  - Test: Slet tag

---

## FASE 6: BLOG FRONTEND

- [ ] **6.1** Opret `components/blog/PostCard.tsx` (post card)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #22
  - Cover image, titel, excerpt, kategori badge, dato, læsetid
  - Link til `/blog/[slug]`
  - Matcher dark theme styling

- [ ] **6.2** Opret `components/blog/CategoryBadge.tsx` (kategori badge)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #23
  - Pill/badge komponent med kategori navn
  - Link til `/blog/kategori/[slug]`

- [ ] **6.3** Opret `components/blog/MarkdownRenderer.tsx`
  - Ref: `04-NEW-FILES-INVENTORY.md` → #24
  - react-markdown med remark-gfm, rehype-slug, rehype-autolink-headings
  - Custom styling for headings, paragraphs, code blocks, images, links, lists, blockquotes
  - next/image integration for optimerede billeder

- [ ] **6.4** Opret `components/blog/TableOfContents.tsx`
  - Ref: `04-NEW-FILES-INVENTORY.md` → #25
  - Genereret fra markdown headings
  - Smooth scroll til headings
  - Sticky sidebar eller collapsible på mobil

- [ ] **6.5** Opret `components/blog/ShareButtons.tsx`
  - Ref: `04-NEW-FILES-INVENTORY.md` → #26
  - LinkedIn, Twitter/X, Facebook, Kopiér link
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 16

- [ ] **6.6** Opret `components/blog/ViewCounter.tsx` (client component)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #27
  - Sender POST til `/api/blog/views` on mount
  - Cookie-baseret rate limiting

- [ ] **6.7** Opret `components/blog/BlogSearch.tsx` (client component)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #28
  - Søgefelt med debounced live results
  - Bruger Supabase client (anon key) for tekstsøgning

- [ ] **6.8** Opret `app/api/blog/views/route.ts` (view counter API)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 12
  - Ref: `04-NEW-FILES-INVENTORY.md` → #10

- [ ] **6.9** Opret `app/(main)/blog/page.tsx` (blog hub)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 8.1
  - Ref: `04-NEW-FILES-INVENTORY.md` → #29
  - Sektioner: Hero, Kategorier, Seneste indlæg, Mest læste
  - Metadata + CollectionPage schema

- [ ] **6.10** Opret `app/(main)/blog/[slug]/page.tsx` (enkelt post)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 8.2
  - Ref: `04-NEW-FILES-INVENTORY.md` → #30
  - generateMetadata for dynamisk SEO
  - generateStaticParams for static generation
  - Article schema + breadcrumbs
  - MarkdownRenderer, TOC, ShareButtons, RelatedPosts, ViewCounter

- [ ] **6.11** Opret `app/(main)/blog/kategori/[slug]/page.tsx` (kategori)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 8.3
  - Ref: `04-NEW-FILES-INVENTORY.md` → #31
  - generateMetadata for dynamisk SEO
  - CollectionPage schema + breadcrumbs
  - Grid af PostCards

- [ ] **6.12** Opret `app/(main)/blog/tags/[slug]/page.tsx` (tag side)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #32
  - Lignende layout som kategori side

- [ ] **6.13** Opret `app/(main)/blog/soeg/page.tsx` (søgeside)
  - Ref: `04-NEW-FILES-INVENTORY.md` → #33
  - BlogSearch component
  - noindex meta tag

- [ ] **6.14** Opret `app/(main)/blog/feed.xml/route.ts` (RSS feed)
  - Ref: `01-ARCHITECTURE-PLAN.md` → Sektion 15
  - Ref: `04-NEW-FILES-INVENTORY.md` → #34

- [ ] **6.15** Opret error/loading/not-found filer for blog
  - `app/(main)/blog/not-found.tsx` — "Indlæg ikke fundet" side (404)
  - `app/(main)/blog/loading.tsx` — Loading skeleton for blog sider
  - `app/(main)/blog/[slug]/not-found.tsx` — "Indlæg ikke fundet" for specifikke slugs
  - `app/(main)/blog/error.tsx` — Error boundary ("use client", Reset knap)
  - ⚠️ Disse eksisterer IKKE i den nuværende kodebase — blog er FØRSTE sted de bruges
  - Design: Match dark theme, venlig dansk fejlbesked, link tilbage til /blog

- [ ] **6.16** TEST: Verificér blog frontend
  - Test: `/blog` viser kategorier, seneste og mest læste
  - Test: `/blog/[slug]` renderer markdown korrekt
  - Test: Table of contents fungerer (scroll til heading)
  - Test: Share buttons åbner korrekte URLs
  - Test: View counter incrementer
  - Test: `/blog/kategori/[slug]` viser posts i kategori
  - Test: `/blog/tags/[slug]` viser posts med tag
  - Test: `/blog/soeg` søgefelt finder posts
  - Test: `/blog/feed.xml` returnerer valid XML
  - Test: Relaterede indlæg vises

---

## FASE 7: SEO INTEGRATION

- [ ] **7.1** Tilføj `buildArticleSchema()` til `lib/schema/builders.ts`
  - Ref: `07-SEO-BLOG-INTEGRATION.md` → Sektion 2
  - Tilføj også `buildBlogCollectionSchema()`
  - ⚠️ REGRESSION: Eksisterende builders skal IKKE ændres

- [ ] **7.2** Tilføj blog SCHEMA_IDS til `lib/schema/constants.ts`
  - `blogPage: "${SITE_URL}/blog/#page"`
  - ⚠️ REGRESSION: Eksisterende IDs skal IKKE ændres

- [ ] **7.3** Re-export nye funktioner i `lib/schema/index.ts`
  - ⚠️ REGRESSION: Eksisterende exports skal IKKE ændres

- [ ] **7.4** Opdatér `app/sitemap.ts` (gør asynkron + blog URLs)
  - Ref: `07-SEO-BLOG-INTEGRATION.md` → Sektion 5
  - Tilføj `/blog/`, alle `/blog/[slug]/`, alle `/blog/kategori/[slug]/`
  - Gør funktionen `async` og fetch fra Supabase
  - ⚠️ REGRESSION: Alle eksisterende sitemap entries skal bestå UÆNDRET

- [ ] **7.5** Opdatér `app/robots.ts` (disallow `/cms/`)
  - Tilføj `/cms/` til disallow listen
  - ⚠️ REGRESSION: Eksisterende regler skal IKKE ændres

- [ ] **7.6** TEST: Verificér SEO
  - Test: `npm run validate-schema` passer stadig
  - Test: `/sitemap.xml` inkluderer blog URLs + alle eksisterende URLs
  - Test: `/robots.txt` blokerer `/cms/`
  - Test: Blog post har korrekt Article schema
  - Test: Blog hub har korrekt CollectionPage schema
  - Test: Blog post har korrekt OpenGraph metadata

---

## FASE 8: NAVBAR & NAVIGATION

- [ ] **8.1** Tilføj "Blog" til Navbar
  - Fil: `components/Navbar.tsx`
  - Ændring: Tilføj `{ name: "Blog", href: "/blog" }` til `navLinks` array
  - Placering: EFTER "Om Mig", FØR Kontakt-knappen
  - ⚠️ REGRESSION: Eksisterende nav links skal IKKE ændres
  - ⚠️ Test desktop OG mobil navigation

---

## FASE 9: TEST & VALIDERING

- [ ] **9.1** Full regression test af eksisterende sider
  - Ref: `06-ZERO-REGRESSION-GUIDE.md` → Sektion 2
  - Tjek ALLE 15+ eksisterende routes
  - Tjek Navbar (desktop + mobil)
  - Tjek Footer
  - Tjek Kontaktformular
  - Tjek alle animationer

- [ ] **9.2** Blog funktionalitets test
  - CMS login/logout
  - CRUD kategorier
  - CRUD tags
  - CRUD posts
  - Billede upload
  - Markdown rendering
  - View counting
  - Søgefunktion
  - RSS feed
  - Social sharing

- [ ] **9.3** SEO validering
  - `npm run validate-schema`
  - Tjek sitemap.xml
  - Tjek robots.txt
  - Tjek Article schema på blog posts
  - Tjek OpenGraph metadata
  - Tjek canonical URLs

- [ ] **9.4** Performance check
  - `npm run build` - ingen fejl
  - Tjek bundle size (nye dependencies)
  - Tjek Lighthouse score

- [ ] **9.5** Sikkerhedscheck
  - CMS utilgængelig uden login
  - Service role key IKKE eksponeret i browser
  - Image upload validerer filtype + størrelse
  - SQL injection via Supabase parameterized queries
  - XSS via react-markdown (sanitized by default)

---

## NOTER

### Rækkefølge er VIGTIG
- Fase 0 SKAL fuldføres før alt andet (Supabase setup)
- Fase 1 SKAL fuldføres før Fase 3+ (dependencies)
- Fase 2 SKAL fuldføres før Fase 5-6 (route groups)
- Fase 3 SKAL fuldføres før Fase 4-6 (lib/blog + lib/supabase)
- Fase 4 SKAL fuldføres før Fase 5 (auth for CMS)
- Fase 5 og 6 kan arbejdes på PARALLELT (CMS og frontend er uafhængige)
- Fase 7-8 SKAL fuldføres EFTER Fase 5-6

### Rollback Plan
Hvis noget går galt under Fase 2 (route group refaktorering):
1. `git stash` eller `git checkout .` for at vende tilbage
2. Alle originale filer er uændrede i git historik
3. Route groups påvirker IKKE URLs - kun filstruktur

### Commit Strategi
Commit EFTER hver fase for at have clean rollback points:
```
git commit -m "Fase 0: Supabase config tilføjet"
git commit -m "Fase 1: Dependencies installeret"
git commit -m "Fase 2: Route groups refaktorering"
git commit -m "Fase 3: Supabase client + blog lib"
git commit -m "Fase 4: Auth system"
git commit -m "Fase 5: CMS admin UI"
git commit -m "Fase 6: Blog frontend"
git commit -m "Fase 7: SEO integration"
git commit -m "Fase 8: Navbar opdateret"
```
