import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { TrendingUp, Phone, ArrowRight, AlertCircle } from "lucide-react";
import WhatsAppIcon from "@/components/public/WhatsAppIcon";
import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Sand & Aggregates Price in Chennai",
  description: "Latest M-Sand, P-Sand, River Sand, Jelly (20mm, 40mm), Quarry Dust prices in Chennai. Updated daily by Sree Dhanalakshmi Enterprises.",
  path: "/today-sand-and-aggregates-price",
  keywords: "M-Sand price Chennai, P-Sand price, jelly price Chennai, quarry dust price",
});

export const dynamic = "force-dynamic";

const FALLBACK = [
  { brand: "M-Sand (Manufactured Sand)", spec: "IS:383 Grade", unit: "CFT", price: "₹55–70", remarks: "For concrete, plastering" },
  { brand: "P-Sand (Plastering Sand)", spec: "Fine grade", unit: "CFT", price: "₹50–65", remarks: "Smooth finish" },
  { brand: "River Sand", spec: "Natural sand", unit: "CFT", price: "₹75–95", remarks: "Limited, govt regulated" },
  { brand: "Filling Sand", spec: "Coarse grade", unit: "CFT", price: "₹30–45", remarks: "For filling, levelling" },
  { brand: "20mm Jelly (Blue Metal)", spec: "IS:383", unit: "CFT", price: "₹50–62", remarks: "Concrete aggregate" },
  { brand: "40mm Jelly (Blue Metal)", spec: "IS:383", unit: "CFT", price: "₹45–58", remarks: "Foundation, PCC" },
  { brand: "12mm Jelly", spec: "IS:383", unit: "CFT", price: "₹55–65", remarks: "Fine concrete" },
  { brand: "Quarry Dust", spec: "Stone powder", unit: "CFT", price: "₹25–38", remarks: "Filling, block making" },
];

const FAQS = [
  { q: "What is M-Sand vs River Sand in Chennai?", a: "M-Sand (Manufactured Sand) is crusher-made sand meeting IS:383 standards. It is consistent in quality and widely used in Chennai. River sand is natural but regulated and often costlier. M-Sand is the recommended alternative." },
  { q: "What is the current M-Sand price in Chennai?", a: "M-Sand prices in Chennai range from ₹55–₹70 per CFT depending on supplier, quantity, and delivery distance." },
  { q: "What is the difference between 20mm and 40mm jelly?", a: "20mm jelly is used for RCC slabs, beams, and columns. 40mm jelly is used for foundations and plain cement concrete (PCC). Both are available from SDE in bulk." },
  { q: "Do you supply quarry dust and aggregates in bulk?", a: "Yes. SDE supplies quarry dust, 12mm/20mm/40mm jelly, M-Sand, P-Sand, and river sand in bulk quantities with delivery across Chennai." },
];

async function getData() {
  const category = await prisma.category.findUnique({ where: { slug: "sand-and-aggregates" } });
  if (!category) return { products: [], faqs: [], updatedAt: null };
  const products = await prisma.product.findMany({ where: { categoryId: category.id, isActive: true }, include: { brand: { select: { name: true } } }, orderBy: [{ displayOrder: "asc" }] });
  const faqs = await prisma.fAQ.findMany({ where: { categoryId: category.id, isActive: true }, orderBy: { sortOrder: "asc" } });
  const updatedAt = products.reduce((l, p) => p.lastUpdated > l ? p.lastUpdated : l, new Date(0));
  return { products, faqs, updatedAt: products.length ? updatedAt : null };
}

export default async function SandAggregatesPricePage() {
  const { products, faqs: dbFaqs, updatedAt } = await getData();
  const hasData = products.length > 0;
  const displayFaqs = dbFaqs.length > 0 ? dbFaqs : FAQS;

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #3d5a1f 0%, #5a7a2d 100%)" }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="badge-accent mb-3 inline-block">Updated Daily</div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            Today&apos;s Sand &amp; Aggregates Price in Chennai
          </h1>
          <p style={{ color: "#d4edaa", marginTop: "0.75rem" }}>M-Sand, P-Sand, River Sand, 20mm/40mm Jelly, Quarry Dust — all grades. Rates for Chennai market.</p>
          {updatedAt && <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: "#e8f5c8" }}><TrendingUp size={14} /> Last updated: {formatDateTime(updatedAt)}</div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-start gap-3 p-4 rounded-xl mb-8" style={{ background: "#fdf5e6", border: "1px solid #f0dba8" }}>
          <AlertCircle size={18} style={{ color: "#c8972a", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "0.85rem", color: "#92620a" }}><strong>Disclaimer:</strong> Sand and aggregate prices vary by delivery distance, load size, and local regulations. Contact SDE for accurate current rates.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need sand and aggregates price.`} target="_blank" className="btn-primary px-6 py-3" style={{ background: "#25d366" }}>
            <WhatsAppIcon size={16} /> WhatsApp for Quote
          </a>
          <a href={BUSINESS.branches[0].phone1Href} className="btn-outline px-6 py-3"><Phone size={16} /> Call {BUSINESS.branches[0].phone1}</a>
        </div>

        <div className="sde-card overflow-hidden mb-10">
          <div className="px-5 py-4 border-b border-[#e2eaed]" style={{ background: "#f0f4f6" }}>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1a2129" }}>
              Sand &amp; Aggregates Price List — Chennai ({new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead><tr><th className="text-left">Material</th><th className="text-left">Grade / Spec</th><th className="text-left">Unit</th><th className="text-right">Price (₹)</th><th className="text-left">Usage</th></tr></thead>
              <tbody>
                {hasData
                  ? products.map((p) => (
                      <tr key={p.id}>
                        <td className="font-semibold">{p.brand?.name || p.name}</td>
                        <td style={{ color: "#4a5568" }}>{p.specification || "—"}</td>
                        <td>{p.unit}</td>
                        <td className="text-right font-bold" style={{ color: "#2b7a8c" }}>{p.currentPrice ? formatPrice(Number(p.currentPrice)) : "On Request"}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.remarks || "—"}</td>
                      </tr>
                    ))
                  : FALLBACK.map((p, i) => (
                      <tr key={i}>
                        <td className="font-semibold">{p.brand}</td>
                        <td style={{ color: "#4a5568" }}>{p.spec}</td>
                        <td>{p.unit}</td>
                        <td className="text-right font-bold" style={{ color: "#2b7a8c" }}>{p.price}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.remarks}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-10 space-y-4">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129", marginBottom: "1.5rem" }}>FAQs — Sand &amp; Aggregates</h2>
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
          {[{ label: "Cement Price", href: "/today-cement-price" }, { label: "Steel Price", href: "/today-steel-price" }, { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" }].map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#f0f4f6", color: "#2b7a8c", border: "1px solid #cde8ed" }}>
              {l.label} <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
