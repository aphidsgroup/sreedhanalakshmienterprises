import { buildMetadata } from "@/lib/seo";
import { getAreaBySlug } from "@/data/seoAreas";
import AreaLandingPage from "@/components/public/AreaLandingPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SLUG = "guindy";
const area = getAreaBySlug(SLUG);

export async function generateMetadata(): Promise<Metadata> {
  const data = getAreaBySlug(SLUG);
  if (!data) return {};
  
  return buildMetadata({
    title: `Construction Materials Supplier in ${data.name} | Cement, Steel, Sand & Bricks`,
    description: `Get cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials delivered to ${data.name}, Chennai. Contact Sree Dhanalakshmi Enterprises for today's price and site delivery quote.`,
    path: `/construction-materials-supplier-in-${SLUG}`,
    keywords: `construction materials supplier in ${data.name}, building materials ${data.name}, cement supplier ${data.name}, TMT steel supplier ${data.name}`,
  });
}

export default function Page() {
  if (!area) return notFound();
  return <AreaLandingPage area={area} />;
}
