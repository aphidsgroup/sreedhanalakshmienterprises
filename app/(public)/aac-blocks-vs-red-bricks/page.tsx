import { buildMetadata } from "@/lib/seo";
import { getGuideBySlug } from "@/data/buyingGuides";
import BuyingGuidePage from "@/components/public/BuyingGuidePage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SLUG = "aac-blocks-vs-red-bricks";
const guide = getGuideBySlug(SLUG);

export async function generateMetadata(): Promise<Metadata> {
  const data = getGuideBySlug(SLUG);
  if (!data) return {};
  
  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: `/${SLUG}`,
    keywords: data.metaKeywords,
  });
}

export default function Page() {
  if (!guide) return notFound();
  return <BuyingGuidePage guide={guide} />;
}
