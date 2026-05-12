import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

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
              <MessageCircle size={16} /> WhatsApp Quote
            </a>
            <a href={BUSINESS.branches[0].phone1Href} className="btn-outline px-6 py-3" style={{ borderColor: "#fff", color: "#fff", fontSize: "0.95rem" }}>
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Sree Dhanalakshmi Enterprises
          </h3>
          <p style={{ color: "#2b7a8c", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            Delivering quality, Building trust
          </p>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
            Trusted construction material supplier in Chennai since 1980. Serving contractors, builders, and homeowners across Tamil Nadu.
          </p>
          <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 mt-4 text-sm hover:text-[#2b7a8c] transition-colors">
            <Mail size={14} /> {BUSINESS.email}
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Products", href: "/products" },
              { label: "Company Profile", href: "/company-profile" },
              { label: "Contact", href: "/contact" },
              { label: "FAQ", href: "/faq" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#3d9aaf] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
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
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#3d9aaf] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Branches */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Our Branches</h4>
          {BUSINESS.branches.map((b) => (
            <div key={b.id} className="mb-5">
              <p style={{ color: "#c8972a", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>{b.name}</p>
              <div className="flex items-start gap-2 text-sm mb-2">
                <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#3d9aaf" }} />
                <span>{b.address}, {b.city} - {b.pincode}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={13} style={{ color: "#3d9aaf" }} />
                <a href={b.phone1Href} className="hover:text-white transition-colors">{b.phone1}</a>
              </div>
              {b.phone2 && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Phone size={13} style={{ color: "#3d9aaf" }} />
                  <a href={b.phone2Href!} className="hover:text-white transition-colors">{b.phone2}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-5 px-4 text-center text-xs">
        <p style={{ color: "#64748b" }}>
          © {year} Sree Dhanalakshmi Enterprises. All rights reserved. &nbsp;|&nbsp;
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
