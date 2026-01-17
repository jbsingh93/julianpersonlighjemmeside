import { MetadataRoute } from 'next';

/**
 * Dynamisk sitemap generator for julianbentsingh.dk
 *
 * Denne fil genererer automatisk sitemap.xml for Google Search Console.
 * Tilføj nye sider her når de oprettes.
 *
 * Læs mere: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

const SITE_URL = 'https://julianbentsingh.dk';

export default function sitemap(): MetadataRoute.Sitemap {
  // Basis sider med høj prioritet
  const routes = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/om/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kontakt/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/referencer/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // AI Ydelser - Hoved kategoriside
  routes.push({
    url: `${SITE_URL}/ai-ydelser/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  });

  // AI Ydelser - Individuelle service sider
  const aiServices = [
    'ai-konsulent',
    'foredrag',
    'fysiske-ai-kurser',
    'fysisk-ai-workshop',
    'online-ai-kurser',
    'online-ai-workshop',
    'ai-mentor',
  ];

  aiServices.forEach(service => {
    routes.push({
      url: `${SITE_URL}/ai-ydelser/${service}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });
  });

  // Invester sektion
  routes.push({
    url: `${SITE_URL}/invester/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  });

  const investerPages = [
    'portefoelje',
    'pitch',
    'ai-raadgivning-til-investorer',
  ];

  investerPages.forEach(page => {
    routes.push({
      url: `${SITE_URL}/invester/${page}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    });
  });

  return routes;
}
