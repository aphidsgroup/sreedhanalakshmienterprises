import { MetadataRoute } from 'next'
import { ALL_AREA_SLUGS } from '@/data/seoAreas'
import { ALL_PRODUCT_SLUGS } from '@/data/productSupplierPages'
import { ALL_GUIDE_SLUGS } from '@/data/buyingGuides'

// Honest lastModified dates — only update these when the page content genuinely changes.
// Do NOT set everything to new Date() as that falsely signals daily changes to Google.
const PHASE1_DATE = new Date('2026-05-30'); // Phase 1 launch — static content pages
const PHASE2_DATE = new Date('2026-06-01'); // Phase 2 — area pages, product pages, guides
const LAST_SEO_UPDATE = new Date('2026-08-08'); // Today's technical SEO fixes

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sreedhanalakshmienterprises.in";

  // Homepage + price pages: genuinely dynamic, updated frequently
  const homepageRoute = [{
    url: baseUrl,
    lastModified: LAST_SEO_UPDATE,
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }];

  const priceRoutes = [
    '/today-cement-price',
    '/today-steel-price',
    '/today-bricks-and-blocks-price',
    '/today-sand-and-aggregates-price',
    '/today-fabrication-materials-price',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(), // Genuinely dynamic — prices update from DB
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Static informational pages — updated only when content changes
  const staticRoutes = [
    { path: '/about', date: PHASE1_DATE },
    { path: '/contact', date: PHASE1_DATE },
    { path: '/privacy-policy', date: LAST_SEO_UPDATE },
    { path: '/terms', date: LAST_SEO_UPDATE },
  ].map(({ path, date }) => ({
    url: `${baseUrl}${path}`,
    lastModified: date,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Area pages — created Phase 2, update when service info changes
  const areaRoutes = ALL_AREA_SLUGS.map((slug) => ({
    url: `${baseUrl}/construction-materials-supplier-in-${slug}`,
    lastModified: PHASE2_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Product supplier pages — high value, created Phase 2
  const productRoutes = ALL_PRODUCT_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: PHASE2_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Buying guides — evergreen content, created Phase 2
  const guideRoutes = ALL_GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: PHASE2_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...homepageRoute,
    ...priceRoutes,
    ...staticRoutes,
    ...areaRoutes,
    ...productRoutes,
    ...guideRoutes,
  ];
}

