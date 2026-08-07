import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', '*'],
      allow: '/',
    },
    sitemap: 'https://www.sreedhanalakshmienterprises.in/sitemap.xml',
  };
}
