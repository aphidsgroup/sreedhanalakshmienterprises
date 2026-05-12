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
  title: "Today Cement Price in Chennai",
  description:
    "Latest cement price in Chennai today. UltraTech, Ramco, Dalmia, ACC, Chettinad, JSW, Ambuja — all brands. Updated daily by Sree Dhanalakshmi Enterprises.",
  path: "/today-cement-price",
  keywords: "cement price Chennai today, UltraTech cement price, Ramco cement price, cement rate Chennai",
});

export const dynamic = "force-dynamic";

async function getCementData() {
  const category = await prisma.category.findUnique({ where: { slug: "cement" } });
  if (!category) return { products: [], updatedAt: null };
  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { 
      brand: { select: { name: true } },
      images: { where: { isPrimary: true }, take: 1 }
    },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
  const faqs = await prisma.fAQ.findMany({
    where: { categoryId: category.id, isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  const lastUpdated = products.reduce((latest, p) => {
    return p.lastUpdated > latest ? p.lastUpdated : latest;
  }, new Date(0));
  return { products, faqs, updatedAt: products.length ? lastUpdated : null };
}

const FALLBACK_CEMENT = [
  { brand: "UltraTech OPC 53", spec: "OPC 53 Grade", unit: "bag (50kg)", price: "₹395–420", remarks: "Premium segment" },
  { brand: "Ramco Supercrete", spec: "PPC Grade", unit: "bag (50kg)", price: "₹380–410", remarks: "Best seller" },
  { brand: "Dalmia Bharat", spec: "OPC 43/53", unit: "bag (50kg)", price: "₹370–400", remarks: "Good value" },
  { brand: "ACC", spec: "PPC Grade", unit: "bag (50kg)", price: "₹375–405", remarks: "Wide availability" },
  { brand: "Chettinad", spec: "OPC/PPC", unit: "bag (50kg)", price: "₹365–390", remarks: "Local brand" },
  { brand: "Bharathi", spec: "OPC 43", unit: "bag (50kg)", price: "₹360–385", remarks: "Economy segment" },
  { brand: "JSW Cement", spec: "PPC Grade", unit: "bag (50kg)", price: "₹370–395", remarks: "Good strength" },
  { brand: "Ambuja", spec: "PPC Grade", unit: "bag (50kg)", price: "₹380–410", remarks: "Good quality" },
];

const FAQS = [
  { q: "What is the current cement price in Chennai?", a: "Cement prices in Chennai range from ₹360–₹420 per 50kg bag depending on brand and grade. Prices are updated daily. Contact SDE for exact current rates." },
  { q: "Which cement brand is best for construction in Chennai?", a: "UltraTech and Ramco are premium choices. Dalmia, ACC, and Chettinad offer good value. Choice depends on project type, budget, and structural requirements." },
  { q: "What is OPC vs PPC cement?", a: "OPC (Ordinary Portland Cement) is faster setting and used for heavy structures. PPC (Portland Pozzolana Cement) is slower setting, generates less heat, and is preferred for mass concrete work and Tamil Nadu's climate." },
  { q: "Do you offer bulk cement orders with delivery?", a: "Yes. SDE Enterprises offers bulk cement supply with doorstep delivery across Chennai and Tamil Nadu. Call 90947 79299 or WhatsApp for bulk pricing." },
];

export default async function CementPricePage() {
  const { products, faqs: dbFaqs, updatedAt } = await getCementData();
  const hasData = products.length > 0;
  const displayFaqs = dbFaqs && dbFaqs.length > 0 ? dbFaqs : FAQS;

  return (
    <div>
      {/* Page header */}
      <div style={{ background: "linear-gradient(135deg, #1e5f6e 0%, #2b7a8c 100%)" }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="badge-accent mb-3 inline-block">Updated Daily</div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            Today&apos;s Cement Price in Chennai
          </h1>
          <p style={{ color: "#cde8ed", marginTop: "0.75rem", fontSize: "1rem" }}>
            All major cement brands — UltraTech, Ramco, Dalmia, ACC, Chettinad, JSW &amp; more. Rates applicable in Chennai, Tamil Nadu.
          </p>
          {updatedAt && (
            <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: "#94e5f0" }}>
              <TrendingUp size={14} /> Last updated: {formatDateTime(updatedAt)}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-8" style={{ background: "#fdf5e6", border: "1px solid #f0dba8" }}>
          <AlertCircle size={18} style={{ color: "#c8972a", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "0.85rem", color: "#92620a" }}>
            <strong>Disclaimer:</strong> Cement prices shown are indicative market rates for Chennai. Actual prices may vary by quantity, delivery distance, brand availability, and market fluctuations. Contact us for exact quotes.
          </p>
        </div>

        {/* Inline CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need current cement price and bulk quote.`} target="_blank" className="btn-primary px-6 py-3" style={{ background: "#25d366" }}>
            <WhatsAppIcon size={16} /> WhatsApp for Bulk Quote
          </a>
          <a href={BUSINESS.branches[0].phone1Href} className="btn-outline px-6 py-3">
            <Phone size={16} /> Call {BUSINESS.branches[0].phone1}
          </a>
        </div>

        {/* Product Grid */}
        <div className="mb-10">
          <div className="flex justify-between items-end border-b border-[#e2eaed] pb-4 mb-6">
            <div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#1a2129" }}>
                Cement Price List
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>
                📍 Rates for Kilpauk &amp; Mangadu branches, Chennai
              </p>
            </div>
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
                    imageUrl={p.images?.[0]?.secureUrl || getProductImage(p.slug, "cement")}
                  />
                ))
              : FALLBACK_CEMENT.map((p, i) => {
                  // create a slug-like string for fallback matching
                  const tempSlug = p.brand.toLowerCase().replace(/ /g, "-");
                  return (
                    <ProductCard
                      key={i}
                      name={p.brand}
                      specification={p.spec}
                      unit={p.unit}
                      price={p.price}
                      remarks={p.remarks}
                      imageUrl={getProductImage(tempSlug, "cement")}
                    />
                  );
                })}
          </div>
        </div>

        {/* Location note */}
        <div className="p-5 rounded-xl mb-10" style={{ background: "#edf6f8", border: "1px solid #cde8ed" }}>
          <h3 style={{ fontWeight: 700, color: "#1e5f6e", marginBottom: "0.5rem" }}>📍 About These Rates</h3>
          <p style={{ fontSize: "0.9rem", color: "#4a5568", lineHeight: 1.7 }}>
            These cement prices are applicable at our Kilpauk and Mangadu branches in Chennai. Prices may differ slightly for delivery orders based on transport distance, load size, and brand availability. For bulk project orders (20+ bags), call us for special rates.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129", marginBottom: "1.5rem" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {displayFaqs.map((f: { q?: string; question?: string; a?: string; answer?: string }, i: number) => (
              <details key={i} className="sde-card group" open={i === 0}>
                <summary className="p-5 font-semibold cursor-pointer flex justify-between items-center" style={{ color: "#1a2129", listStyle: "none" }}>
                  {f.q || f.question}
                  <span className="text-[#2b7a8c] text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#4a5568" }}>
                  {f.a || f.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Related price links */}
        <div className="mb-6">
          <h3 style={{ fontWeight: 700, color: "#1a2129", marginBottom: "1rem" }}>Also Check Today&apos;s Prices</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Steel / TMT Price", href: "/today-steel-price" },
              { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" },
              { label: "Sand & Aggregates Price", href: "/today-sand-and-aggregates-price" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all" style={{ background: "#f0f4f6", color: "#2b7a8c", border: "1px solid #cde8ed" }}>
                {l.label} <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
