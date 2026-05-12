"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

const nav = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Cement", href: "/products/cement" },
      { label: "Steel / TMT Bars", href: "/products/steel" },
      { label: "Bricks & Blocks", href: "/products/bricks-and-blocks" },
      { label: "Sand & Aggregates", href: "/products/sand-and-aggregates" },
    ],
  },
  {
    label: "Today's Prices",
    href: "#",
    children: [
      { label: "Cement Price", href: "/today-cement-price" },
      { label: "Steel Price", href: "/today-steel-price" },
      { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" },
      { label: "Sand & Aggregates Price", href: "/today-sand-and-aggregates-price" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e2eaed] shadow-sm">
      {/* Top bar */}
      <div style={{ background: "#1e5f6e" }} className="text-white text-xs py-1.5 px-4 hidden md:flex justify-between items-center">
        <span>📍 Two Branches: Kilpauk &amp; Mangadu, Chennai</span>
        <div className="flex gap-4">
          {BUSINESS.branches.map((b) => (
            <a key={b.id} href={b.phone1Href} className="flex items-center gap-1 hover:text-[#c8972a] transition-colors">
              <Phone size={11} /> {b.name}: {b.phone1}
            </a>
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpeg" alt="SDE Enterprises Logo" width={48} height={48} className="rounded" />
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", color: "#1a2129", fontWeight: 700, fontSize: "1rem", lineHeight: 1.1 }}>
              Sree Dhanalakshmi
            </div>
            <div style={{ color: "#2b7a8c", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em" }}>
              ENTERPRISES
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-[0.9rem] font-medium text-[#1a2129] hover:text-[#2b7a8c] hover:bg-[#f0f4f6] transition-all"
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}
                >
                  {item.label} <ChevronDown size={14} />
                </button>
                <div
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}
                  className={`absolute top-full left-0 mt-1 bg-white border border-[#e2eaed] rounded-xl shadow-lg py-2 min-w-[200px] transition-all ${openDrop === item.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}
                >
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className="block px-4 py-2 text-sm text-[#4a5568] hover:bg-[#edf6f8] hover:text-[#2b7a8c] transition-colors">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-lg text-[0.9rem] font-medium text-[#1a2129] hover:text-[#2b7a8c] hover:bg-[#f0f4f6] transition-all"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4"
            style={{ background: "#25d366" }}
          >
            <WhatsAppIcon size={14} /> WhatsApp Us
          </a>
          <a href={BUSINESS.branches[0].phone1Href} className="btn-outline text-sm py-2 px-4">
            <Phone size={14} /> Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[#f0f4f6]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#e2eaed] bg-white px-4 py-4 space-y-1">
          {nav.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-3 py-2.5 rounded-lg text-[0.95rem] font-medium text-[#1a2129] hover:bg-[#edf6f8] hover:text-[#2b7a8c]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 space-y-1">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-3 py-2 rounded-lg text-sm text-[#4a5568] hover:bg-[#edf6f8] hover:text-[#2b7a8c]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 flex gap-3">
            <a href={BUSINESS.branches[0].phone1Href} className="btn-primary text-sm flex-1 justify-center">
              <Phone size={14} /> Call
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" className="btn-primary text-sm flex-1 justify-center" style={{ background: "#25d366" }}>
              <WhatsAppIcon size={14} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
