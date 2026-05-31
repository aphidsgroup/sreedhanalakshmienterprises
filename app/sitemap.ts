import { MetadataRoute } from 'next'
import { ALL_AREA_SLUGS } from '@/data/seoAreas'
import { ALL_PRODUCT_SLUGS } from '@/data/productSupplierPages'
import { ALL_GUIDE_SLUGS } from '@/data/buyingGuides'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sreedhanalakshmienterprises.in";

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/today-cement-price",
    "/today-steel-price",
    "/today-bricks-and-blocks-price",
    "/today-sand-and-aggregates-price",
    "/today-fabrication-materials-price",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const areaRoutes = ALL_AREA_SLUGS.map((slug) => ({
    url: `${baseUrl}/construction-materials-supplier-in-${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const productRoutes = ALL_PRODUCT_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const guideRoutes = ALL_GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...areaRoutes, ...productRoutes, ...guideRoutes];
}
