import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import BrandGroupCard from "@/components/public/BrandGroupCard";
import FAQSection from "@/components/public/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Today Fabrication Materials Price in Chennai | MS Angle, Channel, Pipe, Plate Price",
  description: "Check today’s fabrication material price in Chennai. Get MS angle, MS channel, MS square pipe, rectangular pipe, GI pipe, MS plate, sheet, flat, beam and chequered plate rates with doorstep delivery from Sree Dhanalakshmi Enterprises.",
  path: "/today-fabrication-materials-price",
  keywords: "fabrication materials price in Chennai, MS angle price in Chennai, MS channel price Chennai, MS square pipe price Chennai, MS rectangular pipe Chennai, GI pipe price Chennai, MS plate price Chennai, MS sheet price Chennai, structural steel suppliers Chennai, fabrication material suppliers Chennai, steel fabrication materials Chennai",
});

export const dynamic = "force-dynamic";

// Format DD-MM-YYYY
const getFormattedDate = () => {
  const d = new Date();
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

async function getFabricationData() {
  const category = await prisma.category.findUnique({ where: { slug: "fabrication-materials" } });
  if (!category) return { groupedProducts: [] };
  
  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { 
      brand: { select: { name: true, sortOrder: true } }
    },
    orderBy: [{ brand: { sortOrder: "asc" } }, { displayOrder: "asc" }, { name: "asc" }],
  });

  // Group by brand (which acts as the product group here)
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
const FALLBACK_GROUPED: any[] = [];

export default async function FabricationMaterialsPricePage() {
  const { groupedProducts } = await getFabricationData();
  const displayGroups = groupedProducts.length > 0 ? groupedProducts : FALLBACK_GROUPED;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      
      {/* Top Green Banner Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-12">
        <h1 className="text-2xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Today Fabrication Materials Price in Chennai</h1>
        
        <div style={{ backgroundColor: "#2b7a8c" }} className="border-t-[3px] border-b-[3px] border-[#1e5f6e] p-5 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 tracking-wide">
            TODAY&apos;S PRICE : {getFormattedDate()}
          </h2>
          
          <div className="text-white text-sm sm:text-base space-y-3 mb-8 font-medium">
            <p>This page is updated daily with the latest price of fabrication materials in chennai</p>
            <p className="uppercase">* THE PRICE IS MENTIONED ONLY FOR CHENNAI ONLY.</p>
            <p className="uppercase">* PRODUCT DESIGN AND AVAILABILITY MAY VARY</p>
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
            Fabrication Materials Today Price List In Chennai
          </h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-5xl mx-auto mb-6">
            Sree Dhanalakshmi Enterprises supplies fabrication materials across Chennai for gates, grills, staircase frames, roofing frames, industrial sheds, compound gates, shutters, fabrication workshops, construction projects, commercial structures, mezzanine floors, and platforms. Whether you need MS angle price in Chennai, MS channel price Chennai, MS square pipe price Chennai, MS rectangular pipe Chennai, GI pipe price Chennai, MS plate price Chennai, or MS sheet price Chennai, we provide top quality structural steel and fabrication materials.
          </p>
          <div className="bg-[#fff3cd] border-l-4 border-[#ffeeba] p-4 rounded text-left text-sm text-[#856404] shadow-sm font-medium mx-auto max-w-4xl">
            <strong>Disclaimer:</strong> Prices shown are indicative Chennai market rates. Actual rates may vary based on size, thickness, weight, brand, quantity, transport, GST, and stock availability. Please call or WhatsApp for final quotation.
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayGroups.map((group, i) => (
            <BrandGroupCard 
              key={i}
              brandName={group.brandName}
              categoryName="FABRICATION MATERIALS"
              products={group.products as any}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        
        {/* Fabrication Materials We Supply Section */}
        <div className="mb-12 bg-white rounded-lg p-6 shadow-sm border border-[#e2eaed]">
          <h2 className="text-xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Fabrication Materials We Supply in Chennai</h2>
          <p className="text-sm text-[#4a5568] leading-relaxed">
            Sree Dhanalakshmi Enterprises supplies mild steel and galvanized fabrication materials for residential, commercial and industrial projects across Chennai. Our fabrication material range includes MS angles, MS channels, MS square pipes, MS rectangular pipes, MS round pipes, GI pipes, MS plates, MS sheets, chequered plates, flats, round bars, beams and joists. These materials are commonly used for gates, grills, staircases, roofing frames, sheds, shutters, support structures, mezzanine floors, industrial platforms and custom fabrication works.
          </p>
        </div>

        {/* How to Order Section */}
        <div className="mb-12 bg-white rounded-lg p-6 shadow-sm border border-[#e2eaed]">
          <h2 className="text-xl font-bold text-[#1a2129] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>How to Order Fabrication Materials</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[#4a5568]">
            <li>Select the required material and size</li>
            <li>Send enquiry through WhatsApp or call</li>
            <li>Share quantity, delivery location and required date</li>
            <li>Get final quotation based on today&apos;s rate</li>
            <li>Confirm order and schedule delivery</li>
          </ol>
        </div>

        {/* FAQ Section */}
        <FAQSection faqs={[
          { question: "What fabrication materials do you supply in Chennai?", answer: "We supply MS angles, MS channels, MS square pipes, MS rectangular pipes, MS round pipes, GI pipes, MS plates, MS sheets, chequered plates, flats, round bars, beams, joists and roofing sheets for fabrication and construction work." },
          { question: "What is today’s MS angle price in Chennai?", answer: "MS angle prices in Chennai usually depend on size, thickness, grade, quantity and market rate. The prices shown on this page are indicative. Please call or WhatsApp us for the latest quotation." },
          { question: "Do you supply MS square pipes and rectangular pipes?", answer: "Yes, we supply MS square pipes and rectangular pipes in different sizes and thicknesses for gates, grills, roofing frames, sheds, partitions and fabrication work." },
          { question: "Can I get site delivery for fabrication materials?", answer: "Yes, site delivery is available across Chennai based on order quantity, location and vehicle availability." },
          { question: "Are the fabrication material prices fixed?", answer: "No, the listed prices are indicative market rates. Final prices may vary based on size, thickness, brand, quantity, GST, transport and stock availability." },
          { question: "Do you supply bulk orders for workshops and contractors?", answer: "Yes, we support bulk orders for fabrication workshops, contractors, builders, industrial projects and commercial construction sites." },
          { question: "Can I get different thickness and custom sizes?", answer: "Yes, different sizes and thicknesses are available depending on stock. Share your requirement through WhatsApp for confirmation." },
          { question: "Do you supply GI pipes and galvanized materials?", answer: "Yes, we supply GI pipes and selected galvanized materials for outdoor and corrosion-resistant fabrication needs." }
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
              { id: 4, name: "Sand and Aggregates Today Price in Chennai", href: "/today-sand-and-aggregates-price" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 rounded-lg text-white" style={{ backgroundColor: "#1e3a5f" }}>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">🚚</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Chennai-wide delivery</h4>
              <p className="text-xs text-gray-300">Enjoy doorstep delivery within Chennai city limits</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">📦</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Bulk order support</h4>
              <p className="text-xs text-gray-300">Special handling for bulk and commercial orders</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">🛠️</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Fabrication material supply</h4>
              <p className="text-xs text-gray-300">Complete range of structural steel</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">💯</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Genuine material</h4>
              <p className="text-xs text-gray-300">Assured quality for all fabrication needs</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">💰</div>
            <div>
              <h4 className="font-bold text-sm mb-1">Best price quotation</h4>
              <p className="text-xs text-gray-300">Competitive and transparent rates</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
