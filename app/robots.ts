import { MetadataRoute } from 'next';

/**
 * Robots.txt generator for julianbentsingh.dk
 *
 * Denne fil fortæller søgemaskiner hvilke sider de må/ikke må crawle.
 *
 * Læs mere: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes
          '/_next/',         // Next.js internals
          '/private/',       // Hvis du har private sider
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI's crawler
        allow: '/',            // Tillad AI crawling for bedre AI-forståelse
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google's AI crawler
        allow: '/',
      },
      {
        userAgent: 'CCBot',   // Common Crawl (bruges af mange AI modeller)
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',  // Claude's crawler
        allow: '/',
      },
    ],
    sitemap: 'https://julianbentsingh.dk/sitemap.xml',
    host: 'https://julianbentsingh.dk',
  };
}
