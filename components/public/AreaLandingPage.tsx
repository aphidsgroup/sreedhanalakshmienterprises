import Link from "next/link";
import { Phone, MapPin, Truck, CheckCircle, ArrowRight, Package } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import FAQSection from "@/components/public/FAQSection";
import type { SEOArea } from "@/data/seoAreas";

const MATERIALS = [
  { title: "Cement", desc: "OPC 53, OPC 43, PPC from UltraTech, Ramco, Dalmia, ACC, Chettinad, JSW, Bharathi, Ambuja.", link: "/today-cement-price" },
  { title: "TMT Steel", desc: "Fe 500D and Fe 550D TMT bars from Tata Tiscon, JSW Neosteel, Vizag Steel, SAIL, Agni.", link: "/today-steel-price" },
  { title: "Bricks & Blocks", desc: "Red bricks, chamber bricks, fly ash bricks, AAC blocks, solid blocks for walls and masonry.", link: "/today-bricks-and-blocks-price" },
  { title: "M Sand & P Sand", desc: "Double-washed M Sand for concrete, P Sand for plastering. Quality-tested for silt content.", link: "/today-sand-and-aggregates-price" },
  { title: "Blue Metal & Aggregates", desc: "6mm, 12mm, 20mm, 40mm blue metal and crusher dust for concrete, PCC, RCC, and filling.", link: "/today-sand-and-aggregates-price" },
  { title: "Fabrication Materials", desc: "MS angles, MS channels, MS pipes, GI pipes, MS plates, sheets, chequered plates, flats.", link: "/today-fabrication-materials-price" },
];

const PRICE_LINKS = [
  { label: "Cement Price", href: "/today-cement-price" },
  { label: "TMT Steel Price", href: "/today-steel-price" },
  { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" },
  { label: "Sand & Blue Metal Price", href: "/today-sand-and-aggregates-price" },
  { label: "Fabrication Price", href: "/today-fabrication-materials-price" },
];

function getBranchInfo(branchId: "kilpauk" | "mangadu") {
  return BUSINESS.branches.find(b => b.id === branchId) || BUSINESS.branches[0];
}

function getAreaDisplayName(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function AreaLandingPage({ area }: { area: SEOArea }) {
  const branch = getBranchInfo(area.nearestBranch);
  const waMessage = encodeURIComponent(
    `Hi Sree Dhanalakshmi Enterprises, I need construction materials delivered to ${area.name}. Please share today price and delivery details.`
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sreedhanalakshmienterprises.in" },
      { "@type": "ListItem", position: 2, name: "Chennai Supplier Hub", item: "https://www.sreedhanalakshmienterprises.in/construction-materials-supplier-in-chennai" },
      { "@type": "ListItem", position: 3, name: `${area.name} Supplier`, item: `https://www.sreedhanalakshmienterprises.in/construction-materials-supplier-in-${area.slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Construction Materials Supply in ${area.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Sree Dhanalakshmi Enterprises",
      telephone: BUSINESS.branches[0].phone1,
      url: "https://www.sreedhanalakshmienterprises.in",
    },
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Chennai`,
    },
    description: `Cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials supplied to ${area.name}, Chennai.`,
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* 1. Hero */}
      <section className="relative bg-[#1e5f6e] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#c8972a]">
            <MapPin size={20} />
            <span className="font-bold tracking-widest uppercase text-sm">{area.name}, Chennai</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            Construction Materials Supplier in {area.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sree Dhanalakshmi Enterprises supplies cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials to {area.name}, Chennai. Share your quantity and delivery location on WhatsApp to get today&apos;s quotation.
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
              href={branch.phone1Href}
              className="bg-white text-[#1e5f6e] hover:bg-gray-100 font-bold py-3 px-8 rounded shadow-lg transition-colors flex items-center gap-2"
            >
              <Phone size={18} /> {branch.phone1}
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* 2. About / Intro */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            About Construction Material Supply in {area.name}
          </h2>
          <p className="text-[#4a5568] leading-relaxed mb-4">{area.intro}</p>
          <div className="bg-[#edf6f8] border border-[#2b7a8c] border-opacity-20 rounded-lg p-5 mt-6">
            <h3 className="font-bold text-[#1a2129] mb-2">Who We Are</h3>
            <p className="text-[#4a5568] text-sm leading-relaxed">
              Sree Dhanalakshmi Enterprises is a Chennai-based construction materials supplier established in 1980, with branches in Kilpauk and Mangadu. We supply cement, TMT steel, bricks, blocks, M Sand, P Sand, blue metal, aggregates and fabrication materials for homeowners, builders, contractors and commercial construction projects.
            </p>
          </div>
        </section>

        {/* 3. Materials Supplied */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-8 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Materials We Supply in {area.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map((m, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#e2eaed] shadow-sm">
                <CheckCircle className="text-[#2b7a8c] mb-3" size={24} />
                <h3 className="font-bold text-lg mb-2 text-[#1a2129]">{m.title}</h3>
                <p className="text-[#4a5568] text-sm mb-3">{m.desc}</p>
                <Link href={m.link} className="text-[#2b7a8c] text-sm font-bold flex items-center gap-1 hover:underline">
                  Check Price <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Today Price Links */}
        <section className="mb-16 bg-[#edf6f8] p-8 rounded-xl border border-[#2b7a8c] border-opacity-20">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Check Today&apos;s Prices in Chennai
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {PRICE_LINKS.map((pl) => (
              <Link key={pl.href} href={pl.href} className="bg-white px-6 py-3 rounded border border-[#e2eaed] font-medium text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white transition-colors">
                {pl.label}
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Nearest Branch */}
        <section className="mb-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              Nearest Branch: {branch.name}
            </h2>
            <p className="text-[#4a5568] mb-4 leading-relaxed">
              {area.name} is served by our <strong>{branch.name}</strong> located at {branch.address}, {branch.city}. {area.deliveryContext}
            </p>
            <Link
              href={`/construction-materials-supplier-in-${area.nearestBranch}`}
              className="text-[#2b7a8c] font-bold flex items-center gap-1 hover:underline"
            >
              View {branch.name} Details <ArrowRight size={14} />
            </Link>
          </div>

          {/* Delivery Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              Site Delivery to {area.name}
            </h2>
            <ul className="space-y-3 text-[#4a5568] mb-4">
              <li className="flex items-start gap-2"><Truck className="text-[#2b7a8c] mt-1 shrink-0" size={18} /><span>Direct delivery from our yards or factory to your {area.name} construction site.</span></li>
              <li className="flex items-start gap-2"><Truck className="text-[#2b7a8c] mt-1 shrink-0" size={18} /><span>Multiple vehicle sizes available depending on order quantity and site road access.</span></li>
              <li className="flex items-start gap-2"><Truck className="text-[#2b7a8c] mt-1 shrink-0" size={18} /><span>Delivery timing and charges depend on quantity, traffic, vehicle availability, and stock.</span></li>
            </ul>
            <div className="bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-sm text-[#856404]">
              <strong>Delivery Note:</strong> Delivery availability, timing and charges depend on quantity, vehicle availability, location, traffic, site access and unloading conditions.
            </div>
          </div>
        </section>

        {/* 6. Materials by Project Type */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Materials by Project Type in {area.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {area.projectTypes.map((pt, i) => (
              <div key={i} className="bg-white border border-[#e2eaed] rounded-lg p-6">
                <h3 className="font-bold text-[#1a2129] text-lg mb-3">{pt.title}</h3>
                <p className="text-[#4a5568] text-sm">{pt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bulk Supply */}
        <section className="mb-16 bg-[#1a2129] text-white rounded-xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Bulk Supply for Contractors & Builders in {area.name}
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-6 leading-relaxed">
            Sree Dhanalakshmi Enterprises supports bulk construction material supply for contractors, builders, and project developers working in {area.name}. We provide competitive wholesale pricing, scheduled deliveries, and dedicated project support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#2c3743] px-5 py-3 rounded-lg flex items-center gap-2">
              <Package size={18} className="text-[#c8972a]" />
              <span className="text-sm">Wholesale Pricing</span>
            </div>
            <div className="bg-[#2c3743] px-5 py-3 rounded-lg flex items-center gap-2">
              <Truck size={18} className="text-[#c8972a]" />
              <span className="text-sm">Scheduled Delivery</span>
            </div>
            <div className="bg-[#2c3743] px-5 py-3 rounded-lg flex items-center gap-2">
              <CheckCircle size={18} className="text-[#c8972a]" />
              <span className="text-sm">All Major Brands</span>
            </div>
          </div>
        </section>

        {/* 8. Nearby Areas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1a2129] mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Nearby Areas We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {area.nearbyAreas.map((slug) => (
              <Link
                key={slug}
                href={`/construction-materials-supplier-in-${slug}`}
                className="bg-white border border-[#e2eaed] text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {getAreaDisplayName(slug)}
              </Link>
            ))}
            <Link
              href="/construction-materials-supplier-in-chennai"
              className="bg-[#edf6f8] border border-[#2b7a8c] border-opacity-30 text-[#1e5f6e] hover:bg-[#1e5f6e] hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              All Chennai Areas →
            </Link>
          </div>
        </section>

        {/* Price Disclaimer */}
        <div className="mb-12 bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-sm text-[#856404]">
          <strong>Pricing Note:</strong> Prices shown are indicative Chennai market rates. Final quotation may vary based on brand, grade, size, quantity, GST, delivery location, transport, unloading condition, stock availability and supplier rate changes. Please call or WhatsApp Sree Dhanalakshmi Enterprises for the latest final price.
        </div>

        {/* 9. FAQs */}
        <FAQSection faqs={area.faqs} title={`Frequently Asked Questions — ${area.name}`} />

        {/* 10. Final CTA */}
        <div className="text-center bg-white p-8 rounded-lg border border-[#e2eaed] shadow-sm">
          <h2 className="text-xl font-bold text-[#1a2129] mb-4">
            Need Construction Materials in {area.name}?
          </h2>
          <p className="text-[#4a5568] mb-6">
            Share your material list and delivery address on WhatsApp. We will respond with today&apos;s quotation.
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
