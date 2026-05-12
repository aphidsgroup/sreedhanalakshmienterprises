import { buildMetadata } from "@/lib/seo";
import { BUSINESS, TRUSTED_CLIENTS } from "@/lib/constants";
import { Shield, Award, Truck, Users, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "About Us — 40+ Years Trusted Supplier",
  description: "About Sree Dhanalakshmi Enterprises — Chennai's trusted construction material supplier since 1980. Learn about our history, values, and commitment to quality.",
  path: "/about",
});

const MILESTONES = [
  { year: "1980", text: "Founded in Kilpauk, Chennai with a vision to provide genuine construction materials at honest prices." },
  { year: "1990s", text: "Expanded product range to include all major cement brands, TMT bars, and masonry materials." },
  { year: "2000s", text: "Became preferred supplier for leading builders including Appaswamy Real Estates and Arun Excello." },
  { year: "2015+", text: "Added AAC Blocks and modern construction materials to the product portfolio." },
  { year: "2024", text: "Opened second branch at Mangadu to serve the growing western suburbs of Chennai." },
];

const VALUES = [
  { icon: Shield, title: "Genuine Materials Only", desc: "Every product we supply is from authorised distributors of the original brands. No substitutes, no counterfeits." },
  { icon: Award, title: "Transparent Pricing", desc: "Our daily updated prices ensure you always know the market rate. No hidden markups. No surprise charges." },
  { icon: Truck, title: "Reliable Supply", desc: "We maintain strong brand relationships and adequate stock to ensure your project never faces material shortages." },
  { icon: Users, title: "Relationship First", desc: "We treat every buyer — from a first-time homeowner to a large contractor — with the same respect and seriousness." },
];

export default function AboutPage() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1e5f6e 0%, #2b7a8c 100%)" }} className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="badge-accent mb-3 inline-block">Est. 1980</div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            About Sree Dhanalakshmi Enterprises
          </h1>
          <p style={{ color: "#cde8ed", marginTop: "0.75rem", fontSize: "1rem", maxWidth: "600px" }}>
            For over 40 years, SDE Enterprises has been Chennai&apos;s dependable source for genuine construction materials — serving contractors, engineers, builders, and homeowners with honesty and expertise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2129", marginBottom: "1rem" }}>
              Our Story
            </h2>
            <div style={{ color: "#4a5568", lineHeight: 1.8, fontSize: "0.95rem" }} className="space-y-4">
              <p>
                Sree Dhanalakshmi Enterprises was founded in 1980 with a simple but strong purpose: to provide construction professionals and homeowners in Chennai with genuine, branded building materials at fair, transparent prices.
              </p>
              <p>
                From our founding branch on Kilpauk Garden Road, we built relationships with leading cement manufacturers, steel mills, and masonry suppliers — ensuring that every product we sell meets the quality standards your project deserves.
              </p>
              <p>
                Today, we operate two branches in Chennai — Kilpauk and Mangadu — and supply materials to some of the most respected builders in Tamil Nadu, including Appaswamy Real Estates, Arun Excello, India Builders, and Firm Foundations.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "40+", label: "Years of Experience" },
              { value: "2", label: "Branches in Chennai" },
              { value: "500+", label: "Projects Supplied" },
              { value: "10+", label: "Cement Brands" },
            ].map((s) => (
              <div key={s.label} className="sde-card p-6 text-center">
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "#2b7a8c" }}>{s.value}</div>
                <div style={{ fontSize: "0.85rem", color: "#4a5568", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2129" }}>Our Values</h2>
            <div className="section-divider mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="sde-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "#edf6f8" }}>
                  <v.icon size={22} style={{ color: "#2b7a8c" }} />
                </div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1a2129", marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#4a5568", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2129", marginBottom: "2rem", textAlign: "center" }}>Our Journey</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "#2b7a8c", color: "#fff" }}>
                  {m.year}
                </div>
                <div className="flex-1 pt-1">
                  <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.7 }}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div className="py-10 px-8 rounded-2xl text-center" style={{ background: "#f0f4f6" }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129", marginBottom: "1.5rem" }}>
            Trusted by Leading Builders &amp; Developers
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {TRUSTED_CLIENTS.map((c) => (
              <div key={c} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white" style={{ border: "1px solid #e2eaed", color: "#1a2129" }}>
                <CheckCircle2 size={14} style={{ color: "#2b7a8c" }} /> {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
