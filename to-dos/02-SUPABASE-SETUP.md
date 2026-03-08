# 02 - SUPABASE SETUP

> **Formål**: Komplet guide til Supabase database, storage og RLS opsætning. Alle database-migrationer og Supabase-specifikke operationer SKAL udføres via Lovable (Supabase dashboard) og IKKE via kode-deploys.

---

## ⚠️ VIGTIGT: ALLE SUPABASE OPERATIONER VIA LOVABLE

**Følgende opgaver SKAL udføres manuelt via Supabase Dashboard (Lovable):**
1. Database tabel oprettelse (SQL migrationer)
2. Row Level Security (RLS) policies
3. Storage bucket oprettelse
4. Database funktioner (RPC functions)
5. Database triggers
6. Index oprettelse

**Grunden**: Supabase migrationer og konfiguration er infrastruktur-opgaver der kræver direkte adgang til Supabase Dashboard. De kan IKKE deployes via Next.js kode.

---

## 1. MILJØVARIABLER

### Trin 1: Find dine Supabase credentials
1. Gå til [Supabase Dashboard](https://supabase.com/dashboard)
2. Vælg dit projekt
3. Gå til **Settings** → **API**
4. Kopiér følgende værdier

### Trin 2: Tilføj til `.env.local`
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://DIT-PROJEKT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...din-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...din-service-role-key

# Blog CMS Auth
BLOG_ADMIN_PASSWORD=vælg-et-sikkert-password-her
```

### ⚠️ SIKKERHED
- `SUPABASE_SERVICE_ROLE_KEY` er **aldrig** prefixed med `NEXT_PUBLIC_` — den må ALDRIG eksponeres i browseren
- `BLOG_ADMIN_PASSWORD` er server-only — ingen `NEXT_PUBLIC_` prefix
- Tilføj `.env.local` til `.gitignore` (bør allerede være der)

---

## 2. DATABASE MIGRATIONER (VIA LOVABLE/SUPABASE DASHBOARD)

### ⚠️ SKAL UDFØRES VIA LOVABLE - IKKE VIA KODE

Gå til Supabase Dashboard → **SQL Editor** og kør følgende SQL statements i rækkefølge.

---

### Migration 1: Opret `categories` tabel

**Lovable Prompt:**
> "Kør følgende SQL i Supabase SQL Editor for at oprette categories tabellen til blog systemet."

```sql
-- =============================================
-- Migration 1: Categories tabel
-- =============================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for hurtige slug lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Kommentar til tabellen
COMMENT ON TABLE categories IS 'Blog kategorier for julianbentsingh.dk';
COMMENT ON COLUMN categories.slug IS 'URL-venligt navn (f.eks. ai-strategi)';
```

---

### Migration 2: Opret `posts` tabel

**Lovable Prompt:**
> "Kør følgende SQL i Supabase SQL Editor for at oprette posts tabellen til blog systemet."

```sql
-- =============================================
-- Migration 2: Posts tabel
-- =============================================

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  cover_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_views ON posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON posts(status, published_at DESC)
  WHERE status = 'published';

-- Kommentarer
COMMENT ON TABLE posts IS 'Blog indlæg for julianbentsingh.dk';
COMMENT ON COLUMN posts.content IS 'Markdown formateret indhold';
COMMENT ON COLUMN posts.status IS 'draft = kladde, published = offentliggjort';
COMMENT ON COLUMN posts.published_at IS 'Sættes automatisk når status ændres til published';
COMMENT ON COLUMN posts.meta_title IS 'Valgfri SEO titel override';
COMMENT ON COLUMN posts.meta_description IS 'Valgfri SEO beskrivelse override';
```

---

### Migration 3: Opret `tags` og `post_tags` tabeller

**Lovable Prompt:**
> "Kør følgende SQL i Supabase SQL Editor for at oprette tags og post_tags tabellerne."

```sql
-- =============================================
-- Migration 3: Tags og Post-Tags junction tabel
-- =============================================

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_post_tags_post ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag_id);

-- Kommentarer
COMMENT ON TABLE tags IS 'Tags/labels til blog indlæg';
COMMENT ON TABLE post_tags IS 'Many-to-many relation mellem posts og tags';
```

---

### Migration 4: Opret database funktioner og triggers

**Lovable Prompt:**
> "Kør følgende SQL i Supabase SQL Editor for at oprette automatiske triggers og hjælpefunktioner til blog systemet."

```sql
-- =============================================
-- Migration 4: Funktioner og Triggers
-- =============================================

-- Funktion: Auto-opdater updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Posts updated_at
DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Funktion: Auto-sæt published_at når status ændres til 'published'
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Sæt published_at kun første gang posten publiceres
  IF NEW.status = 'published' AND (OLD.published_at IS NULL OR OLD.status = 'draft') THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-sæt published_at
DROP TRIGGER IF EXISTS posts_set_published_at ON posts;
CREATE TRIGGER posts_set_published_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION set_published_at();

-- Funktion: Increment view count (atomisk, SECURITY DEFINER for anon access)
CREATE OR REPLACE FUNCTION increment_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE slug = post_slug AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Giv anon rollen adgang til increment_views funktionen
GRANT EXECUTE ON FUNCTION increment_views(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION increment_views(TEXT) TO authenticated;

-- Kommentarer
COMMENT ON FUNCTION increment_views IS 'Atomisk increment af view count. SECURITY DEFINER sikrer at anon brugere kan kalde den.';
```

---

### Migration 5: Row Level Security (RLS) Policies

**Lovable Prompt:**
> "Kør følgende SQL i Supabase SQL Editor for at aktivere Row Level Security og oprette policies til blog tabellerne."

```sql
-- =============================================
-- Migration 5: Row Level Security
-- =============================================

-- Aktivér RLS på alle tabeller
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- POSTS: Offentlig læsning af publicerede posts
CREATE POLICY "Alle kan læse publicerede posts"
  ON posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- POSTS: Service role kan alt (bruges af CMS backend)
-- (Service role bypasser automatisk RLS, så ingen policy nødvendig)

-- CATEGORIES: Alle kan læse kategorier
CREATE POLICY "Alle kan læse kategorier"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- TAGS: Alle kan læse tags
CREATE POLICY "Alle kan læse tags"
  ON tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- POST_TAGS: Alle kan læse post-tag relationer
CREATE POLICY "Alle kan læse post_tags"
  ON post_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

**⚠️ VIGTIGT om RLS og Service Role:**
- `service_role` key bypasser ALTID RLS — den bruges af CMS backend til CREATE, UPDATE, DELETE
- `anon` key respekterer RLS — den bruges af public frontend og kan KUN læse publicerede posts
- Derfor behøver vi IKKE INSERT/UPDATE/DELETE policies — CMS backend bruger altid service_role

---

## 3. STORAGE BUCKET OPSÆTNING (VIA LOVABLE/SUPABASE DASHBOARD)

### ⚠️ SKAL UDFØRES VIA LOVABLE - IKKE VIA KODE

**Lovable Prompt:**
> "Opret en ny Storage bucket i Supabase Dashboard til blog billeder."

### Trin-for-trin:
1. Gå til Supabase Dashboard → **Storage**
2. Klik **New Bucket**
3. Indstillinger:
   - **Bucket name**: `blog-images`
   - **Public bucket**: ✅ JA (billeder skal være offentligt tilgængelige)
   - **File size limit**: `5242880` (5 MB)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/gif`
4. Klik **Create bucket**

### Storage Policy (via SQL Editor):

**Lovable Prompt:**
> "Kør følgende SQL for at oprette storage policies for blog-images bucket."

```sql
-- =============================================
-- Storage Policies for blog-images bucket
-- =============================================

-- Alle kan LÆSE billeder (public bucket)
CREATE POLICY "Offentlig læsning af blog billeder"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

-- Service role kan uploade (CMS backend)
-- (Service role bypasser automatisk, men vi tilføjer for klarhed)
CREATE POLICY "Service role kan uploade blog billeder"
  ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'blog-images');

-- Service role kan slette (CMS backend)
CREATE POLICY "Service role kan slette blog billeder"
  ON storage.objects
  FOR DELETE
  TO service_role
  USING (bucket_id = 'blog-images');
```

---

## 4. VERIFIKATION

### Test at alt er korrekt oprettet

**Lovable Prompt:**
> "Kør følgende SQL i Supabase SQL Editor for at verificere at alle tabeller, funktioner og policies er oprettet korrekt."

```sql
-- Verificér tabeller
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('posts', 'categories', 'tags', 'post_tags')
ORDER BY table_name;

-- Verificér indexes
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('posts', 'categories', 'tags', 'post_tags')
ORDER BY tablename, indexname;

-- Verificér RLS er aktiveret
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('posts', 'categories', 'tags', 'post_tags');

-- Verificér policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificér funktioner
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('update_updated_at', 'set_published_at', 'increment_views');

-- Verificér storage bucket
SELECT name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE name = 'blog-images';
```

### Forventet output:
- 4 tabeller: `categories`, `post_tags`, `posts`, `tags`
- 7+ indexes
- RLS enabled (rowsecurity = true) på alle 4 tabeller
- 4 SELECT policies (en per tabel)
- 3 funktioner: `update_updated_at`, `set_published_at`, `increment_views`
- 1 storage bucket: `blog-images` (public = true)

---

## 5. SEED DATA (VALGFRIT)

### Test kategorier og posts

**Lovable Prompt:**
> "Kør følgende SQL for at indsætte test data i blog tabellerne (kan slettes senere)."

```sql
-- =============================================
-- Seed Data (test data - kan slettes)
-- =============================================

-- Indsæt test kategorier
INSERT INTO categories (name, slug, description) VALUES
  ('AI Strategi', 'ai-strategi', 'Artikler om strategisk AI-implementering i virksomheder'),
  ('Teknologi', 'teknologi', 'Nyheder og indsigter om nye teknologier'),
  ('Forretningsudvikling', 'forretningsudvikling', 'Tips til at vækste din virksomhed med AI'),
  ('Prompting', 'prompting', 'Guides og tips til bedre prompting af AI-modeller'),
  ('AI Nyheder', 'ai-nyheder', 'De seneste nyheder fra AI-verdenen');

-- Indsæt test tags
INSERT INTO tags (name, slug) VALUES
  ('ChatGPT', 'chatgpt'),
  ('Claude', 'claude'),
  ('Automation', 'automation'),
  ('Machine Learning', 'machine-learning'),
  ('Generativ AI', 'generativ-ai'),
  ('Produktivitet', 'produktivitet'),
  ('Virksomheder', 'virksomheder'),
  ('Tutorial', 'tutorial');

-- Indsæt test post
INSERT INTO posts (title, slug, excerpt, content, category_id, status, published_at) VALUES
  (
    'Hvordan AI Transformerer Danske Virksomheder i 2026',
    'hvordan-ai-transformerer-danske-virksomheder-2026',
    'En dybdegående analyse af hvordan kunstig intelligens ændrer spillereglerne for danske virksomheder.',
    '# Hvordan AI Transformerer Danske Virksomheder i 2026

Kunstig intelligens er ikke længere fremtidsmusik...

## Tre Nøgletrends

### 1. Automatisering af rutineopgaver
Mange danske virksomheder bruger nu AI til at automatisere...

### 2. AI-drevet beslutningstagning
Data-drevne beslutninger bliver normen...

### 3. Personaliseret kundeoplevelse
AI muliggør skræddersyede oplevelser...

## Konklusion
Virksomheder der adopterer AI tidligt får en konkurrencefordel...',
    (SELECT id FROM categories WHERE slug = 'ai-strategi'),
    'published',
    now()
  );

-- Tag test posten
INSERT INTO post_tags (post_id, tag_id) VALUES
  ((SELECT id FROM posts WHERE slug = 'hvordan-ai-transformerer-danske-virksomheder-2026'),
   (SELECT id FROM tags WHERE slug = 'virksomheder')),
  ((SELECT id FROM posts WHERE slug = 'hvordan-ai-transformerer-danske-virksomheder-2026'),
   (SELECT id FROM tags WHERE slug = 'generativ-ai'));
```

---

## 6. SUPABASE URL FORMAT

### Storage URLs
Billeder uploadet til Supabase Storage er tilgængelige via:
```
https://DIT-PROJEKT-ID.supabase.co/storage/v1/object/public/blog-images/FILNAVN.jpg
```

### API URL
Database queries går via:
```
https://DIT-PROJEKT-ID.supabase.co/rest/v1/TABLE_NAME
```
(Dette håndteres automatisk af `@supabase/supabase-js`)

---

## 7. BACKUP STRATEGI

### Automatisk (Supabase Pro plan)
- Supabase laver automatiske daily backups på Pro plan
- Point-in-time recovery op til 7 dage

### Manuel (alle plans)
- Eksportér data via Supabase Dashboard → **Database** → **Backups**
- Eller kør: `pg_dump` via CLI

---

## 8. OPSUMMERING AF LOVABLE-OPGAVER

| # | Opgave | Status | Prompt Reference |
|---|--------|--------|-----------------|
| 1 | Opret `categories` tabel | ⬜ | Migration 1 |
| 2 | Opret `posts` tabel | ⬜ | Migration 2 |
| 3 | Opret `tags` og `post_tags` tabeller | ⬜ | Migration 3 |
| 4 | Opret funktioner og triggers | ⬜ | Migration 4 |
| 5 | Aktivér RLS og opret policies | ⬜ | Migration 5 |
| 6 | Opret `blog-images` storage bucket | ⬜ | Sektion 3 |
| 7 | Opret storage policies | ⬜ | Sektion 3 |
| 8 | Verificér alt er korrekt | ⬜ | Sektion 4 |
| 9 | (Valgfrit) Indsæt seed data | ⬜ | Sektion 5 |

**ALLE disse opgaver SKAL udføres via Lovable/Supabase Dashboard INDEN kode-implementering begynder.**
