# DETTE ER VORES SEO OG SCHEMA STRATEGI

I dette strategiskriv finder du først en sammenfatning af hele vores SEO og Schema strategi, dernæst finder du under de 2 andre SEO snakke, som er dem sammenfatningen er bygget ud fra. Som du SKAL følge!

- Vær sikker på, at du kigger på 'prd\schema-links.md' som viser hele vores Schema link liste!
- Vær sikker på, at du kigger både på sammenfatningen og de underliggende snakke for den fulde kontekst! LÆS 'prd\seo-strategi\seo-snak-1.md' OG 'prd\seo-strategi\seo-snak-2.md'


## STARTEGI SAMMENFATNING

### Den Ultimative SEO & Entity Strategi for JulianBentSingh.dk

#### Mål

At dominere Google-søgeresultater og AI Overviews for følgende termer:
- AI kurser
- AI Konsulent
- AI ekspert
- AI foredrag
- AI strategi
- AI opkvalificering

---

#### Del 1: Grundlæggende Principper

##### 1.1 Hvad Google faktisk kigger efter

Google har eksplicit udtalt, at der **ikke findes speciel schema markup til AI Overviews**. Det er stadig de klassiske SEO-best-practices der gælder:

- Crawl/index optimering
- Intern linking
- Hjælpsomt indhold
- Page experience
- Structured data der **matcher synligt indhold**

**Vigtigt:** Schema hjælper Google med at *forstå* dit indhold, men er ikke en "rank-knap".

##### 1.2 E-E-A-T i praksis (Experience, Expertise, Authoritativeness, Trustworthiness)

På alle money-sider skal du have:

- **Konkrete cases** (problem → metode → resultat → tal)
- **Metode/rammeværk** (trinvis proces, templates)
- **Kvalifikationer** (certificeringer, uddannelse, erfaring)
- **Medieomtale** (talks, podcasts, publikationer)
- **Kontakt + virksomhedsdata** (CVR, adresse, telefon)

---

#### Del 2: Domænestrategi – To Sites, Én Entity

##### 2.1 Rollefordeling

| Domæne | Rolle | Fokus | Schema-fokus |
|--------|-------|-------|--------------|
| **julianbentsingh.dk** | Entitetshub (Autoritet) | Eksperten, thought leadership, portefølje, "mig i medierne" | `Person`, `Occupation`, `Event` |
| **ai-growth-minds.dk** | Konverteringshub (Service) | Produkter, priser, kursusdatoer, booking, cases | `Organization`, `Service`, `Course` |

##### 2.2 Strategisk termfordeling

| Term | Primær side | Schema-type |
|------|-------------|-------------|
| **AI Ekspert** | julianbentsingh.dk/om-julian/ | `Person` + `knowsAbout` |
| **AI Foredrag** | julianbentsingh.dk/ai-foredrag/ | `Service` + `Event` |
| **AI Konsulent** | julianbentsingh.dk/ai-konsulent/ | `Service` + `Offer` |
| **AI Strategi** | julianbentsingh.dk/ai-strategi/ | `Service` + `Offer` |
| **AI Kurser** | julianbentsingh.dk/ai-kurser/ | `Course` + `CourseInstance` |
| **AI Opkvalificering** | julianbentsingh.dk/ai-opkvalificering/ | `Service` + `EducationalOccupationalProgram` |

##### 2.3 Sådan bindes domænerne sammen

**På julianbentsingh.dk:** Definer dig selv som "Brandet" og link til virksomheden som `affiliation`/`owns`.

**På ai-growth-minds.dk:** Definer virksomheden og peg tilbage på din personlige profil som `founder`.

---

#### Del 3: Informationsarkitektur for JulianBentSingh.dk

##### 3.1 Site-struktur (Minimum)

```
/                           → Forside (WebPage)
/om-julian/                 → About (AboutPage)
/ydelser/                   → Ydelsesoversigt
  /ai-konsulent/            → Service
  /ai-ekspert/              → Service  
  /ai-strategi/             → Service
  /ai-opkvalificering/      → Service
  /ai-foredrag/             → Service + Event
  /ai-kurser/               → Course list
/cases/                     → Case hub
  /case-1/                  → Individuel case
  /case-2/                  
/omtale/                    → Press & mentions (CollectionPage)
/ressourcer/                → Playbooks, frameworks, templates
/ai-growth-minds/           → Bro-side til produktet
/kontakt/                   → Kontaktside
```

##### 3.2 Indhold på hver ydelsesside

Hver money-side skal indeholde:

1. **Hvad får du** (konkrete deliverables)
2. **Proces** (trin-for-trin)
3. **Hvem er det til** (målgruppe)
4. **Eksempler/cases** (social proof)
5. **FAQ** (synlig på siden)
6. **CTA** (book/kontakt)

---

#### Del 4: Topical Authority – Hub & Cluster Model

##### 4.1 Pillar-sider (6 stk)

Lav én pillar-side for hver hovedterm med 6-15 støttesider pr. pillar:

| Pillar | Støttesider (eksempler) |
|--------|------------------------|
| **AI kurser** | Kursuskatalog, målgrupper, udbytte, moduler, datoer, FAQ |
| **AI opkvalificering** | Kompetenceforløb, teams/ledelse, måling/ROI, cases |
| **AI strategi** | Strategi-framework, governance, use-case prioritering, roadmap |
| **AI konsulent/ekspert** | Rådgivningsydelser, cases, proces, "hvem passer det til" |
| **AI foredrag** | Emner, showreel/video, tidligere kunder, bookingflow |

##### 4.2 Intern linking-struktur

- Pillar ↔ Cluster (begge veje)
- Breadcrumbs på alle undersider
- Kontekstuelle links i brødtekst
- "Relateret indhold" sektioner

---

#### Del 5: Schema Markup – Komplet Oversigt

##### 5.1 Schema-typer pr. sidetype

| Sidetype | Schema-typer |
|----------|-------------|
| **Forside** | `WebSite`, `Organization`/`ProfessionalService`, `Person`, `Service`, `Offer` |
| **Om mig** | `AboutPage`, `Person` (udbygget), `CreativeWork` |
| **Ydelsessider** | `Service`, `Offer`, `FAQPage` |
| **Kursusoversigt** | `ItemList`, `Course`, `CourseInstance`, `Offer` |
| **Foredrag/events** | `Event`, `VideoObject` |
| **Omtale/press** | `CollectionPage`, `ItemList`, `Article`, `PodcastEpisode`, `WebPage` |
| **Alle undersider** | `BreadcrumbList` |

##### 5.2 Vigtige Person-egenskaber

```
name
jobTitle
description
url
image
knowsAbout (link til Wikipedia/Wikidata-entiteter)
hasCredential
alumniOf
memberOf
award
worksFor
owns
sameAs (kun kontrollerede profiler)
subjectOf (press/mentions)
```

##### 5.3 Vigtige Service-egenskaber

```
name
description
provider (link til Organization/Person)
areaServed
offers (med Offer-type)
  - priceCurrency
  - price
  - url
  - description
```

---

#### Del 6: SameAs vs. Mentions – Korrekt URL-klassificering

##### 6.1 SameAs (kun kontrollerede identiteter)

Brug **kun** disse typer URLs i `sameAs`:

- LinkedIn **profil** ✅
- YouTube **kanal** ✅
- Instagram **profil** ✅
- Facebook **side** ✅
- Egne domæner/brands ✅

**Undgå:**
- LinkedIn feed-opslag
- Enkelte podcast-episoder
- Konference-speaker-sider
- Presseartikler

##### 6.2 Din konkrete sameAs-liste

```json
"sameAs": [
  "https://www.linkedin.com/in/julianbentsingh/",
  "https://ai-growth-minds.dk/"
]
```

##### 6.3 Mentions/Press (brug subjectOf + omtale-side)

Alt andet skal bruges som **bevislag** via:
- `subjectOf` property på Person
- En dedikeret `/omtale/` side med `ItemList` af `CreativeWork`

---

#### Del 7: Klassificering af dine eksisterende URLs

##### 7.1 Tier 1: sameAs (kontrollerede profiler)

| URL | Type |
|-----|------|
| https://www.linkedin.com/in/julianbentsingh/ | LinkedIn profil |
| https://ai-growth-minds.dk/ | Eget brand/produkt |

##### 7.2 Tier 2: Høj-autoritet mentions (brug på /omtale/)

| URL | Type | Schema |
|-----|------|--------|
| https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers | Presseklip | `WebPage` |
| https://seniorfolk.dk/danmarks-forende-15-eksperter-i-ai-2025/ | Ekspert-liste | `WebPage` |
| https://www.computerworld.dk/art/290123/noergaard-skal-vi-satse-paa-open-source-eller-amerikansk-big-tech-i-denne-urolige-tid | Review | `Article` |
| https://www.ai-marketingconference.dk/speakers/julian-bentsingh | Konference speaker | `WebPage` |
| https://dataforeningen.no/profiler/julian-bent-singh | Konference speaker | `WebPage` |
| https://www.sylvester-co.dk/julian-bent-singh-stifter-af-ai-growth-minds-paa-hr-ai-konferencen-drop-cvet-og-ansaet-paa-mindset/ | Konference | `WebPage` |

##### 7.3 Tier 3: Podcasts & Video

| URL | Type | Schema |
|-----|------|--------|
| https://podcasts.apple.com/dk/podcast/julian-singh-how-to-identify-implement-ai-use-cases/id1804979257?i=1000702973223 | Podcast | `PodcastEpisode` |
| https://www.become.dk/podcast/episode-2-han-brugte-ai-til-seo/ | Podcast | `PodcastEpisode` |
| https://open.spotify.com/episode/7Bfh91fxgnTiOQLTQPHuZU | Podcast | `PodcastEpisode` |
| https://www.youtube.com/watch?v=UN0eHK82NyA | Video/Podcast | `VideoObject` |
| https://www.youtube.com/watch?v=EcbXYMa3Neo | Video/Podcast | `VideoObject` |

##### 7.4 Tier 4: Artikler & Creative Works

| URL | Type | Schema |
|-----|------|--------|
| https://www.copenhagen-review-of-communication.com/ai-modellerne-er-ikke-problemet-problemet-er-bias-i-skonhedsidealer/ | Artikel | `Article` |
| https://chatgpt.com/g/g-I2LQ7UWw4-korrekturlaeser | GPT/Tool | `SoftwareApplication` |
| https://morningscore.io/chatgpt-seo-content-prompts/ | Creative work | `Article` |
| https://gptpromptsleaderboard.com/ | Creative work | `WebPage` |
| https://www.youtube.com/watch?v=M1ULNblE9Yg | Video | `VideoObject` |

##### 7.5 Tier 5: Reviews & Testimonials

| URL | Type |
|-----|------|
| https://www.merkdanmark.dk/arrangementer/... | Workshop review |
| https://seo.somecaptions.dk/om-os/ | Review |
| https://chatgpt-kursus.dk/ | Review |
| https://www.findaikursus.dk/bedste-ai-kurser | Kursus-liste |
| https://www.dendanskereklameskole.dk/cm/undervisere/ | Underviser-profil |
| LinkedIn posts (mange) | Social proof |

---

#### Del 8: Komplet JSON-LD Blueprint

##### 8.1 Forside (Global Entity Base)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://julianbentsingh.dk/#website",
      "url": "https://julianbentsingh.dk/",
      "name": "Julian Bent Singh – AI kurser, rådgivning og foredrag",
      "publisher": { "@id": "https://julianbentsingh.dk/#org" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://julianbentsingh.dk/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://julianbentsingh.dk/#org",
      "name": "Julian Bent Singh",
      "url": "https://julianbentsingh.dk/",
      "logo": "https://julianbentsingh.dk/assets/logo.png",
      "telephone": "+45XXXXXXXX",
      "email": "kontakt@julianbentsingh.dk",
      "founder": { "@id": "https://julianbentsingh.dk/#julian" },
      "sameAs": [
        "https://ai-growth-minds.dk/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://julianbentsingh.dk/#julian",
      "name": "Julian Bent Singh",
      "url": "https://julianbentsingh.dk/om-julian/",
      "image": "https://julianbentsingh.dk/assets/julian.jpg",
      "jobTitle": "AI konsulent, underviser og foredragsholder",
      "description": "Specialist i AI-implementering, AI-strategi og opkvalificering af virksomheder. Anerkendt af Ritzau som en af Danmarks førende AI-influencers.",
      "worksFor": { "@id": "https://julianbentsingh.dk/#org" },
      "owns": {
        "@type": "Organization",
        "name": "AI Growth Minds",
        "url": "https://ai-growth-minds.dk/"
      },
      "knowsAbout": [
        "AI kurser",
        "AI opkvalificering",
        "AI strategi",
        "AI foredrag",
        "Generativ AI",
        "AI agents",
        "Prompting",
        "LLM governance",
        "AI adoption i virksomheder"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "AI Consultant",
        "educationRequirements": "AI-drevet forretningsudvikling og automatisering"
      },
      "sameAs": [
        "https://www.linkedin.com/in/julianbentsingh/"
      ],
      "subjectOf": { "@id": "https://julianbentsingh.dk/omtale/#page" }
    },
    {
      "@type": "Service",
      "@id": "https://julianbentsingh.dk/ai-strategi/#service",
      "name": "AI strategi",
      "provider": { "@id": "https://julianbentsingh.dk/#org" },
      "areaServed": "DK",
      "offers": {
        "@type": "Offer",
        "url": "https://julianbentsingh.dk/ai-strategi/",
        "priceCurrency": "DKK",
        "price": "15000",
        "description": "Workshop + roadmap"
      }
    },
    {
      "@type": "Service",
      "@id": "https://julianbentsingh.dk/ai-konsulent/#service",
      "name": "AI konsulent",
      "provider": { "@id": "https://julianbentsingh.dk/#org" },
      "areaServed": "DK",
      "offers": {
        "@type": "Offer",
        "url": "https://julianbentsingh.dk/ai-konsulent/"
      }
    },
    {
      "@type": "Service",
      "@id": "https://julianbentsingh.dk/ai-foredrag/#service",
      "name": "AI foredrag",
      "provider": { "@id": "https://julianbentsingh.dk/#org" },
      "areaServed": "DK",
      "offers": {
        "@type": "Offer",
        "url": "https://julianbentsingh.dk/ai-foredrag/"
      }
    }
  ]
}
```

##### 8.2 Om Julian (AboutPage)

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://julianbentsingh.dk/om-julian/#page",
  "name": "Om Julian Bent Singh",
  "mainEntity": { "@id": "https://julianbentsingh.dk/#julian" }
}
```

##### 8.3 Kursusoversigt (Course List)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AI kurser",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "AI for ledere",
        "description": "Forstå AI muligheder, risici og governance.",
        "provider": { "@id": "https://julianbentsingh.dk/#org" },
        "hasCourseInstance": [{
          "@type": "CourseInstance",
          "courseMode": "online",
          "startDate": "2026-03-10",
          "endDate": "2026-03-10",
          "instructor": { "@id": "https://julianbentsingh.dk/#julian" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "DKK",
            "price": "2995",
            "url": "https://julianbentsingh.dk/kurser/ai-for-ledere/"
          }
        }]
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "name": "AI Prompting Masterclass",
        "description": "Bliv ekspert i at skrive effektive prompts.",
        "provider": { "@id": "https://julianbentsingh.dk/#org" },
        "hasCourseInstance": [{
          "@type": "CourseInstance",
          "courseMode": "blended",
          "instructor": { "@id": "https://julianbentsingh.dk/#julian" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "DKK",
            "price": "4995",
            "url": "https://julianbentsingh.dk/kurser/ai-prompting/"
          }
        }]
      }
    }
  ]
}
```

##### 8.4 Foredrag/Event

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "AI foredrag: Fra hype til handling",
  "startDate": "2026-04-21T18:30:00+02:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Konferencecenter X",
    "address": "Adresse, By, DK"
  },
  "performer": { "@id": "https://julianbentsingh.dk/#julian" },
  "organizer": { "@id": "https://julianbentsingh.dk/#org" },
  "offers": {
    "@type": "Offer",
    "url": "https://julianbentsingh.dk/foredrag/fra-hype-til-handling/",
    "priceCurrency": "DKK",
    "price": "0"
  }
}
```

##### 8.5 Omtale/Press Side (CollectionPage)

```json
{
  "@context": "https://schema.org",
  "@id": "https://julianbentsingh.dk/omtale/#page",
  "@type": "CollectionPage",
  "name": "Omtale, podcasts og profiler – Julian Bent Singh",
  "about": { "@id": "https://julianbentsingh.dk/#julian" },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Udvalgte omtaler",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "Via Ritzau – De 10 største AI-influencers",
          "url": "https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "Seniorfolk – Danmarks førende 15 eksperter i AI (2025)",
          "url": "https://seniorfolk.dk/danmarks-forende-15-eksperter-i-ai-2025/",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "AI Marketing Conference – Speaker profile",
          "url": "https://www.ai-marketingconference.dk/speakers/julian-bentsingh",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": "Dataforeningen Norge – Profil",
          "url": "https://dataforeningen.no/profiler/julian-bent-singh",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "PodcastEpisode",
          "name": "Julian Singh – How to identify & implement AI use cases",
          "url": "https://podcasts.apple.com/dk/podcast/julian-singh-how-to-identify-implement-ai-use-cases/id1804979257?i=1000702973223",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "PodcastEpisode",
          "name": "Han brugte AI til SEO lang tid før ChatGPT",
          "url": "https://www.become.dk/podcast/episode-2-han-brugte-ai-til-seo/",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Article",
          "name": "AI-modellerne er ikke problemet – Bias i skønhedsidealer",
          "url": "https://www.copenhagen-review-of-communication.com/ai-modellerne-er-ikke-problemet-problemet-er-bias-i-skonhedsidealer/",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "VideoObject",
          "name": "AI Vinder Frem – Podcast med Julian Bent Singh",
          "url": "https://www.youtube.com/watch?v=UN0eHK82NyA",
          "about": { "@id": "https://julianbentsingh.dk/#julian" }
        }
      }
    ]
  }
}
```

##### 8.6 AI Growth Minds (Brand-side på julianbentsingh.dk)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "AI Growth Minds – Mit produkt",
  "mainEntity": {
    "@type": "Organization",
    "name": "AI Growth Minds",
    "url": "https://ai-growth-minds.dk/",
    "founder": { "@id": "https://julianbentsingh.dk/#julian" },
    "description": "AI online kursus i automation, AI agents og vibe coding"
  }
}
```

##### 8.7 På ai-growth-minds.dk (modstykke)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ai-growth-minds.dk/#org",
  "name": "AI Growth Minds",
  "url": "https://ai-growth-minds.dk/",
  "founder": {
    "@type": "Person",
    "name": "Julian Bent Singh",
    "url": "https://julianbentsingh.dk/om-julian/"
  }
}
```

---

#### Del 9: AI Overviews Optimering

##### 9.1 Indholdsstruktur der bliver citeret

AI Overviews citerer sider med:

- **Korte definitioner:** "AI strategi er..."
- **Bullets med trin:** "Sådan laver du AI use-case prioritering"
- **Sammenligninger:** "AI kurser vs opkvalificering vs rådgivning"
- **Best practices og pitfalls**
- **Cases med tal**

##### 9.2 NLP-venlig skrivning

- Brug korte, præcise sætninger i starten af afsnit (Inverted Pyramid)
- Besvar "Information-gap" spørgsmål direkte
- Strukturér med H2/H3 headers
- Brug FAQ-sektioner med synlige spørgsmål/svar

##### 9.3 Speakable markup (valgfrit)

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".intro", ".definition", ".faq-answer"]
  }
}
```

---

#### Del 10: Reviews & Testimonials – Forsigtighed

##### 10.1 Googles regler

- "Self-serving reviews" giver typisk **ikke** stjerner i SERP
- Review markup skal følge strenge guidelines
- Risiko for afvisning eller ingen effekt

##### 10.2 Anbefalet tilgang

**Gør dette:**
- Vis testimonials på siden (tekst + navn/rolle/firma)
- Brug omtale-siden som "social proof"
- Vedligehold stærke tredjepartsprofiler (Google Business Profile)

**Undgå dette:**
- `Review`/`AggregateRating` markup på egne testimonials
- "Oppustede" ratings uden basis

---

#### Del 11: Teknisk SEO Tjekliste

##### 11.1 Crawl & Index

- [ ] XML sitemap indsendt til Search Console
- [ ] Robots.txt tillader crawling af vigtige sider
- [ ] Ingen orphan pages (alle sider linket fra mindst én anden)
- [ ] Canonical tags på alle sider

##### 11.2 Performance

- [ ] Core Web Vitals i grønt (især mobil)
- [ ] Billeder optimeret (WebP, lazy loading)
- [ ] Vigtig tekst **ikke kun** i billeder/sliders
- [ ] HTTPS på alt

##### 11.3 Intern linking

- [ ] Breadcrumbs på alle undersider
- [ ] Pillar ↔ Cluster links begge veje
- [ ] Kontekstuelle links i brødtekst
- [ ] Footer-links til vigtigste sider

##### 11.4 Structured Data

- [ ] JSON-LD (ikke Microdata)
- [ ] Valideret i Rich Results Test
- [ ] Matcher synligt indhold 100%
- [ ] Faste `@id` på tværs af sitet

---

#### Del 12: Ekstern Entity Corroboration

##### 12.1 Sådan får du Google til at verificere dig

1. **Podcast-gæsteoptrædener** (du har mange ✅)
2. **Konferencespeaker-profiler** (du har flere ✅)
3. **Branchemedier** (Computerworld, Ritzau ✅)
4. **Partnersider** (Microsoft, Google, leverandører)
5. **Virksomhedsprofiler** (CVR, LinkedIn Company Page, Crunchbase)
6. **Wikidata-entry** (Holy Grail – du har nok presseklip til at kvalificere)

##### 12.2 Link-building strategi

- Sørg for at alle eksterne profiler linker tilbage til julianbentsingh.dk
- Bed konferencearrangører om at opdatere dine speaker-links
- Opdater LinkedIn/profiler med ny URL

---

#### Del 13: 10 Schema-faldgruber at undgå

1. ❌ Markup der **ikke** matcher synligt indhold
2. ❌ "Oppustede" `sameAs` med random kataloger
3. ❌ Review markup på egne testimonials
4. ❌ Flere forskellige `@id` for samme person/virksomhed
5. ❌ Kurser/events uden rigtige datoer/priser/URLs
6. ❌ Brug af udfasede typer/features
7. ❌ Manglende BreadcrumbList
8. ❌ Svag intern linking
9. ❌ At tro schema = ranking
10. ❌ LinkedIn feed-opslag i sameAs (ustabile URNs)

---

#### Del 14: Handlingsplan (Prioriteret rækkefølge)

##### Fase 1: Fundament (Uge 1-2)

- [ ] Køb/opsæt julianbentsingh.dk
- [ ] Implementér global schema (WebSite + Organization + Person)
- [ ] Opret forsiden med tydelig positioning
- [ ] Opret /om-julian/ med fuld bio og credentials

##### Fase 2: Money Pages (Uge 3-4)

- [ ] /ai-konsulent/
- [ ] /ai-ekspert/
- [ ] /ai-strategi/
- [ ] /ai-opkvalificering/
- [ ] /ai-foredrag/
- [ ] /ai-kurser/

##### Fase 3: Proof Layer (Uge 5-6)

- [ ] /omtale/ med kurateret liste (20-40 stærkeste)
- [ ] /cases/ + 3-5 detaljerede cases
- [ ] /ai-growth-minds/ (bro-side)

##### Fase 4: Content & Authority (Løbende)

- [ ] 3-5 ressourcer/templates
- [ ] FAQ-sektioner på alle money-pages
- [ ] Blog/artikler (thought leadership)
- [ ] Opdater eksterne profiler med ny URL

##### Fase 5: Optimering (Løbende)

- [ ] Validér schema i Rich Results Test
- [ ] Monitor Search Console for fejl
- [ ] A/B test meta descriptions
- [ ] Udvid cluster-content

---

#### Del 15: Visualisering af Entity-strukturen

```
                    ┌─────────────────────────────────┐
                    │      EXTERNAL AUTHORITIES       │
                    │  Ritzau, Computerworld, Podcasts│
                    │  Konferencer, LinkedIn posts    │
                    └──────────────┬──────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                     julianbentsingh.dk                           │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                    PERSON ENTITY                        │     │
│  │                  Julian Bent Singh                      │     │
│  │                     @id: #julian                        │     │
│  └─────────────────────────────────────────────────────────┘     │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐               │
│          ▼                   ▼                   ▼               │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐         │
│  │   SERVICES    │  │    COURSES    │  │    PROOF      │         │
│  │ AI Konsulent  │  │  AI Kurser    │  │   /omtale/    │         │
│  │ AI Strategi   │  │  Opkvalif.    │  │   /cases/     │         │
│  │ AI Foredrag   │  │               │  │               │         │
│  └───────────────┘  └───────────────┘  └───────────────┘         │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────────────────┐
                    │       ai-growth-minds.dk        │
                    │      ORGANIZATION ENTITY        │
                    │    founder: #julian (link)      │
                    │    Produkter, Booking, Priser   │
                    └─────────────────────────────────┘
```

---

#### Konklusion

Denne strategi bygger på tre søjler:

1. **Entity Clarity:** Google skal forstå, at Julian Bent Singh = AI Ekspert i Danmark, via konsistent schema med faste `@id`'er og korrekt sameAs/subjectOf-opdeling.

2. **Topical Authority:** Pillar-pages for hver hovedterm med støttesider, intern linking og E-E-A-T proof layer.

3. **External Corroboration:** Udnyt dine mange mentions (Ritzau, Seniorfolk, konferencer, podcasts) som maskinlæsbart bevislag.



	


## SEO SNAK 1

LÆS 'prd\seo-strategi\seo-snak-1.md'

## SEO SNAK 2

LÆS 'prd\seo-strategi\seo-snak-2.md'