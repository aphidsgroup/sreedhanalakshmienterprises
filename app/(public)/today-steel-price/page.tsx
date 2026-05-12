import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { TrendingUp, Phone, ArrowRight, AlertCircle } from "lucide-react";
import WhatsAppIcon from "@/components/public/WhatsAppIcon";
import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Steel / TMT Bar Price in Chennai",
  description: "Latest TMT bar prices in Chennai. Tata Tiscon, JSW Neosteel, Vizag, SAIL, Suryadev, Agni Steels. Fe 500D, Fe 550, all sizes 8mm–32mm. Updated daily.",
  path: "/today-steel-price",
  keywords: "TMT bar price Chennai, steel price Chennai today, Tata Tiscon price, JSW Neosteel price",
});

export const dynamic = "force-dynamic";

const FALLBACK_STEEL = [
  { brand: "Tata Tiscon", spec: "Fe 500D", sizes: "8mm–32mm", unit: "MT", price: "₹55,000–62,000", remarks: "Premium — BIS certified" },
  { brand: "JSW Neosteel", spec: "Fe 500D", sizes: "8mm–32mm", unit: "MT", price: "₹54,000–61,000", remarks: "Wide availability" },
  { brand: "Vizag Steel (RINL)", spec: "Fe 500D", sizes: "8mm–25mm", unit: "MT", price: "₹53,000–60,000", remarks: "Government steel" },
  { brand: "SAIL", spec: "Fe 500D/550", sizes: "8mm–32mm", unit: "MT", price: "₹53,500–60,500", remarks: "Reliable quality" },
  { brand: "Suryadev", spec: "Fe 500D", sizes: "8mm–25mm", unit: "MT", price: "₹51,000–57,000", remarks: "Good value" },
  { brand: "Agni Steels", spec: "Fe 500D", sizes: "8mm–20mm", unit: "MT", price: "₹50,000–56,000", remarks: "Local manufacturer" },
  { brand: "MS Angles (IS:2062)", spec: "25×25 to 100×100", sizes: "Various", unit: "MT", price: "₹56,000–64,000", remarks: "Structural steel" },
  { brand: "MS Channels (ISMC)", spec: "ISMC 75–300", sizes: "Various", unit: "MT", price: "₹57,000–65,000", remarks: "I-Beams, channels" },
];

const FAQS = [
  { q: "What is today's TMT bar price in Chennai?", a: "TMT bar prices in Chennai range from ₹50,000–₹62,000 per MT depending on brand (Fe 500D). Prices change daily based on steel mill rates. Contact SDE for today's exact rate." },
  { q: "Which TMT bar brand is best in Chennai?", a: "Tata Tiscon and JSW Neosteel are premium choices widely used in Chennai. Vizag Steel (RINL) is a trusted government steel. Suryadev and Agni are good local options for budget projects." },
  { q: "What is Fe 500D TMT bar?", a: "Fe 500D is a high-strength TMT (Thermo-Mechanically Treated) steel rebar with minimum yield strength of 500 MPa and enhanced ductility ('D'). Recommended for earthquake-resistant RCC structures." },
  { q: "Do you supply MS Angles, Channels, and Beams?", a: "Yes, SDE supplies structural steel including MS Angles, MS Channels (ISMC), I-Beams (ISMB), and MS Flats as per IS:2062 standards." },
];

async function getSteelData() {
  const category = await prisma.category.findUnique({ where: { slug: "steel" } });
  if (!category) return { products: [], faqs: [], updatedAt: null };
  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { brand: { select: { name: true } } },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
  const faqs = await prisma.fAQ.findMany({ where: { categoryId: category.id, isActive: true }, orderBy: { sortOrder: "asc" } });
  const updatedAt = products.reduce((l, p) => p.lastUpdated > l ? p.lastUpdated : l, new Date(0));
  return { products, faqs, updatedAt: products.length ? updatedAt : null };
}

export default async function SteelPricePage() {
  const { products, faqs: dbFaqs, updatedAt } = await getSteelData();
  const hasData = products.length > 0;
  const displayFaqs = dbFaqs.length > 0 ? dbFaqs : FAQS;

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1a2129 0%, #2d3748 100%)" }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="badge-accent mb-3 inline-block">Updated Daily</div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            Today&apos;s Steel / TMT Bar Price in Chennai
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem", fontSize: "1rem" }}>
            Tata Tiscon, JSW Neosteel, Vizag Steel, SAIL, Suryadev, Agni Steels — Fe 500D, 8mm–32mm. Rates for Chennai market.
          </p>
          {updatedAt && <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: "#94e5f0" }}><TrendingUp size={14} /> Last updated: {formatDateTime(updatedAt)}</div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-start gap-3 p-4 rounded-xl mb-8" style={{ background: "#fdf5e6", border: "1px solid #f0dba8" }}>
          <AlertCircle size={18} style={{ color: "#c8972a", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "0.85rem", color: "#92620a" }}>
            <strong>Disclaimer:</strong> Steel prices shown are indicative market rates. Actual prices depend on mill price changes, quantity, delivery, and brand. Contact SDE for exact current rates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need today's TMT bar price and bulk quote.`} target="_blank" className="btn-primary px-6 py-3" style={{ background: "#25d366" }}>
            <WhatsAppIcon size={16} /> WhatsApp for Bulk Quote
          </a>
          <a href={BUSINESS.branches[0].phone1Href} className="btn-outline px-6 py-3">
            <Phone size={16} /> Call {BUSINESS.branches[0].phone1}
          </a>
        </div>

        <div className="sde-card overflow-hidden mb-10">
          <div className="px-5 py-4 border-b border-[#e2eaed]" style={{ background: "#f0f4f6" }}>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1a2129" }}>
              Steel / TMT Price List — Chennai ({new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead><tr><th className="text-left">Brand</th><th className="text-left">Grade</th><th className="text-left">Sizes</th><th className="text-left">Unit</th><th className="text-right">Price (₹)</th><th className="text-left">Remarks</th></tr></thead>
              <tbody>
                {hasData
                  ? products.map((p) => (
                      <tr key={p.id}>
                        <td className="font-semibold" style={{ color: "#1a2129" }}>{p.brand?.name || p.name}</td>
                        <td style={{ color: "#4a5568" }}>{p.specification || "—"}</td>
                        <td>—</td>
                        <td>{p.unit}</td>
                        <td className="text-right font-bold" style={{ color: "#2b7a8c" }}>{p.currentPrice ? formatPrice(Number(p.currentPrice)) : "On Request"}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.remarks || "—"}</td>
                      </tr>
                    ))
                  : FALLBACK_STEEL.map((p, i) => (
                      <tr key={i}>
                        <td className="font-semibold" style={{ color: "#1a2129" }}>{p.brand}</td>
                        <td style={{ color: "#4a5568" }}>{p.spec}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.sizes}</td>
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
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
          {displayFaqs.map((f: { q?: string; question?: string; a?: string; answer?: string }, i: number) => (
            <details key={i} className="sde-card group" open={i === 0}>
              <summary className="p-5 font-semibold cursor-pointer flex justify-between items-center" style={{ color: "#1a2129", listStyle: "none" }}>
                {f.q || f.question}
                <span className="text-[#2b7a8c] text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#4a5568" }}>{f.a || f.answer}</div>
            </details>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {[{ label: "Cement Price", href: "/today-cement-price" }, { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" }, { label: "Sand & Aggregates Price", href: "/today-sand-and-aggregates-price" }].map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#f0f4f6", color: "#2b7a8c", border: "1px solid #cde8ed" }}>
              {l.label} <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
