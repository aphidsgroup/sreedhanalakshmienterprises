import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import BrandGroupCard from "@/components/public/BrandGroupCard";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Steel / TMT Bar Price in Chennai",
  description: "Latest TMT bar prices in Chennai. Tata Tiscon, JSW Neosteel, Vizag, SAIL, Suryadev, Agni Steels. Fe 500D, Fe 550, all sizes 8mm–32mm. Updated daily.",
  path: "/today-steel-price",
  keywords: "TMT bar price Chennai, steel price Chennai today, Tata Tiscon price, JSW Neosteel price",
});

export const dynamic = "force-dynamic";

// Format DD-MM-YYYY
const getFormattedDate = () => {
  const d = new Date();
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

async function getSteelData() {
  const category = await prisma.category.findUnique({ where: { slug: "steel" } });
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
    brandName: "Tata Tiscon",
    products: [
      { id: "1", name: "Tata Tiscon Fe 500D", specification: "8mm-32mm", currentPrice: 62000.00 },
    ]
  },
  {
    brandName: "JSW Neosteel",
    products: [
      { id: "2", name: "JSW Neosteel Fe 500D", specification: "8mm-32mm", currentPrice: 61000.00 },
    ]
  },
  {
    brandName: "Vizag Steel",
    products: [
      { id: "3", name: "Vizag Steel Fe 500D", specification: "8mm-25mm", currentPrice: 60000.00 },
    ]
  }
];

export default async function SteelPricePage() {
  const { groupedProducts } = await getSteelData();
  const displayGroups = groupedProducts.length > 0 ? groupedProducts : FALLBACK_GROUPED;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      
      {/* Top Green Banner Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-12">
        <h1 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Today Steel Price</h1>
        
        <div style={{ backgroundColor: "#2b7a8c" }} className="border-t-[3px] border-b-[3px] border-[#1e5f6e] p-5 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 tracking-wide">
            TODAY&apos;S PRICE : {getFormattedDate()}
          </h2>
          
          <div className="text-white text-sm sm:text-base space-y-3 mb-8 font-medium">
            <p>This page is updated daily with the latest price of steel and TMT bars in chennai</p>
            <p className="uppercase">* THE PRICE IS MENTIONED ONLY FOR CHENNAI ONLY.</p>
            <p className="uppercase">* PRODUCT DESIGN AND AVAILABILITY MAY VARY</p>
            <p className="uppercase">* MINIMUM ORDER - 1 MT</p>
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
            Steel Today Price List In Chennai
          </h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-5xl mx-auto">
            Looking for today steel price in Chennai? SDE Enterprises offers updated TMT bar rates with transparent pricing and quick delivery. Our high-quality steel is ideal for foundations, slabs, masonry, plastering, and structural work across residential and commercial projects. Whether you need the current TMT rate in Chennai per ton, wholesale steel price in Chennai today, or brand-wise steel price in Chennai today, SDE Enterprises ensures easy online ordering and dependable supply. Choose your preferred brand, schedule doorstep delivery, and simplify your material sourcing. Count on SDE Enterprises for secure checkout, reliable service, and competitive daily pricing for all your steel and building material needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGroups.map((group, i) => (
            <BrandGroupCard 
              key={i}
              brandName={group.brandName}
              categoryName="STEEL"
              products={group.products as any}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        
        <FAQSection faqs={[
          { question: "What is today's TMT steel price in Chennai?", answer: "Today's steel price in Chennai depends on the brand (e.g., Tata Tiscon, JSW, Suryadev) and grade (Fe 500D vs Fe 550D). Prices generally range between ₹55 to ₹75 per kg. Contact us on WhatsApp for exact brand-wise wholesale rates." },
          { question: "Which TMT bar is best for house construction?", answer: "Fe 500D is the most recommended grade for residential construction in Chennai because it offers an excellent balance of strength and ductility (earthquake resistance). For heavier commercial structures, Fe 550D might be preferred." },
          { question: "How to calculate steel quantity required?", answer: "As a general estimate, house construction requires about 3 to 4 kg of steel per square foot of built-up area. A structural engineer will provide exact measurements based on your bar bending schedule (BBS)." },
          { question: "What affects steel price in Chennai?", answer: "Steel prices fluctuate almost daily based on raw material availability, global iron ore prices, transportation costs, and local demand. Booking in bulk usually secures a better per-ton rate." },
          { question: "Can I get site delivery for TMT steel?", answer: "Yes, Sree Dhanalakshmi Enterprises offers site delivery across Chennai. Our minimum order is usually 1 MT (Metric Ton) for free or subsidized delivery depending on the location." },
          { question: "Which branch serves my area?", answer: "Our Kilpauk branch manages deliveries in central and north Chennai, while our Mangadu branch handles west and south-west Chennai requirements." },
          { question: "How to order steel through WhatsApp?", answer: "Click 'WhatsApp Us', share the brand you want, sizes (e.g., 8mm, 12mm), total tonnage, and delivery location. We will send you today's customized quotation immediately." }
        ]} />

        {/* Related Categories */}
        <div className="mb-12">
          <div className="p-4 rounded-t-lg" style={{ backgroundColor: "#2b7a8c" }}>
            <h3 className="text-white font-bold text-lg">Related Categories</h3>
          </div>
          <div className="bg-white border-l border-r border-b border-[#e2eaed] rounded-b-lg p-2 space-y-2">
            {[
              { id: 1, name: "Cement Today Price in Chennai", href: "/today-cement-price" },
              { id: 2, name: "Bricks and Blocks Today Price in Chennai", href: "/today-bricks-and-blocks-price" },
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
