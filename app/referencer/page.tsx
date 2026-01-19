import type { Metadata } from "next";
import References from "@/components/References";
import JsonLd from "@/components/JsonLd";
import Avatar from "@/components/Avatar";
import {
  SITE_URL,
  SCHEMA_IDS,
  JULIAN_DATA,
  buildOmtalePageSchema,
  buildBreadcrumbSchema,
  HIGH_AUTHORITY_MENTIONS,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Referencer & Omtaler | Julian Bent Singh",
  description:
    "Se, hvem Julian Bent Singh har hjulpet og hvor han er nævnt. Omtaler i Ritzau, Computerworld, podcasts og på konferencer. Danmarks førende AI-ekspert.",
  keywords: [
    "Julian Bent Singh Referencer",
    "AI Ekspert Omtaler",
    "AI Foredragsholder Press",
    "Julian Singh Podcasts",
  ],
  alternates: {
    canonical: `${SITE_URL}/referencer/`,
  },
  openGraph: {
    title: "Referencer & Omtaler – Julian Bent Singh",
    description:
      "Se hvor Julian Bent Singh er nævnt: Ritzau, Computerworld, podcasts og konferencer.",
    url: `${SITE_URL}/referencer/`,
    type: "website",
  },
};

// LinkedIn mentions med rigtige links og kontekst
const LINKEDIN_MENTIONS = [
  {
    quote:
      "Julian Bent Singh er tidligt ude med julegaverne i år. Jeg har selv tårnhøje forventninger til hans gratis vibe coding seminar.",
    name: "Susanne Nielsen",
    context: "Om Julians gratis vibe coding seminar",
    url: "https://www.linkedin.com/posts/susanne-nielsen-79225b56_552-mennesker-har-allerede-sagt-ja-til-at-activity-7394658339126685696-zO0i",
    avatar: "/references/linkedin/susanne.jpg",
  },
  {
    quote:
      "Julian har trænet over 2800+ professionelle i AI i 2025. De fleste kæmper ikke med AI-skills, men med at gentænke processer helt fra bunden.",
    name: "Niels Hermansen",
    context: "Om Julians AI-indsigter",
    url: "https://www.linkedin.com/posts/niels-hermansen_jeg-har-opkvalificeret-over-2800-professionelle-activity-7415021941532696576-jKXw",
    avatar: "/references/linkedin/niels.jpg",
  },
  {
    quote:
      "Vores seneste podcast-episode udforsker, hvordan Julian brugte AI til SEO lang tid før ChatGPT var en ting.",
    name: "Lars Skjoldby",
    context: "AI vinder frem podcast",
    url: "https://www.linkedin.com/posts/larsskjoldby_hold-k%C3%A6ft-hvor-er-det-her-ai-smart-men-activity-7392849580146728960-nqrb",
    avatar: "/references/linkedin/lars.jpg",
  },
  {
    quote:
      "AI isn't replacing you – it's amplifying what you bring to the table. Lyt til vores podcast-episode 'Leapfrog with Julian Bent Singh'.",
    name: "Hannibal Herforth",
    context: "Leapfrog podcast",
    url: "https://www.linkedin.com/posts/hannibalherforth_ai-isnt-replacing-you-its-amplifying-activity-7316371384719355904-WwNX",
    avatar: "/references/linkedin/hannibal.jpg",
  },
  {
    quote:
      "Brug AI som en 'partner in crime'. Min historie om AI minder om et indlæg af Julian Bent Singh om at følge med AI-udviklingen.",
    name: "Kim Sonne",
    context: "Om AI som kollega",
    url: "https://www.linkedin.com/posts/kim-sonne-hansen-48b901a5_partnerincrime-welcometotheaijungle-activity-7411692621577900032-AlyF",
    avatar: "/references/linkedin/kim.jpg",
  },
  {
    quote:
      "AI eller dø - det er titlen på vores nye podcast med Julian Bent Singh om AI i e-commerce. Jeg blev overrasket over, hvor han IKKE anbefaler AI.",
    name: "Mathias Chr Hansen",
    context: "AI eller dø podcast",
    url: "https://www.linkedin.com/posts/mathiaschrhansen_ai-eller-d%C3%B8-det-er-titlen-p%C3%A5-vores-nye-activity-7404454719894712320-xIPA",
    avatar: "/references/linkedin/mathias.jpg",
  },
];

// Trustpilot reviews med rigtige links, navne og citater
const TRUSTPILOT_REVIEWS = [
  {
    url: "https://www.trustpilot.com/reviews/68f09e3202d3ec0b16c6a248",
    name: "Rida",
    quote:
      "Kurset er velstruktureret, gennemarbejdet og meget hands-on, så man hele tiden får konkrete værktøjer, man kan bruge i praksis.",
    date: "16. oktober 2025",
    avatar: "/references/trustpilot/rida.webp",
  },
  {
    url: "https://www.trustpilot.com/reviews/68063e4daca09ea151fc4dec",
    name: "Kristian Krogh Bang",
    quote:
      "Det bedste AI kursus i DK. Julians ekspertise skinner igennem, og kurset giver indblik i hans AI-first mindset.",
    date: "21. april 2025",
    avatar: "/references/trustpilot/kristian.png",
  },
  {
    url: "https://www.trustpilot.com/reviews/6804ba1fd2bdb7a9220074a1",
    name: "Bejer",
    quote:
      "Et kursus der forandrer – ikke bare din forretning, men din måde at tænke på. Julian er pædagogisk og passioneret.",
    date: "20. april 2025",
    avatar: "/references/trustpilot/bejer.webp",
  },
  {
    url: "https://www.trustpilot.com/reviews/67f3b4c088ab9bdfe8241953",
    name: "Lui Høyer",
    quote:
      "Nok den bedste investering nogensinde. Sjældent finder du en så passioneret og fag-nørdet person, som samtidig er god til at forklare.",
    date: "7. april 2025",
    avatar: "/references/trustpilot/lui.png",
  },
  {
    url: "https://www.trustpilot.com/reviews/67ee397b8541dc31efad2770",
    name: "Mogens Kramtoft",
    quote:
      "Den bedste investering i mig selv. Trods næsten pensionsalder og ingen teknisk baggrund, byggede jeg en funktionel AI-app.",
    date: "3. april 2025",
    avatar: "/references/trustpilot/mogens.png",
  },
  {
    url: "https://www.trustpilot.com/reviews/67ea65c7a7c485818343906b",
    name: "Meta Højholdt",
    quote:
      "Uundværligt hvis du vil arbejde seriøst med AI. Julian gør komplekse emner tilgængelige og relevante.",
    date: "31. marts 2025",
    avatar: "/references/trustpilot/meta.webp",
  },
];

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function ReferencesPage() {
  // CollectionPage + ItemList schema for omtaler + Review schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOmtalePageSchema(),
      {
        ...buildBreadcrumbSchema([
          { name: "Forside", url: "/" },
          { name: "Referencer & Omtaler", url: "/referencer/" },
        ]),
        "@id": `${SITE_URL}/referencer/#breadcrumb`,
      },
      // Schema for LinkedIn mentions - using Organization (AI Growth Minds)
      // Person is NOT a valid itemReviewed type, and LocalBusiness requires address
      ...LINKEDIN_MENTIONS.map((mention, index) => ({
        "@type": "Review",
        "@id": `${SITE_URL}/referencer/#linkedin-${index}`,
        itemReviewed: {
          "@type": "Organization",
          name: "AI Growth Minds",
          url: "https://ai-growth-minds.dk/",
        },
        author: {
          "@type": "Person",
          name: mention.name,
        },
        reviewBody: mention.quote,
        url: mention.url,
      })),
      // Schema for Trustpilot reviews
      ...TRUSTPILOT_REVIEWS.map((review, index) => ({
        "@type": "Review",
        "@id": `${SITE_URL}/referencer/#trustpilot-${index}`,
        itemReviewed: {
          "@type": "Organization",
          name: "AI Growth Minds",
          url: "https://ai-growth-minds.dk/",
        },
        author: {
          "@type": "Person",
          name: review.name,
        },
        reviewBody: review.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        url: review.url,
        publisher: {
          "@type": "Organization",
          name: "Trustpilot",
          url: "https://www.trustpilot.com/",
        },
      })),
    ],
  };

  // Filter videos and other mentions
  const videoMentions = HIGH_AUTHORITY_MENTIONS.filter(
    (m) => m.type === "VideoObject" && m.url.includes("youtube.com"),
  );
  const otherMentions = HIGH_AUTHORITY_MENTIONS.filter(
    (m) => !(m.type === "VideoObject" && m.url.includes("youtube.com")),
  );

  return (
    <div className="pt-20 bg-black min-h-screen text-white">
      <JsonLd schema={schema} />

      <div className="py-24 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Det siger <span className="text-yellow-400">kunderne</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Tillid er fundamentet for alt hvad jeg laver. Her er et udpluk af de
          virksomheder og mennesker, jeg har haft fornøjelsen af at arbejde med.
        </p>
      </div>

      <References />

      {/* Omtaler sektion */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Set i medierne</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First 3 mentions: Ritzau, Seniorfolk, Computerworld */}
          {otherMentions.slice(0, 3).map((mention, index) => (
            <a
              key={index}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-yellow-400/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-yellow-400 uppercase tracking-wider">
                  {mention.type === "PodcastEpisode"
                    ? "Podcast"
                    : mention.type === "VideoObject"
                      ? "Video"
                      : mention.type === "Article"
                        ? "Artikel"
                        : mention.type === "SoftwareApplication"
                          ? "Værktøj"
                          : "Omtale"}
                </span>
                <svg
                  className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                {mention.name}
              </h3>
            </a>
          ))}

          {/* Subscrybe Article */}
          <a
            href="https://subscrybe.com/da/subscription-trends-2026-insights-from-leading-experts/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-yellow-400/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-yellow-400 uppercase tracking-wider">
                Artikel
              </span>
              <svg
                className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">
              Subscription Trends 2026: Insights from leading experts
            </h3>
          </a>

          {/* Rest of mentions starting from index 3 */}
          {otherMentions.slice(3).map((mention, index) => (
            <a
              key={index + 3}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-yellow-400/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-yellow-400 uppercase tracking-wider">
                  {mention.type === "PodcastEpisode"
                    ? "Podcast"
                    : mention.type === "VideoObject"
                      ? "Video"
                      : mention.type === "Article"
                        ? "Artikel"
                        : mention.type === "SoftwareApplication"
                          ? "Værktøj"
                          : "Omtale"}
                </span>
                <svg
                  className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                {mention.name}
              </h3>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-zinc-500 text-sm">
            Og mange flere omtaler på LinkedIn, podcasts og konferencer.
          </p>
        </div>
      </div>

      {/* Video Section */}
      {videoMentions.length > 0 && (
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Videoer & Oplæg
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videoMentions.map((video, index) => {
              const videoId = getYouTubeId(video.url);
              if (!videoId) return null;

              return (
                <div
                  key={index}
                  className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-400/50 transition-colors group flex flex-col"
                >
                  <div className="aspect-video relative bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                      title={video.name}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors mb-4 line-clamp-2">
                      {video.name}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                      <span className="text-xs text-yellow-400 uppercase tracking-wider font-medium">
                        Video
                      </span>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-1 group-hover/link:text-white"
                      >
                        Se på YouTube
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LinkedIn Omtaler */}
      <div className="container mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          LinkedIn Omtaler
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LINKEDIN_MENTIONS.map((mention, i) => (
            <a
              key={i}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">in</span>
                  </div>
                  <span className="text-xs text-blue-400 uppercase tracking-wider">
                    LinkedIn
                  </span>
                </div>
                <span className="text-xs text-zinc-500">{mention.context}</span>
              </div>
              <p className="text-zinc-300 mb-4 italic">
                &ldquo;{mention.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={mention.name}
                    imagePath={mention.avatar}
                    size="md"
                  />
                  <p className="font-bold text-white">{mention.name}</p>
                </div>
                <svg
                  className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Trustpilot Reviews */}
      <div className="container mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Trustpilot Reviews
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUSTPILOT_REVIEWS.map((review, i) => (
            <a
              key={i}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-green-500/50 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-xs text-green-400 uppercase tracking-wider">
                    Trustpilot
                  </span>
                </div>
                <span className="text-xs text-zinc-500">{review.date}</span>
              </div>
              <div className="flex text-green-500 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-4 italic text-sm">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={review.name}
                    imagePath={review.avatar}
                    size="md"
                  />
                  <p className="font-bold text-white">{review.name}</p>
                </div>
                <svg
                  className="w-4 h-4 text-zinc-600 group-hover:text-green-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.trustpilot.com/review/ai-growth-minds.dk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            Se alle anmeldelser på Trustpilot
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
