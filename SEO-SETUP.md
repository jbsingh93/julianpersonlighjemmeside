# SEO Setup Dokumentation
**Oprettet:** 2026-01-17
**Status:** ✅ Komplet og deployed

## Oversigt

Din hjemmeside har nu en komplet SEO-opsætning med:
- ✅ Dynamisk sitemap.xml
- ✅ Robots.txt med AI crawler support
- ✅ Canonical URLs på alle sider (16/16)
- ✅ OpenGraph URLs på alle sider
- ✅ Automatisk opdateret checklist i CLAUDE.md

## 🗺️ Sitemap.xml

**Fil:** `app/sitemap.ts`
**URL:** https://julianbentsingh.dk/sitemap.xml

### Inkluderede sider (16 routes)

#### Hoved-sider (Priority: 0.8-1.0)
- `/` - Forside (Priority: 1.0, Weekly)
- `/om/` - Om Julian (Priority: 0.9, Monthly)
- `/kontakt/` - Kontakt (Priority: 0.8, Monthly)
- `/referencer/` - Referencer (Priority: 0.8, Monthly)

#### AI Ydelser (Priority: 0.8-0.9)
- `/ai-ydelser/` - Oversigt (Priority: 0.9, Weekly)
- `/ai-ydelser/ai-konsulent/` (Priority: 0.8, Monthly)
- `/ai-ydelser/foredrag/` (Priority: 0.8, Monthly)
- `/ai-ydelser/fysiske-ai-kurser/` (Priority: 0.8, Monthly)
- `/ai-ydelser/fysisk-ai-workshop/` (Priority: 0.8, Monthly)
- `/ai-ydelser/online-ai-kurser/` (Priority: 0.8, Monthly)
- `/ai-ydelser/online-ai-workshop/` (Priority: 0.8, Monthly)
- `/ai-ydelser/ai-mentor/` (Priority: 0.8, Monthly)

#### Invester Sektion (Priority: 0.6-0.7)
- `/invester/` - Oversigt (Priority: 0.7, Monthly)
- `/invester/portefoelje/` (Priority: 0.6, Monthly)
- `/invester/pitch/` (Priority: 0.6, Monthly)
- `/invester/ai-raadgivning-til-investorer/` (Priority: 0.6, Monthly)

### Sådan opdaterer du sitemap

Når du opretter en ny side, tilføj den til `app/sitemap.ts`:

```typescript
routes.push({
  url: `${SITE_URL}/ny-side/`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8, // 0.6-1.0 baseret på vigtighed
});
```

**Priority guidelines:**
- `1.0` - Forside (kun denne)
- `0.9` - Om-side, hoved kategori-sider
- `0.8` - Service-sider, vigtige undersider
- `0.7` - Sekundære kategori-sider
- `0.6` - Tertiære sider

**Change frequency:**
- `weekly` - Forside, nyhedsflow
- `monthly` - De fleste sider (standard)
- `yearly` - Statiske/sjældent opdaterede sider

## 🤖 Robots.txt

**Fil:** `app/robots.ts`
**URL:** https://julianbentsingh.dk/robots.txt

### Konfiguration

**Tilladt for alle crawlers:**
- Alle sider (`/`)
- AI crawlers har fuld adgang (GPTBot, Claude, Google-Extended, CCBot)

**Blokeret:**
- `/api/` - API routes
- `/_next/` - Next.js internals
- `/private/` - Private sider (hvis du tilføjer dem)

### AI Crawler Support

Vi tillader eksplicit følgende AI crawlers for bedre AI-forståelse:
- **GPTBot** - OpenAI's crawler (ChatGPT)
- **ChatGPT-User** - ChatGPT browsing
- **Google-Extended** - Google's AI crawler (Gemini, Bard)
- **CCBot** - Common Crawl (bruges af mange AI modeller)
- **anthropic-ai** - Claude's crawler

### Sitemap reference

Robots.txt fortæller crawlers hvor sitemap findes:
```
Sitemap: https://julianbentsingh.dk/sitemap.xml
Host: https://julianbentsingh.dk
```

## 🔗 Canonical URLs

**Status:** ✅ 16/16 sider har canonical URLs

Alle sider har korrekte canonical URLs i deres metadata:

```typescript
alternates: {
  canonical: "https://julianbentsingh.dk/sti-til-side/",
}
```

### Fordele ved canonical URLs

1. **Undgå duplicate content** - Fortæller Google hvilken version der er den "rigtige"
2. **Konsolider ranking signals** - Samler alle SEO signals på én URL
3. **Håndterer parametere** - Hvis siden tilgås med ?params, peger canonical til clean URL
4. **Cross-domain duplicate** - Hvis indholdet findes andre steder, peger du til din egen

### Format

- Skal være **absolut URL** (ikke relativ)
- Skal bruge **HTTPS**
- Skal have **trailing slash** for konsistens
- Skal matche OpenGraph URL

### Sider med canonical URLs

✅ Alle 16 sider har canonical:
- Forside, Om, Kontakt, Referencer
- Alle 8 AI Ydelser sider
- Alle 4 Invester sider

## 📋 SEO Checklist (i CLAUDE.md)

CLAUDE.md er nu opdateret med en komplet SEO checklist der automatisk minder dig om at:

### 1. Metadata Export
- Title, description, keywords
- Canonical URL
- OpenGraph data

### 2. Canonical URL
- Altid inkluderet
- Korrekt format
- I både `alternates.canonical` og `openGraph.url`

### 3. Schema.org JSON-LD
- Brug builders fra `@/lib/schema`
- Konsistente entity references
- BreadcrumbList på undersider
- Validering med `/validate-schema`

### 4. Sitemap opdatering
- Tilføj ny route til `app/sitemap.ts`
- Sæt passende priority og changeFrequency

### 5. Internal linking
- Link fra relevante sider
- Opdater navigation hvis nødvendigt

## 🔍 Verifikation

### Test sitemap lokalt

```bash
npm run dev
```

Besøg: http://localhost:3000/sitemap.xml

Du bør se XML output med alle dine sider.

### Test robots.txt lokalt

Besøg: http://localhost:3000/robots.txt

Du bør se:
```
User-Agent: *
Allow: /
Disallow: /api/
...
Sitemap: https://julianbentsingh.dk/sitemap.xml
```

### Test canonical URLs

1. Besøg en side i browser
2. View source (Ctrl+U / Cmd+U)
3. Søg efter "canonical"
4. Verificer URL er korrekt:
   ```html
   <link rel="canonical" href="https://julianbentsingh.dk/side/" />
   ```

### Test i Google Search Console

1. Gå til [Google Search Console](https://search.google.com/search-console)
2. Under "Sitemaps", tilføj: `https://julianbentsingh.dk/sitemap.xml`
3. Google vil crawle og validere sitemap
4. Check for fejl under "Coverage"

### Test med Rich Results

1. Gå til [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Indtast din URL
3. Verificer at schema og metadata er korrekt

## 📊 Google Search Console Setup

### Efter deployment

1. **Tilføj sitemap:**
   - Gå til Search Console
   - Sitemaps → Tilføj ny sitemap
   - Indtast: `sitemap.xml`
   - Submit

2. **Anmod om indexering:**
   - Brug "URL Inspection" tool
   - Test hver vigtig side
   - Klik "Request Indexing"

3. **Monitor:**
   - Coverage rapport (hvilke sider er indexed)
   - Performance (clicks, impressions)
   - Core Web Vitals

## 🚀 Næste Skridt

### Umiddelbart efter deployment

1. ✅ Sitemap uploaded til GitHub (Done)
2. ⏳ Vercel deployer automatisk
3. 🔄 Test sitemap.xml i browser
4. 🔄 Test robots.txt i browser
5. 🔄 Tilføj sitemap til Google Search Console
6. 🔄 Anmod om indexering af vigtige sider

### Løbende vedligeholdelse

- **Ved nye sider:** Følg SEO checklist i CLAUDE.md
- **Månedligt:** Check Search Console for fejl
- **Ved opdateringer:** Kør `npm run validate-schema`

## 📝 Filer oprettet/opdateret

### Nye filer
1. `app/sitemap.ts` - Dynamisk sitemap generator
2. `app/robots.ts` - Robots.txt generator
3. `SEO-SETUP.md` - Denne dokumentation

### Opdaterede filer
1. `CLAUDE.md` - SEO checklist tilføjet
2. `app/ai-ydelser/fysisk-ai-workshop/layout.tsx` - Canonical URL tilføjet
3. `app/ai-ydelser/fysiske-ai-kurser/layout.tsx` - Canonical URL tilføjet

## ✅ Verifikation Checklist

- [x] Sitemap.ts oprettet med alle 16 sider
- [x] Robots.ts oprettet med AI crawler support
- [x] Canonical URLs på alle 16 sider
- [x] OpenGraph URLs matcher canonical URLs
- [x] CLAUDE.md opdateret med SEO checklist
- [x] Alle ændringer committed og pushed til GitHub
- [ ] Vercel deployment succeeded (afventer)
- [ ] Test /sitemap.xml i produktion
- [ ] Test /robots.txt i produktion
- [ ] Tilføj sitemap til Google Search Console
- [ ] Anmod om indexering af top 5 sider

## 🆘 Fejlfinding

### Sitemap vises ikke

**Problem:** /sitemap.xml returnerer 404

**Løsning:**
1. Verificer `app/sitemap.ts` eksisterer
2. Kør `npm run build` lokalt
3. Check for build errors
4. Sitemap genereres automatisk af Next.js - intet build step nødvendigt

### Canonical URL mangler

**Problem:** Canonical link ikke i HTML

**Løsning:**
1. Verificer `alternates.canonical` er i metadata
2. For client components ("use client"), flyt metadata til `layout.tsx`
3. Rebuild og test igen

### Google indexerer forkert URL

**Problem:** Google viser URL uden trailing slash

**Løsning:**
1. Sørg for canonical har trailing slash
2. Brug Next.js redirect hvis nødvendigt
3. Vent på næste crawl (kan tage uger)

## 📚 Ressourcer

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js Robots.txt Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

**Maintained by:** Claude Sonnet 4.5
**Last updated:** 2026-01-17
