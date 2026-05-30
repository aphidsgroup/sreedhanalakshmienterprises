import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, MapPin, Truck } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Construction Materials Supplier in Mangadu | Cement, Steel, Sand & Bricks",
  description: "Get cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials delivered from our Mangadu branch. Contact Sree Dhanalakshmi Enterprises.",
  path: "/construction-materials-supplier-in-mangadu",
  keywords: "construction materials supplier in Mangadu, building materials Mangadu, cement supplier Porur, TMT steel supplier Poonamallee, Kundrathur construction materials",
});

export default function MangaduBranchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sree Dhanalakshmi Enterprises - Mangadu Branch",
    description: "Sree Dhanalakshmi Enterprises Mangadu branch supplies cement, TMT steel, bricks, sand, and fabrication materials to west and southwest Chennai.",
    url: "https://www.sreedhanalakshmienterprises.in/construction-materials-supplier-in-mangadu",
    telephone: BUSINESS.branches[0].phone1,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mangadu, Chennai", // Assuming general address since constants only has one address right now
      addressLocality: "Mangadu",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: ["Mangadu", "Porur", "Kundrathur", "Iyyappanthangal", "Poonamallee", "Ramapuram", "Maduravoyal", "Thiruverkadu", "Avadi"],
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="relative bg-[#1e5f6e] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#c8972a]">
            <MapPin size={24} />
            <span className="font-bold tracking-widest uppercase text-sm">Mangadu Branch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Construction Materials Supplier in Mangadu
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Looking for a reliable construction materials supplier near Mangadu and Porur? Sree Dhanalakshmi Enterprises supplies cement, TMT steel, bricks, blocks, sand, aggregates and fabrication materials for all projects.
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
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>West Chennai Delivery Hub</h2>
            <p className="text-[#4a5568] mb-6 leading-relaxed">
              Our Mangadu branch specializes in catering to the rapid construction development in West and Southwest Chennai. We efficiently dispatch bulk lorry loads of bricks, sand, cement, and steel to sprawling residential developments and commercial sites in these zones.
            </p>
            <h3 className="font-bold text-[#1a2129] mb-3">Nearby Service Areas:</h3>
            <div className="flex flex-wrap gap-2">
              {["Porur", "Kundrathur", "Iyyappanthangal", "Poonamallee", "Ramapuram", "Maduravoyal", "Thiruverkadu", "Avadi"].map(area => (
                <span key={area} className="bg-white border border-[#e2eaed] text-[#4a5568] px-3 py-1 rounded text-sm">{area}</span>
              ))}
            </div>
          </div>
          <div className="bg-[#1a2129] text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-[#c8972a]">Mangadu Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1" size={20} />
                <p className="text-sm leading-relaxed">Mangadu, Chennai, Tamil Nadu</p>
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
          <h2 className="text-2xl font-bold text-[#1a2129] mb-8 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Materials Available from Mangadu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
              <h3 className="font-bold text-[#1a2129] mb-2">Cement & Steel</h3>
              <p className="text-[#4a5568] text-sm mb-4">Ensure your foundation is solid with direct site delivery of top-grade TMT bars and Cement.</p>
              <Link href="/today-steel-price" className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">Check Steel Price <ArrowRight size={14}/></Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
              <h3 className="font-bold text-[#1a2129] mb-2">Bricks & Aggregates</h3>
              <p className="text-[#4a5568] text-sm mb-4">Bulk load supply of Chamber Bricks, M-Sand, P-Sand, and Blue metal for large sites.</p>
              <Link href="/today-bricks-and-blocks-price" className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">Check Bricks Price <ArrowRight size={14}/></Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e2eaed]">
              <h3 className="font-bold text-[#1a2129] mb-2">Fabrication Materials</h3>
              <p className="text-[#4a5568] text-sm mb-4">MS Angles, pipes, and sheets ready to be dispatched for your framing requirements.</p>
              <Link href="/today-fabrication-materials-price" className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">Check Fabrication Price <ArrowRight size={14}/></Link>
            </div>
          </div>
        </section>

        {/* Branch FAQ */}
        <FAQSection faqs={[
          { question: "Do you deliver construction materials to Porur and Poonamallee?", answer: "Yes, our Mangadu branch is positioned perfectly to deliver rapidly to Porur, Poonamallee, Kundrathur, and Iyyappanthangal." },
          { question: "Can contractors place bulk orders at the Mangadu branch?", answer: "Yes, we regularly supply large-scale contractor projects and apartment buildings in the West Chennai corridor." },
          { question: "How is the delivery charge calculated?", answer: "Delivery charge is calculated based on vehicle size and distance. Please share your exact site location on WhatsApp for a complete estimate." },
          { question: "Can I order through WhatsApp?", answer: "Yes! Share your requirement list and delivery location via WhatsApp, and we will send a quotation immediately." }
        ]} />

      </div>
    </div>
  );
}
