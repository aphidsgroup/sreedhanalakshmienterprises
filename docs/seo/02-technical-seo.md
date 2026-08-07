# Technical SEO Specifications

## 1. `robots.ts` Implementation
Currently, `/robots.txt` returns a 404. We need a dynamic `robots.ts` in the Next.js App Router (`app/robots.ts`).

**Requirements:**
- Allow all standard crawlers (`User-Agent: *`).
- Disallow admin/API routes if any exist in the future (e.g., `/api/`, `/admin/`).
- Provide the absolute URL to the sitemap.

**Example Implementation:**
```typescript
import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

## 2. `sitemap.ts` Fixes
The current sitemap has two major issues:
1. It uses `new Date()` for `lastModified`, telling Google every page updates every day.
2. It omits `/privacy-policy` and `/terms`.

**Action Items:**
- Query the Prisma database (Neon) to get the actual `updatedAt` for dynamic pages (price pages, location pages).
- Use hardcoded, realistic dates for static pages (`/`, `/about`, `/contact`).
- Ensure `/privacy-policy` and `/terms` are included once created.

## 3. Schema.org Implementation
Rich snippets are severely lacking. Implement the following using `application/ld+json` (preferably via a dedicated schema component in Next.js).

### A. `Organization` Schema (Homepage)
- Name: Sree Dhanalakshmi Enterprises
- Founding Date: 1980
- Logo: Absolute URL to logo.
- Contact Point: WhatsApp/Phone (+91 7305777117)

### B. `LocalBusiness` Schema (Homepage / Contact)
We need an array of two locations for the actual branches:
- **Location 1:** Kilpauk (No. 72, Kilpauk Garden Road, Kilpauk, Chennai 600010)
- **Location 2:** Mangadu (No. 343, KK Nagar, Kundrathur Main Road, Mangadu, Chennai 600122)
- Telephone: +91 7305777117

### C. `WebSite` & `SearchAction` (Homepage)
Enable potential Sitelinks Search Box.

### D. `BreadcrumbList` (All Pages)
Implement dynamic breadcrumbs for structural clarity (e.g., Home > Cement Supplier > Anna Nagar).

### E. `FAQPage` (Where applicable)
Add to guide pages like `/m-sand-vs-p-sand`.

## 4. Open Graph & Twitter Cards
Currently, `og:image` uses `/logo.jpeg` (relative). Social platforms cannot resolve relative paths.
- **Fix:** Update `lib/seo.ts` to prepend `BASE_URL` to all image paths for Open Graph and Twitter Card metadata.

## 5. Core Web Vitals
Given the Turbopack & Next.js App Router stack, performance should be natively strong.
- Ensure Google Fonts (Inter, Outfit) are optimized using `next/font`.
- Ensure all images use `next/image` with correct `sizes`, `alt` attributes, and `priority` on above-the-fold elements (LCP).

## 6. AI Crawler Guidance
Ensure semantic HTML (`<article>`, `<main>`, `<nav>`, `<aside>`) is strictly used so LLM crawlers (ChatGPT, Claude) can easily parse content structure and business facts.

## 7. Missing Utility Pages
- Create `app/privacy-policy/page.tsx`
- Create `app/terms/page.tsx`
(These must be created to resolve the footer 404s).
