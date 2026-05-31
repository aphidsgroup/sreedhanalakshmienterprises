import Link from "next/link";
import { Phone, CheckCircle, ArrowRight, AlertTriangle, BookOpen, HelpCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import FAQSection from "@/components/public/FAQSection";
import type { BuyingGuideData } from "@/data/buyingGuides";

export default function BuyingGuidePage({ guide }: { guide: BuyingGuideData }) {
  const waMessage = encodeURIComponent(guide.whatsappMessage);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sreedhanalakshmienterprises.in" },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: "https://www.sreedhanalakshmienterprises.in/construction-materials-supplier-in-chennai" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://www.sreedhanalakshmienterprises.in/${guide.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    author: {
      "@type": "Organization",
      name: "Sree Dhanalakshmi Enterprises",
      url: "https://www.sreedhanalakshmienterprises.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Sree Dhanalakshmi Enterprises",
      logo: { "@type": "ImageObject", url: "https://www.sreedhanalakshmienterprises.in/logo.jpeg" },
    },
    datePublished: new Date().toISOString().split("T")[0],
    mainEntityOfPage: `https://www.sreedhanalakshmienterprises.in/${guide.slug}`,
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* 1. Hero */}
      <section className="relative bg-[#1e5f6e] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#c8972a]">
            <BookOpen size={20} />
            <span className="font-bold tracking-widest uppercase text-sm">Buying Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            {guide.title}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* 2. Direct Short Answer */}
        <section className="mb-12 bg-[#edf6f8] border border-[#2b7a8c] border-opacity-20 rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-3">
            <HelpCircle className="text-[#2b7a8c] mt-1 shrink-0" size={24} />
            <div>
              <h2 className="text-lg font-bold text-[#1a2129] mb-2">Quick Answer</h2>
              <p className="text-[#4a5568] leading-relaxed">{guide.shortAnswer}</p>
            </div>
          </div>
        </section>

        {/* 3. Detailed Sections */}
        {guide.sections.map((sec, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              {sec.heading}
            </h2>
            <p className="text-[#4a5568] leading-relaxed">{sec.content}</p>
          </section>
        ))}

        {/* 4. Comparison Table */}
        {guide.comparisonTable && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              Comparison Table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-[#e2eaed] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1e5f6e] text-white">
                    {guide.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left text-sm font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-sm text-[#4a5568] border-t border-[#e2eaed]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {guide.commonMistakes.map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-[#e2eaed]">
                <AlertTriangle className="text-[#c8972a] mt-0.5 shrink-0" size={18} />
                <span className="text-[#4a5568] text-sm">{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. When to Contact Supplier */}
        <section className="mb-12 bg-[#1a2129] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            When to Contact Your Supplier
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{guide.whenToContact}</p>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded transition-colors items-center gap-2"
          >
            Contact Us on WhatsApp
          </a>
        </section>

        {/* 7. Related Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Related Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guide.relatedProductSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="flex items-center gap-2 bg-white p-4 rounded-lg border border-[#e2eaed] hover:bg-[#edf6f8] transition-colors"
              >
                <CheckCircle className="text-[#2b7a8c] shrink-0" size={18} />
                <span className="text-[#1e5f6e] font-medium text-sm">
                  {slug.replace(/-supplier-in-chennai/, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Supplier
                </span>
                <ArrowRight className="ml-auto text-[#2b7a8c]" size={14} />
              </Link>
            ))}
            {guide.relatedPriceSlugs.map((slug) => (
              <Link
                key={slug}
                href={slug}
                className="flex items-center gap-2 bg-white p-4 rounded-lg border border-[#e2eaed] hover:bg-[#edf6f8] transition-colors"
              >
                <CheckCircle className="text-[#c8972a] shrink-0" size={18} />
                <span className="text-[#1e5f6e] font-medium text-sm">
                  {slug.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </span>
                <ArrowRight className="ml-auto text-[#2b7a8c]" size={14} />
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mb-12 bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-sm text-[#856404]">
          <strong>Note:</strong> Prices shown are indicative Chennai market rates. Final quotation may vary based on brand, grade, size, quantity, GST, delivery location, transport, unloading condition, stock availability and supplier rate changes. Please call or WhatsApp Sree Dhanalakshmi Enterprises for the latest final price.
        </div>

        {/* 8. FAQs */}
        <FAQSection faqs={guide.faqs} title="Frequently Asked Questions" />

        {/* 9. Final CTA */}
        <div className="text-center bg-white p-8 rounded-lg border border-[#e2eaed] shadow-sm">
          <h2 className="text-xl font-bold text-[#1a2129] mb-4">
            Need Help Choosing the Right Material?
          </h2>
          <p className="text-[#4a5568] mb-6">
            Our team can guide you on the best grade, brand, and quantity for your project. Share your requirements on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded transition-colors items-center gap-2"
          >
            Get Expert Guidance on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
