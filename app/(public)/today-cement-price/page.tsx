import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import BrandGroupCard from "@/components/public/BrandGroupCard";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Cement Price in Chennai",
  description:
    "Looking for today cement price in Chennai? SDE Enterprises offers updated cement rates with transparent pricing and quick delivery.",
  path: "/today-cement-price",
  keywords: "cement price Chennai today, UltraTech cement price, Ramco cement price, cement rate Chennai",
});

export const dynamic = "force-dynamic";

// Format DD-MM-YYYY
const getFormattedDate = () => {
  const d = new Date();
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

async function getCementData() {
  const category = await prisma.category.findUnique({ where: { slug: "cement" } });
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

  // Convert to array of objects for easier mapping
  const groupedArray = Object.keys(grouped).map(brandName => ({
    brandName,
    products: grouped[brandName]
  }));

  return { groupedProducts: groupedArray };
}

// Fallback data if DB is empty
const FALLBACK_GROUPED = [
  {
    brandName: "ACC",
    products: [
      { id: "1", name: "ACC PPC Polythene Cement", specification: "50Kg", currentPrice: 320.00 },
      { id: "2", name: "ACC OPC Polythene Cement", specification: "50Kg", currentPrice: 340.00 },
    ]
  },
  {
    brandName: "Chettinad",
    products: [
      { id: "3", name: "Chettinad PPC Cement", specification: "50Kg", currentPrice: 310.00 },
      { id: "4", name: "Chettinad OPC Cement", specification: "50Kg", currentPrice: 330.00 },
    ]
  },
  {
    brandName: "Dalmia",
    products: [
      { id: "5", name: "Dalmia PPC Cement", specification: "50Kg", currentPrice: 295.00 },
    ]
  }
];

export default async function CementPricePage() {
  const { groupedProducts } = await getCementData();
  const displayGroups = groupedProducts.length > 0 ? groupedProducts : FALLBACK_GROUPED;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      
      {/* Top Green Banner Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-12">
        <h1 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Today Cement Price</h1>
        
        <div style={{ backgroundColor: "#3Ea072" }} className="border-t-[3px] border-b-[3px] border-[#ffca28] p-5 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 tracking-wide">
            TODAY&apos;S PRICE : {getFormattedDate()}
          </h2>
          
          <div className="text-white text-sm sm:text-base space-y-3 mb-8 font-medium">
            <p>This page is updated daily with the latest price of cements in chennai</p>
            <p className="uppercase">* THE PRICE IS MENTIONED ONLY FOR CHENNAI ONLY.</p>
            <p className="uppercase">* CEMENT BAGS COLOR AND DESIGN MAY VARY</p>
            <p className="uppercase">* MINIMUM ORDER - 100 BAGS</p>
          </div>
          
          <div style={{ backgroundColor: "#ffca28" }} className="py-3 px-4 text-center">
            <p className="text-[#1a2129] font-bold text-sm sm:text-base">
              FOR ENQUIRY PLEASE CALL : <a href={BUSINESS.branches[0].phone1Href} className="underline hover:text-black">{BUSINESS.branches[0].phone1}</a> | <a href={BUSINESS.branches[0].phone2Href || BUSINESS.branches[0].phone1Href} className="underline hover:text-black">{BUSINESS.branches[0].phone2 || "90940 18182"}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Cement Today Price List In Chennai
          </h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-5xl mx-auto">
            Looking for today cement price in Chennai? SDE Enterprises offers updated cement rates with transparent pricing and quick delivery. Our high-quality cement is ideal for foundations, slabs, masonry, plastering, and structural work across residential and commercial projects. Whether you need the current cement rate in Chennai per bag, wholesale cement price in Chennai today, or brand-wise cement price in Chennai today, SDE Enterprises ensures easy online ordering and dependable supply. Choose your preferred brand, schedule doorstep delivery, and simplify your material sourcing. Count on SDE Enterprises for secure checkout, reliable service, and competitive daily pricing for all your cement and building material needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGroups.map((group, i) => (
            <BrandGroupCard 
              key={i}
              brandName={group.brandName}
              categoryName="CEMENT"
              products={group.products as any}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        
        {/* Related Categories */}
        <div className="mb-12">
          <div className="p-4 rounded-t-lg" style={{ backgroundColor: "#3Ea072" }}>
            <h3 className="text-white font-bold text-lg">Related Categories</h3>
          </div>
          <div className="bg-white border-l border-r border-b border-[#e2eaed] rounded-b-lg p-2 space-y-2">
            {[
              { id: 1, name: "Steel Today Price in Chennai", href: "/today-steel-price" },
              { id: 2, name: "Bricks and Blocks Today Price in Chennai", href: "/today-bricks-and-blocks-price" },
              { id: 3, name: "Sand and Aggregates Today Price in Chennai", href: "/today-sand-and-aggregates-price" },
            ].map((link) => (
              <div key={link.id} className="flex justify-between items-center p-3 border border-[#e2eaed] rounded hover:bg-[#f8f9fa] transition-colors">
                <span className="text-sm font-medium text-[#4a5568]">{link.id}. {link.name}</span>
                <Link href={link.href} className="px-4 py-1.5 rounded text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#3Ea072" }}>
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
