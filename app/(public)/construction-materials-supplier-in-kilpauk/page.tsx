import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, MapPin, Truck } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Construction Materials Supplier in Kilpauk | Cement, Steel, Sand & Bricks",
  description: "Get cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials delivered from our Kilpauk branch. Contact Sree Dhanalakshmi Enterprises.",
  path: "/construction-materials-supplier-in-kilpauk",
  keywords: "construction materials supplier in Kilpauk, building materials Kilpauk, cement supplier Kilpauk, TMT steel supplier Kilpauk, Anna Nagar construction materials",
});

export default function KilpaukBranchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sree Dhanalakshmi Enterprises - Kilpauk Branch",
    description: "Sree Dhanalakshmi Enterprises Kilpauk branch supplies cement, TMT steel, bricks, sand, and fabrication materials to central and north Chennai.",
    url: "https://www.sreedhanalakshmienterprises.in/construction-materials-supplier-in-kilpauk",
    telephone: BUSINESS.branches[0].phone1,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.branches[0].address,
      addressLocality: "Kilpauk",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: ["Kilpauk", "Anna Nagar", "Nungambakkam", "T Nagar", "Chetpet", "Egmore", "Purasawalkam", "Aminjikarai", "Koyambedu"],
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="relative bg-[#1e5f6e] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#c8972a]">
            <MapPin size={24} />
            <span className="font-bold tracking-widest uppercase text-sm">Kilpauk Branch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Construction Materials Supplier in Kilpauk
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Looking for a reliable construction materials supplier near Kilpauk? Sree Dhanalakshmi Enterprises supplies cement, TMT steel, bricks, blocks, sand, aggregates and fabrication materials for residential, commercial and contractor projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded shadow-lg transition-colors">
              Get Quote on WhatsApp
            </a>
            <a href={BUSINESS.branches[0].phone1Href} className="bg-white text-[#1e5f6e] hover:bg-gray-100 font-bold py-3 px-8 rounded shadow-lg transition-colors flex items-center gap-2">
              <Phone size={18} /> {BUSINESS.branches[0].phone1}
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Branch Info & Delivery Areas */}
        <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Central Chennai Delivery Hub</h2>
            <p className="text-[#4a5568] mb-6 leading-relaxed">
              Our Kilpauk branch is strategically located to serve the central and northern parts of Chennai with minimal transit time. Whether you are building an independent house, renovating an apartment, or managing a commercial site, we ensure rapid delivery of genuine materials.
            </p>
            <h3 className="font-bold text-[#1a2129] mb-3">Nearby Service Areas:</h3>
            <div className="flex flex-wrap gap-2">
              {["Anna Nagar", "Nungambakkam", "T Nagar", "Chetpet", "Egmore", "Purasawalkam", "Aminjikarai", "Koyambedu"].map(area => (
                <span key={area} className="bg-white border border-[#e2eaed] text-[#4a5568] px-3 py-1 rounded text-sm">{area}</span>
              ))}
            </div>
          </div>
          <div className="bg-[#1a2129] text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-[#c8972a]">Kilpauk Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1" size={20} />
                <p className="text-sm leading-relaxed">{BUSINESS.branches[0].address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="shrink-0" size={20} />
                <p className="text-sm">{BUSINESS.branches[0].phone1}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Available */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-8 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Materials Available in Kilpauk</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
              <h3 className="font-bold text-[#1a2129] mb-2">Cement & Steel</h3>
              <p className="text-[#4a5568] text-sm mb-4">Top brands of OPC/PPC Cement and Fe 500D TMT Steel for strong foundations.</p>
              <Link href="/today-cement-price" className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">Check Cement Price <ArrowRight size={14}/></Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
              <h3 className="font-bold text-[#1a2129] mb-2">Bricks & Aggregates</h3>
              <p className="text-[#4a5568] text-sm mb-4">Red bricks, AAC blocks, M Sand, P Sand, and Blue Metal delivered by lorry.</p>
              <Link href="/today-sand-and-aggregates-price" className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">Check Sand Price <ArrowRight size={14}/></Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
              <h3 className="font-bold text-[#1a2129] mb-2">Fabrication Materials</h3>
              <p className="text-[#4a5568] text-sm mb-4">MS Angles, pipes, plates, and sheets for grills, gates, and structural work.</p>
              <Link href="/today-fabrication-materials-price" className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">Check Fabrication Price <ArrowRight size={14}/></Link>
            </div>
          </div>
        </section>

        {/* Branch FAQ */}
        <FAQSection faqs={[
          { question: "Do you deliver construction materials to Anna Nagar and Nungambakkam?", answer: "Yes, our Kilpauk branch frequently delivers cement, steel, and sand to Anna Nagar, Nungambakkam, and surrounding central Chennai locations." },
          { question: "Can contractors place bulk orders at the Kilpauk branch?", answer: "Absolutely. We supply bulk orders for builders and contractors at wholesale prices with direct site delivery." },
          { question: "How is the delivery charge calculated from Kilpauk?", answer: "Delivery charges depend on the exact distance to your site and the quantity ordered. Some bulk orders may qualify for free delivery." },
          { question: "Can I order through WhatsApp?", answer: "Yes, you can request a quote and confirm your order directly through our official WhatsApp number." }
        ]} />

      </div>
    </div>
  );
}
