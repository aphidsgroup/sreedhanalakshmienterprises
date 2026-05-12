import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Phone, MessageCircle, TrendingUp, Shield, Truck, Clock, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { BUSINESS, CATEGORIES, TRUSTED_CLIENTS, SERVICE_AREAS } from "@/lib/constants";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Construction Materials Supplier Chennai",
  description:
    "Sree Dhanalakshmi Enterprises — Chennai's trusted construction material supplier since 1980. Cement, Steel, Bricks, Sand at best prices. Two branches: Kilpauk & Mangadu.",
  keywords: "cement dealer Chennai, TMT bars supplier, bricks supplier Chennai, sand aggregates",
});

export const dynamic = "force-dynamic";

async function getFeaturedPrices() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: {
        category: { select: { name: true, slug: true } },
        brand: { select: { name: true } },
      },
      orderBy: { displayOrder: "asc" },
      take: 8,
    });
  } catch {
    return [];
  }
}

const CEMENT_BRANDS = ["UltraTech", "Ramco", "Dalmia", "ACC", "Chettinad", "Bharathi", "JSW", "Ambuja"];
const STEEL_BRANDS  = ["Tata Tiscon", "JSW Neosteel", "Vizag Steel", "SAIL", "Suryadev", "Agni Steels"];

const WHY_US = [
  { icon: Shield, title: "40+ Years of Trust", desc: "Established in 1980, serving Chennai's construction industry with genuine branded materials." },
  { icon: TrendingUp, title: "Transparent Pricing", desc: "Daily updated rates. No hidden costs. What you see is what you pay." },
  { icon: Truck, title: "Reliable Delivery", desc: "Doorstep delivery across Chennai and Tamil Nadu for bulk and project orders." },
  { icon: Clock, title: "Project Support", desc: "Expert guidance from site start to finish. We help plan your material requirements." },
];

export default async function HomePage() {
  const featuredPrices = await getFeaturedPrices();

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="badge-accent mb-5 inline-block">🏗️ Chennai&apos;s Trusted Supplier Since 1980</div>
              <h1
                style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15 }}
              >
                Quality Construction Materials.{" "}
                <span style={{ color: "#c8972a" }}>Delivered to Your Site.</span>
              </h1>
              <p style={{ color: "#cde8ed", marginTop: "1.25rem", fontSize: "1.05rem", lineHeight: 1.75 }}>
                Cement, Steel / TMT Bars, Bricks &amp; Blocks, Sand &amp; Aggregates — all major brands, at transparent prices.
                Serving contractors, engineers, and builders across Tamil Nadu.
              </p>

              {/* Branches */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5 text-sm" style={{ color: "#94e5f0" }}>
                {BUSINESS.branches.map((b) => (
                  <div key={b.id} className="flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    <span>{b.name}: <a href={b.phone1Href} className="underline hover:text-white">{b.phone1}</a></span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need a quote for construction materials.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-7 py-3.5 text-base"
                  style={{ background: "#25d366" }}
                >
                  <MessageCircle size={18} /> WhatsApp Quote
                </a>
                <Link href="/today-cement-price" className="btn-outline px-7 py-3.5 text-base" style={{ borderColor: "#c8972a", color: "#c8972a" }}>
                  Today&apos;s Prices <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Price quick cards */}
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.priceSlug}`}
                  className="rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                >
                  <div style={{ fontSize: "2rem" }}>{cat.icon}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginTop: "0.5rem", fontFamily: "Outfit, sans-serif" }}>
                    {cat.name}
                  </div>
                  <div style={{ color: "#c8972a", fontSize: "0.78rem", fontWeight: 600, marginTop: "0.25rem" }}>
                    View Today&apos;s Price →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: "#c8972a" }} className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-white font-semibold text-sm">
          {["40+ Years Experience", "500+ Projects Supplied", "All Major Brands", "Chennai Wide Delivery", "Bulk Order Experts", "Genuine Materials"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle2 size={14} /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED PRICES */}
      {featuredPrices.length > 0 && (
        <section className="py-16 px-4 bg-[#f0f4f6]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p style={{ color: "#2b7a8c", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Live Rates</p>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 700, color: "#1a2129" }}>Today&apos;s Material Prices</h2>
              <div className="section-divider mt-3" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredPrices.map((p) => (
                <Link key={p.id} href={`/${p.category.slug === "cement" ? "today-cement-price" : p.category.slug === "steel" ? "today-steel-price" : p.category.slug === "bricks-and-blocks" ? "today-bricks-and-blocks-price" : "today-sand-and-aggregates-price"}`} className="sde-card p-5 block">
                  <div className="badge-primary text-xs mb-3">{p.category.name}</div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1a2129" }}>{p.name}</h3>
                  {p.brand && <p style={{ fontSize: "0.8rem", color: "#4a5568", marginTop: "0.2rem" }}>{p.brand.name}</p>}
                  {p.specification && <p style={{ fontSize: "0.78rem", color: "#64748b" }}>{p.specification}</p>}
                  <div style={{ marginTop: "0.75rem" }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#2b7a8c", fontFamily: "Outfit, sans-serif" }}>
                      {p.currentPrice ? formatPrice(Number(p.currentPrice)) : "—"}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>/{p.unit}</span>
                  </div>
                  {p.lastUpdated && (
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.5rem" }}>
                      Updated: {formatDateTime(p.lastUpdated)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/today-cement-price" className="btn-primary px-8 py-3">
                View All Prices <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p style={{ color: "#2b7a8c", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Why SDE?</p>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 700, color: "#1a2129" }}>The Supplier Builders Trust</h2>
            <div className="section-divider mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="sde-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "#edf6f8" }}>
                  <item.icon size={22} style={{ color: "#2b7a8c" }} />
                </div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1a2129", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4a5568", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-16 px-4 bg-[#f0f4f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p style={{ color: "#2b7a8c", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>What We Supply</p>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 700, color: "#1a2129" }}>Product Categories</h2>
            <div className="section-divider mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`} className="sde-card p-6 group">
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{cat.icon}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1a2129" }}>{cat.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "#4a5568", marginTop: "0.5rem", lineHeight: 1.6 }}>
                  All major brands. Bulk &amp; retail. Best rates in Chennai.
                </p>
                <div className="flex items-center gap-1 mt-4 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: "#2b7a8c" }}>
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS WE SUPPLY */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#1a2129" }}>Brands We Supply</h2>
            <div className="section-divider mt-3" />
          </div>
          <div className="mb-4">
            <p style={{ color: "#2b7a8c", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Cement</p>
            <div className="flex flex-wrap gap-3">
              {CEMENT_BRANDS.map((b) => (
                <span key={b} className="badge-primary text-sm py-1.5 px-4">{b}</span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p style={{ color: "#2b7a8c", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Steel / TMT Bars</p>
            <div className="flex flex-wrap gap-3">
              {STEEL_BRANDS.map((b) => (
                <span key={b} className="badge-primary text-sm py-1.5 px-4">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-14 px-4 bg-[#f0f4f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#1a2129" }}>We Deliver Across Tamil Nadu</h2>
            <p style={{ color: "#4a5568", marginTop: "0.5rem" }}>Bulk order delivery available across Chennai and Tamil Nadu districts.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {SERVICE_AREAS.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "#fff", border: "1px solid #cde8ed", color: "#2b7a8c" }}>
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED CLIENTS */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#1a2129", marginBottom: "2rem" }}>
            Trusted by Leading Builders
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {TRUSTED_CLIENTS.map((c) => (
              <div key={c} className="px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: "#f0f4f6", color: "#1a2129", border: "1px solid #e2eaed" }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PLACEHOLDER */}
      <section className="py-14 px-4 bg-[#f0f4f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#1a2129" }}>What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Kumar", role: "Site Engineer, Anna Nagar", text: "SDE has been our go-to supplier for over 10 years. Genuine materials, transparent pricing, and delivery on time — every time." },
              { name: "Muthu Selvan", role: "Contractor, Porur", text: "I trust SDE for all my project material needs. Their TMT bars and cement quality is top-notch. Highly recommend for bulk orders." },
              { name: "Priya Rajan", role: "Homeowner, Tambaram", text: "As a first-time builder, SDE guided me on material selection and quantities. Saved money and got genuine materials." },
            ].map((t) => (
              <div key={t.name} className="sde-card p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={14} fill="#c8972a" color="#c8972a" />)}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#4a5568", lineHeight: 1.7, fontStyle: "italic" }}>&quot;{t.text}&quot;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#2b7a8c" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1a2129" }}>{t.name}</p>
                    <p style={{ fontSize: "0.78rem", color: "#64748b" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY CTA */}
      <section className="py-16 px-4" style={{ background: "#1e5f6e" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "2rem", fontWeight: 700 }}>
            Ready to Order? Get an Instant Quote.
          </h2>
          <p style={{ color: "#cde8ed", marginTop: "0.75rem", fontSize: "1rem" }}>
            Call, WhatsApp, or fill our contact form. We respond within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={BUSINESS.branches[0].phone1Href} className="btn-primary px-8 py-3.5 text-base">
              <Phone size={18} /> {BUSINESS.branches[0].phone1}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need a bulk quote for construction materials.`}
              target="_blank"
              className="btn-primary px-8 py-3.5 text-base"
              style={{ background: "#25d366" }}
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <Link href="/contact" className="btn-outline px-8 py-3.5 text-base" style={{ borderColor: "#fff", color: "#fff" }}>
              Contact Form
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL BUSINESS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Sree Dhanalakshmi Enterprises",
            description: "Construction material supplier in Chennai since 1980.",
            email: BUSINESS.email,
            telephone: "+91" + BUSINESS.branches[0].phone1.replace(/\s/g, ""),
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS.branches[0].address,
              addressLocality: "Chennai",
              addressRegion: "Tamil Nadu",
              postalCode: BUSINESS.branches[0].pincode,
              addressCountry: "IN",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              opens: "09:00",
              closes: "18:00",
            },
          }),
        }}
      />
    </>
  );
}
