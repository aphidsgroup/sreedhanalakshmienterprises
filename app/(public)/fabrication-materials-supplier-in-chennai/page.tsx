import { buildMetadata } from "@/lib/seo";
import { getProductBySlug } from "@/data/productSupplierPages";
import ProductSupplierPage from "@/components/public/ProductSupplierPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SLUG = "fabrication-materials-supplier-in-chennai";
const product = getProductBySlug(SLUG);

export async function generateMetadata(): Promise<Metadata> {
  const data = getProductBySlug(SLUG);
  if (!data) return {};
  
  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: `/${SLUG}`,
    keywords: data.metaKeywords,
  });
}

export default function Page() {
  if (!product) return notFound();
  return <ProductSupplierPage product={product} />;
}
