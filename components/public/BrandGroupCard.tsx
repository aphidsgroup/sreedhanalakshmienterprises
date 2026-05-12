import React from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { BUSINESS } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

interface BrandProduct {
  id: string;
  name: string;
  specification?: string;
  unit: string;
  currentPrice: number | null | string;
}

interface BrandGroupCardProps {
  brandName: string;
  categoryName: string;
  products: BrandProduct[];
  logoUrl?: string;
}

// Fallback logic to get brand logo based on brand name
const getBrandLogo = (brandName: string) => {
  const b = brandName.toLowerCase();
  if (b.includes("acc")) return "/products/Acc-red.png";
  if (b.includes("chettinad")) return "/products/Chettinad_3d2d7299-11a7-4dd0-a23e-c26f0cce6c7a.png";
  if (b.includes("dalmia")) return "/products/Dalmia_544b3790-e3df-4088-88d0-d8d5ae7fb3c6.png";
  if (b.includes("zuari")) return "/products/Zuari.png";
  if (b.includes("ultratech")) return "/products/Ultratech_3ffecebb-dca9-4b58-b1c1-32a8cda2188a.png";
  if (b.includes("priya")) return "/products/Priya_Cement_1.png";
  if (b.includes("ramco")) return "/products/Ramco.png";
  if (b.includes("coromandel")) return "/products/coromandel-ppc-cement-1000x1000.jpg";
  if (b.includes("maha")) return "/products/Mahacement-HD-PPC-cement-Bag.png";
  if (b.includes("tata") || b.includes("tiscon")) return "/products/TATA_Steel_d50f05ea-d04a-4f0a-ae9f-92caeb87aea9.png";
  if (b.includes("jsw")) return "/products/JSW_product.png";
  if (b.includes("vizag")) return "/products/Vizag_Steel_f0b237df-790c-4fc3-81b3-8acc54a64351.png";
  if (b.includes("sail")) return "/products/Sail_05d9d6b2-68cb-4998-bb97-2470130bb11d.png";
  if (b.includes("suryadev")) return "/products/Shyam_Steel.png"; // fallback
  if (b.includes("agni")) return "/products/Agni_e23ef7df-ef53-43e1-8940-1d734700b8e5.png";
  return "/logo.jpeg"; // Default to SDE logo if no brand logo
};

export default function BrandGroupCard({ brandName, categoryName, products, logoUrl }: BrandGroupCardProps) {
  const resolvedLogoUrl = logoUrl || getBrandLogo(brandName);
  
  // Format message for WhatsApp
  const productListMsg = products.map(p => `${p.name} ${p.specification ? `(${p.specification})` : ''}`).join(", ");
  const message = `Hi, I would like to enquire about ${brandName} products: ${productListMsg}. Please provide the latest price and availability.`;
  const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col h-full" style={{ border: "1px solid #eaeaea", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-[#eaeaea]">
        {resolvedLogoUrl && (
          <div className="relative w-14 h-10 flex-shrink-0 bg-white flex items-center justify-center rounded">
            <Image 
              src={resolvedLogoUrl} 
              alt={`${brandName} Logo`} 
              fill 
              className="object-contain" 
              sizes="56px"
            />
          </div>
        )}
        <h3 className="font-bold text-[#333333] uppercase text-sm tracking-wide leading-snug">
          {brandName} {categoryName} TODAY PRICE IN CHENNAI
        </h3>
      </div>

      {/* Product List */}
      <div className="flex-grow p-4 flex flex-col gap-0">
        {products.map((product, idx) => {
          // Check if price exists and is not 0
          const hasPrice = product.currentPrice && Number(product.currentPrice) > 0;
          
          return (
            <div key={product.id || idx} className="flex justify-between items-center py-3 border-b border-[#f5f5f5] last:border-0">
              <div className="flex-1 pr-4">
                <p className="text-[13px] font-semibold text-[#444444]">
                  {product.name} {product.specification ? `- ${product.specification}` : ""}
                </p>
              </div>
              <div className="flex-shrink-0">
                {hasPrice ? (
                  <span className="text-xs font-bold px-3 py-1.5 rounded" style={{ backgroundColor: "#edf6f8", color: "#2b7a8c" }}>
                    Rs. {typeof product.currentPrice === "number" ? product.currentPrice.toFixed(2) : Number(product.currentPrice).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1.5 rounded italic" style={{ backgroundColor: "#f1f1f1", color: "#888888" }}>
                    Nil
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Button */}
      <div className="p-4 pt-2 mt-auto">
        <a 
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-3 rounded text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2b7a8c" }}
        >
          SHOP NOW
        </a>
      </div>
    </div>
  );
}
