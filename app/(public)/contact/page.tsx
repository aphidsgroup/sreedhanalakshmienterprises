import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/public/WhatsAppIcon";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Contact Sree Dhanalakshmi Enterprises. Two branches in Chennai: Kilpauk (90947 79299) and Mangadu (73057 77117). WhatsApp, call, or fill our contact form.",
  path: "/contact",
  keywords: "SDE Enterprises contact, construction materials supplier contact Chennai",
});

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e5f6e 0%, #2b7a8c 100%)" }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            Contact Us
          </h1>
          <p style={{ color: "#cde8ed", marginTop: "0.75rem" }}>
            Two branches across Chennai. Call, WhatsApp, or visit us.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Branch cards */}
          <div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129", marginBottom: "1.5rem" }}>
              Our Branches
            </h2>
            <div className="space-y-6">
              {BUSINESS.branches.map((b) => (
                <div key={b.id} className="sde-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {b.isPrimary && <span className="badge-accent text-xs">Primary Branch</span>}
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1a2129" }}>{b.name}</h3>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={16} style={{ color: "#2b7a8c", marginTop: 2, flexShrink: 0 }} />
                    <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {b.address},<br />{b.city} - {b.pincode}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={15} style={{ color: "#2b7a8c" }} />
                    <a href={b.phone1Href} className="font-semibold text-[#1a2129] hover:text-[#2b7a8c] transition-colors">{b.phone1}</a>
                  </div>
                  {b.phone2 && (
                    <div className="flex items-center gap-3 mb-2">
                      <Phone size={15} style={{ color: "#2b7a8c" }} />
                      <a href={b.phone2Href!} className="font-semibold text-[#1a2129] hover:text-[#2b7a8c] transition-colors">{b.phone2}</a>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <a href={b.phone1Href} className="btn-primary text-sm px-4 py-2">
                      <Phone size={13} /> Call
                    </a>
                    <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" className="btn-primary text-sm px-4 py-2" style={{ background: "#25d366" }}>
                      <WhatsAppIcon size={13} /> WhatsApp
                    </a>
                    <a href={`https://maps.google.com/maps?q=${b.mapQuery}`} target="_blank" className="btn-outline text-sm px-4 py-2">
                      <MapPin size={13} /> Map
                    </a>
                  </div>
                </div>
              ))}

              {/* Hours & Email */}
              <div className="sde-card p-6">
                <h3 style={{ fontWeight: 700, color: "#1a2129", marginBottom: "1rem", fontFamily: "Outfit, sans-serif" }}>Business Hours</h3>
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={15} style={{ color: "#2b7a8c" }} />
                  <span style={{ fontSize: "0.9rem", color: "#4a5568" }}>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} style={{ color: "#2b7a8c" }} />
                  <span style={{ fontSize: "0.9rem", color: "#4a5568" }}>Sunday: Closed</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Mail size={15} style={{ color: "#2b7a8c" }} />
                  <a href={`mailto:${BUSINESS.email}`} style={{ fontSize: "0.9rem", color: "#2b7a8c" }}>{BUSINESS.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129", marginBottom: "1.5rem" }}>
              Send an Enquiry
            </h2>
            <div className="sde-card p-8">
              <form action="/api/enquiry" method="POST" className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }} htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all" style={{ border: "1px solid #e2eaed", background: "#f9fafb" }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }} htmlFor="phone">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" required placeholder="9XXXXXXXXX" className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none" style={{ border: "1px solid #e2eaed", background: "#f9fafb" }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }} htmlFor="email">Email (Optional)</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none" style={{ border: "1px solid #e2eaed", background: "#f9fafb" }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }} htmlFor="product">Material Required</label>
                  <select id="product" name="product" className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none" style={{ border: "1px solid #e2eaed", background: "#f9fafb" }}>
                    <option value="">Select material</option>
                    <option>Cement</option>
                    <option>Steel / TMT Bars</option>
                    <option>Bricks & Blocks</option>
                    <option>Sand & Aggregates</option>
                    <option>Multiple Materials</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }} htmlFor="message">Message / Quantity</label>
                  <textarea id="message" name="message" rows={4} placeholder="Describe your requirement, quantity, project location..." className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none" style={{ border: "1px solid #e2eaed", background: "#f9fafb" }} />
                </div>
                <button type="submit" className="btn-primary w-full py-3 justify-center text-base">
                  Send Enquiry
                </button>
                <p style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center" }}>
                  Or WhatsApp us directly:{" "}
                  <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" style={{ color: "#25d366", fontWeight: 600 }}>
                    {BUSINESS.whatsappDisplay}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
