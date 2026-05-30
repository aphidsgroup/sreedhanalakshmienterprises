import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import BrandGroupCard from "@/components/public/BrandGroupCard";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Bricks & Blocks Price in Chennai",
  description: "AAC Blocks, Red Bricks, Fly Ash Bricks, Hollow Blocks price in Chennai. Updated daily by Sree Dhanalakshmi Enterprises.",
  path: "/today-bricks-and-blocks-price",
  keywords: "AAC blocks price Chennai, bricks price Chennai, hollow blocks price",
});

export const dynamic = "force-dynamic";

// Format DD-MM-YYYY
const getFormattedDate = () => {
  const d = new Date();
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

async function getBricksData() {
  const category = await prisma.category.findUnique({ where: { slug: "bricks-and-blocks" } });
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
    brandName: "AAC Blocks",
    products: [
      { id: "1", name: "AAC Blocks 4 Inch", specification: "600x200x100", currentPrice: 48.00 },
      { id: "2", name: "AAC Blocks 6 Inch", specification: "600x200x150", currentPrice: 62.00 },
      { id: "3", name: "AAC Blocks 8 Inch", specification: "600x200x200", currentPrice: 75.00 },
    ]
  },
  {
    brandName: "Concrete Blocks",
    products: [
      { id: "4", name: "Solid Concrete Blocks", specification: "400x200x200", currentPrice: 35.00 },
      { id: "5", name: "Hollow Concrete Blocks", specification: "400x200x200", currentPrice: 30.00 },
    ]
  },
  {
    brandName: "Bricks",
    products: [
      { id: "6", name: "Fly Ash Bricks", specification: "Standard", currentPrice: 8.00 },
      { id: "7", name: "Red Bricks (Country)", specification: "Standard", currentPrice: 9.00 },
    ]
  }
];

export default async function BricksBlocksPricePage() {
  const { groupedProducts } = await getBricksData();
  const displayGroups = groupedProducts.length > 0 ? groupedProducts : FALLBACK_GROUPED;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      
      {/* Top Green Banner Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-12">
        <h1 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Today Bricks & Blocks Price</h1>
        
        <div style={{ backgroundColor: "#2b7a8c" }} className="border-t-[3px] border-b-[3px] border-[#1e5f6e] p-5 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 tracking-wide">
            TODAY&apos;S PRICE : {getFormattedDate()}
          </h2>
          
          <div className="text-white text-sm sm:text-base space-y-3 mb-8 font-medium">
            <p>This page is updated daily with the latest price of bricks and blocks in chennai</p>
            <p className="uppercase">* THE PRICE IS MENTIONED ONLY FOR CHENNAI ONLY.</p>
            <p className="uppercase">* PRODUCT DESIGN AND AVAILABILITY MAY VARY</p>
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
            Bricks & Blocks Today Price List In Chennai
          </h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-5xl mx-auto">
            Looking for today bricks and blocks price in Chennai? SDE Enterprises offers updated AAC block and red brick rates with transparent pricing and quick delivery. Our high-quality building materials are ideal for foundations, walls, masonry, and structural work across residential and commercial projects. Whether you need the current AAC block rate in Chennai per piece, wholesale red brick price in Chennai today, or solid concrete blocks price in Chennai, SDE Enterprises ensures easy online ordering and dependable supply. Choose your preferred brand, schedule doorstep delivery, and simplify your material sourcing. Count on SDE Enterprises for secure checkout, reliable service, and competitive daily pricing for all your building material needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGroups.map((group, i) => (
            <BrandGroupCard 
              key={i}
              brandName={group.brandName}
              categoryName="BRICKS"
              products={group.products as any}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        
        <FAQSection faqs={[
          { question: "What is today's bricks price in Chennai?", answer: "Brick prices in Chennai vary by type. Red chamber bricks usually cost between ₹7 to ₹11 per piece, while AAC blocks are priced around ₹55 to ₹75 per block based on size. Contact us for today's wholesale rates." },
          { question: "Which is better for house construction: Red Bricks or AAC Blocks?", answer: "Red bricks are traditional, load-bearing, and great for heat insulation. AAC blocks are lightweight, speed up construction, and reduce the overall dead load on the structure. Both are excellent choices depending on your engineering design." },
          { question: "How to calculate bricks quantity required?", answer: "For a standard 9-inch wall, you need about 10-12 standard red bricks per square foot. For AAC blocks, you need about 1 block per square foot (for 8x8x24 size). A 1000 sq ft house typically needs 15,000 to 20,000 red bricks." },
          { question: "What affects brick prices in Chennai?", answer: "Prices depend on the manufacturing season (prices often rise during monsoons due to lower production), transportation distance from the chamber/factory to your site, and order volume." },
          { question: "Can I get site delivery for bricks and blocks?", answer: "Yes, we arrange lorry loads (typically 3000 to 4500 red bricks per load) delivered directly to your site across Chennai and surrounding areas." },
          { question: "Which branch serves my area?", answer: "Kilpauk branch handles central/north Chennai deliveries, while the Mangadu branch covers west and south-west Chennai. We ensure timely dispatch from the closest yard or direct from the chamber." },
          { question: "How to order bricks through WhatsApp?", answer: "Click our WhatsApp button, specify the type of brick (Red, Fly Ash, AAC), quantity required, and your site address. We'll reply with a quotation including transport." }
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
              { id: 3, name: "Sand and Aggregates Today Price in Chennai", href: "/today-sand-and-aggregates-price" },
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
