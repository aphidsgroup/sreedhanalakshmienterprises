import Link from "next/link";
import { Phone, CheckCircle, ArrowRight, Truck, MapPin, Package, Shield } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import FAQSection from "@/components/public/FAQSection";
import type { ProductSupplierData } from "@/data/productSupplierPages";

const AREA_LINKS = [
  { label: "Anna Nagar", href: "/construction-materials-supplier-in-anna-nagar" },
  { label: "Porur", href: "/construction-materials-supplier-in-porur" },
  { label: "Ambattur", href: "/construction-materials-supplier-in-ambattur" },
  { label: "Tambaram", href: "/construction-materials-supplier-in-tambaram" },
  { label: "Velachery", href: "/construction-materials-supplier-in-velachery" },
];

export default function ProductSupplierPage({ product }: { product: ProductSupplierData }) {
  const waMessage = encodeURIComponent(product.whatsappMessage);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sreedhanalakshmienterprises.in" },
      { "@type": "ListItem", position: 2, name: "Chennai Supplier Hub", item: "https://www.sreedhanalakshmienterprises.in/construction-materials-supplier-in-chennai" },
      { "@type": "ListItem", position: 3, name: product.productName, item: `https://www.sreedhanalakshmienterprises.in/${product.slug}` },
    ],
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* 1. Hero */}
      <section className="relative bg-[#1e5f6e] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#c8972a]">
            <Package size={20} />
            <span className="font-bold tracking-widest uppercase text-sm">Product Supplier</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            {product.productName} Supplier in Chennai
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sree Dhanalakshmi Enterprises supplies {product.productName.toLowerCase()} across Chennai with support from Kilpauk and Mangadu branches. Contact us with your quantity and site location to get today&apos;s price and delivery quotation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded shadow-lg transition-colors flex items-center gap-2"
            >
              Get Today&apos;s Price on WhatsApp
            </a>
            <a
              href={BUSINESS.branches[0].phone1Href}
              className="bg-white text-[#1e5f6e] hover:bg-gray-100 font-bold py-3 px-8 rounded shadow-lg transition-colors flex items-center gap-2"
            >
              <Phone size={18} /> {BUSINESS.branches[0].phone1}
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* 2. Product Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            About {product.productName}
          </h2>
          <p className="text-[#4a5568] leading-relaxed">{product.overview}</p>
        </section>

        {/* 3. Common Uses */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Common Uses of {product.productName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.commonUses.map((use, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-[#e2eaed]">
                <CheckCircle className="text-[#2b7a8c] mt-0.5 shrink-0" size={18} />
                <span className="text-[#4a5568] text-sm">{use}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Types / Grades Available */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Types & Grades Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.typesAvailable.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#e2eaed] shadow-sm">
                <h3 className="font-bold text-[#1a2129] mb-2">{t.name}</h3>
                <p className="text-[#4a5568] text-sm">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Today Price CTA */}
        <section className="mb-16 bg-[#edf6f8] p-8 rounded-xl border border-[#2b7a8c] border-opacity-20 text-center">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Check Today&apos;s {product.productName} Price
          </h2>
          <p className="text-[#4a5568] mb-6 max-w-2xl mx-auto">
            View the latest {product.productName.toLowerCase()} prices updated daily on our website. For final delivered pricing, share your quantity and location on WhatsApp.
          </p>
          <Link
            href={product.todayPriceSlug}
            className="inline-flex bg-[#1e5f6e] hover:bg-[#2b7a8c] text-white font-bold py-3 px-8 rounded transition-colors items-center gap-2"
          >
            View Today&apos;s Price <ArrowRight size={16} />
          </Link>
        </section>

        {/* 6. How Pricing Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            How {product.productName} Pricing Works
          </h2>
          <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
            <p className="text-[#4a5568] leading-relaxed mb-4">
              {product.productName} prices in Chennai vary based on brand, grade, size, quantity, and market conditions. We provide transparent daily updated rates on our website. The final quotation you receive on WhatsApp includes:
            </p>
            <ul className="space-y-2 text-[#4a5568] text-sm">
              <li className="flex items-start gap-2"><CheckCircle className="text-[#2b7a8c] mt-0.5 shrink-0" size={16} /><span>Base material price (per bag/tonne/unit/CFT as applicable)</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="text-[#2b7a8c] mt-0.5 shrink-0" size={16} /><span>GST as applicable</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="text-[#2b7a8c] mt-0.5 shrink-0" size={16} /><span>Transport charges based on delivery location and vehicle type</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="text-[#2b7a8c] mt-0.5 shrink-0" size={16} /><span>Unloading charges if applicable</span></li>
            </ul>
          </div>
          <div className="mt-4 bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-sm text-[#856404]">
            <strong>Pricing Note:</strong> Prices shown are indicative Chennai market rates. Final quotation may vary based on brand, grade, size, quantity, GST, delivery location, transport, unloading condition, stock availability and supplier rate changes.
          </div>
        </section>

        {/* 7. Delivery Areas */}
        <section className="mb-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              {product.productName} Delivery Across Chennai
            </h2>
            <p className="text-[#4a5568] mb-4 leading-relaxed">
              We deliver {product.productName.toLowerCase()} across Chennai from our two branches. {product.productName} is dispatched from the nearest branch to your construction site for maximum efficiency.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {AREA_LINKS.map((a) => (
                <Link key={a.href} href={a.href} className="bg-white border border-[#e2eaed] text-[#1e5f6e] hover:bg-[#edf6f8] px-3 py-1.5 rounded text-sm transition-colors">
                  {a.label}
                </Link>
              ))}
              <Link href="/construction-materials-supplier-in-chennai" className="text-[#2b7a8c] font-bold text-sm flex items-center gap-1 hover:underline">
                View All Areas <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-sm text-[#856404]">
              <strong>Delivery Note:</strong> Delivery availability, timing and charges depend on quantity, vehicle availability, location, traffic, site access and unloading conditions.
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              Our Branches
            </h2>
            <div className="space-y-4">
              {BUSINESS.branches.map((b) => (
                <div key={b.id} className="bg-white border border-[#e2eaed] rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-[#c8972a]" size={18} />
                    <h3 className="font-bold text-[#1a2129]">{b.name}</h3>
                  </div>
                  <p className="text-[#4a5568] text-sm mb-2">{b.address}, {b.city} - {b.pincode}</p>
                  <Link href={`/construction-materials-supplier-in-${b.id}`} className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">
                    View Branch Details <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Bulk Order Support */}
        <section className="mb-16 bg-[#1a2129] text-white rounded-xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Bulk {product.productName} Supply for Contractors
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-6 leading-relaxed">
            We supply {product.productName.toLowerCase()} in bulk for contractor projects, apartment builders, and commercial construction across Chennai. Enjoy competitive wholesale pricing, scheduled deliveries, and dedicated project support.
          </p>
          <div className="flex justify-center">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              Request Bulk Quotation
            </a>
          </div>
        </section>

        {/* 9. Quality Checklist */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            {product.productName} Quality Checklist
          </h2>
          <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.qualityChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Shield className="text-[#2b7a8c] mt-0.5 shrink-0" size={16} />
                  <span className="text-[#4a5568] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Related Materials */}
        {product.relatedProductSlugs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              Related Construction Materials
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.relatedProductSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="bg-white border border-[#e2eaed] text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {slug.replace(/-supplier-in-chennai/, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Supplier
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 11. FAQs */}
        <FAQSection faqs={product.faqs} title={`${product.productName} — Frequently Asked Questions`} />

        {/* 12. Final CTA */}
        <div className="text-center bg-white p-8 rounded-lg border border-[#e2eaed] shadow-sm">
          <h2 className="text-xl font-bold text-[#1a2129] mb-4">
            Need {product.productName} in Chennai?
          </h2>
          <p className="text-[#4a5568] mb-6">
            Share your quantity, grade preference, and delivery location on WhatsApp. We will respond with today&apos;s delivered price.
          </p>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded transition-colors items-center gap-2"
          >
            Get Quotation on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
