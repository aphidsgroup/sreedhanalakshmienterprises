import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { TrendingUp, Phone, ArrowRight, AlertCircle } from "lucide-react";
import WhatsAppIcon from "@/components/public/WhatsAppIcon";
import ProductCard from "@/components/public/ProductCard";
import { getProductImage } from "@/lib/productImages";
import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Bricks & Blocks Price in Chennai",
  description: "AAC Blocks, Red Bricks, Fly Ash Bricks, Hollow Blocks price in Chennai. Updated daily by Sree Dhanalakshmi Enterprises.",
  path: "/today-bricks-and-blocks-price",
  keywords: "AAC blocks price Chennai, bricks price Chennai, hollow blocks price",
});

export const dynamic = "force-dynamic";

const FALLBACK = [
  { brand: "AAC Blocks (Renaissance)", spec: "600×200×100mm (4\")", unit: "piece", price: "₹42–48", remarks: "Lightweight" },
  { brand: "AAC Blocks (Birla Aerocon)", spec: "600×200×150mm (6\")", unit: "piece", price: "₹55–62", remarks: "Premium" },
  { brand: "AAC Blocks (JSP)", spec: "600×200×200mm (8\")", unit: "piece", price: "₹68–75", remarks: "Good strength" },
  { brand: "Solid Concrete Blocks", spec: "400×200×200mm", unit: "piece", price: "₹28–35", remarks: "Standard" },
  { brand: "Hollow Concrete Blocks", spec: "400×200×200mm", unit: "piece", price: "₹24–30", remarks: "Light partitions" },
  { brand: "Fly Ash Bricks", spec: "230×115×75mm", unit: "piece", price: "₹6–9", remarks: "Eco-friendly" },
  { brand: "Red Bricks (Country)", spec: "230×115×75mm", unit: "piece", price: "₹5–8", remarks: "Traditional" },
];

const FAQS = [
  { q: "What is the current AAC block price in Chennai?", a: "AAC blocks range from ₹42–₹75 per piece depending on size and brand." },
  { q: "Which is better — AAC blocks or red bricks?", a: "AAC blocks are lighter and better thermal insulators. Red bricks are traditional and cost-effective." },
  { q: "Do you supply fly ash bricks and hollow blocks?", a: "Yes. SDE supplies fly ash bricks, hollow blocks, solid blocks, red bricks, and wire cut bricks." },
];

async function getData() {
  const category = await prisma.category.findUnique({ where: { slug: "bricks-and-blocks" } });
  if (!category) return { products: [], faqs: [], updatedAt: null };
  const products = await prisma.product.findMany({ where: { categoryId: category.id, isActive: true }, include: { brand: { select: { name: true } } }, orderBy: [{ displayOrder: "asc" }] });
  const faqs = await prisma.fAQ.findMany({ where: { categoryId: category.id, isActive: true }, orderBy: { sortOrder: "asc" } });
  const updatedAt = products.reduce((l, p) => p.lastUpdated > l ? p.lastUpdated : l, new Date(0));
  return { products, faqs, updatedAt: products.length ? updatedAt : null };
}

export default async function BricksBlocksPricePage() {
  const { products, faqs: dbFaqs, updatedAt } = await getData();
  const hasData = products.length > 0;
  const displayFaqs = dbFaqs.length > 0 ? dbFaqs : FAQS;

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #5d3a1a 0%, #8b5a2b 100%)" }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="badge-accent mb-3 inline-block">Updated Daily</div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            Today&apos;s Bricks &amp; Blocks Price in Chennai
          </h1>
          <p style={{ color: "#fcd9b6", marginTop: "0.75rem" }}>AAC Blocks, Red Bricks, Fly Ash Bricks, Hollow Blocks — all sizes and brands.</p>
          {updatedAt && <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: "#fde8cc" }}><TrendingUp size={14} /> Last updated: {formatDateTime(updatedAt)}</div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-start gap-3 p-4 rounded-xl mb-8" style={{ background: "#fdf5e6", border: "1px solid #f0dba8" }}>
          <AlertCircle size={18} style={{ color: "#c8972a", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "0.85rem", color: "#92620a" }}><strong>Disclaimer:</strong> Prices are indicative. Actual rates may vary by quantity, transport, and stock. Contact SDE for exact quotes.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need bricks and blocks price.`} target="_blank" className="btn-primary px-6 py-3" style={{ background: "#25d366" }}>
            <WhatsAppIcon size={16} /> WhatsApp for Quote
          </a>
          <a href={BUSINESS.branches[0].phone1Href} className="btn-outline px-6 py-3"><Phone size={16} /> Call {BUSINESS.branches[0].phone1}</a>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-end border-b border-[#e2eaed] pb-4 mb-6">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#1a2129" }}>
              Bricks &amp; Blocks Price List
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {hasData
              ? products.map((p) => (
                  <ProductCard
                    key={p.id}
                    name={p.name}
                    brand={p.brand?.name}
                    specification={p.specification || undefined}
                    unit={p.unit}
                    price={p.currentPrice ? Number(p.currentPrice) : null}
                    remarks={p.remarks || undefined}
                    imageUrl={getProductImage(p.slug, "bricks-and-blocks")}
                  />
                ))
              : FALLBACK.map((p, i) => {
                  const tempSlug = p.brand.toLowerCase().replace(/ /g, "-");
                  return (
                    <ProductCard
                      key={i}
                      name={p.brand}
                      specification={p.spec}
                      unit={p.unit}
                      price={p.price}
                      remarks={p.remarks}
                      imageUrl={getProductImage(tempSlug, "bricks-and-blocks")}
                    />
                  );
                })}
          </div>
        </div>

        <div className="mb-10 space-y-4">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129", marginBottom: "1.5rem" }}>FAQs — Bricks &amp; Blocks</h2>
          {displayFaqs.map((f: { q?: string; question?: string; a?: string; answer?: string }, i: number) => (
            <details key={i} className="sde-card group" open={i === 0}>
              <summary className="p-5 font-semibold cursor-pointer flex justify-between items-center" style={{ color: "#1a2129", listStyle: "none" }}>
                {f.q || f.question}<span className="text-[#2b7a8c] text-xl">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#4a5568" }}>{f.a || f.answer}</div>
            </details>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {[{ label: "Cement Price", href: "/today-cement-price" }, { label: "Steel Price", href: "/today-steel-price" }, { label: "Sand & Aggregates Price", href: "/today-sand-and-aggregates-price" }].map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#f0f4f6", color: "#2b7a8c", border: "1px solid #cde8ed" }}>
              {l.label} <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
