const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app/(public)');

// 1. Area Pages
const areaSlugs = [
  "anna-nagar", "nungambakkam", "t-nagar", "mylapore", "koyambedu",
  "vadapalani", "porur", "kundrathur", "iyyappanthangal", "ramapuram",
  "maduravoyal", "thiruverkadu", "ambattur", "avadi", "poonamallee",
  "guindy", "tambaram", "velachery", "adyar", "medavakkam"
];

const areaTemplate = (slug) => `import { buildMetadata } from "@/lib/seo";
import { getAreaBySlug } from "@/data/seoAreas";
import AreaLandingPage from "@/components/public/AreaLandingPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SLUG = "${slug}";
const area = getAreaBySlug(SLUG);

export async function generateMetadata(): Promise<Metadata> {
  const data = getAreaBySlug(SLUG);
  if (!data) return {};
  
  return buildMetadata({
    title: \`Construction Materials Supplier in \${data.name} | Cement, Steel, Sand & Bricks\`,
    description: \`Get cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials delivered to \${data.name}, Chennai. Contact Sree Dhanalakshmi Enterprises for today's price and site delivery quote.\`,
    path: \`/construction-materials-supplier-in-\${SLUG}\`,
    keywords: \`construction materials supplier in \${data.name}, building materials \${data.name}, cement supplier \${data.name}, TMT steel supplier \${data.name}\`,
  });
}

export default function Page() {
  if (!area) return notFound();
  return <AreaLandingPage area={area} />;
}
`;

areaSlugs.forEach(slug => {
  const dirPath = path.join(appDir, `construction-materials-supplier-in-${slug}`);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), areaTemplate(slug));
  console.log(`Created area page: ${slug}`);
});


// 2. Product Supplier Pages
const productSlugs = [
  "cement-supplier-in-chennai", "tmt-steel-supplier-in-chennai", "m-sand-supplier-in-chennai",
  "p-sand-supplier-in-chennai", "blue-metal-supplier-in-chennai", "bricks-supplier-in-chennai",
  "aac-blocks-supplier-in-chennai", "fabrication-materials-supplier-in-chennai",
  "ms-angle-supplier-in-chennai", "gi-pipe-supplier-in-chennai"
];

const productTemplate = (slug) => `import { buildMetadata } from "@/lib/seo";
import { getProductBySlug } from "@/data/productSupplierPages";
import ProductSupplierPage from "@/components/public/ProductSupplierPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SLUG = "${slug}";
const product = getProductBySlug(SLUG);

export async function generateMetadata(): Promise<Metadata> {
  const data = getProductBySlug(SLUG);
  if (!data) return {};
  
  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: \`/\${SLUG}\`,
    keywords: data.metaKeywords,
  });
}

export default function Page() {
  if (!product) return notFound();
  return <ProductSupplierPage product={product} />;
}
`;

productSlugs.forEach(slug => {
  const dirPath = path.join(appDir, slug);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), productTemplate(slug));
  console.log(`Created product page: ${slug}`);
});


// 3. Buying Guides
const guideSlugs = [
  "m-sand-vs-p-sand", "opc-vs-ppc-cement", "fe-500d-vs-fe-550d-tmt-bars",
  "aac-blocks-vs-red-bricks", "blue-metal-sizes-for-concrete",
  "construction-materials-required-for-1000-sq-ft-house", "how-to-buy-construction-materials-in-chennai"
];

const guideTemplate = (slug) => `import { buildMetadata } from "@/lib/seo";
import { getGuideBySlug } from "@/data/buyingGuides";
import BuyingGuidePage from "@/components/public/BuyingGuidePage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SLUG = "${slug}";
const guide = getGuideBySlug(SLUG);

export async function generateMetadata(): Promise<Metadata> {
  const data = getGuideBySlug(SLUG);
  if (!data) return {};
  
  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: \`/\${SLUG}\`,
    keywords: data.metaKeywords,
  });
}

export default function Page() {
  if (!guide) return notFound();
  return <BuyingGuidePage guide={guide} />;
}
`;

guideSlugs.forEach(slug => {
  const dirPath = path.join(appDir, slug);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), guideTemplate(slug));
  console.log(`Created guide page: ${slug}`);
});

console.log("All pages generated successfully!");
