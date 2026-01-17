# SEO SNAK 2


MIG:
JEG SKAL LAVE EN HJEMMESIDE SÅ JEG KAN RANKE HØJERE I SEO OG ISÆR I GOOGLE AI OVERVIEW FOR TERMERNE SOM:

- AI kurser 
- AI Konsulent
- AI ekspert 
- AI foredrag
- AI strategi
- AI opkvalificering

TIL DETTE SKAL JEG VÆRE SUPER SEO SPECIALIST. JEG SKAL ISÆR BRUGE SCHEMA MARKUP TIL AT DANNE lave en fuld enitiy base rundt om mig, så den samler alle mine same as, creative work, offers, review osv.

MEN HVAD SKAL JEG ELLERS GØRE OG HVILKE KONKRETE SCHEMA SKAL JEG BRUGE?


ASSISTENT:
Du tænker helt rigtigt i **entity/Knowledge Graph** og i at få “SameAs + relationer” til at hænge sammen – men en vigtig præmis først:

Google skriver direkte, at **der ikke findes “special schema” du skal tilføje for at blive vist i AI Overviews / AI Mode**. Det er stadig de klassiske SEO-best-practices (crawl/index, intern linking, hjælpsomt indhold, page experience osv.), og at dit structured data **matcher det synlige indhold**. ([Google for Developers][1])

Når det er sagt: **Schema er stadig super nyttigt** til at gøre dine entiteter og tilbud maskinlæsbare og konsistente (og kan give rich results for fx kursuslister, events, video). ([Google for Developers][2])

---

## Hvad du ellers skal gøre (så du faktisk bliver “valgt” til AI Overviews)

### 1) Byg topical authority som et “hub + clusters” setup

Lav 6 **pillar-sider** (én for hver term) og 6–15 støttesider pr. pillar (cases, frameworks, FAQ, “sådan gør du”, værktøjer, skabeloner, prissider).

**Pillar-forslag (med tydelig search intent):**

* **AI kurser** → kursuskatalog + målgrupper + udbytte + moduler + datoer + FAQ
* **AI opkvalificering** → kompetenceforløb (teams/ledelse) + måling/ROI + cases
* **AI strategi** → “strategi-framework” + governance + use-case prioritering + roadmap
* **AI konsulent / AI ekspert** → rådgivningsydelser + cases + proces + “hvem passer det til”
* **AI foredrag** → emner + showreel/video + tidligere kunder + bookingflow

AI Overviews bygger på Googles eksisterende ranking-/kvalitetssystemer og viser links til sider, der **understøtter** svaret. 

### 2) Gør din “proof layer” ekstremt tydelig (E-E-A-T i praksis)

På alle money-sider:

* **Konkrete cases** (problem → metode → resultat → tal)
* **Metode/rammeværk** (trinvis proces, templates)
* **Kvalifikationer** (certificeringer, uddannelse, erfaring)
* **Medieomtale / talks / podcasts / publikationer**
* **Kontakt + virksomhedsdata** (CVR, adresse, telefon) hvis relevant

### 3) Få eksterne “entity corroborations”

AI Overviews og Knowledge Graph bliver stærkere når andre troværdige kilder bekræfter dig:

* Podcast-gæsteoptrædener, konferencer, branchemedier
* Partnersider (Microsoft/Google/leverandører), cases hos kunder
* Virksomhedsprofiler (fx CVR, LinkedIn company page, Crunchbase hvis relevant)

### 4) Teknisk: gør det nemt at crawle/forstå

* Intern linking mellem pillar ↔ cluster (det nævner Google eksplicit) ([Google for Developers][1])
* Sørg for at vigtig tekst **ikke kun** er i billeder/sliders
* Core Web Vitals / performance (især mobil)
* Stram informationsarkitektur + breadcrumbs

---

## Konkrete schema-typer du bør bruge (pr. sidetype)

### A) Site-wide (på tværs af sitet)

1. **WebSite** (+ `SearchAction` for sitelinks searchbox)
2. **Organization** *eller* **LocalBusiness/ProfessionalService** (hvis du har fysisk base og/eller lokal intent)
3. **Person** (dig som primær entitet)
4. **BreadcrumbList** (på alle undersider)

Google har ingen krav om “AI markup”, men structured data skal følge policies og matche synligt indhold. ([Google for Developers][1])

### B) Hjemmeside (HomePage)

* **WebPage** (`@type`: `WebPage` eller `HomePage`)
* Link til din **Person** og **Organization/LocalBusiness** via samme `@id`
* Vis dine primære ydelser som **Service** + **Offer** (eller **OfferCatalog** hvis du har mange)

### C) Om mig (AboutPage)

* **AboutPage**
* Udbyg **Person**: `jobTitle`, `knowsAbout`, `hasCredential`, `alumniOf`, `memberOf`, `award`, `sameAs`
* Tilføj **CreativeWork** for ting du faktisk har lavet: artikler, videoer, podcasts, slides (med egne URL’er)

### D) Ydelsessider (AI konsulent / ekspert / strategi / opkvalificering / foredrag som “booking”)

* **Service** (én service pr. side)

  * `provider` → din Organization/Person
  * `areaServed` (DK/region)
  * `offers` → **Offer** (pris “Fra …” er ok hvis det er sandt og synligt)
* Evt. **FAQPage** (kun hvis FAQ’en står synligt på siden)

### E) AI kurser

Brug **Course list (Course)** markup på sider med kursusoversigt. Google har opdateret dokumentationen (Dec 10, 2025). ([Google for Developers][3])

> Vigtigt: “Course Info” rich result er udfaset, men **Course list** er stadig dokumenteret. ([Google for Developers][4])

### F) AI foredrag som konkrete datoer

* **Event** på hver event-side (dato, sted, pris/booking)
* Har du video fra foredrag: **VideoObject** på watch-/landing-siden ([Google for Developers][5])

---

## Reviews/testimonials: pas på (meget vigtigt)

Google’s review snippet regler er stramme, og “self-serving reviews” giver typisk ikke stjerner i SERP. Brug testimonials på siden (godt!), men vær konservativ med **Review/AggregateRating** markup, medmindre du opfylder Googles krav for den specifikke feature. ([Google for Developers][6])
**Sikkert alternativ:** Vis testimonials uden Review markup + sørg for stærke tredjepartsprofiler (fx Google Business Profile). ([Google for Developers][1])

---

## En praktisk “entity graph” opskrift (JSON-LD blueprint)

Nøglen er at bruge stabile `@id`’er og forbinde alt i én graf.

### 1) På forsiden: WebSite + Organization/LocalBusiness + Person + Services

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ditdomæne.dk/#website",
      "url": "https://ditdomæne.dk/",
      "name": "Dit Navn – AI kurser, rådgivning og foredrag",
      "publisher": { "@id": "https://ditdomæne.dk/#org" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ditdomæne.dk/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": ["Organization","ProfessionalService"],
      "@id": "https://ditdomæne.dk/#org",
      "name": "Dit Firmanavn",
      "url": "https://ditdomæne.dk/",
      "logo": "https://ditdomæne.dk/assets/logo.png",
      "telephone": "+45XXXXXXXX",
      "email": "kontakt@ditdomæne.dk",
      "sameAs": [
        "https://www.linkedin.com/in/dit-handle/",
        "https://www.youtube.com/@dit-handle"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://ditdomæne.dk/#person",
      "name": "Dit Navn",
      "url": "https://ditdomæne.dk/om-mig/",
      "image": "https://ditdomæne.dk/assets/dit-portraet.jpg",
      "jobTitle": "AI konsulent og underviser",
      "worksFor": { "@id": "https://ditdomæne.dk/#org" },
      "knowsAbout": [
        "AI strategi",
        "AI opkvalificering",
        "Prompting",
        "LLM governance",
        "AI adoption i virksomheder"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/dit-handle/"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://ditdomæne.dk/ai-strategi/#service",
      "name": "AI strategi",
      "provider": { "@id": "https://ditdomæne.dk/#org" },
      "areaServed": "DK",
      "offers": {
        "@type": "Offer",
        "url": "https://ditdomæne.dk/ai-strategi/",
        "priceCurrency": "DKK",
        "price": "15000",
        "description": "Workshop + roadmap (eksempel – skal matche det synlige på siden)"
      }
    }
  ]
}
</script>
```

### 2) Kursusoversigt: Course (list) + CourseInstance + Offer

```html
<script type="application/ld+json">
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
        "provider": { "@id": "https://ditdomæne.dk/#org" },
        "hasCourseInstance": [{
          "@type": "CourseInstance",
          "courseMode": "online",
          "startDate": "2026-03-10",
          "endDate": "2026-03-10",
          "instructor": { "@id": "https://ditdomæne.dk/#person" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "DKK",
            "price": "2995",
            "url": "https://ditdomæne.dk/kurser/ai-for-ledere/"
          }
        }]
      }
    }
  ]
}
</script>
```

(Brug Googles Course list guide som reference for felter/krav.) ([Google for Developers][3])

### 3) Foredrag-event: Event

```html
<script type="application/ld+json">
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
  "performer": { "@id": "https://ditdomæne.dk/#person" },
  "organizer": { "@id": "https://ditdomæne.dk/#org" },
  "offers": {
    "@type": "Offer",
    "url": "https://ditdomæne.dk/foredrag/fra-hype-til-handling/",
    "priceCurrency": "DKK",
    "price": "0"
  }
}
</script>
```

(Event markup skal følge Googles event-guidelines.) ([Google for Developers][7])

---

## 10 hurtige schema-faldgruber (der typisk saboterer)

* Markup der **ikke** matcher synligt indhold (bliver ignoreret) ([Google for Developers][1])
* “Oppustede” `sameAs` med random kataloger (hold dig til officielle profiler)
* Review markup på egne testimonials (risiko for ingen effekt / afvisning) ([Google for Developers][6])
* Flere forskellige `@id` for samme person/virksomhed (splitter entiteten)
* Kurser/events uden rigtige datoer/priser/URL’er
* Brug af udfasede typer/features (Google har fjernet en del rich result features) ([Google for Developers][4])
* Manglende `BreadcrumbList` + svag intern linking ([Google for Developers][1])
* At tro schema = ranking (det hjælper forståelse; ikke en “rank-knap”) ([Google for Developers][2])

---

[1]: https://developers.google.com/search/docs/appearance/ai-features "AI Features and Your Website | Google Search Central  |  Documentation  |  Google for Developers"
[2]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?utm_source=chatgpt.com "Introduction to structured data markup in Google Search"
[3]: https://developers.google.com/search/docs/appearance/structured-data/course?utm_source=chatgpt.com "Use Schema for Course List | Google Search Central"
[4]: https://developers.google.com/search/blog/2025/06/simplifying-search-results?utm_source=chatgpt.com "Simplifying the search results page"
[5]: https://developers.google.com/search/docs/appearance/structured-data/video?utm_source=chatgpt.com "Video ( VideoObject , Clip , BroadcastEvent ) structured data"
[6]: https://developers.google.com/search/docs/appearance/structured-data/review-snippet?utm_source=chatgpt.com "Review Snippet (Review, AggregateRating) Structured Data"
[7]: https://developers.google.com/search/docs/appearance/structured-data/event?utm_source=chatgpt.com "Learn About Google Event Schema Markup"


MIG:
HAR DENNE LISTE OVER ALLE DE STEDER JEG ER NÆVNT:


ASSISTENT:
Perfekt — den liste er **guld** til at bygge en “entity graph”, men du skal bruge den rigtigt.

Den korte sandhed: **du skal ikke smide alle URLs i `sameAs`.**
`sameAs` bør primært være **profiler/kanaler du selv kontrollerer** (stabile identiteter). Resten skal du bruge som **beviser/omtaler/creative works** via `subjectOf`, `citation`, `about` og en “Press & mentions”-side.

Samtidig: Google er meget tydelige om, at structured data **skal matche synligt indhold** og at der ikke er garanti for features — og deres AI-features side nævner stadig de klassiske ting (crawl, interne links, tekstindhold, page experience, korrekt structured data, GBP/MC-data osv.). ([Google for Developers][1])

---

## 1) Sådan bruger du din liste (den rigtige opdeling)

### A) `sameAs` (kun “kontrollerede identiteter”)

Brug typisk kun:

* Din LinkedIn **profil** (✅)
* Din YouTube **kanal** (helst kanal-URL, ikke enkeltvideoer)
* Din Instagram **profil** (✅)
* Evt. din Facebook **side** (ikke random opslag)
* Evt. produkt/brand-domæner du ejer (fx AI Growth Minds) hvis det reelt er et brand/virksomhed du kontrollerer ([AI Growth Minds][2])

**Undgå** at putte:

* LinkedIn feed-opslag (ustabile, ofte “urn:li:activity…”, ikke identitet)
* Enkeltstående podcast-episodesider, konferencetalersider, presseartikler osv. (de er “mentions”, ikke identitet)

### B) “Mentions / Press / Profiles” (brug `subjectOf` + `citation`)

Alt det her er *perfekt* som bevislag:

* Konference-speaker sider (AI Marketing Conference, Sylvester/HR AI-konference, Dataforeningen profil) ([AI Marketing Conference][3])
* Lister/omtaler (“AI influencers”, “AI eksperter 2025”) ([Via Ritzau][4])
* Artikler du har skrevet (CreativeWork/Article) ([copenhagen-review-of-communication.com][5])
* Podcasts (PodcastEpisode) ([Apple Podcasts][6])
* Kursus-omtaler og kursus-lister (Course/ItemList kontekst) ([findaikursus.dk][7])
* Underviserprofiler (EducationalOrganization-side) ([Den Danske Reklameskole][8])

**Det rigtige move:** lav én stærk side på dit site:
`/omtale/` eller `/press/` eller `/julian-bent-singh-omtale/`
…hvor du lister alt dette som en kurateret “As seen in”-liste.

---

## 2) Den optimale schema-arkitektur (så Google får en clean entity)

### Lag 1: Canonical entity (på dit eget site)

På forsiden (eller en “om mig” side) skal du have en **fast `@id`** for dig:

* `Person` (dig) med `@id`: `https://ditdomæne.dk/#julian`
* `Organization` (din virksomhed) med `@id`: `https://ditdomæne.dk/#org`
* `WebSite` med `publisher` = org
* `sameAs` = kun kontrollerede profiler

### Lag 2: Bevislag (Press/Mentions side)

På `/omtale/` laver du en `ItemList` af `CreativeWork`-objekter:

* `Article`
* `PodcastEpisode`
* `WebPage` (speaker pages / profiler)
* `WebPage` (lister/awards)

Hver entry får:

* `url`
* `name`
* `publisher` (hvis du kender den)
* `datePublished` (hvis du kender den)
* `about`: peger på din `Person @id`

### Lag 3: Dine ydelser (SEO-termerne)

På dine money pages bruger du:

* `Service` + `Offer` (AI konsulent, AI strategi, AI foredrag, opkvalificering)
* `Course` (kursuslister) ([Google for Developers][9])
* `Event` (konkrete foredrag med dato/sted) ([Google for Developers][10])
* `FAQPage` hvor du har synlig FAQ ([Google for Developers][11])

---

## 3) Konkrete JSON-LD skabeloner (klar til at copy/paste)

### A) Global “entity base” (på forsiden)

> Udfyld med dit domæne, billeder, telefon, osv.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ditdomæne.dk/#website",
      "url": "https://ditdomæne.dk/",
      "name": "Julian Bent Singh",
      "publisher": { "@id": "https://ditdomæne.dk/#org" }
    },
    {
      "@type": ["Organization","ProfessionalService"],
      "@id": "https://ditdomæne.dk/#org",
      "name": "Dit firmanavn",
      "url": "https://ditdomæne.dk/",
      "logo": "https://ditdomæne.dk/assets/logo.png",
      "email": "kontakt@ditdomæne.dk",
      "telephone": "+45XXXXXXXX",
      "sameAs": [
        "https://ai-growth-minds.dk/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://ditdomæne.dk/#julian",
      "name": "Julian Bent Singh",
      "url": "https://ditdomæne.dk/om-julian/",
      "image": "https://ditdomæne.dk/assets/julian.jpg",
      "jobTitle": "AI konsulent, underviser og foredragsholder",
      "worksFor": { "@id": "https://ditdomæne.dk/#org" },
      "knowsAbout": [
        "AI kurser",
        "AI opkvalificering",
        "AI strategi",
        "AI foredrag",
        "Generativ AI",
        "AI agents",
        "Prompting"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/julianbentsingh/",
        "https://www.instagram.com/DIT-HANDLE/"
      ],
      "subjectOf": {
        "@id": "https://ditdomæne.dk/omtale/#page"
      }
    }
  ]
}
</script>
```

**Hvorfor sådan?** Fordi du samler alt i én canonical `@id` og peger *alt bevis* over på `/omtale/`. Og husk: structured data skal afspejle synligt indhold. ([Google for Developers][1])

---

### B) Press & mentions side (din liste bliver “maskinlæsbar”)

Her bruger vi nogle af dine konkrete kilder som eksempler:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@id": "https://ditdomæne.dk/omtale/#page",
  "@type": "CollectionPage",
  "name": "Omtale, podcasts og profiler – Julian Bent Singh",
  "about": { "@id": "https://ditdomæne.dk/#julian" },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Udvalgte omtaler",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "AI Marketing Conference – speaker profile",
          "url": "https://www.ai-marketingconference.dk/speakers/julian-bentsingh",
          "about": { "@id": "https://ditdomæne.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "Via Ritzau / 24Victoria – De 10 største AI-influencers",
          "url": "https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers",
          "about": { "@id": "https://ditdomæne.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": "Seniorfolk – Danmarks førende 15 eksperter i AI (2025)",
          "url": "https://seniorfolk.dk/danmarks-forende-15-eksperter-i-ai-2025/",
          "about": { "@id": "https://ditdomæne.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "PodcastEpisode",
          "name": "Julian Singh – How to identify & implement AI use cases…",
          "url": "https://podcasts.apple.com/dk/podcast/julian-singh-how-to-identify-implement-ai-use-cases/id1804979257?i=1000702973223",
          "about": { "@id": "https://ditdomæne.dk/#julian" }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Article",
          "name": "AI-modellerne er ikke problemet…",
          "url": "https://www.copenhagen-review-of-communication.com/ai-modellerne-er-ikke-problemet-problemet-er-bias-i-skonhedsidealer/",
          "about": { "@id": "https://ditdomæne.dk/#julian" }
        }
      }
    ]
  }
}
</script>
```

De kilder ovenfor understøtter direkte dine claims (speaker, influencer-liste, ekspert-liste, podcast-episode, forfatter). ([AI Marketing Conference][3])

---

### C) Kursus-SEO: Brug `Course list` rigtigt

Når du lister kurser på dit eget site, brug Googles `Course`-struktur (Course list). ([Google for Developers][9])

---

## 4) Reviews: du HAR reviews — men markér dem rigtigt

Du har en masse “reviews/ros”-links i din liste (FB posts, omtaler, sider der nævner dig).
**Vær forsigtig med `Review`/`AggregateRating` på dit eget site**, fordi Google specifikt har strammet op på “self-serving reviews”. ([Google for Developers][12])

**Bedste praksis i din situation:**

* Vis testimonials på siden (tekst + navn/rolle/company hvis du har tilladelse)
* Brug schema på dem kun hvis du 100% følger guidelines og det er reelle “third-party reviews” på en side der handler om det relevante item
* Brug i stedet dine tredjeparts-omtaler (Ritzau/Seniorfolk/konferencer/podcasts) som dit “proof layer” (via `/omtale/`)

---

## 5) Hvad du skal gøre næste (helt konkret)

1. Lav **/om-julian/** + **/omtale/**
2. Implementér **Person + Organization + WebSite** (fast `@id`)
3. Kuratér din liste (20–40 stærkeste først) og markér dem som **ItemList of CreativeWork**
4. Byg dine 6 pillar-sider (AI kurser, AI konsulent, AI ekspert, AI foredrag, AI strategi, AI opkvalificering) med **Service/Offer + FAQPage** hvor relevant
5. Sørg for at alt schema **matcher synligt indhold** (ellers bliver det ignoreret / risikerer manual actions) ([Google for Developers][1])

---

Hvis du vil have det ekstra skarpt: Jeg kan tage **din fulde URL-liste** og give dig en “cleaned mapping” i 3 kolonner:

* `sameAs` (max 5–10)
* `Press/Mentions` (ItemList entries)
* `CreativeWork` (artikel/podcast/video/event) + anbefalet type

…men uden at stille spørgsmål: Jeg vil som standard prioritere *Ritzau, Seniorfolk, Dataforeningen, konferencerne, Apple/Spotify/Podimo og dine egne domæner* øverst, fordi de er mest “entity-bærende” og troværdige.

[1]: https://developers.google.com/search/docs/appearance/structured-data/sd-policies?utm_source=chatgpt.com "General Structured Data Guidelines | Google Search Central"
[2]: https://ai-growth-minds.dk/ "AI Growth Minds | AI online kursus i automation, AI agents og vibe coding"
[3]: https://www.ai-marketingconference.dk/speakers/julian-bentsingh "AI Marketing Conference"
[4]: https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers "Dem bør du følge: De 10 største AI-influencers | 24Victoria"
[5]: https://www.copenhagen-review-of-communication.com/ai-modellerne-er-ikke-problemet-problemet-er-bias-i-skonhedsidealer/ "AI-modellerne er ikke problemet. Problemet er bias i skønhedsidealer"
[6]: https://podcasts.apple.com/dk/podcast/julian-singh-how-to-identify-implement-ai-use-cases/id1804979257?i=1000702973223 "Julian Singh - How to identify…–Leapfrog – Apple Podcasts"
[7]: https://www.findaikursus.dk/bedste-ai-kurser "Top 15 Bedste AI Kurser i Danmark (2026) - Ekspertudvalgt | Find AI Kurser"
[8]: https://www.dendanskereklameskole.dk/cm/undervisere/ "Mød Content Marketing Eksperterne - Hold 04 [2025/2026]"
[9]: https://developers.google.com/search/docs/appearance/structured-data/course?utm_source=chatgpt.com "Use Schema for Course List | Google Search Central"
[10]: https://developers.google.com/search/docs/appearance/structured-data/event?utm_source=chatgpt.com "Learn About Google Event Schema Markup"
[11]: https://developers.google.com/search/docs/appearance/structured-data/faqpage?utm_source=chatgpt.com "FAQ ( FAQPage , Question , Answer ) structured data"
[12]: https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful?utm_source=chatgpt.com "Making Review Rich Results more helpful"


MIG:
JEG VIL LAVE EN PERSONLIG HJEMMESIDE DER HEDDER JULIANBENTSINGH.DK OG DET ER DENNE JEG VIL BRUGE TIL OVENSTÅENDE (MEN DU MÅ OGSÅ GERNE FORKLARE MIG, HVORDAN JEG STRATEGISK KAN SPILLE AI-GROWTH-MINDS.DK SAMMEN)


ASSISTEN:
Fedt — **julianbentsingh.dk** er det perfekte “entity-hub” (dig som Person), og **ai-growth-minds.dk** kan fungere som dit “product/brand-hub”. Tricket er at få dem til at **støtte hinanden uden at kannibalisere** på de samme søgeord.

Her er en strategi, der både styrker SEO og gør din entity tydelig for Google.

---

## 1) Rollerne: hvem skal ranke for hvad?

### JulianBentSingh.dk = *dig / services / autoritet*

Skal eje og ranke på:

* **AI konsulent / AI ekspert**
* **AI strategi**
* **AI foredrag**
* **AI opkvalificering**
* (og evt. “AI kurser” som *personlige kurser/forløb* hvis det er dig som leverer)

**Positionering:** “Julian Bent Singh” er *personen* som leverer ydelserne.

### AI-Growth-Minds.dk = *brand / produkt / community / program*

Skal eje og ranke på:

* Brand + produktnavn (“AI Growth Minds”)
* Produktrelaterede intents: “AI community”, “AI playbooks”, “AI templates”, “AI prompts”, “AI growth” (alt efter hvad produktet reelt er)

**Positionering:** “AI Growth Minds” er *brandet/produktet*, skabt af dig.

> Så undgår du at begge domæner prøver at ranke på “AI strategi” med næsten samme side → det er klassisk kannibalisering.

---

## 2) Informationsarkitektur på julianbentsingh.dk (den skal være “money-first”)

**Minimum-sitemap (meget stærkt setup):**

* `/` (Home)
* `/om-julian/` (About)
* `/ydelser/` (kort oversigt)

  * `/ai-konsulent/`
  * `/ai-ekspert/`
  * `/ai-strategi/`
  * `/ai-opkvalificering/`
  * `/ai-foredrag/`
  * `/ai-kurser/` (kursusoversigt)
* `/cases/` (casehub + 5–15 cases over tid)
* `/omtale/` (press/podcasts/konferencer – din liste)
* `/ressourcer/` (playbooks, frameworks, templates, prompt-bibliotek)
* `/kontakt/`

**Vigtigt:** Hver ydelsesside skal have:

* “Hvad får du” (konkrete deliverables)
* “Proces” (trin)
* “Hvem er det til”
* “Eksempler/cases”
* “FAQ”
* CTA (book / kontakt)

---

## 3) Hvordan du strategisk spiller AI-Growth-Minds.dk sammen med julianbentsingh.dk

### A) Lav en “AI Growth Minds”-side på julianbentsingh.dk

Fx: `/ai-growth-minds/`

Indhold:

* Hvad er det (brand/produkt)
* Hvem er det til
* Resultater (hvis du har)
* Link til ai-growth-minds.dk
* Hvordan det relaterer til dine ydelser (fx “bruges i mine kurser / bruges i strategi-workshops”)

**SEO-vinkel:** Den side hjælper dig med at forbinde din Person-entity med brandet uden at flytte “AI strategi” osv. over på produktdomænet.

### B) På AI-Growth-Minds.dk: “Founded by Julian Bent Singh”

* En tydelig sektion i footer + om-side:

  * “Founded by Julian Bent Singh” + link til julianbentsingh.dk/om-julian/
* Evt. “Meet the founder” med kort bio og link.

**Det her er en kæmpe entity-signalering**: brandet har en “owner/founder” som er en rigtig person med en stærk hjemmeside.

### C) Canonical content og linkflow

* På julianbentsingh.dk skriver du “thought leadership”/artikler, cases og frameworks.
* På ai-growth-minds.dk laver du produktsider, onboarding, feature-/modul-sider, pricing, demo osv.
* Når du nævner frameworks/playbooks, kan du:

  * Have *originalen* som artikel på julianbentsingh.dk
  * Have en “implementér det i AI Growth Minds”-landingsside på produktdomænet, der linker tilbage til originalen.

---

## 4) Schema: sådan binder du “Person ↔ Brand/Organization ↔ Offers ↔ Proof” sammen

### På julianbentsingh.dk (core)

Du skal bruge et stabilt entity-setup med faste `@id`’er:

**Site-wide / global:**

* `WebSite`
* `Person` (dig) **som primær entitet**
* `Organization` eller `ProfessionalService` (hvis du har firma)
* `BreadcrumbList` (på undersider)

**Pr. ydelsesside:**

* `Service` + `Offer`
* `FAQPage` (kun hvis FAQ står synligt)

**Kurser:**

* `Course` (kursusoversigt) + evt. `CourseInstance` hvis du har datoer

**Foredrag med dato:**

* `Event` (når der er konkrete events/datoer)

**Omtale-side:**

* `CollectionPage` + `ItemList` af `CreativeWork`/`Article`/`PodcastEpisode`/`VideoObject`/`WebPage`
* Brug `about` til at pege på din `Person @id` (så mentions bliver “about Julian”)

### På ai-growth-minds.dk (brand/product)

Her skal du primært have:

* `Organization` (AI Growth Minds) eller `Brand`
* `Product` (hvis det er et produkt), eller `Service` (hvis det er et forløb/medlemskab)
* `Offer` (pricing)
* “Founder” relation til din Person (link til din Person URL)

---

## 5) Konkrete schema-eksempler for at forbinde domænerne

### A) På julianbentsingh.dk: Person der “owns/founder of” brandet

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://julianbentsingh.dk/#julian",
      "name": "Julian Bent Singh",
      "url": "https://julianbentsingh.dk/om-julian/",
      "sameAs": [
        "https://www.linkedin.com/in/julianbentsingh/"
      ],
      "owns": {
        "@type": "Organization",
        "name": "AI Growth Minds",
        "url": "https://ai-growth-minds.dk/"
      }
    }
  ]
}
</script>
```

### B) På ai-growth-minds.dk: Organization med founder (der linker til din person-side)

```html
<script type="application/ld+json">
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
</script>
```

> Brug kun relationer du kan stå 100% på (og som er tydelige på siden).

---

## 6) AI Overview-vinklen (praktisk “AEO” uden hype)

Hvis du vil “vinde” synlighed i AI-svar, så skriv indhold der er **nemt at citere**:

* korte definitioner (“AI strategi er …”)
* bullets med trin (“Sådan laver du AI use-case prioritering”)
* sammenligninger (“AI kurser vs opkvalificering vs rådgivning”)
* tydelige “best practices” og “pitfalls”
* cases med tal

AI Overviews citerer ofte sider der har klare, konkrete passager der kan løftes ind i et svar.

---

## 7) En meget konkret plan (de næste 10 sider du bør lave)

På julianbentsingh.dk:

1. `/ai-konsulent/`
2. `/ai-ekspert/`
3. `/ai-strategi/`
4. `/ai-opkvalificering/`
5. `/ai-foredrag/`
6. `/ai-kurser/`
7. `/cases/` + 3 cases
8. `/omtale/` (din liste kurateret)
9. `/ai-growth-minds/` (bro-siden)
10. 3–5 ressourcer (templates/frameworks) som kan linkes fra alle money-sider

---
