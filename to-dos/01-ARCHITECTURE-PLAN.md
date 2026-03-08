# 01 - ARKITEKTUR PLAN

> **Formål**: Komplet teknisk arkitektur for Blog + CMS systemet, med alle beslutninger begrundet.

---

## 1. SYSTEM OVERBLIK

```
┌─────────────────────────────────────────────────────────────┐
│                     BRUGERENS BROWSER                        │
├──────────────────────────┬──────────────────────────────────┤
│    PUBLIC BLOG            │         CMS ADMIN (/cms)        │
│    /blog                  │    (Password-beskyttet)         │
│    /blog/[slug]           │    /cms/login                   │
│    /blog/kategori/[slug]  │    /cms (dashboard)             │
│    /blog/tags/[slug]      │    /cms/indlaeg/ny              │
│    /blog/feed.xml         │    /cms/indlaeg/[id]            │
│    /blog/soeg             │    /cms/kategorier              │
│                           │    /cms/tags                    │
├───────────────────────────┴─────────────────────────────────┤
│                     NEXT.JS 16 APP ROUTER                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Server       │  │ API Routes   │  │ Middleware        │   │
│  │ Components   │  │ /api/cms/*   │  │ (auth check)      │   │
│  │ (data fetch) │  │ /api/blog/*  │  │                   │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────┘   │
│         │                  │                                  │
│  ┌──────┴──────────────────┴───────────────────────────┐     │
│  │              SUPABASE CLIENT (lib/supabase/)         │     │
│  │  ┌─────────────────┐    ┌────────────────────────┐  │     │
│  │  │ Browser Client   │    │ Server Client           │  │     │
│  │  │ (anon key)       │    │ (service role key)      │  │     │
│  │  │ Public reads     │    │ Admin writes + reads    │  │     │
│  │  └─────────────────┘    └────────────────────────┘  │     │
│  └─────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                     SUPABASE (Cloud)                          │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────────────────┐   │
│  │ PostgreSQL DB     │    │ Storage                       │   │
│  │                   │    │                               │   │
│  │ ┌──────────────┐ │    │ Bucket: blog-images (public)  │   │
│  │ │ categories   │ │    │ - cover images                │   │
│  │ │ posts        │ │    │ - inline content images       │   │
│  │ │ tags         │ │    │                               │   │
│  │ │ post_tags    │ │    │                               │   │
│  │ └──────────────┘ │    └──────────────────────────────┘   │
│  │                   │                                       │
│  │ RLS Policies:     │                                       │
│  │ - Public: SELECT  │                                       │
│  │   WHERE published │                                       │
│  │ - Service role:   │                                       │
│  │   Full CRUD       │                                       │
│  └──────────────────┘                                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. ROUTE STRUKTUR

### 2.1 Public Blog Routes

| Route | Formål | Data Source | SEO |
|-------|--------|-------------|-----|
| `/blog` | Hub side med kategorier, seneste, mest læste | Supabase (server) | CollectionPage + Blog schema |
| `/blog/[slug]` | Enkelt blog post | Supabase (server) + view increment (client) | Article schema |
| `/blog/kategori/[slug]` | Posts i kategori | Supabase (server) | CollectionPage schema |
| `/blog/tags/[slug]` | Posts med specifikt tag | Supabase (server) | CollectionPage schema |
| `/blog/soeg` | Søg i blog posts | Supabase (client, live search) | noindex (søgeside) |
| `/blog/feed.xml` | RSS feed | Supabase (server) | N/A |

### 2.2 CMS Admin Routes

| Route | Formål | Auth | Layout |
|-------|--------|------|--------|
| `/cms/login` | Login formular | Ingen (public) | Minimal (centreret form) |
| `/cms` | Dashboard (post oversigt) | Required | Admin (sidebar + content) |
| `/cms/indlaeg/ny` | Opret nyt blog post | Required | Admin |
| `/cms/indlaeg/[id]` | Redigér eksisterende post | Required | Admin |
| `/cms/indlaeg/[id]/preview` | Preview draft post | Required | Blog layout (dark theme) |
| `/cms/kategorier` | Administrér kategorier | Required | Admin |
| `/cms/tags` | Administrér tags | Required | Admin |

### 2.3 API Routes

| Route | Method | Formål | Auth |
|-------|--------|--------|------|
| `POST /api/cms/auth` | POST | Login (sæt cookie) | Public (validerer password) |
| `DELETE /api/cms/auth` | DELETE | Logout (slet cookie) | Required |
| `POST /api/cms/upload` | POST | Upload billede til Supabase Storage | Required |
| `POST /api/blog/views` | POST | Inkrementer view count | Public (rate-limited) |

---

## 3. APP ROUTER REFAKTORERING (ROUTE GROUPS)

### Nuværende Struktur
```
app/
  layout.tsx          ← Indeholder Navbar + Footer
  page.tsx
  kontakt/page.tsx
  ...
```

### NY Struktur med Route Groups
```
app/
  layout.tsx              ← ROOT: <html>, <body>, fonts KUN
  (main)/                 ← Route group for public site
    layout.tsx            ← Navbar + children + Footer
    page.tsx              ← Forside
    kontakt/page.tsx
    om/page.tsx
    referencer/page.tsx
    ai-ydelser/
      page.tsx
      ai-konsulent/page.tsx
      foredrag/page.tsx
      fysisk-ai-workshop/
        layout.tsx        ← ⚠️ Eksisterende metadata layout
        page.tsx
      fysiske-ai-kurser/
        layout.tsx        ← ⚠️ Eksisterende metadata layout
        page.tsx
      ...
    invester/...
    blog/                 ← NYT: Blog frontend
      page.tsx
      loading.tsx         ← NYT: Loading skeleton
      error.tsx           ← NYT: Error boundary
      not-found.tsx       ← NYT: 404 side
      [slug]/
        page.tsx
        not-found.tsx     ← NYT: Post-specifik 404
      kategori/[slug]/page.tsx
      tags/[slug]/page.tsx
      soeg/page.tsx
      feed.xml/route.ts
  (cms)/                  ← Route group for admin
    cms/
      layout.tsx          ← Admin layout (light theme, sidebar)
      login/page.tsx
      page.tsx             ← Dashboard
      indlaeg/
        ny/page.tsx
        [id]/page.tsx
        [id]/preview/page.tsx
      kategorier/page.tsx
      tags/page.tsx
  api/                    ← API routes (udenfor route groups)
    cms/
      auth/route.ts
      upload/route.ts
    blog/
      views/route.ts
```

### VIGTIGT: Hvad route groups gør
- `(main)` og `(cms)` er INVISIBLE i URL'en - de eksisterer kun som organisering
- `/blog` → `app/(main)/blog/page.tsx`
- `/cms` → `app/(cms)/cms/page.tsx`
- Hvert route group kan have sin EGEN `layout.tsx`
- **Pathnames ændres IKKE**: `usePathname()` returnerer stadig `/om` (ikke `/(main)/om`)
- **Eksisterende sub-layouts flyttes med**: `fysisk-ai-workshop/layout.tsx` og `fysiske-ai-kurser/layout.tsx`

### VIGTIGT: "use client" + Metadata Pattern
Nogle sider bruger `"use client"` i `page.tsx` (Framer Motion). Da client components IKKE kan eksportere `metadata`, bruger disse sider `layout.tsx` til metadata. Blog pages med `generateMetadata` SKAL være Server Components — brug client component wrappers for interaktive dele.

---

## 4. AUTHENTICATION SYSTEM

### 4.1 Flows

```
LOGIN FLOW:
┌──────────┐    ┌────────────────┐    ┌──────────────────┐
│ /cms/login│───▶│ POST /api/     │───▶│ Validér password │
│ (form)    │    │ cms/auth       │    │ mod env var      │
└──────────┘    └───────┬────────┘    └────────┬─────────┘
                        │                       │
                        │  ✓ Match              │ ✗ Fejl
                        ▼                       ▼
              ┌──────────────────┐    ┌──────────────────┐
              │ Sæt httpOnly     │    │ Return 401       │
              │ cookie med HMAC  │    │ "Forkert kode"   │
              │ signeret token   │    └──────────────────┘
              │ Redirect /cms    │
              └──────────────────┘

MIDDLEWARE FLOW (alle /cms/* undtagen /cms/login):
┌──────────┐    ┌────────────────┐    ┌──────────────────┐
│ Request   │───▶│ middleware.ts   │───▶│ Tjek cookie      │
│ /cms/*    │    │                │    │ Validér HMAC     │
└──────────┘    └───────┬────────┘    └────────┬─────────┘
                        │                       │
                        │  ✓ Valid              │ ✗ Invalid/Missing
                        ▼                       ▼
              ┌──────────────────┐    ┌──────────────────┐
              │ NextResponse     │    │ Redirect til     │
              │ .next()          │    │ /cms/login        │
              └──────────────────┘    └──────────────────┘
```

### 4.2 Token Signering (HMAC-SHA256)
```typescript
// Ingen JWT library nødvendig - vi bruger Node.js crypto

import { createHmac } from 'crypto';

const SECRET = process.env.BLOG_ADMIN_PASSWORD + '_blog_cms_secret';

function createToken(): string {
  const payload = {
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 timer
  };
  const data = JSON.stringify(payload);
  const signature = createHmac('sha256', SECRET)
    .update(data)
    .digest('hex');
  // Base64 encode payload + signature
  return Buffer.from(`${data}.${signature}`).toString('base64');
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [data, signature] = decoded.split(/\.(?=[^.]*$)/); // Split on last dot
    const expectedSig = createHmac('sha256', SECRET)
      .update(data)
      .digest('hex');
    if (signature !== expectedSig) return false;
    const payload = JSON.parse(data);
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}
```

### 4.3 Cookie Indstillinger
```typescript
cookies().set('cms_session', token, {
  httpOnly: true,      // JavaScript kan IKKE læse den
  secure: process.env.NODE_ENV === 'production',  // Kun HTTPS i prod
  sameSite: 'lax',     // Beskytter mod CSRF
  maxAge: 86400,       // 24 timer
  path: '/',           // Tilgængelig på alle stier
});
```

### 4.4 Miljøvariabler
```env
BLOG_ADMIN_PASSWORD=dit-sikre-password-her
```

---

## 5. DATA MODEL

### 5.1 Database Schema

```sql
-- Kategorier
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,           -- Markdown content
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  cover_image TEXT,                -- URL til Supabase Storage
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,                 -- SEO override (optional)
  meta_description TEXT,           -- SEO override (optional)
  published_at TIMESTAMPTZ,        -- Sættes når status → published
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Many-to-many: Posts ↔ Tags
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Indexes for performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_views ON posts(views DESC);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### 5.2 TypeScript Types

```typescript
// lib/blog/types.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string | null;
  cover_image: string | null;
  status: 'draft' | 'published';
  views: number;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithCategory extends Post {
  category: Category | null;
}

export interface PostWithCategoryAndTags extends PostWithCategory {
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}

// For creating/updating
export interface CreatePostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string | null;
  cover_image: string | null;
  status: 'draft' | 'published';
  meta_title: string | null;
  meta_description: string | null;
  tag_ids: string[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description: string | null;
}

export interface CreateTagInput {
  name: string;
  slug: string;
}
```

### 5.3 Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Public read policies (anon key)
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public can read tags"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Public can read post_tags"
  ON post_tags FOR SELECT
  USING (true);

-- Service role bypasses RLS automatically
-- All CMS writes use the service role key
```

---

## 6. SUPABASE CLIENT ARKITEKTUR

### 6.1 Browser Client (Public reads)
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 6.2 Server Client (Admin operations)
```typescript
// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

### 6.3 Vigtige Bemærkninger
- **Browser client** (anon key): Kun til public reads + view increment
- **Server client** (service role): Til ALT i CMS (bypasser RLS)
- **ALDRIG** eksponér service role key til client-side kode
- Vi bruger `@supabase/supabase-js` direkte, IKKE `@supabase/ssr` auth helpers (vi håndterer auth selv med simpel password)

---

## 7. CMS EDITOR DESIGN

### 7.1 Post Editor Layout
```
┌──────────────────────────────────────────────────────────────┐
│  ← Tilbage til oversigt          [Gem kladde] [Publicér]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Titel: [_____________________________________________]      │
│  Slug:  [_____________________________________________] 🔗   │
│                                                              │
│  Kategori: [Dropdown ▾]     Tags: [Multi-select chips]       │
│                                                              │
│  Uddrag (excerpt):                                           │
│  [___________________________________________________]       │
│  [___________________________________________________]       │
│                                                              │
│  ┌─── Coverbillede ──────────────────────────────────────┐   │
│  │  [Upload billede]  eller  [Indsæt URL]                │   │
│  │  [Forhåndsvisning af billede]                         │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─── Indhold (Markdown) ────┬─── Forhåndsvisning ──────┐   │
│  │                           │                           │   │
│  │  # Overskrift             │  Overskrift               │   │
│  │                           │  ─────────                │   │
│  │  Noget tekst med          │  Noget tekst med          │   │
│  │  **fed skrift**           │  **fed skrift**           │   │
│  │                           │                           │   │
│  │  - Punkt 1                │  • Punkt 1                │   │
│  │  - Punkt 2                │  • Punkt 2                │   │
│  │                           │                           │   │
│  │  ![alt](url)              │  [billede]                │   │
│  │                           │                           │   │
│  └───────────────────────────┴───────────────────────────┘   │
│                                                              │
│  ┌─── SEO (Klik for at udvide) ▼ ────────────────────────┐   │
│  │  Meta titel:     [____________________________]        │   │
│  │  Meta beskrivelse: [____________________________]      │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Toolbar Knapper (over markdown textarea)
```
[B] [I] [H1] [H2] [H3] [Link] [Billede] [Kode] [Citat] [Liste] [Upload 📷]
```
Disse indsætter markdown syntax ved cursor position.

### 7.3 Image Upload Flow
```
1. Bruger klikker [Upload 📷]
2. File picker åbner
3. Billede uploades til POST /api/cms/upload
4. API route gemmer til Supabase Storage bucket "blog-images"
5. Public URL returneres
6. Markdown ![](url) indsættes ved cursor position
```

---

## 8. BLOG FRONTEND DESIGN

### 8.1 Hub Side (`/blog`)

```
┌──────────────────────────────────────────────────────────────┐
│                        NAVBAR                                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│          Blog                                                │
│          Artikler om AI, teknologi og forretning             │
│                                                              │
│  [🔍 Søg i artikler...]                                      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  KATEGORIER                                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
│  │ AI     │ │ Tech   │ │ Forret.│ │ ...    │               │
│  │ 12 art.│ │ 8 art. │ │ 5 art. │ │        │               │
│  └────────┘ └────────┘ └────────┘ └────────┘               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  SENESTE INDLÆG                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ [Cover]  │ │ [Cover]  │ │ [Cover]  │                    │
│  │ Titel    │ │ Titel    │ │ Titel    │                    │
│  │ Excerpt  │ │ Excerpt  │ │ Excerpt  │                    │
│  │ 5 min ·  │ │ 3 min ·  │ │ 8 min ·  │                    │
│  │ Kat · Dato│ │ Kat · Dato│ │ Kat · Dato│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ ...      │ │ ...      │ │ ...      │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  MEST LÆSTE                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ ...      │ │ ...      │ │ ...      │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                        FOOTER                                 │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 Post Side (`/blog/[slug]`)

```
┌──────────────────────────────────────────────────────────────┐
│                        NAVBAR                                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Blog > Kategori > Titel                (breadcrumbs)        │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │                   COVER IMAGE                         │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  [Kategori Badge]                                            │
│  # Artiklens Titel                                           │
│  Julian Bent Singh · 15. marts 2026 · 5 min læsetid          │
│                                                              │
│  ┌─── Indholdsfortegnelse ──┐                                │
│  │ 1. Første overskrift     │                                │
│  │ 2. Anden overskrift      │                                │
│  │ 3. Tredje overskrift     │                                │
│  └──────────────────────────┘                                │
│                                                              │
│  [Rendered Markdown Content]                                 │
│  ...                                                         │
│  ...                                                         │
│                                                              │
│  Tags: [AI] [Strategi] [Implementering]                      │
│                                                              │
│  Del denne artikel:                                          │
│  [LinkedIn] [Twitter/X] [Facebook] [Kopiér link]             │
│                                                              │
│  ┌─── Relaterede Indlæg ────────────────────────────────┐   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐             │   │
│  │  │ Post 1   │ │ Post 2   │ │ Post 3   │             │   │
│  │  └──────────┘ └──────────┘ └──────────┘             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                        FOOTER                                 │
└──────────────────────────────────────────────────────────────┘
```

### 8.3 Kategori Side (`/blog/kategori/[slug]`)
- Header med kategori navn + beskrivelse
- Grid af posts i den kategori
- Pagination (12 per side)

### 8.4 Søgeside (`/blog/soeg`)
- Søgefelt med live results (debounced)
- Resultater som PostCard liste
- `noindex` meta tag (søgesider skal ikke indekseres)

---

## 9. NYE DEPENDENCIES

| Package | Version | Formål | Størrelse |
|---------|---------|--------|-----------|
| `@supabase/supabase-js` | ^2 | Supabase client | ~50KB |
| `@supabase/ssr` | ^0.5 | SSR-kompatibel client | ~10KB |
| `react-markdown` | ^9 | Markdown → React components | ~30KB |
| `remark-gfm` | ^4 | GitHub Flavored Markdown support | ~15KB |
| `rehype-slug` | ^6 | Tilføj id's til headings (TOC) | ~5KB |
| `rehype-autolink-headings` | ^7 | Autolink headings | ~5KB |

**Total ekstra bundle**: ~115KB (gzipped ~35KB)

### Ingen nye dev dependencies nødvendige.

---

## 10. MIDDLEWARE

### Fil: `middleware.ts` (project root)

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kun beskyt /cms routes (undtagen /cms/login)
  if (pathname.startsWith('/cms') && !pathname.startsWith('/cms/login')) {
    const token = request.cookies.get('cms_session')?.value;

    if (!token || !verifyToken(token)) {
      const loginUrl = new URL('/cms/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*'],
};
```

**VIGTIGT**: Middleware kører i Edge Runtime. `crypto` modulet er tilgængeligt via Web Crypto API, men vi skal bruge `subtle.importKey` + `subtle.sign` i stedet for Node.js `createHmac`. Alternativt kan vi bruge en simpel string comparison med en hashed token.

---

## 11. IMAGE HANDLING

### Next.js Image Optimization
```typescript
// next.config.ts - TILFØJ:
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

### Supabase Storage Upload
```typescript
// API Route: /api/cms/upload
// 1. Modtag fil via FormData
// 2. Validér filtype (jpg, png, webp, gif) og størrelse (max 5MB)
// 3. Generér unikt filnavn: `${Date.now()}-${sanitizedFilename}`
// 4. Upload til Supabase Storage bucket "blog-images"
// 5. Returnér public URL
```

---

## 12. VIEW COUNTING

### Strategi
- Client component wrapper på blog post side
- Sender POST til `/api/blog/views` med post slug
- Server-side: Increment `views` kolonne via Supabase
- Rate limiting via cookie: Maks 1 view per post per session (24 timer)

```typescript
// API Route: /api/blog/views
export async function POST(request: NextRequest) {
  const { slug } = await request.json();

  // Tjek cookie for at undgå double counting
  const viewedPosts = request.cookies.get('viewed_posts')?.value;
  const viewed = viewedPosts ? JSON.parse(viewedPosts) : [];

  if (viewed.includes(slug)) {
    return NextResponse.json({ ok: true, counted: false });
  }

  // Increment view count
  await supabase.rpc('increment_views', { post_slug: slug });

  // Sæt cookie
  viewed.push(slug);
  const response = NextResponse.json({ ok: true, counted: true });
  response.cookies.set('viewed_posts', JSON.stringify(viewed), {
    maxAge: 86400, // 24 timer
    path: '/',
  });

  return response;
}
```

### Supabase RPC Function (for atomic increment)
```sql
CREATE OR REPLACE FUNCTION increment_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE slug = post_slug AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 13. READING TIME CALCULATION

```typescript
// lib/blog/utils.ts
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Danish reading speed
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
```

---

## 14. TABLE OF CONTENTS GENERATION

```typescript
// lib/blog/utils.ts
export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function generateTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\sæøå-]/g, '')
      .replace(/\s+/g, '-');
    toc.push({ id, text, level });
  }

  return toc;
}
```

---

## 15. RSS FEED

```typescript
// app/(main)/blog/feed.xml/route.ts
import { createServerClient } from '@/lib/supabase/server';
import { SITE_URL } from '@/lib/schema';

export async function GET() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20);

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Julian Bent Singh Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Artikler om AI, teknologi og forretning</description>
    <language>da</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${(posts || []).map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid>${SITE_URL}/blog/${post.slug}/</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.published_at!).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

---

## 16. SOCIAL SHARING

### Share URLs (ingen external dependencies nødvendige)
```typescript
const shareUrls = {
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};
```

### Kopiér Link
```typescript
navigator.clipboard.writeText(url);
// Vis "Kopieret!" toast
```

---

## 17. CACHING & REVALIDATION STRATEGI

| Data | Cache Strategi | Revalidering |
|------|----------------|--------------|
| Blog hub side | ISR (revalidate: 60) | `revalidatePath('/blog')` efter CMS ændring |
| Enkelt post | ISR (revalidate: 300) | `revalidatePath('/blog/[slug]')` efter edit |
| Kategori side | ISR (revalidate: 60) | `revalidatePath('/blog/kategori/[slug]')` |
| Sitemap | ISR (revalidate: 3600) | Automatisk ved næste request |
| RSS feed | Cache-Control: 3600 | Automatisk |
| CMS sider | no-store | Altid frisk data |
| View count | Ingen cache | Real-time |

### revalidatePath Implementation
```typescript
// Efter CMS operationer (create, update, delete post):
import { revalidatePath } from 'next/cache';

revalidatePath('/blog');                    // Hub side
revalidatePath(`/blog/${post.slug}`);       // Specifik post
revalidatePath(`/blog/kategori/${categorySlug}`); // Kategori
revalidatePath('/sitemap.xml');             // Sitemap
```
