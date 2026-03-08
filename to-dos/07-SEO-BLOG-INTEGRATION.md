# 07 - SEO & BLOG INTEGRATION

> **Formål**: Detaljeret plan for SEO-integration af bloggen i den eksisterende SEO-infrastruktur, i overensstemmelse med den sammenfattede SEO-strategi i `prd/seo-strategi/sammenfattet-seo-strategi.md`.

---

## 1. SEO-STRATEGISK KONTEKST

### Eksisterende SEO-Strategi (fra `prd/seo-strategi/`)
Sitet bruger en **Entity-baseret SEO-strategi** med:
- Stabile `@id` identifiers på tværs af alle schema markup
- Adskillelse mellem **Person** (Julian) og **Organization** entity
- **Topical Authority** via pillar + cluster model
- **E-E-A-T** proof layer (Experience, Expertise, Authoritativeness, Trustworthiness)
- AI Overviews optimering via Speakable specification

### Bloggens Rolle i SEO-Strategien
Bloggen understøtter SEO-strategien ved at:
1. **Topical Authority**: Blog posts som cluster-indhold til pillar pages
2. **E-E-A-T**: Demonstrerer ekspertise via dybdegående artikler
3. **Fresh Content**: Regelmæssigt nyt indhold signalerer aktiv tilstedeværelse
4. **Internal Linking**: Blog posts linker til service-sider (pillar pages)
5. **Long-tail Keywords**: Blog posts targeterer specifikke søgeforespørgsler
6. **AI Overviews**: Velstruktureret indhold med Speakable specs

---

## 2. SCHEMA.ORG MARKUP FOR BLOG

### 2.1 Blog Hub Side (`/blog`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://julianbentsingh.dk/blog/#page",
      "name": "Blog – Julian Bent Singh",
      "description": "Artikler om AI, teknologi og forretning af Julian Bent Singh.",
      "url": "https://julianbentsingh.dk/blog/",
      "about": { "@id": "https://julianbentsingh.dk/#julian" },
      "isPartOf": { "@id": "https://julianbentsingh.dk/#website" },
      "inLanguage": "da-DK"
    },
    {
      "@type": "Blog",
      "@id": "https://julianbentsingh.dk/blog/#blog",
      "name": "Julian Bent Singh Blog",
      "description": "Artikler om AI, teknologi og forretning",
      "url": "https://julianbentsingh.dk/blog/",
      "author": { "@id": "https://julianbentsingh.dk/#julian" },
      "publisher": { "@id": "https://julianbentsingh.dk/#org" },
      "inLanguage": "da-DK"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://julianbentsingh.dk/blog/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Forside",
          "item": "https://julianbentsingh.dk/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://julianbentsingh.dk/blog/"
        }
      ]
    }
  ]
}
```

### 2.2 Individuel Blog Post (`/blog/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://julianbentsingh.dk/blog/POST-SLUG/#article",
      "headline": "Post Titel Her",
      "description": "Post excerpt eller meta description",
      "author": { "@id": "https://julianbentsingh.dk/#julian" },
      "publisher": { "@id": "https://julianbentsingh.dk/#org" },
      "datePublished": "2026-03-08T10:00:00+01:00",
      "dateModified": "2026-03-08T10:00:00+01:00",
      "image": "https://xxx.supabase.co/storage/.../cover.jpg",
      "url": "https://julianbentsingh.dk/blog/POST-SLUG/",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://julianbentsingh.dk/blog/POST-SLUG/#webpage"
      },
      "articleSection": "Kategori Navn",
      "keywords": ["tag1", "tag2", "tag3"],
      "wordCount": 1500,
      "inLanguage": "da-DK",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".article-intro", ".article-content h2"]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://julianbentsingh.dk/blog/POST-SLUG/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Forside",
          "item": "https://julianbentsingh.dk/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://julianbentsingh.dk/blog/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Kategori Navn",
          "item": "https://julianbentsingh.dk/blog/kategori/KATEGORI-SLUG/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Post Titel",
          "item": "https://julianbentsingh.dk/blog/POST-SLUG/"
        }
      ]
    }
  ]
}
```

### 2.3 Kategori Side (`/blog/kategori/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://julianbentsingh.dk/blog/kategori/SLUG/#page",
      "name": "Kategori Navn – Blog | Julian Bent Singh",
      "description": "Artikler om Kategori Navn",
      "url": "https://julianbentsingh.dk/blog/kategori/SLUG/",
      "about": { "@id": "https://julianbentsingh.dk/#julian" },
      "isPartOf": { "@id": "https://julianbentsingh.dk/blog/#page" },
      "inLanguage": "da-DK"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://julianbentsingh.dk/blog/kategori/SLUG/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Forside", "item": "https://julianbentsingh.dk/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://julianbentsingh.dk/blog/" },
        { "@type": "ListItem", "position": 3, "name": "Kategori Navn", "item": "https://julianbentsingh.dk/blog/kategori/SLUG/" }
      ]
    }
  ]
}
```

---

## 3. METADATA PATTERNS

### 3.1 Blog Hub Metadata
```typescript
export const metadata: Metadata = {
  title: "Blog | Julian Bent Singh",
  description: "Artikler og indsigter om kunstig intelligens, AI-strategi og teknologi af Julian Bent Singh. Læs de seneste nyheder og guides.",
  keywords: [
    "AI Blog",
    "AI Artikler",
    "AI Indsigter",
    "Julian Bent Singh Blog",
    "AI Strategi",
    "Kunstig Intelligens",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/`,
    types: {
      'application/rss+xml': `${SITE_URL}/blog/feed.xml`,
    },
  },
  openGraph: {
    title: "Blog – Julian Bent Singh",
    description: "Artikler om AI, teknologi og forretning",
    url: `${SITE_URL}/blog/`,
    type: "website",
    siteName: "Julian Bent Singh",
    locale: "da_DK",
  },
};
```

### 3.2 Dynamisk Post Metadata (`generateMetadata`)
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Indlæg ikke fundet" };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;

  return {
    title,  // → "%s | Julian Bent Singh" via template
    description,
    keywords: post.tags?.map(t => t.name),
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}/`,
      type: "article",
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at,
      authors: [JULIAN_DATA.name],
      section: post.category?.name,
      tags: post.tags?.map(t => t.name),
      locale: "da_DK",
      ...(post.cover_image && {
        images: [{
          url: post.cover_image,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.cover_image && { images: [post.cover_image] }),
    },
  };
}
```

### 3.3 Kategori Side Metadata
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Kategori ikke fundet" };

  return {
    title: `${category.name} – Blog`,
    description: category.description || `Artikler om ${category.name} af Julian Bent Singh`,
    alternates: {
      canonical: `${SITE_URL}/blog/kategori/${category.slug}/`,
    },
    openGraph: {
      title: `${category.name} – Blog | Julian Bent Singh`,
      description: category.description || `Artikler om ${category.name}`,
      url: `${SITE_URL}/blog/kategori/${category.slug}/`,
      type: "website",
    },
  };
}
```

### 3.4 Søgeside Metadata (noindex)
```typescript
export const metadata: Metadata = {
  title: "Søg i Blog",
  robots: {
    index: false,
    follow: true,
  },
};
```

---

## 4. NYE SCHEMA BUILDER FUNKTIONER

### 4.1 `buildArticleSchema(options)`

Tilføjes til `lib/schema/builders.ts`:

```typescript
interface ArticleOptions {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  categoryName?: string;
  tags?: string[];
  wordCount?: number;
}

export function buildArticleSchema(options: ArticleOptions) {
  return {
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${options.slug}/#article`,
    headline: options.title,
    description: options.description,
    author: personRef(),
    publisher: orgRef(),
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    ...(options.image && { image: options.image }),
    url: `${SITE_URL}/blog/${options.slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${options.slug}/#webpage`,
    },
    ...(options.categoryName && { articleSection: options.categoryName }),
    ...(options.tags && options.tags.length > 0 && { keywords: options.tags }),
    ...(options.wordCount && { wordCount: options.wordCount }),
    inLanguage: "da-DK",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-intro", ".article-content h2"],
    },
  };
}
```

### 4.2 `buildBlogCollectionSchema()`

Returnerer BÅDE CollectionPage og Blog entity (to entries til @graph):

```typescript
export function buildBlogCollectionSchema() {
  return [
    {
      "@type": "CollectionPage",
      "@id": SCHEMA_IDS.blogPage,
      name: "Blog – Julian Bent Singh",
      description: "Artikler om AI, teknologi og forretning af Julian Bent Singh.",
      url: `${SITE_URL}/blog/`,
      about: personRef(),
      isPartOf: websiteRef(),
      inLanguage: "da-DK",
    },
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog/#blog`,
      name: "Julian Bent Singh Blog",
      description: "Artikler om AI, teknologi og forretning",
      url: `${SITE_URL}/blog/`,
      author: personRef(),
      publisher: orgRef(),
      inLanguage: "da-DK",
    },
  ];
}

// Brug i page.tsx:
// const blogSchemas = buildBlogCollectionSchema();
// const schema = {
//   "@context": "https://schema.org",
//   "@graph": [
//     ...blogSchemas,
//     buildBreadcrumbSchema([...]),
//   ],
// };
```

### 4.3 Integration med Eksisterende Builders

De nye funktioner bruger de EKSISTERENDE helpers:
- `personRef()` → konsistent Person entity reference
- `orgRef()` → konsistent Organization entity reference
- `websiteRef()` → konsistent WebSite entity reference
- `buildBreadcrumbSchema()` → genbruges direkte til blog breadcrumbs
- `SITE_URL` → konsistent base URL

**INGEN ændringer i eksisterende funktioner.**

---

## 5. SITEMAP OPDATERING

### Nuværende sitemap entries (SKAL BEVARES):
```
https://julianbentsingh.dk/                         priority: 1.0
https://julianbentsingh.dk/om/                      priority: 0.9
https://julianbentsingh.dk/kontakt/                 priority: 0.8
https://julianbentsingh.dk/referencer/              priority: 0.8
https://julianbentsingh.dk/ai-ydelser/              priority: 0.9
https://julianbentsingh.dk/ai-ydelser/ai-konsulent/ priority: 0.8
https://julianbentsingh.dk/ai-ydelser/foredrag/     priority: 0.8
... (7 ai-ydelser sider total)
https://julianbentsingh.dk/invester/                priority: 0.7
https://julianbentsingh.dk/invester/portefoelje/    priority: 0.6
https://julianbentsingh.dk/invester/pitch/          priority: 0.6
https://julianbentsingh.dk/invester/ai-raadgivning-til-investorer/ priority: 0.6
```

### NYE sitemap entries:
```
https://julianbentsingh.dk/blog/                    priority: 0.9  changeFreq: daily
https://julianbentsingh.dk/blog/[slug]/             priority: 0.7  changeFreq: weekly
https://julianbentsingh.dk/blog/kategori/[slug]/    priority: 0.6  changeFreq: weekly
```

### Teknisk implementation:
- `export default function` → `export default async function`
- Import `createServerClient` fra `lib/supabase/server`
- Fetch published posts og categories fra Supabase
- Tilføj som nye entries EFTER eksisterende
- Wrap i try/catch for graceful degradation

---

## 6. ROBOTS.TXT OPDATERING

### Tilføj til disallow:
```typescript
disallow: [
  '/api/',
  '/_next/',
  '/private/',
  '/cms/',      // ← NYT: Admin CMS skal ikke indekseres
],
```

### Eksisterende regler UÆNDREDE:
- GPTBot: Allow /
- ChatGPT-User: Allow /
- Google-Extended: Allow /
- CCBot: Allow /
- anthropic-ai: Allow /

---

## 7. INTERNAL LINKING STRATEGI

### Fra Blog til Service Pages (pillar pages)
Blog posts om AI-relaterede emner bør indeholde links til relevante service-sider:
- AI strategi artikler → `/ai-ydelser/ai-konsulent`
- AI kursus artikler → `/ai-ydelser/fysiske-ai-kurser`
- AI workshop artikler → `/ai-ydelser/fysisk-ai-workshop`
- AI foredrag artikler → `/ai-ydelser/foredrag`

### Fra Service Pages til Blog
Overvej at tilføje "Relaterede artikler" sektion på service-sider i fremtiden.

### Blog Navigation
- Blog hub → kategori sider → individuelle posts
- Relaterede posts sektion på hver post
- Tag-baseret navigation

---

## 8. RSS FEED SEO

### RSS feed (`/blog/feed.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Julian Bent Singh Blog</title>
    <link>https://julianbentsingh.dk/blog/</link>
    <description>Artikler om AI, teknologi og forretning</description>
    <language>da</language>
    <atom:link href="https://julianbentsingh.dk/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <!-- Posts -->
  </channel>
</rss>
```

### Auto-discovery (i blog layout/head):
```html
<link rel="alternate" type="application/rss+xml" title="Julian Bent Singh Blog" href="/blog/feed.xml" />
```

Denne tilføjes via `metadata.alternates.types` i Next.js:
```typescript
alternates: {
  types: {
    'application/rss+xml': `${SITE_URL}/blog/feed.xml`,
  },
},
```

---

## 9. SPEAKABLE SPECIFICATION (AI OVERVIEWS)

Bloggen understøtter Google AI Overviews via Speakable specification:

### På blog posts:
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": [".article-intro", ".article-content h2"]
}
```

### Praktisk:
- `.article-intro` class sættes på excerpt/intro paragraf
- `.article-content h2` targeter alle H2 overskrifter (key points)
- Disse CSS selectors fortæller Google hvilke dele af artiklen er mest relevante for voice/AI svar

---

## 10. OPEN GRAPH BILLEDER

### Blog Posts med Cover Image:
```typescript
openGraph: {
  images: [{
    url: post.cover_image,
    width: 1200,
    height: 630,
    alt: post.title,
  }],
}
```

### Blog Posts UDEN Cover Image:
- Ingen `images` field i OpenGraph
- Facebook/LinkedIn viser default site preview
- Fremtidig overvejelse: Auto-genereret OG image via Vercel OG Image Generation

### Blog Hub:
- Bruger site-wide default OG (ingen specifikt billede)

---

## 11. CANONICAL URL REGLER

| Side | Canonical URL Format |
|------|---------------------|
| Blog hub | `https://julianbentsingh.dk/blog/` |
| Blog post | `https://julianbentsingh.dk/blog/POST-SLUG/` |
| Kategori | `https://julianbentsingh.dk/blog/kategori/KAT-SLUG/` |
| Tag | `https://julianbentsingh.dk/blog/tags/TAG-SLUG/` |
| Søg | INGEN canonical (noindex) |
| RSS | INGEN canonical (XML, ikke HTML) |

**ALLE med trailing slash** (konsistent med eksisterende site-mønster).

---

## 12. SEO CHECKLISTE FOR NYE BLOG SIDER

For hver ny blog-relateret side, verificér:

- [ ] `metadata` export med title, description, keywords
- [ ] `canonical` URL med trailing slash
- [ ] OpenGraph metadata (title, description, url, type)
- [ ] Schema.org JSON-LD via `<JsonLd schema={schema} />`
- [ ] BreadcrumbList schema
- [ ] Tilføjet til sitemap
- [ ] `inLanguage: "da-DK"` i schema
- [ ] `personRef()` og `orgRef()` brugt (ikke hardcoded IDs)
- [ ] `SITE_URL` constant brugt (ikke hardcoded URL)
- [ ] Validér med `npm run validate-schema`

---

## 13. SCHEMA VALIDATION

### Eksisterende validerings-script
`npm run validate-schema` (eller `scripts/validate-schema.mjs`)

### Hvad det tjekker:
- Imports af schema helpers fra `@/lib/schema`
- Brug af `personRef()` / `orgRef()` (ikke direkte SCHEMA_IDS)
- Ingen hardcoded @id værdier
- Schema struktur i page.tsx filer

### Ny blog sider:
- Skal opdage `buildArticleSchema()` og `buildBlogCollectionSchema()` usage
- Skal validere at `buildBreadcrumbSchema()` bruges korrekt
- Script scanner automatisk nye `page.tsx` filer i `app/` mappen

### POTENTIEL OPDATERING af validate script:
Eventuelt tilføj check for Article schema struktur og required fields.
Men dette er VALGFRIT — eksisterende script dækker allerede basis-validering.
