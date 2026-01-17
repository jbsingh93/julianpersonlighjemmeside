/**
 * Schema.org konstanter og faste @id'er for julianbentsingh.dk
 *
 * Disse ID'er bruges konsistent på tværs af hele sitet for at
 * skabe en sammenhængende entity-graf i Googles Knowledge Graph.
 */

// Base URL for alle schema @id'er
export const SITE_URL = "https://julianbentsingh.dk";

// Faste @id'er - bruges til at referere til entiteter på tværs af sider
export const SCHEMA_IDS = {
  // Core entiteter
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#org`,
  person: `${SITE_URL}/#julian`,

  // Services
  aiKonsulent: `${SITE_URL}/ai-ydelser/ai-konsulent/#service`,
  aiKurser: `${SITE_URL}/ai-ydelser/fysiske-ai-kurser/#service`,
  aiWorkshop: `${SITE_URL}/ai-ydelser/fysisk-ai-workshop/#service`,
  aiForedrag: `${SITE_URL}/ai-ydelser/foredrag/#service`,
  aiMentor: `${SITE_URL}/ai-ydelser/ai-mentor/#service`,
  onlineKurser: `${SITE_URL}/ai-ydelser/online-ai-kurser/#service`,
  onlineWorkshop: `${SITE_URL}/ai-ydelser/online-ai-workshop/#service`,

  // Sider
  omtalePage: `${SITE_URL}/referencer/#page`,
  aboutPage: `${SITE_URL}/om/#page`,
} as const;

// Person data - Julian Bent Singh
export const JULIAN_DATA = {
  name: "Julian Bent Singh",
  givenName: "Julian",
  familyName: "Bent Singh",
  jobTitle: "AI konsulent, underviser og foredragsholder",
  description: "Specialist i AI-implementering, AI-strategi og opkvalificering af virksomheder. Anerkendt af Ritzau som en af Danmarks førende AI-influencers.",
  email: "kontakt@julianbentsingh.dk",
  url: SITE_URL,
  image: `${SITE_URL}/julian.jpg`, // TODO: Opdater med rigtigt billede

  // Kontrollerede profiler (kun disse i sameAs)
  sameAs: [
    "https://www.linkedin.com/in/julianbentsingh/",
    "https://www.youtube.com/@Julianbentsingh",
    "https://www.instagram.com/julianbentsingh/",
    "https://www.facebook.com/julian.b.singh",
    "https://ai-growth-minds.dk/",
    "https://www.vallora.dk/",
  ],

  // Ekspertområder
  knowsAbout: [
    "AI kurser",
    "AI opkvalificering",
    "AI strategi",
    "AI foredrag",
    "Generativ AI",
    "AI agents",
    "Prompting",
    "LLM governance",
    "AI adoption i virksomheder",
    "ChatGPT",
    "AI implementering",
  ],
} as const;

// Organization data
export const ORG_DATA = {
  name: "Julian Bent Singh",
  legalName: "Julian Bent Singh",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`, // TODO: Opdater med rigtigt logo
  email: "kontakt@julianbentsingh.dk",
  telephone: "+45 00 00 00 00", // TODO: Opdater med rigtigt nummer

  // Relaterede brands
  sameAs: [
    "https://ai-growth-minds.dk/",
  ],

  // Service area
  areaServed: {
    "@type": "Country" as const,
    name: "Denmark",
    alternateName: "DK",
  },
} as const;

// AI Growth Minds (ejet brand)
export const AI_GROWTH_MINDS = {
  name: "AI Growth Minds",
  url: "https://ai-growth-minds.dk/",
  description: "AI online kursus i automation, AI agents og vibe coding",
} as const;

// Vallora AI (nuværende rolle)
export const VALLORA_AI = {
  name: "Vallora AI",
  url: "https://www.vallora.dk/",
  description: "AI-drevet virksomhed specialiseret i kunstig intelligens løsninger",
} as const;

// Høj-autoritets mentions til /referencer/ (omtale) siden
export const HIGH_AUTHORITY_MENTIONS = [
  {
    type: "VideoObject" as const,
    name: "AI Talk & Præsentation (YouTube)",
    url: "https://www.youtube.com/watch?v=Wo2Wq5fvitI",
  },
  {
    type: "VideoObject" as const,
    name: "AI Oplæg & Videndeling (YouTube)",
    url: "https://www.youtube.com/watch?v=oi6XhkeyKrU",
  },
  {
    type: "VideoObject" as const,
    name: "AI Vinder Frem – Podcast med Julian Bent Singh",
    url: "https://www.youtube.com/watch?v=UN0eHK82NyA",
  },
  {
    type: "VideoObject" as const,
    name: "YouTube – Podcast optræden",
    url: "https://www.youtube.com/watch?v=EcbXYMa3Neo",
  },
  {
    type: "WebPage" as const,
    name: "Via Ritzau – De 10 største AI-influencers",
    url: "https://via.ritzau.dk/pressemeddelelse/14539618/dem-bor-du-folge-de-10-storste-ai-influencers",
  },
  {
    type: "WebPage" as const,
    name: "Seniorfolk – Danmarks førende 15 eksperter i AI (2025)",
    url: "https://seniorfolk.dk/danmarks-forende-15-eksperter-i-ai-2025/",
  },
  {
    type: "Article" as const,
    name: "Computerworld – Nørgaard & Singh om Open Source vs Big Tech",
    url: "https://www.computerworld.dk/art/290123/noergaard-skal-vi-satse-paa-open-source-eller-amerikansk-big-tech-i-denne-urolige-tid",
  },
  {
    type: "WebPage" as const,
    name: "AI Marketing Conference – Speaker profile",
    url: "https://www.ai-marketingconference.dk/speakers/julian-bentsingh",
  },
  {
    type: "WebPage" as const,
    name: "Dataforeningen Norge – Profil",
    url: "https://dataforeningen.no/profiler/julian-bent-singh",
  },
  {
    type: "WebPage" as const,
    name: "Sylvester & Co – HR & AI Konferencen",
    url: "https://www.sylvester-co.dk/julian-bent-singh-stifter-af-ai-growth-minds-paa-hr-ai-konferencen-drop-cvet-og-ansaet-paa-mindset/",
  },
  {
    type: "PodcastEpisode" as const,
    name: "Julian Singh – How to identify & implement AI use cases",
    url: "https://podcasts.apple.com/dk/podcast/julian-singh-how-to-identify-implement-ai-use-cases/id1804979257?i=1000702973223",
  },
  {
    type: "PodcastEpisode" as const,
    name: "Han brugte AI til SEO lang tid før ChatGPT",
    url: "https://www.become.dk/podcast/episode-2-han-brugte-ai-til-seo/",
  },
  {
    type: "PodcastEpisode" as const,
    name: "Spotify – AI Podcast episode",
    url: "https://open.spotify.com/episode/7Bfh91fxgnTiOQLTQPHuZU",
  },
  {
    type: "Article" as const,
    name: "AI-modellerne er ikke problemet – Bias i skønhedsidealer",
    url: "https://www.copenhagen-review-of-communication.com/ai-modellerne-er-ikke-problemet-problemet-er-bias-i-skonhedsidealer/",
  },
  {
    type: "WebPage" as const,
    name: "Find AI Kursus – Bedste AI Kurser",
    url: "https://www.findaikursus.dk/bedste-ai-kurser",
  },
  {
    type: "WebPage" as const,
    name: "Den Danske Reklameskole – Underviser",
    url: "https://www.dendanskereklameskole.dk/cm/undervisere/",
  },
  {
    type: "SoftwareApplication" as const,
    name: "Korrekturlæser – Custom GPT",
    url: "https://chatgpt.com/g/g-I2LQ7UWw4-korrekturlaeser",
  },
  {
    type: "Article" as const,
    name: "Morningscore – ChatGPT SEO Content Prompts",
    url: "https://morningscore.io/chatgpt-seo-content-prompts/",
  },
] as const;
