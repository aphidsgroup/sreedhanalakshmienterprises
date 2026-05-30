import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import BrandGroupCard from "@/components/public/BrandGroupCard";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Sand & Aggregates Price in Chennai",
  description: "Latest M-Sand, P-Sand, River Sand, Jelly (20mm, 40mm), Quarry Dust prices in Chennai. Updated daily by Sree Dhanalakshmi Enterprises.",
  path: "/today-sand-and-aggregates-price",
  keywords: "M-Sand price Chennai, P-Sand price, jelly price Chennai, quarry dust price",
});

export const dynamic = "force-dynamic";

// Format DD-MM-YYYY
const getFormattedDate = () => {
  const d = new Date();
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

async function getSandData() {
  const category = await prisma.category.findUnique({ where: { slug: "sand-and-aggregates" } });
  if (!category) return { groupedProducts: [] };
  
  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { 
      brand: { select: { name: true } }
    },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });

  // Group by brand
  const grouped: Record<string, any[]> = {};
  products.forEach(p => {
    const brandName = p.brand?.name || "General";
    if (!grouped[brandName]) grouped[brandName] = [];
    grouped[brandName].push(p);
  });

  // Convert to array of objects
  const groupedArray = Object.keys(grouped).map(brandName => ({
    brandName,
    products: grouped[brandName]
  }));

  return { groupedProducts: groupedArray };
}

// Fallback data if DB is empty
const FALLBACK_GROUPED = [
  {
    brandName: "Sand",
    products: [
      { id: "1", name: "M-Sand", specification: "IS:383 Grade", currentPrice: 70.00 },
      { id: "2", name: "P-Sand", specification: "Fine Grade", currentPrice: 65.00 },
      { id: "3", name: "River Sand", specification: "Natural", currentPrice: 95.00 },
    ]
  },
  {
    brandName: "Aggregates",
    products: [
      { id: "4", name: "20mm Jelly", specification: "Blue Metal", currentPrice: 62.00 },
      { id: "5", name: "40mm Jelly", specification: "Blue Metal", currentPrice: 58.00 },
      { id: "6", name: "Quarry Dust", specification: "Stone Powder", currentPrice: 38.00 },
    ]
  }
];

export default async function SandAggregatesPricePage() {
  const { groupedProducts } = await getSandData();
  const displayGroups = groupedProducts.length > 0 ? groupedProducts : FALLBACK_GROUPED;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      
      {/* Top Green Banner Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-12">
        <h1 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Today Sand & Aggregates Price</h1>
        
        <div style={{ backgroundColor: "#2b7a8c" }} className="border-t-[3px] border-b-[3px] border-[#1e5f6e] p-5 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 tracking-wide">
            TODAY&apos;S PRICE : {getFormattedDate()}
          </h2>
          
          <div className="text-white text-sm sm:text-base space-y-3 mb-8 font-medium">
            <p>This page is updated daily with the latest price of sand and aggregates in chennai</p>
            <p className="uppercase">* THE PRICE IS MENTIONED ONLY FOR CHENNAI ONLY.</p>
            <p className="uppercase">* PRODUCT QUALITY MAY VARY BASED ON SOURCE</p>
            <p className="uppercase">* MINIMUM ORDER - 1 LOAD</p>
            <p className="mt-4 text-xs sm:text-sm text-yellow-100 italic border-t border-[#3d9aaf] pt-3">
              * Disclaimer: Prices shown are indicative Chennai market rates. Actual rates may vary based on brand, size, quantity, delivery location, GST, transport, stock availability and supplier rate changes. Please call or WhatsApp for final quotation.
            </p>
          </div>
          
          <div style={{ backgroundColor: "#edf6f8" }} className="py-3 px-4 text-center">
            <p className="text-[#1a2129] font-bold text-sm sm:text-base">
              FOR ENQUIRY PLEASE CALL : <a href={BUSINESS.branches[0].phone1Href} className="underline hover:text-black">{BUSINESS.branches[0].phone1}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Sand & Aggregates Today Price List In Chennai
          </h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-5xl mx-auto">
            Looking for today sand and aggregates price in Chennai? SDE Enterprises offers updated M-Sand, P-Sand, and Jelly rates with transparent pricing and quick delivery. Our high-quality aggregates are ideal for concrete mixes, plastering, foundations, and structural work across residential and commercial projects. Whether you need the current M-Sand rate in Chennai per CFT, wholesale river sand price in Chennai today, or 20mm jelly price in Chennai, SDE Enterprises ensures easy online ordering and dependable supply. Choose your preferred material, schedule doorstep delivery, and simplify your material sourcing. Count on SDE Enterprises for secure checkout, reliable service, and competitive daily pricing for all your building material needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGroups.map((group, i) => (
            <BrandGroupCard 
              key={i}
              brandName={group.brandName}
              categoryName=""
              products={group.products as any}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        
        <FAQSection faqs={[
          { question: "What is today's M Sand price in Chennai?", answer: "M Sand (Manufactured Sand) prices in Chennai generally range between ₹35 to ₹55 per cubic feet depending on the quality (double washed vs single washed) and delivery distance. Contact us for a bulk quotation." },
          { question: "Which sand is best for house construction?", answer: "For concrete work (slabs, pillars), double washed M Sand is highly recommended as it provides excellent compressive strength. For plastering walls smoothly, P Sand (Plastering Sand) is the ideal choice." },
          { question: "How to calculate sand quantity required?", answer: "Quantity is usually measured in Units (1 Unit = 100 Cubic Feet). A 1000 sq ft residential build typically requires around 25-30 units of sand and 15-20 units of blue metal (aggregates) from foundation to finish." },
          { question: "What affects sand and aggregate prices?", answer: "Prices fluctuate based on quarry availability, government regulations, diesel prices (which impact transport), and the distance between the crusher/quarry and your construction site." },
          { question: "Can I get site delivery for sand?", answer: "Yes, we deliver sand and blue metal directly to your site across Chennai. We arrange specific lorry sizes (2 unit, 3 unit, or 4 unit loads) based on your site access." },
          { question: "Which branch serves my area?", answer: "Our Kilpauk branch organizes central and north Chennai deliveries, while the Mangadu branch serves west and south-west Chennai to keep transport costs minimal." },
          { question: "How to order sand through WhatsApp?", answer: "Just use the WhatsApp button, mention whether you need M Sand, P Sand, or Blue Metal (mention size: 20mm, 12mm), the number of units, and the site location. We'll share the final delivered price." }
        ]} />

        {/* Related Categories */}
        <div className="mb-12">
          <div className="p-4 rounded-t-lg" style={{ backgroundColor: "#2b7a8c" }}>
            <h3 className="text-white font-bold text-lg">Related Categories</h3>
          </div>
          <div className="bg-white border-l border-r border-b border-[#e2eaed] rounded-b-lg p-2 space-y-2">
            {[
              { id: 1, name: "Cement Today Price in Chennai", href: "/today-cement-price" },
              { id: 2, name: "Steel Today Price in Chennai", href: "/today-steel-price" },
              { id: 3, name: "Bricks and Blocks Today Price in Chennai", href: "/today-bricks-and-blocks-price" },
              { id: 4, name: "Fabrication Materials Today Price in Chennai", href: "/today-fabrication-materials-price" },
            ].map((link) => (
              <div key={link.id} className="flex justify-between items-center p-3 border border-[#e2eaed] rounded hover:bg-[#f8f9fa] transition-colors">
                <span className="text-sm font-medium text-[#4a5568]">{link.id}. {link.name}</span>
                <Link href={link.href} className="px-4 py-1.5 rounded text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#2b7a8c" }}>
                  Click Here &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-lg text-white" style={{ backgroundColor: "#1e3a5f" }}>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">🚚</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Delivery</h4>
              <p className="text-xs text-gray-300">Enjoy free doorstep delivery within Chennai city limits</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">⏱️</div>
            <div>
              <h4 className="font-bold text-sm mb-1">24/7 Support</h4>
              <p className="text-xs text-gray-300">Our support team is available around the clock to assist you.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">💯</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Best Price Guaranteed</h4>
              <p className="text-xs text-gray-300">Pay only the fair price — no hidden markups.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">📦</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Bulk Orders</h4>
              <p className="text-xs text-gray-300">Special discounts and priority handling for bulk orders</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
