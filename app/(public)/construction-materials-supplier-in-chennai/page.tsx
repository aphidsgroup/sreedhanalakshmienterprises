import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, MapPin, Truck } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Construction Materials Supplier in Chennai | Cement, Steel, Sand, Bricks & Fabrication Materials",
  description: "Sree Dhanalakshmi Enterprises supplies cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials across Chennai. Get today’s price and site delivery quotation on WhatsApp.",
  path: "/construction-materials-supplier-in-chennai",
  keywords: "construction materials supplier in Chennai, building materials Chennai, cement supplier Chennai, TMT steel supplier Chennai, bricks supplier Chennai, M Sand Chennai, construction material delivery Chennai",
});

export default function ChennaiSupplierPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sree Dhanalakshmi Enterprises",
    description: "Sree Dhanalakshmi Enterprises is a trusted construction materials supplier in Chennai since 1980, supplying cement, TMT steel, bricks, blocks, sand, aggregates, and fabrication materials.",
    url: "https://www.sreedhanalakshmienterprises.in",
    logo: "https://www.sreedhanalakshmienterprises.in/logo.jpeg",
    telephone: BUSINESS.branches[0].phone1,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.branches[0].address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Chennai",
    },
    sameAs: [],
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* 1. Hero with CTA */}
      <section className="relative bg-[#1e5f6e] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Construction Materials Supplier in Chennai
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sree Dhanalakshmi Enterprises supplies cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials across Chennai. Get today&apos;s price and site delivery quotation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href={`https://wa.me/${BUSINESS.whatsapp}`}
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
        
        {/* 2. What We Supply */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-8 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>What We Supply</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Cement", desc: "UltraTech, Ramco, Dalmia, ACC, Chettinad, JSW. OPC & PPC grades available for bulk site delivery.", slug: "cement-supplier-in-chennai" },
              { title: "TMT Steel", desc: "Tata Tiscon, JSW Neosteel, Suryadev, Agni. Fe 500D and Fe 550D grades for strong foundations.", slug: "tmt-steel-supplier-in-chennai" },
              { title: "Bricks & Blocks", desc: "Red chamber bricks, AAC blocks, fly ash bricks, and solid blocks for superior wall construction.", slug: "bricks-supplier-in-chennai" },
              { title: "Sand & Aggregates", desc: "Double washed M Sand, P Sand, River Sand, Blue Metal (20mm, 12mm), and crusher dust.", slug: "m-sand-supplier-in-chennai" },
              { title: "Fabrication Materials", desc: "MS Angles, MS Channels, Pipes, Plates, and Roofing Sheets for all structural fabrication.", slug: "fabrication-materials-supplier-in-chennai" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#e2eaed] shadow-sm">
                <CheckCircle className="text-[#2b7a8c] mb-4" size={28} />
                <h3 className="font-bold text-lg mb-2 text-[#1a2129]">
                  <Link href={`/${item.slug}`} className="hover:text-[#2b7a8c] hover:underline transition-colors">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-[#4a5568] text-sm mb-3">{item.desc}</p>
                <Link href={`/${item.slug}`} className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">
                  View details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Today Price Links */}
        <section className="mb-16 bg-[#edf6f8] p-8 rounded-xl border border-[#2b7a8c] border-opacity-20">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Check Today&apos;s Prices</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/today-cement-price" className="bg-white px-6 py-3 rounded border border-[#e2eaed] font-medium text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white transition-colors">Cement Price</Link>
            <Link href="/today-steel-price" className="bg-white px-6 py-3 rounded border border-[#e2eaed] font-medium text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white transition-colors">TMT Steel Price</Link>
            <Link href="/today-bricks-and-blocks-price" className="bg-white px-6 py-3 rounded border border-[#e2eaed] font-medium text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white transition-colors">Bricks & Blocks Price</Link>
            <Link href="/today-sand-and-aggregates-price" className="bg-white px-6 py-3 rounded border border-[#e2eaed] font-medium text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white transition-colors">Sand & Blue Metal Price</Link>
            <Link href="/today-fabrication-materials-price" className="bg-white px-6 py-3 rounded border border-[#e2eaed] font-medium text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white transition-colors">Fabrication Price</Link>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* 4. Delivery Across Chennai */}
          <section>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>Site Delivery Across Chennai</h2>
            <p className="text-[#4a5568] mb-4 leading-relaxed">
              We understand that timely material delivery is critical for keeping your project on schedule. Sree Dhanalakshmi Enterprises provides reliable site delivery across Chennai and surrounding areas.
            </p>
            <ul className="space-y-3 mb-6 text-[#4a5568]">
              <li className="flex items-start gap-2"><Truck className="text-[#2b7a8c] mt-1 shrink-0" size={18}/> <span>Direct delivery from our yards or factory to your construction site.</span></li>
              <li className="flex items-start gap-2"><Truck className="text-[#2b7a8c] mt-1 shrink-0" size={18}/> <span>Multiple vehicle sizes available depending on order quantity and site road access.</span></li>
              <li className="flex items-start gap-2"><Truck className="text-[#2b7a8c] mt-1 shrink-0" size={18}/> <span>Delivery timing depends on quantity, traffic, vehicle availability, and stock.</span></li>
            </ul>
            <div className="bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-sm text-[#856404]">
              <strong>Note:</strong> Share your exact quantity and delivery location on WhatsApp for a complete quotation including transport charges.
            </div>
          </section>

          {/* 5. Why Builders Choose SDE */}
          <section>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>Why Builders Choose Us</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-[#e2eaed] shadow-sm">
                <h3 className="font-bold text-[#1a2129]">Trusted Legacy Since 1980</h3>
                <p className="text-sm text-[#4a5568]">Decades of experience supplying high-quality, genuine construction materials to Chennai.</p>
              </div>
              <div className="bg-white p-4 rounded border border-[#e2eaed] shadow-sm">
                <h3 className="font-bold text-[#1a2129]">Transparent Pricing</h3>
                <p className="text-sm text-[#4a5568]">No hidden costs. We provide daily updated market rates for wholesale bulk orders.</p>
              </div>
              <div className="bg-white p-4 rounded border border-[#e2eaed] shadow-sm">
                <h3 className="font-bold text-[#1a2129]">One-Stop Supplier</h3>
                <p className="text-sm text-[#4a5568]">From foundation (cement/steel) to finish, source all primary materials from a single vendor.</p>
              </div>
            </div>
          </section>
        </div>

        {/* 6. Materials by Project Type */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Materials by Project Type</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e2eaed] rounded-lg p-6">
              <h3 className="font-bold text-[#1a2129] text-lg mb-3">Individual Houses</h3>
              <p className="text-[#4a5568] text-sm mb-4">Complete supply of OPC 53 cement, Fe 500D TMT bars, Red bricks, and M-Sand for robust independent home construction.</p>
            </div>
            <div className="bg-white border border-[#e2eaed] rounded-lg p-6">
              <h3 className="font-bold text-[#1a2129] text-lg mb-3">Apartment Projects</h3>
              <p className="text-[#4a5568] text-sm mb-4">Bulk site delivery of AAC blocks, PPC cement, Double Washed M Sand, and heavy-grade steel for multi-story residential buildings.</p>
            </div>
            <div className="bg-white border border-[#e2eaed] rounded-lg p-6">
              <h3 className="font-bold text-[#1a2129] text-lg mb-3">Contractor / Industrial</h3>
              <p className="text-[#4a5568] text-sm mb-4">Wholesale rates for fabrication materials, structural steel, blue metal, and high-grade cement for commercial sheds and workshops.</p>
            </div>
          </div>
        </section>

        {/* 7. Branches */}
        <section className="mb-16 bg-[#1a2129] text-white rounded-xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Our Branches in Chennai</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#2c3743] p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-[#c8972a]" />
                <h3 className="text-xl font-bold">Kilpauk Branch</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">Serving Central and North Chennai areas including Anna Nagar, Nungambakkam, T Nagar, Chetpet, Egmore, and Koyambedu.</p>
              <Link href="/construction-materials-supplier-in-kilpauk" className="text-[#c8972a] hover:underline text-sm font-bold flex items-center gap-1">
                View Kilpauk Details <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-[#2c3743] p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-[#c8972a]" />
                <h3 className="text-xl font-bold">Mangadu Branch</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">Serving West and Southwest Chennai including Porur, Kundrathur, Poonamallee, Ramapuram, Maduravoyal, and Avadi.</p>
              <Link href="/construction-materials-supplier-in-mangadu" className="text-[#c8972a] hover:underline text-sm font-bold flex items-center gap-1">
                View Mangadu Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. How to Order */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>How to Order</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-[#2b7a8c] border-opacity-30 p-6 rounded-lg text-center flex-1 w-full">
              <div className="w-10 h-10 bg-[#edf6f8] text-[#2b7a8c] rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
              <h3 className="font-bold text-[#1a2129] mb-2">Share Details</h3>
              <p className="text-sm text-[#4a5568]">WhatsApp your required materials, quantity, and delivery location.</p>
            </div>
            <ArrowRight className="hidden md:block text-gray-300" />
            <div className="bg-white border border-[#2b7a8c] border-opacity-30 p-6 rounded-lg text-center flex-1 w-full">
              <div className="w-10 h-10 bg-[#edf6f8] text-[#2b7a8c] rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
              <h3 className="font-bold text-[#1a2129] mb-2">Get Quotation</h3>
              <p className="text-sm text-[#4a5568]">We will provide today&apos;s best price including transport charges.</p>
            </div>
            <ArrowRight className="hidden md:block text-gray-300" />
            <div className="bg-white border border-[#2b7a8c] border-opacity-30 p-6 rounded-lg text-center flex-1 w-full">
              <div className="w-10 h-10 bg-[#edf6f8] text-[#2b7a8c] rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
              <h3 className="font-bold text-[#1a2129] mb-2">Site Delivery</h3>
              <p className="text-sm text-[#4a5568]">Confirm the order and receive materials directly at your site.</p>
            </div>
          </div>
        </section>

        {/* 9. FAQs */}
        <FAQSection faqs={[
          { question: "Do you supply construction materials across Chennai?", answer: "Yes, Sree Dhanalakshmi Enterprises supplies and delivers construction materials across all major areas in Chennai and its suburbs." },
          { question: "What materials do you supply?", answer: "We are a comprehensive supplier for Cement, TMT Steel Bars, Bricks, AAC Blocks, M Sand, P Sand, Blue Metal, and Structural Fabrication Materials." },
          { question: "Can I get today's price on WhatsApp?", answer: "Absolutely. Click the WhatsApp button on our website to instantly request today's wholesale price for any material." },
          { question: "Do you deliver to my site?", answer: "Yes, we arrange transportation and deliver materials directly to your construction site. Delivery charges depend on the distance and load size." },
          { question: "Do you support bulk orders for contractors?", answer: "Yes, we specialize in bulk supply for contractors, builders, and large apartment projects, offering competitive wholesale pricing." },
          { question: "Are prices fixed?", answer: "Material prices fluctuate based on market conditions, daily rates, and transport costs. The final quoted price on WhatsApp will be the confirmed rate for your order." },
          { question: "Which branch should I contact?", answer: "You can contact our primary number for any enquiry. Depending on your delivery location, we will dispatch materials from either our Kilpauk or Mangadu yard for maximum efficiency." },
          { question: "Do you supply cement, steel, sand, and bricks together?", answer: "Yes, we are a one-stop-shop. You can source your complete structural requirement from us, simplifying your procurement process." }
        ]} />

        {/* 10. Final WhatsApp CTA */}
        <div className="text-center bg-white p-8 rounded-lg border border-[#e2eaed] shadow-sm">
          <h2 className="text-xl font-bold text-[#1a2129] mb-4">Ready to start your construction?</h2>
          <p className="text-[#4a5568] mb-6">Send us your requirement list and get a transparent quotation today.</p>
          <a 
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded transition-colors items-center gap-2"
          >
            Request Bulk Quotation
          </a>
        </div>

      </div>
    </div>
  );
}
