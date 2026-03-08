# 04 - NYE FILER INVENTAR

> **Formål**: Komplet liste over ALLE nye filer der skal oprettes, med detaljeret beskrivelse af hver fils indhold, dependencies, og formål.

---

## OVERSIGT

| Kategori | Antal nye filer | Antal ændrede filer |
|----------|-----------------|---------------------|
| Lib (Supabase) | 2 | 0 |
| Lib (Blog) | 3 | 0 |
| Lib (Auth) | 1 | 0 |
| API Routes | 3 | 0 |
| CMS Pages | 8 | 0 |
| CMS Components | 3 | 0 |
| Blog Components | 7 | 0 |
| Blog Pages | 6 | 0 |
| Blog Error/Loading/NotFound | 4 | 0 |
| Middleware | 1 | 0 |
| **Total nye filer** | **38** | - |
| Ændrede eksisterende filer | - | **8** |

---

## LIBRARY FILER

### #1 `lib/supabase/client.ts` — Browser Supabase Client
```
Formål: Supabase client til brug i Client Components (browser-side)
Bruger: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
Dependencies: @supabase/ssr
Eksporterer: createClient()
Bruges af: ViewCounter, BlogSearch, eventuelle andre client-side reads
Sikkerhed: Anon key = read-only for published content (via RLS)
Størrelse: ~15 linjer
```

### #2 `lib/supabase/server.ts` — Server Supabase Client
```
Formål: Supabase client til brug i Server Components og API Routes
Bruger: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
Dependencies: @supabase/supabase-js
Eksporterer: createServerClient()
Bruges af: Alle server-side data fetching, CMS operationer, sitemap
Sikkerhed: Service role key = full access (bypasser RLS)
VIGTIGT: Denne fil importeres ALDRIG i client components
Størrelse: ~15 linjer
```

### #3 `lib/blog/types.ts` — TypeScript Type Definitioner
```
Formål: Alle TypeScript interfaces/types for blog data
Dependencies: Ingen
Eksporterer: Category, Post, PostWithCategory, PostWithCategoryAndTags,
             Tag, PostTag, CreatePostInput, UpdatePostInput,
             CreateCategoryInput, CreateTagInput, TOCItem
Bruges af: Alle blog-relaterede filer
Størrelse: ~80 linjer
```

### #4 `lib/blog/queries.ts` — Server-Side Data Fetching
```
Formål: Alle Supabase queries til blog data (server-side)
Dependencies: lib/supabase/server, lib/blog/types
Eksporterer:
  - getPublishedPosts(limit?, offset?) → PostWithCategory[]
  - getPostBySlug(slug) → PostWithCategoryAndTags | null
  - getCategories() → (Category & { post_count: number })[]
  - getCategoryBySlug(slug) → Category | null
  - getMostReadPosts(limit?) → PostWithCategory[]
  - getPostsByCategory(categorySlug, limit?, offset?) → PostWithCategory[]
  - getPostsByTag(tagSlug, limit?, offset?) → PostWithCategory[]
  - getRelatedPosts(postId, categoryId, limit?) → PostWithCategory[]
  - searchPosts(query) → PostWithCategory[]
  - getAllPostSlugs() → string[]
  - getPostsForSitemap() → { slug, updated_at }[]
  - getAllPosts() → PostWithCategory[] (for CMS, inkl. drafts)
  - getPostById(id) → PostWithCategoryAndTags | null (for CMS)
  - getAllTags() → Tag[]
  - getTagBySlug(slug) → Tag | null
Bruges af: Blog pages, CMS pages, sitemap
VIGTIGT: Bruger createServerClient() - aldrig browser client
Størrelse: ~200 linjer
```

### #5 `lib/blog/utils.ts` — Hjælpefunktioner
```
Formål: Utility functions for blog
Dependencies: Ingen (pure functions)
Eksporterer:
  - calculateReadingTime(content: string) → number (minutter)
  - generateTOC(content: string) → TOCItem[]
  - generateSlug(title: string) → string (URL-venlig)
  - escapeXml(str: string) → string (til RSS feed)
  - formatDate(date: string) → string (dansk datoformat)
Bruges af: Blog pages, PostEditor, RSS feed
Størrelse: ~60 linjer
```

### #6 `lib/auth.ts` — Authentication Hjælpefunktioner
```
Formål: Token creation og verification for CMS auth
Dependencies: Node.js crypto (built-in)
Eksporterer:
  - createToken() → string (HMAC-SHA256 signeret)
  - verifyToken(token: string) → boolean
  - verifyTokenEdge(token: string) → Promise<boolean> (til middleware/Edge Runtime)
Bruger: BLOG_ADMIN_PASSWORD env var
Sikkerhed: httpOnly cookies, HMAC-SHA256 signering, 24h expiry
VIGTIGT: verifyTokenEdge bruger Web Crypto API (Edge Runtime compatible)
Størrelse: ~50 linjer
```

---

## MIDDLEWARE

### #7 `middleware.ts` (project root)
```
Formål: Beskyt alle /cms/* routes (undtagen /cms/login)
Dependencies: next/server, lib/auth (verifyTokenEdge)
Eksporterer: middleware function + config
Matcher: /cms/:path* (undtagen /cms/login)
Flow: Tjek cms_session cookie → verificér token → redirect til /cms/login hvis invalid
VIGTIGT: Kører i Edge Runtime - skal bruge Web Crypto API, IKKE Node.js crypto
Størrelse: ~30 linjer
```

---

## API ROUTES

### #8 `app/api/cms/auth/route.ts` — Login/Logout API
```
Formål: Håndtér CMS login og logout
Dependencies: lib/auth, next/server
Eksporterer: POST (login), DELETE (logout)
POST body: { password: string }
POST response: 200 + Set-Cookie ELLER 401 { error: "Forkert adgangskode" }
DELETE response: 200 + Clear-Cookie
Cookie: cms_session, httpOnly, secure, sameSite=lax, maxAge=86400
Størrelse: ~40 linjer
```

### #9 `app/api/cms/upload/route.ts` — Billede Upload API
```
Formål: Upload billeder til Supabase Storage
Dependencies: lib/supabase/server, lib/auth
Eksporterer: POST
Auth: Kræver valid cms_session cookie
POST body: FormData med 'file' felt
Validering:
  - Filtype: image/jpeg, image/png, image/webp, image/gif
  - Størrelse: Max 5 MB
  - Filnavn: Saniteret + timestamp prefix
Upload: Supabase Storage bucket "blog-images"
Response: { url: "https://xxx.supabase.co/storage/v1/object/public/blog-images/filename.jpg" }
Størrelse: ~50 linjer
```

### #10 `app/api/blog/views/route.ts` — View Counter API
```
Formål: Increment view count for blog posts
Dependencies: lib/supabase/server, next/server
Eksporterer: POST
POST body: { slug: string }
Rate limiting: Cookie-baseret (max 1 view per post per 24 timer)
Bruger: Supabase RPC function 'increment_views'
Response: { ok: true, counted: boolean }
Størrelse: ~35 linjer
```

---

## CMS PAGES

### #11 `app/(cms)/cms/layout.tsx` — Admin Layout
```
Formål: Layout wrapper for alle CMS sider
Indhold:
  - Light theme (bg-gray-50, text-gray-900)
  - AdminSidebar component (venstre side)
  - Content area (højre side)
  - INGEN Navbar eller Footer fra hovedsiden
  - Responsive: Sidebar collapsible på mobil
Metadata: { title: { template: "%s | CMS", default: "Blog CMS" } }
Styling: Helt separat fra public site (hvidt/gråt tema)
Størrelse: ~30 linjer
```

### #12 `app/(cms)/cms/login/page.tsx` — Login Side
```
Formål: Password login formular for CMS
Indhold:
  - Centreret form med password input
  - Submit knap
  - Fejlbesked visning
  - Redirect til /cms efter success
  - "use client" (form state management)
Layout: Minimal (ingen sidebar) - bruger sin egen simple layout
Metadata: { title: "Log ind" }
Størrelse: ~60 linjer
```

### #13 `app/(cms)/cms/page.tsx` — CMS Dashboard
```
Formål: Oversigt over alle blog posts
Indhold:
  - Statistik cards (total posts, publicerede, kladder, total views)
  - Post tabel: Titel, Status badge, Views, Kategori, Dato, Actions (Edit, Delete)
  - Filtre: Alle | Publicerede | Kladder
  - "Nyt indlæg" CTA knap
  - Quick actions: Link til Kategorier, Tags
Server Component: Fetcher data direkte fra Supabase
Størrelse: ~120 linjer
```

### #14 `app/(cms)/cms/indlaeg/ny/page.tsx` — Opret Nyt Indlæg
```
Formål: Side til at oprette nyt blog post
Indhold: PostEditor component (create mode)
Server Component: Fetcher kategorier + tags til dropdowns
Server Action: createPost → redirect til /cms
Størrelse: ~40 linjer
```

### #15 `app/(cms)/cms/indlaeg/[id]/page.tsx` — Redigér Indlæg
```
Formål: Side til at redigere eksisterende blog post
Indhold: PostEditor component (edit mode, pre-filled)
Server Component: Fetcher post data + kategorier + tags
Server Action: updatePost → revalidatePath → redirect
Params: { id: string } (post UUID)
Størrelse: ~50 linjer
```

### #16 `app/(cms)/cms/indlaeg/[id]/preview/page.tsx` — Preview Draft
```
Formål: Viser draft post som den vil se ud på public blog
Indhold:
  - Banner: "📝 Forhåndsvisning - ikke publiceret"
  - Fuld blog post rendering (dark theme, same styling)
  - "Redigér" og "Publicér" knapper i banneret
  - Bruger MarkdownRenderer, TOC, etc.
Server Component: Fetcher post data (inkl. drafts via service role)
Størrelse: ~70 linjer
```

### #17 `app/(cms)/cms/kategorier/page.tsx` — Kategori Administration
```
Formål: CRUD for blog kategorier
Indhold:
  - Liste af eksisterende kategorier (navn, slug, antal posts)
  - Inline redigering (click-to-edit)
  - Slet knap (med bekræftelsesdialog)
  - "Opret ny kategori" form (navn + slug auto-gen)
Mix: Server Component (data) + Client Components (interaktivitet)
Server Actions: createCategory, updateCategory, deleteCategory
Størrelse: ~100 linjer
```

### #18 `app/(cms)/cms/tags/page.tsx` — Tag Administration
```
Formål: CRUD for blog tags
Indhold: Samme mønster som kategorier
Server Actions: createTag, updateTag, deleteTag
Størrelse: ~90 linjer
```

---

## CMS COMPONENTS

### #19 `components/admin/AdminSidebar.tsx` — Admin Navigation
```
Formål: Sidebar navigation for CMS
"use client" (aktiv route highlighting via usePathname)
Indhold:
  - Logo/brand (Julian Bent Singh CMS)
  - Nav links med ikoner:
    - 📊 Dashboard → /cms
    - 📝 Indlæg → /cms (same as dashboard)
    - 📁 Kategorier → /cms/kategorier
    - 🏷️ Tags → /cms/tags
    - ─── Divider ───
    - 🌐 Gå til site → / (target="_blank")
    - 🚪 Log ud → DELETE /api/cms/auth
  - Aktiv state highlighting (bg-blue-50 text-blue-700)
  - Responsive: Hamburger toggle på mobil
Styling: White bg, gray borders, blue accent for active state
Størrelse: ~80 linjer
```

### #20 `components/admin/PostEditor.tsx` — Markdown Post Editor
```
Formål: Hovedkomponenten til at skrive/redigere blog posts
"use client" (heavy interaktivitet)
Props:
  - mode: 'create' | 'edit'
  - initialData?: PostWithCategoryAndTags (for edit mode)
  - categories: Category[]
  - tags: Tag[]
  - onSave: (data: CreatePostInput | UpdatePostInput) => Promise<void>
Indhold:
  - Titel input (auto-genererer slug)
  - Slug input (editable, med validering)
  - Kategori dropdown
  - Tags multi-select (chips med X for remove)
  - Excerpt textarea
  - Cover image uploader
  - Split-pane markdown editor:
    - Venstre: Textarea med toolbar (B, I, H1-H3, Link, Image, Code, Quote, List)
    - Højre: Live preview via MarkdownRenderer
  - Collapsible SEO section (meta_title, meta_description)
  - Action buttons: "Gem som kladde", "Publicér" (eller "Opdatér")
State management: Local state for all fields, debounced preview
Dependencies: MarkdownRenderer, ImageUploader
Størrelse: ~250 linjer
```

### #21 `components/admin/ImageUploader.tsx` — Billede Upload
```
Formål: Upload billeder til Supabase Storage
"use client"
Props:
  - onUpload: (url: string) => void
  - currentImage?: string (for edit mode)
  - variant?: 'cover' | 'inline' (styling forskel)
Indhold:
  - Drop zone (drag-and-drop)
  - File picker button
  - Upload progress bar
  - Preview af uploadet billede
  - "Fjern billede" knap
  - Fejlhåndtering (størrelse, type)
API call: POST /api/cms/upload med FormData
Størrelse: ~100 linjer
```

---

## BLOG COMPONENTS

### #22 `components/blog/PostCard.tsx` — Blog Post Card
```
Formål: Card komponent til blog post listings
Props:
  - post: PostWithCategory
  - variant?: 'default' | 'compact' | 'featured'
Indhold:
  - Cover image (next/image, fallback gradient)
  - Kategori badge (CategoryBadge component)
  - Titel (h3, link)
  - Excerpt (truncated)
  - Meta: dato + læsetid
Styling: Dark theme (bg-zinc-900, border-zinc-800, hover effects)
Størrelse: ~50 linjer
```

### #23 `components/blog/CategoryBadge.tsx` — Kategori Pill/Badge
```
Formål: Lille pill/badge der viser kategori navn
Props:
  - category: Category
  - size?: 'sm' | 'md'
  - linked?: boolean (default true)
Indhold: Link pill med kategori navn
Styling: bg-yellow-400/10 text-yellow-400 border border-yellow-400/20
Størrelse: ~20 linjer
```

### #24 `components/blog/MarkdownRenderer.tsx` — Markdown til React
```
Formål: Renderer markdown content som React components
Props:
  - content: string (markdown)
  - className?: string
Dependencies: react-markdown, remark-gfm, rehype-slug, rehype-autolink-headings
Custom components mapping:
  - h1-h6: Styled headings med id's (for TOC)
  - p: text-zinc-300 leading-relaxed
  - a: text-yellow-400 hover:underline (external links → target="_blank")
  - img: next/image wrapper med responsive sizing
  - code/pre: Styled code blocks (bg-zinc-900, monospace)
  - blockquote: Left border yellow-400, bg-zinc-900/50
  - ul/ol: Styled lists med proper spacing
  - table: Styled table med borders og striping
Størrelse: ~80 linjer
```

### #25 `components/blog/TableOfContents.tsx` — Indholdsfortegnelse
```
Formål: Auto-genereret indholdsfortegnelse fra markdown headings
"use client" (scroll spy, smooth scroll)
Props:
  - items: TOCItem[]
Indhold:
  - Collapsible "Indholdsfortegnelse" header
  - Nested list af headings (h2 = top level, h3 = indented)
  - Click → smooth scroll til heading
  - Active heading highlighting (scroll spy)
Styling: bg-zinc-900 border border-zinc-800, sticky positioning
Størrelse: ~60 linjer
```

### #26 `components/blog/ShareButtons.tsx` — Social Deling
```
Formål: Del artikel på sociale medier
"use client" (clipboard API)
Props:
  - url: string
  - title: string
Indhold:
  - LinkedIn share button
  - Twitter/X share button
  - Facebook share button
  - "Kopiér link" button med clipboard feedback
Styling: Inline flex med icon buttons
Størrelse: ~40 linjer
```

### #27 `components/blog/ViewCounter.tsx` — View Tæller
```
Formål: Registrer sidevisning og vis view count
"use client" (useEffect for API call)
Props:
  - slug: string
  - initialViews: number
Indhold:
  - useEffect → POST /api/blog/views
  - Viser "X visninger" tekst
  - Skjuler tallet hvis views = 0
Størrelse: ~30 linjer
```

### #28 `components/blog/BlogSearch.tsx` — Søgefunktion
```
Formål: Live søgning i blog posts
"use client" (input state, debounce, Supabase query)
Props:
  - variant?: 'inline' | 'page' (inline = søgefelt i hub, page = fuld søgeside)
Indhold:
  - Søge input med ikon
  - Debounced search (300ms)
  - Resultater som PostCard liste
  - "Ingen resultater" besked
  - Loading spinner
Query: Supabase ilike på title, excerpt, content
Størrelse: ~70 linjer
```

---

## BLOG PAGES

### #29 `app/(main)/blog/page.tsx` — Blog Hub
```
Formål: Hovedside for bloggen
Server Component
Data fetching:
  - getCategories() → kategorier med post_count
  - getPublishedPosts(6) → seneste 6 posts
  - getMostReadPosts(6) → top 6 mest læste
Indhold:
  - Hero sektion (titel, undertitel, søgefelt)
  - Kategorier grid (CategoryBadge + post count)
  - "Seneste indlæg" grid (PostCard × 6)
  - "Mest læste" grid (PostCard × 6)
SEO:
  - metadata: title, description, canonical, openGraph
  - Schema: CollectionPage + Blog + BreadcrumbList
  - Tilføjes til sitemap med priority 0.9
Størrelse: ~120 linjer
```

### #30 `app/(main)/blog/[slug]/page.tsx` — Enkelt Blog Post
```
Formål: Individuel blog post side
Server Component (med client component wrappers)
Dynamic: generateMetadata(params) for SEO
Data fetching: getPostBySlug(slug) + getRelatedPosts()
Indhold:
  - Breadcrumbs (Forside > Blog > Kategori > Titel)
  - Cover image (full width)
  - CategoryBadge
  - Titel (h1)
  - Meta: Forfatter, dato, læsetid, ViewCounter
  - TableOfContents (collapsible)
  - MarkdownRenderer (indhold)
  - Tags pills
  - ShareButtons
  - Relaterede indlæg (PostCard × 3)
SEO:
  - generateMetadata: title, description (fra excerpt/meta_description)
  - Article schema med author, publisher, datePublished, dateModified
  - BreadcrumbList schema
  - OpenGraph type: "article"
  - Dynamisk tilføjet til sitemap
generateStaticParams: getAllPostSlugs() for static generation
Not found: notFound() hvis post ikke eksisterer eller er draft
Størrelse: ~150 linjer
```

### #31 `app/(main)/blog/kategori/[slug]/page.tsx` — Kategori Side
```
Formål: Viser alle posts i en specifik kategori
Server Component
Dynamic: generateMetadata(params)
Data fetching: getCategoryBySlug() + getPostsByCategory()
Indhold:
  - Breadcrumbs (Forside > Blog > Kategori navn)
  - Kategori header (navn + beskrivelse)
  - PostCard grid med alle posts i kategorien
  - "Ingen indlæg i denne kategori" fallback
SEO: CollectionPage schema + BreadcrumbList
Størrelse: ~80 linjer
```

### #32 `app/(main)/blog/tags/[slug]/page.tsx` — Tag Side
```
Formål: Viser alle posts med specifikt tag
Server Component
Dynamic: generateMetadata(params)
Data fetching: getTagBySlug() + getPostsByTag()
Indhold: Lignende som kategori side
SEO: CollectionPage schema + BreadcrumbList
Størrelse: ~70 linjer
```

### #33 `app/(main)/blog/soeg/page.tsx` — Søgeside
```
Formål: Fuld søgeside for blog
Indhold:
  - BlogSearch component (variant="page")
  - Stor søgefelt centreret
  - Resultater under søgefeltet
Metadata: { robots: { index: false, follow: true } } (noindex)
Størrelse: ~30 linjer
```

### #34 `app/(main)/blog/feed.xml/route.ts` — RSS Feed
```
Formål: RSS/Atom feed for blog abonnenter
Route Handler (GET)
Data fetching: getPublishedPosts(20)
Response: application/xml med Cache-Control: 3600
Indhold: Standard RSS 2.0 XML med Atom namespace
Størrelse: ~50 linjer
```

---

## BLOG ERROR/LOADING/NOT-FOUND FILER

> **VIGTIGT**: Disse filer eksisterer IKKE i den nuværende kodebase. Bloggen er det første sted de bruges.

### #35 `app/(main)/blog/not-found.tsx` — Blog 404 Side
```
Formål: Vises når en blog route ikke matcher nogen post/kategori
Indhold:
  - "Indlæg ikke fundet" overskrift
  - Kort besked: "Det indlæg du leder efter findes ikke eller er blevet fjernet."
  - Link tilbage til /blog
  - Matcher dark theme (bg-black, text-white)
Styling: Centreret content, max-w-2xl, yellow-400 accent på link
Størrelse: ~25 linjer
```

### #36 `app/(main)/blog/[slug]/not-found.tsx` — Post-specifik 404
```
Formål: Vises når getPostBySlug returnerer null (notFound() kaldt)
Indhold: Lignende som #35 men med "Denne artikel findes ikke" besked
Størrelse: ~25 linjer
```

### #37 `app/(main)/blog/loading.tsx` — Blog Loading Skeleton
```
Formål: Vises mens blog hub data loader (Suspense boundary)
Indhold:
  - Skeleton placeholders for PostCard grid (pulserende grå bokse)
  - Skeleton for kategori badges
  - Matcher dark theme
  - Bruger Tailwind animate-pulse utility
"use client": NEJ (kan være server component)
Størrelse: ~40 linjer
```

### #38 `app/(main)/blog/error.tsx` — Blog Error Boundary
```
Formål: Fanger runtime fejl i blog routes
"use client" (PÅKRÆVET for error.tsx i Next.js)
Props: { error: Error; reset: () => void }
Indhold:
  - "Noget gik galt" overskrift
  - Fejlbesked (i development mode)
  - "Prøv igen" knap (kalder reset())
  - Link til /blog
Styling: Dark theme, red accent for fejl
Størrelse: ~30 linjer
```

---

## ÆNDREDE EKSISTERENDE FILER

### #Æ1 `app/layout.tsx` — Refaktoreret Root Layout
```
Ændring: Fjern Navbar + Footer → flyt til (main)/layout.tsx
Beholdt: <html>, <body>, fonts, globals.css import
VIGTIGT: Alle eksisterende sider SKAL stadig virke identisk
```

### #Æ2 `app/(main)/layout.tsx` — NY Main Layout
```
NY FIL (men med indhold fra gamle app/layout.tsx)
Indhold: Navbar + {children} + Footer
```

### #Æ3 `components/Navbar.tsx` — Tilføj Blog link
```
Ændring: Tilføj { name: "Blog", href: "/blog" } til navLinks
Placering: Efter "Om Mig" (index 3), før Kontakt-knap
```

### #Æ4 `app/sitemap.ts` — Gør asynkron + blog URLs
```
Ændring: export default function → export default async function
Tilføj: /blog/, /blog/[slug]/, /blog/kategori/[slug]/ entries
Dependency: lib/supabase/server for Supabase query
```

### #Æ5 `app/robots.ts` — Tilføj /cms/ til disallow
```
Ændring: Tilføj '/cms/' til disallow array
```

### #Æ6 `lib/schema/builders.ts` — Nye schema builders
```
Tilføj: buildArticleSchema(), buildBlogCollectionSchema()
VIGTIGT: Eksisterende funktioner UÆNDREDE
```

### #Æ7 `lib/schema/constants.ts` — Nye SCHEMA_IDS
```
Tilføj: blogPage: `${SITE_URL}/blog/#page`
VIGTIGT: Eksisterende IDs UÆNDREDE
```

### #Æ8 `lib/schema/index.ts` — Re-export nye builders
```
Tilføj: export buildArticleSchema, buildBlogCollectionSchema
VIGTIGT: Eksisterende exports UÆNDREDE
```

### #Æ9 `next.config.ts` — Supabase image domain
```
Tilføj: images.remotePatterns for *.supabase.co
```
