import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sreedhanalakshmienterprises.in";

  const routes = [
    "",
    "/about",
    "/contact",
    "/today-cement-price",
    "/today-steel-price",
    "/today-bricks-and-blocks-price",
    "/today-sand-and-aggregates-price",
    "/today-fabrication-materials-price",
    "/construction-materials-supplier-in-chennai",
    "/construction-materials-supplier-in-kilpauk",
    "/construction-materials-supplier-in-mangadu",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === "" ? 1 : 0.8,
  }));
}
