import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#1a2129", color: "#cbd5e1" }}>
      {/* CTA Strip */}
      <div style={{ background: "#2b7a8c" }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>
              Need Construction Materials? Get a Free Quote Today.
            </h2>
            <p style={{ color: "#cde8ed", marginTop: "0.5rem", fontSize: "0.95rem" }}>
              Bulk orders, project supply, doorstep delivery across Chennai & Tamil Nadu.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I need a quote for construction materials.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3"
              style={{ background: "#25d366", fontSize: "0.95rem" }}
            >
              <WhatsAppIcon size={16} /> WhatsApp Quote
            </a>
            <a href={BUSINESS.branches[0].phone1Href} className="btn-outline px-6 py-3" style={{ borderColor: "#fff", color: "#fff", fontSize: "0.95rem" }}>
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h3 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Sree Dhanalakshmi Enterprises
          </h3>
          <p style={{ color: "#2b7a8c", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            Delivering quality, Building trust
          </p>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Trusted construction material supplier in Chennai since 1980. Serving contractors, builders, and homeowners across Tamil Nadu.
          </p>
          {/* Branches */}
          <div>
            {BUSINESS.branches.map((b) => (
              <div key={b.id} className="mb-4">
                <p style={{ color: "#c8972a", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>{b.name}</p>
                <div className="flex items-start gap-2 text-sm mb-1">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#3d9aaf" }} />
                  <span>{b.address}, {b.city} - {b.pincode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={13} style={{ color: "#3d9aaf" }} />
                  <a href={b.phone1Href} className="hover:text-white transition-colors">{b.phone1}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Products & Areas</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Cement Supplier", href: "/cement-supplier-in-chennai" },
              { label: "TMT Steel Supplier", href: "/tmt-steel-supplier-in-chennai" },
              { label: "M Sand Supplier", href: "/m-sand-supplier-in-chennai" },
              { label: "Bricks & Blocks", href: "/bricks-supplier-in-chennai" },
              { label: "Fabrication Materials", href: "/fabrication-materials-supplier-in-chennai" },
              { label: "Chennai Hub", href: "/construction-materials-supplier-in-chennai" },
              { label: "Anna Nagar Service Area", href: "/construction-materials-supplier-in-anna-nagar" },
              { label: "Porur Service Area", href: "/construction-materials-supplier-in-porur" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#3d9aaf] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/construction-materials-supplier-in-chennai" className="text-[#c8972a] hover:text-white transition-colors mt-2 inline-block font-medium">
                View All 20+ Delivery Areas →
              </Link>
            </li>
          </ul>
        </div>

        {/* Today's Prices */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Today&apos;s Prices</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Cement Price Today", href: "/today-cement-price" },
              { label: "Steel Price Today", href: "/today-steel-price" },
              { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" },
              { label: "Sand & Aggregates Price", href: "/today-sand-and-aggregates-price" },
              { label: "Fabrication Materials Price", href: "/today-fabrication-materials-price" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#3d9aaf] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Buying Guides */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Buying Guides</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "M Sand vs P Sand", href: "/m-sand-vs-p-sand" },
              { label: "OPC vs PPC Cement", href: "/opc-vs-ppc-cement" },
              { label: "Fe 500D vs 550D Steel", href: "/fe-500d-vs-fe-550d-tmt-bars" },
              { label: "AAC Blocks vs Red Bricks", href: "/aac-blocks-vs-red-bricks" },
              { label: "Blue Metal Sizes", href: "/blue-metal-sizes-for-concrete" },
              { label: "House Material Estimate", href: "/construction-materials-required-for-1000-sq-ft-house" },
              { label: "How to Buy Safely", href: "/how-to-buy-construction-materials-in-chennai" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#3d9aaf] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-5 px-4 text-center text-xs">
        <p style={{ color: "#64748b" }}>
          © {year}Sree Dhanalakshmi Enterprises. All rights reserved. &nbsp;|&nbsp;
          <Link href="/privacy-policy" className="hover:text-[#3d9aaf]">Privacy Policy</Link> &nbsp;|&nbsp;
          <Link href="/terms" className="hover:text-[#3d9aaf]">Terms</Link>
        </p>
        <p style={{ color: "#374151", marginTop: "0.3rem" }}>
          Prices shown are indicative. Actual rates may vary by quantity, brand, location, and stock availability.
        </p>
      </div>
    </footer>
  );
}
