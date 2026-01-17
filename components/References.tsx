"use client";

import Avatar from "./Avatar";

const TESTIMONIALS = [
  {
    quote:
      "Det bedste AI kursus i DK. Julians ekspertise skinner igennem, og kurset giver indblik i hans AI-first mindset.",
    name: "Kristian Krogh Bang",
    source: "Trustpilot",
    url: "https://www.trustpilot.com/reviews/68063e4daca09ea151fc4dec",
    avatar: "/references/trustpilot/kristian.png",
  },
  {
    quote:
      "Nok den bedste investering nogensinde. Sjældent finder du en så passioneret og fag-nørdet person, som samtidig er god til at forklare.",
    name: "Lui Høyer",
    source: "Trustpilot",
    url: "https://www.trustpilot.com/reviews/67f3b4c088ab9bdfe8241953",
    avatar: "/references/trustpilot/lui.png",
  },
  {
    quote:
      "Et kursus der forandrer – ikke bare din forretning, men din måde at tænke på. Julian er pædagogisk og passioneret.",
    name: "Bejer",
    source: "Trustpilot",
    url: "https://www.trustpilot.com/reviews/6804ba1fd2bdb7a9220074a1",
    avatar: "/references/trustpilot/bejer.webp",
  },
  {
    quote:
      "Den bedste investering i mig selv. Trods næsten pensionsalder og ingen teknisk baggrund, byggede jeg en funktionel AI-app.",
    name: "Mogens Kramtoft",
    source: "Trustpilot",
    url: "https://www.trustpilot.com/reviews/67ee397b8541dc31efad2770",
    avatar: "/references/trustpilot/mogens.png",
  },
];

export default function References() {
  return (
    <section id="references" className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold mb-16">
          Hvad siger <br />
          <span className="text-zinc-500">netværket</span>
        </h2>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <a
              key={index}
              href={testimonial.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-8 rounded-2xl border transition-all hover:scale-[1.02] ${
                index === 1
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-zinc-900 text-white border-zinc-800 hover:border-yellow-400/50"
              }`}
            >
              <div className={`flex mb-4 ${index === 1 ? "text-black" : "text-yellow-400"}`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className={`text-lg italic mb-6 ${index === 1 ? "font-medium" : "text-zinc-300"}`}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <Avatar name={testimonial.name} imagePath={testimonial.avatar} size="lg" />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className={`text-sm ${index === 1 ? "text-black/60" : "text-zinc-500"}`}>
                    {testimonial.source} →
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
